import { z } from 'zod';

/**
 * Output format options for API responses
 * - toon: Token-Oriented Object Notation (default, more token-efficient for LLMs)
 * - json: Standard JSON format
 */
export const OutputFormat = z
	.enum(['toon', 'json'])
	.optional()
	.describe(
		'Output format: "toon" (default, 30-60% fewer tokens) or "json". TOON is optimized for LLMs with tabular arrays and minimal syntax.',
	);

/**
 * Base schema fields shared by all API tool arguments
 * Contains path, queryParams, jq filter, and outputFormat
 */
const BaseApiToolArgs = {
	/**
	 * The API endpoint path (without base URL)
	 * Examples:
	 * - "/wiki/api/v2/spaces" - list spaces
	 * - "/wiki/api/v2/spaces/{id}" - get space
	 * - "/wiki/api/v2/pages" - list/create pages
	 * - "/wiki/api/v2/pages/{id}" - get page
	 * - "/wiki/api/v2/pages/{id}/body" - get page body
	 */
	path: z
		.string()
		.min(1, 'Path is required')
		.describe(
			'The Confluence API endpoint path (without base URL). Must start with "/". Examples: "/wiki/api/v2/spaces", "/wiki/api/v2/pages", "/wiki/api/v2/pages/{id}"',
		),

	/**
	 * Optional query parameters as key-value pairs
	 */
	queryParams: z
		.record(z.string(), z.string())
		.optional()
		.describe(
			'Optional query parameters as key-value pairs. Examples: {"limit": "25", "cursor": "...", "space-id": "123", "body-format": "storage"}',
		),

	/**
	 * Optional JMESPath expression to filter/transform the response
	 * IMPORTANT: Always use this to reduce response size and token costs
	 */
	jq: z
		.string()
		.optional()
		.describe(
			'JMESPath expression to filter/transform the response. IMPORTANT: Always use this to extract only needed fields and reduce token costs. Examples: "results[*].{id: id, title: title}" (extract specific fields), "results[0]" (first result), "results[*].id" (IDs only). See https://jmespath.org',
		),

	/**
	 * Output format for the response
	 * Defaults to TOON (token-efficient), can be set to JSON if needed
	 */
	outputFormat: OutputFormat,
};

/**
 * Body field for requests that include a request body (POST, PUT, PATCH)
 */
const bodyField = z
	.record(z.string(), z.unknown())
	.describe(
		'Request body as a JSON object. Structure depends on the endpoint. Example for page: {"spaceId": "123", "title": "Page Title", "body": {"representation": "storage", "value": "<p>Content</p>"}}',
	);

/**
 * Schema for conf_get tool arguments (GET requests - no body)
 */
export const GetApiToolArgs = z.object(BaseApiToolArgs);
export type GetApiToolArgsType = z.infer<typeof GetApiToolArgs>;

/**
 * Schema for requests with body (POST, PUT, PATCH)
 */
export const RequestWithBodyArgs = z.object({
	...BaseApiToolArgs,
	body: bodyField,
});
export type RequestWithBodyArgsType = z.infer<typeof RequestWithBodyArgs>;

/**
 * Schema for conf_post tool arguments (POST requests)
 */
export const PostApiToolArgs = RequestWithBodyArgs;
export type PostApiToolArgsType = RequestWithBodyArgsType;

/**
 * Schema for conf_put tool arguments (PUT requests)
 */
export const PutApiToolArgs = RequestWithBodyArgs;
export type PutApiToolArgsType = RequestWithBodyArgsType;

/**
 * Schema for conf_patch tool arguments (PATCH requests)
 */
export const PatchApiToolArgs = RequestWithBodyArgs;
export type PatchApiToolArgsType = RequestWithBodyArgsType;

/**
 * Schema for conf_delete tool arguments (DELETE requests - no body)
 */
export const DeleteApiToolArgs = GetApiToolArgs;
export type DeleteApiToolArgsType = GetApiToolArgsType;
