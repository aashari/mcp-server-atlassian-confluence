import { z } from 'zod';

/**
 * Base schema fields shared by all API tool arguments
 * Contains path, queryParams, and jq filter
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
		.record(z.string())
		.optional()
		.describe(
			'Optional query parameters as key-value pairs. Examples: {"limit": "25", "cursor": "...", "space-id": "123", "body-format": "storage"}',
		),

	/**
	 * Optional JMESPath expression to filter/transform the response
	 */
	jq: z
		.string()
		.optional()
		.describe(
			'JMESPath expression to filter/transform the JSON response. Examples: "results[*].id" (extract IDs), "results[0]" (first result), "{id: id, title: title}" (reshape object). See https://jmespath.org for syntax.',
		),
};

/**
 * Body field for requests that include a request body (POST, PUT, PATCH)
 */
const bodyField = z
	.record(z.unknown())
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
