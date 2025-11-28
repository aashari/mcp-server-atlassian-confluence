import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import {
	GetApiToolArgs,
	type GetApiToolArgsType,
	RequestWithBodyArgs,
	type RequestWithBodyArgsType,
	DeleteApiToolArgs,
} from './atlassian.api.types.js';
import {
	handleGet,
	handlePost,
	handlePut,
	handlePatch,
	handleDelete,
} from '../controllers/atlassian.api.controller.js';

// Create a contextualized logger for this file
const toolLogger = Logger.forContext('tools/atlassian.api.tool.ts');

// Log tool initialization
toolLogger.debug('Confluence API tool initialized');

/**
 * Creates an MCP tool handler for GET/DELETE requests (no body)
 *
 * @param methodName - Name of the HTTP method for logging
 * @param handler - Controller handler function
 * @returns MCP tool handler function
 */
function createReadHandler(
	methodName: string,
	handler: (options: GetApiToolArgsType) => Promise<{ content: string }>,
) {
	return async (args: Record<string, unknown>) => {
		const methodLogger = Logger.forContext(
			'tools/atlassian.api.tool.ts',
			methodName.toLowerCase(),
		);
		methodLogger.debug(`Making ${methodName} request with args:`, args);

		try {
			const result = await handler(args as GetApiToolArgsType);

			methodLogger.debug(
				'Successfully retrieved response from controller',
			);

			return {
				content: [
					{
						type: 'text' as const,
						text: result.content,
					},
				],
			};
		} catch (error) {
			methodLogger.error(`Failed to make ${methodName} request`, error);
			return formatErrorForMcpTool(error);
		}
	};
}

/**
 * Creates an MCP tool handler for POST/PUT/PATCH requests (with body)
 *
 * @param methodName - Name of the HTTP method for logging
 * @param handler - Controller handler function
 * @returns MCP tool handler function
 */
function createWriteHandler(
	methodName: string,
	handler: (options: RequestWithBodyArgsType) => Promise<{ content: string }>,
) {
	return async (args: Record<string, unknown>) => {
		const methodLogger = Logger.forContext(
			'tools/atlassian.api.tool.ts',
			methodName.toLowerCase(),
		);
		methodLogger.debug(`Making ${methodName} request with args:`, {
			path: args.path,
			bodyKeys: args.body ? Object.keys(args.body as object) : [],
		});

		try {
			const result = await handler(args as RequestWithBodyArgsType);

			methodLogger.debug(
				'Successfully received response from controller',
			);

			return {
				content: [
					{
						type: 'text' as const,
						text: result.content,
					},
				],
			};
		} catch (error) {
			methodLogger.error(`Failed to make ${methodName} request`, error);
			return formatErrorForMcpTool(error);
		}
	};
}

// Create tool handlers
const get = createReadHandler('GET', handleGet);
const post = createWriteHandler('POST', handlePost);
const put = createWriteHandler('PUT', handlePut);
const patch = createWriteHandler('PATCH', handlePatch);
const del = createReadHandler('DELETE', handleDelete);

/**
 * Register generic Confluence API tools with the MCP server.
 */
function registerTools(server: McpServer) {
	const registerLogger = Logger.forContext(
		'tools/atlassian.api.tool.ts',
		'registerTools',
	);
	registerLogger.debug('Registering API tools...');

	// Register the GET tool
	server.tool(
		'conf_get',
		`Read any Confluence data. Returns JSON, optionally filtered with JMESPath (\`jq\` param).

**Common paths:**
- \`/wiki/api/v2/spaces\` - list all spaces
- \`/wiki/api/v2/spaces/{id}\` - get space details
- \`/wiki/api/v2/pages\` - list pages (use \`space-id\` query param to filter)
- \`/wiki/api/v2/pages/{id}\` - get page details
- \`/wiki/api/v2/pages/{id}/body\` - get page body (use \`body-format\` param: storage, atlas_doc_format, view)
- \`/wiki/api/v2/pages/{id}/children\` - get child pages
- \`/wiki/api/v2/pages/{id}/labels\` - get page labels
- \`/wiki/api/v2/pages/{id}/footer-comments\` - get page comments
- \`/wiki/api/v2/blogposts\` - list blog posts
- \`/wiki/api/v2/blogposts/{id}\` - get blog post
- \`/wiki/api/v2/labels/{id}\` - get label details
- \`/wiki/api/v2/content/{id}/attachments\` - get content attachments
- \`/wiki/rest/api/search\` - search content (use \`cql\` query param)

**Query params:** \`limit\` (page size, default 25), \`cursor\` (pagination), \`space-id\` (filter by space), \`body-format\` (storage, atlas_doc_format, view)

**Example CQL queries:** \`type=page AND space=DEV\`, \`title~"search term"\`, \`label=important\`, \`creator=currentUser()\`

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`,
		GetApiToolArgs.shape,
		get,
	);

	// Register the POST tool
	server.tool(
		'conf_post',
		`Create Confluence resources. Returns JSON, optionally filtered with JMESPath (\`jq\` param).

**Common operations:**

1. **Create page:** \`/wiki/api/v2/pages\`
   body: \`{"spaceId": "123456", "status": "current", "title": "Page Title", "parentId": "789", "body": {"representation": "storage", "value": "<p>Content here</p>"}}\`

2. **Create blog post:** \`/wiki/api/v2/blogposts\`
   body: \`{"spaceId": "123456", "status": "current", "title": "Blog Title", "body": {"representation": "storage", "value": "<p>Blog content</p>"}}\`

3. **Add label to page:** \`/wiki/api/v2/pages/{id}/labels\`
   body: \`{"name": "label-name"}\` (labels must be lowercase, no spaces)

4. **Add footer comment:** \`/wiki/api/v2/pages/{id}/footer-comments\`
   body: \`{"body": {"representation": "storage", "value": "<p>Comment text</p>"}}\`

5. **Create inline comment:** \`/wiki/api/v2/pages/{id}/inline-comments\`
   body: \`{"body": {"representation": "storage", "value": "<p>Inline comment</p>"}, "inlineCommentProperties": {"textSelection": "text to anchor to"}}\`

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`,
		RequestWithBodyArgs.shape,
		post,
	);

	// Register the PUT tool
	server.tool(
		'conf_put',
		`Replace Confluence resources (full update). Returns JSON, optionally filtered with JMESPath (\`jq\` param).

**Common operations:**

1. **Update page:** \`/wiki/api/v2/pages/{id}\`
   body: \`{"id": "123", "status": "current", "title": "Updated Title", "spaceId": "456", "body": {"representation": "storage", "value": "<p>Updated content</p>"}, "version": {"number": 2, "message": "Update reason"}}\`
   Note: version.number must be incremented from current version

2. **Update blog post:** \`/wiki/api/v2/blogposts/{id}\`
   body: \`{"id": "123", "status": "current", "title": "Updated Blog", "spaceId": "456", "body": {"representation": "storage", "value": "<p>Updated content</p>"}, "version": {"number": 2}}\`

Note: PUT replaces the entire resource. Version number must be incremented.

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`,
		RequestWithBodyArgs.shape,
		put,
	);

	// Register the PATCH tool
	server.tool(
		'conf_patch',
		`Partially update Confluence resources. Returns JSON, optionally filtered with JMESPath (\`jq\` param).

**Common operations:**

Note: Confluence v2 API primarily uses PUT for updates. PATCH is available for some endpoints:

1. **Update space:** \`/wiki/api/v2/spaces/{id}\`
   body: \`{"name": "New Space Name", "description": {"plain": {"value": "Description", "representation": "plain"}}}\`

2. **Update footer comment:** \`/wiki/api/v2/footer-comments/{comment-id}\`
   body: \`{"version": {"number": 2}, "body": {"representation": "storage", "value": "<p>Updated comment</p>"}}\`

For page content updates, use PUT with the full page object including incremented version number.

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`,
		RequestWithBodyArgs.shape,
		patch,
	);

	// Register the DELETE tool
	server.tool(
		'conf_delete',
		`Delete Confluence resources. Returns JSON (if any), optionally filtered with JMESPath (\`jq\` param).

**Common operations:**

1. **Delete page:** \`/wiki/api/v2/pages/{id}\`
   Returns 204 No Content on success

2. **Delete blog post:** \`/wiki/api/v2/blogposts/{id}\`
   Returns 204 No Content on success

3. **Remove label from page:** \`/wiki/api/v2/pages/{id}/labels/{label-id}\`
   Returns 204 No Content on success

4. **Delete comment:** \`/wiki/api/v2/footer-comments/{comment-id}\`
   Returns 204 No Content on success

5. **Delete attachment:** \`/wiki/api/v2/attachments/{attachment-id}\`
   Returns 204 No Content on success

Note: Most DELETE endpoints return 204 No Content on success.

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`,
		DeleteApiToolArgs.shape,
		del,
	);

	registerLogger.debug('Successfully registered API tools');
}

export default { registerTools };
