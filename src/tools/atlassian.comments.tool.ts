/**
 * Tool for interacting with Confluence comments
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import { atlassianCommentsController } from '../controllers/atlassian.comments.controller.js';

// Create logger for this file
const logger = Logger.forContext('tools/atlassian.comments.tool.ts');

/**
 * Args schema for listing page comments
 */
const ListPageCommentsArgsSchema = z.object({
	/**
	 * The ID of the page to get comments for
	 */
	pageId: z
		.string()
		.min(1)
		.describe('The ID of the Confluence page to retrieve comments for'),

	/**
	 * Maximum number of results to return
	 */
	limit: z
		.number()
		.int()
		.min(1)
		.max(100)
		.default(25)
		.describe('Maximum number of comments to retrieve (1-100)'),

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
type ListPageCommentsArgs = z.infer<typeof ListPageCommentsArgsSchema>;

/**
 * Handle the request to list comments for a page
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} MCP response with formatted comments list
 */
async function handleListPageComments(args: Record<string, unknown>) {
	const methodLogger = logger.forMethod('handleListPageComments');

	try {
		methodLogger.debug('Tool conf_ls_page_comments called', args);

		// Call the controller with original args
		const typedArgs = args as ListPageCommentsArgs;
		const result = await atlassianCommentsController.listPageComments({
			pageId: typedArgs.pageId,
			limit: typedArgs.limit,
			start: typedArgs.start,
		});

		// Format the response for MCP
		return {
			content: [{ type: 'text' as const, text: result.content }],
		};
	} catch (error) {
		methodLogger.error('Tool conf_ls_page_comments failed', error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * Register all comment-related tools
 */
function registerTools(server: McpServer) {
	const registerLogger = logger.forMethod('registerTools');

	registerLogger.debug('Registering Confluence comments tools...');

	// Register the list comments tool
	server.tool(
		'conf_ls_page_comments',
		'Lists comments for a Confluence page, identified by `pageId`. Includes both page-level and inline comments. Shows comment content and metadata in Markdown format. Supports pagination via `limit` and `start` parameters. Pagination information including next offset value is included directly in the returned text content. Requires Confluence credentials to be configured. Returns comment details as Markdown.',
		ListPageCommentsArgsSchema.shape,
		handleListPageComments,
	);

	registerLogger.debug('Successfully registered Confluence comments tools');
}

export default { registerTools };
