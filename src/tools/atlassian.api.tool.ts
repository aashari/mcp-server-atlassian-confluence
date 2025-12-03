import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Logger } from '../utils/logger.util.js';
import { formatErrorForMcpTool } from '../utils/error.util.js';
import { truncateForAI } from '../utils/formatter.util.js';
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
	handler: (
		options: GetApiToolArgsType,
	) => Promise<{ content: string; rawResponsePath?: string | null }>,
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
						text: truncateForAI(
							result.content,
							result.rawResponsePath,
						),
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
	handler: (
		options: RequestWithBodyArgsType,
	) => Promise<{ content: string; rawResponsePath?: string | null }>,
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
						text: truncateForAI(
							result.content,
							result.rawResponsePath,
						),
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

// Tool descriptions
const CONF_GET_DESCRIPTION = `Read any Confluence data. Returns TOON format by default (30-60% fewer tokens than JSON).

**IMPORTANT - Cost Optimization:**
- ALWAYS use \`jq\` param to filter response fields. Unfiltered responses are very expensive!
- Use \`limit\` query param to restrict result count (e.g., \`limit: "5"\`)
- If unsure about available fields, first fetch ONE item with \`limit: "1"\` and NO jq filter to explore the schema, then use jq in subsequent calls

**Schema Discovery Pattern:**
1. First call: \`path: "/wiki/api/v2/spaces", queryParams: {"limit": "1"}\` (no jq) - explore available fields
2. Then use: \`jq: "results[*].{id: id, key: key, name: name}"\` - extract only what you need

**Output format:** TOON (default, token-efficient) or JSON (\`outputFormat: "json"\`)

**Common paths:**
- \`/wiki/api/v2/spaces\` - list spaces
- \`/wiki/api/v2/pages\` - list pages (use \`space-id\` query param)
- \`/wiki/api/v2/pages/{id}\` - get page details
- \`/wiki/api/v2/pages/{id}/body\` - get page body (\`body-format\`: storage, atlas_doc_format, view)
- \`/wiki/rest/api/search\` - search content (\`cql\` query param)

**JQ examples:** \`results[*].id\`, \`results[0]\`, \`results[*].{id: id, title: title}\`

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`;

const CONF_POST_DESCRIPTION = `Create Confluence resources. Returns TOON format by default (token-efficient).

**IMPORTANT - Cost Optimization:**
- Use \`jq\` param to extract only needed fields from response (e.g., \`jq: "{id: id, title: title}"\`)
- Unfiltered responses include all metadata and are expensive!

**Output format:** TOON (default) or JSON (\`outputFormat: "json"\`)

**Common operations:**

1. **Create page:** \`/wiki/api/v2/pages\`
   body: \`{"spaceId": "123456", "status": "current", "title": "Page Title", "parentId": "789", "body": {"representation": "storage", "value": "<p>Content</p>"}}\`

2. **Create blog post:** \`/wiki/api/v2/blogposts\`
   body: \`{"spaceId": "123456", "status": "current", "title": "Blog Title", "body": {"representation": "storage", "value": "<p>Content</p>"}}\`

3. **Add label:** \`/wiki/api/v2/pages/{id}/labels\` - body: \`{"name": "label-name"}\`

4. **Add comment:** \`/wiki/api/v2/pages/{id}/footer-comments\`

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`;

const CONF_PUT_DESCRIPTION = `Replace Confluence resources (full update). Returns TOON format by default.

**IMPORTANT - Cost Optimization:**
- Use \`jq\` param to extract only needed fields from response
- Example: \`jq: "{id: id, version: version.number}"\`

**Output format:** TOON (default) or JSON (\`outputFormat: "json"\`)

**Common operations:**

1. **Update page:** \`/wiki/api/v2/pages/{id}\`
   body: \`{"id": "123", "status": "current", "title": "Updated Title", "spaceId": "456", "body": {"representation": "storage", "value": "<p>Content</p>"}, "version": {"number": 2}}\`
   Note: version.number must be incremented

2. **Update blog post:** \`/wiki/api/v2/blogposts/{id}\`

Note: PUT replaces entire resource. Version number must be incremented.

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`;

const CONF_PATCH_DESCRIPTION = `Partially update Confluence resources. Returns TOON format by default.

**IMPORTANT - Cost Optimization:** Use \`jq\` param to filter response fields.

**Output format:** TOON (default) or JSON (\`outputFormat: "json"\`)

**Common operations:**

1. **Update space:** \`/wiki/api/v2/spaces/{id}\`
   body: \`{"name": "New Name", "description": {"plain": {"value": "Desc", "representation": "plain"}}}\`

2. **Update comment:** \`/wiki/api/v2/footer-comments/{id}\`

Note: Confluence v2 API primarily uses PUT for updates.

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`;

const CONF_DELETE_DESCRIPTION = `Delete Confluence resources. Returns TOON format by default.

**Output format:** TOON (default) or JSON (\`outputFormat: "json"\`)

**Common operations:**
- \`/wiki/api/v2/pages/{id}\` - Delete page
- \`/wiki/api/v2/blogposts/{id}\` - Delete blog post
- \`/wiki/api/v2/pages/{id}/labels/{label-id}\` - Remove label
- \`/wiki/api/v2/footer-comments/{id}\` - Delete comment
- \`/wiki/api/v2/attachments/{id}\` - Delete attachment

Note: Most DELETE endpoints return 204 No Content on success.

API reference: https://developer.atlassian.com/cloud/confluence/rest/v2/`;

/**
 * Register generic Confluence API tools with the MCP server.
 * Uses the modern registerTool API (SDK v1.22.0+) instead of deprecated tool() method.
 */
function registerTools(server: McpServer) {
	const registerLogger = Logger.forContext(
		'tools/atlassian.api.tool.ts',
		'registerTools',
	);
	registerLogger.debug('Registering API tools...');

	// Register the GET tool using modern registerTool API
	server.registerTool(
		'conf_get',
		{
			title: 'Confluence GET Request',
			description: CONF_GET_DESCRIPTION,
			inputSchema: GetApiToolArgs,
		},
		get,
	);

	// Register the POST tool using modern registerTool API
	server.registerTool(
		'conf_post',
		{
			title: 'Confluence POST Request',
			description: CONF_POST_DESCRIPTION,
			inputSchema: RequestWithBodyArgs,
		},
		post,
	);

	// Register the PUT tool using modern registerTool API
	server.registerTool(
		'conf_put',
		{
			title: 'Confluence PUT Request',
			description: CONF_PUT_DESCRIPTION,
			inputSchema: RequestWithBodyArgs,
		},
		put,
	);

	// Register the PATCH tool using modern registerTool API
	server.registerTool(
		'conf_patch',
		{
			title: 'Confluence PATCH Request',
			description: CONF_PATCH_DESCRIPTION,
			inputSchema: RequestWithBodyArgs,
		},
		patch,
	);

	// Register the DELETE tool using modern registerTool API
	server.registerTool(
		'conf_delete',
		{
			title: 'Confluence DELETE Request',
			description: CONF_DELETE_DESCRIPTION,
			inputSchema: DeleteApiToolArgs,
		},
		del,
	);

	registerLogger.debug('Successfully registered API tools');
}

export default { registerTools };
