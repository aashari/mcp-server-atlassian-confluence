/**
 * Tool for interacting with Confluence inline comments specifically
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import { atlassianCommentsController } from '../controllers/atlassian.comments.controller.js';

// Create logger for this file
const logger = Logger.forContext('tools/atlassian.inline-comments.tool.ts');

/**
 * Args schema for listing inline comments only
 */
const ListInlineCommentsArgsSchema = z.object({
	/**
	 * The ID of the page to get inline comments for
	 */
	pageId: z
		.string()
		.min(1)
		.describe(
			'The ID of the Confluence page to retrieve inline comments for',
		),

	/**
	 * Include resolved inline comments
	 */
	includeResolved: z
		.boolean()
		.default(false)
		.describe(
			'Include resolved inline comments in the results (default: false)',
		),

	/**
	 * Sort order for inline comments
	 */
	sortBy: z
		.enum(['created', 'position'])
		.default('position')
		.describe(
			'Sort by creation date or document position (default: position)',
		),

	/**
	 * Maximum number of results to return
	 */
	limit: z
		.number()
		.int()
		.min(1)
		.max(100)
		.default(25)
		.describe('Maximum number of inline comments to retrieve (1-100)'),

	/**
	 * Starting point for pagination
	 */
	start: z
		.number()
		.int()
		.min(0)
		.default(0)
		.describe(
			'Starting point for pagination (used for retrieving subsequent pages of results)',
		),
});

// Type for the args
type ListInlineCommentsArgs = z.infer<typeof ListInlineCommentsArgsSchema>;

/**
 * Handle the request to list inline comments only for a page
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} MCP response with formatted inline comments list
 */
async function handleListInlineComments(args: Record<string, unknown>) {
	const methodLogger = logger.forMethod('handleListInlineComments');

	try {
		methodLogger.debug('Tool conf_ls_inline_comments called', args);

		// Call the new controller method for inline comments
		const typedArgs = args as ListInlineCommentsArgs;
		const result = await atlassianCommentsController.listInlineComments({
			pageId: typedArgs.pageId,
			includeResolved: typedArgs.includeResolved,
			sortBy: typedArgs.sortBy,
			limit: typedArgs.limit,
			start: typedArgs.start,
		});

		// Format the response for MCP
		return {
			content: [{ type: 'text' as const, text: result.content }],
		};
	} catch (error) {
		methodLogger.error('Tool conf_ls_inline_comments failed', error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * Register all inline comment-related tools
 */
function registerTools(server: McpServer) {
	const registerLogger = logger.forMethod('registerTools');

	registerLogger.debug('Registering Confluence inline comments tools...');

	// Register the list inline comments tool
	server.tool(
		'conf_ls_inline_comments',
		'Lists ONLY inline comments for a Confluence page, identified by `pageId`. Filters out regular page comments and shows only comments attached to specific text selections. Includes highlighted text context and comment content in Markdown format. Supports filtering by resolution status and sorting by document position or creation date. Use this instead of `conf_ls_page_comments` when you specifically need inline comments that reference particular text passages. Requires Confluence credentials to be configured.',
		ListInlineCommentsArgsSchema.shape,
		handleListInlineComments,
	);

	registerLogger.debug(
		'Successfully registered Confluence inline comments tools',
	);
}

export default { registerTools };
