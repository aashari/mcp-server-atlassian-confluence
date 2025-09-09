import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import atlassianPagesController from '../controllers/atlassian.pages.controller.js';
import {
	type ListPagesToolArgsType,
	ListPagesToolArgs,
	type GetPageToolArgsType,
	GetPageToolArgs,
} from './atlassian.pages.types.js';

/**
 * MCP Tool: List Confluence Pages
 *
 * Lists Confluence pages with optional filtering by space, status, and limit.
 * Returns a formatted markdown response with page details and pagination info.
 *
 * @param {ListPagesToolArgsType} args - Tool arguments for filtering pages
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} MCP response with formatted pages list
 * @throws Will return error message if page listing fails
 */
async function listPages(args: Record<string, unknown>) {
	const methodLogger = Logger.forContext(
		'tools/atlassian.pages.tool.ts',
		'listPages',
	);
	methodLogger.debug('Tool called with args:', args);

	try {
		methodLogger.debug('Calling controller with options:', args);

		// With updated controller signature, we can pass the tool args directly
		const result = await atlassianPagesController.list(
			args as ListPagesToolArgsType,
		);

		methodLogger.debug('Successfully retrieved pages list');

		return {
			content: [
				{
					type: 'text' as const,
					text: result.content, // Content now includes pagination information
				},
			],
		};
	} catch (error) {
		methodLogger.error('Error listing pages:', error);
		return formatErrorForMcpTool(error);
	}
}

/**
 * MCP Tool: Get Confluence Page Details
 *
 * Retrieves detailed information about a specific Confluence page.
 * Returns a formatted markdown response with page content and metadata.
 *
 * @param {GetPageToolArgsType} args - Tool arguments containing the page ID
 * @returns {Promise<{ content: Array<{ type: 'text', text: string }> }>} MCP response with formatted page details
 * @throws Will return error message if page retrieval fails
 */
async function getPage(args: Record<string, unknown>) {
	const methodLogger = Logger.forContext(
		'tools/atlassian.pages.tool.ts',
		'getPage',
	);
	methodLogger.debug('Tool called with args:', args);

	try {
		// Call the controller to get page details - we can now pass args directly
		const result = await atlassianPagesController.get(
			args as GetPageToolArgsType,
		);

		methodLogger.debug('Successfully retrieved page details');

		// Convert the string content to an MCP text resource with the correct type
		return {
			content: [
				{
					type: 'text' as const,
					text: result.content,
				},
			],
		};
	} catch (error) {
		methodLogger.error('Error retrieving page details:', error);
		// Format the error for MCP tools
		return formatErrorForMcpTool(error);
	}
}

/**
 * Register Atlassian Pages MCP Tools
 *
 * Registers the list-pages and get-page tools with the MCP server.
 * Each tool is registered with its schema, description, and handler function.
 *
 * @param {McpServer} server - The MCP server instance to register tools with
 */
function registerTools(server: McpServer) {
	const toolLogger = Logger.forContext(
		'tools/atlassian.pages.tool.ts',
		'registerTools',
	);
	toolLogger.debug('Registering Atlassian Pages tools...');

	// Register the list pages tool
	// Rename title field to avoid MCP SDK conflict
	const listPagesSchema = z.object({
		spaceIds: ListPagesToolArgs.shape.spaceIds,
		spaceKeys: ListPagesToolArgs.shape.spaceKeys,
		parentId: ListPagesToolArgs.shape.parentId,
		pageTitle: ListPagesToolArgs.shape.title, // Renamed from 'title' to 'pageTitle'
		status: ListPagesToolArgs.shape.status,
		limit: ListPagesToolArgs.shape.limit,
		cursor: ListPagesToolArgs.shape.cursor,
		sort: ListPagesToolArgs.shape.sort,
	});
	server.tool(
		'conf_ls_pages',
		`Lists pages within specified spaces (by \`spaceId\` or \`spaceKey\`) or globally. Filters by \`pageTitle\` with SMART MATCHING: tries exact match first, automatically falls back to partial matching if no exact results found. Supports \`status\` (current, archived, etc.), sorting (\`sort\`) and pagination (\`limit\`, \`cursor\`). 
- Returns a formatted list of pages including ID, title, status, space ID, author, version, and URL. 
- Pagination information including next cursor value is included at the end of the returned text content.
- SMART TITLE SEARCH: When using \`pageTitle\` parameter, if exact match fails, automatically searches for partial matches (e.g., "Balance" will find "Balance Reconciliation System").
- For full-text content search or advanced queries, use the \`conf_search\` tool. 
- Requires Confluence credentials.`,
		listPagesSchema.shape,
		async (args: Record<string, unknown>) => {
			// Map pageTitle back to title for the controller
			const mappedArgs = { ...args, title: args.pageTitle };
			delete (mappedArgs as Record<string, unknown>).pageTitle;
			return listPages(mappedArgs);
		},
	);

	// Register the get page details tool
	server.tool(
		'conf_get_page',
		`Retrieves the full content (converted to Markdown) and metadata for a specific Confluence page using its numeric ID (\`pageId\`).\n- Includes complete page body, title, space info, author, version, labels, and URL.\nUse this after finding a page ID via \`confluence_list_pages\` or \`confluence_search\` to get its full content.\nReturns comprehensive page details formatted as Markdown.`,
		GetPageToolArgs.shape,
		getPage,
	);

	toolLogger.debug('Successfully registered Atlassian Pages tools');
}

export default { registerTools };
