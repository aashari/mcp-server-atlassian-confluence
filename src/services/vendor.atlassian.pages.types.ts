/**
 * Types for Atlassian Confluence Pages API
 */
import { z } from 'zod';

/**
 * Page status enum
 */
export type ContentStatus =
	| 'current'
	| 'trashed'
	| 'deleted'
	| 'draft'
	| 'archived'
	| 'historical';

/**
 * Page sort order enum
 */
export type PageSortOrder =
	| 'id'
	| '-id'
	| 'created-date'
	| '-created-date'
	| 'modified-date'
	| '-modified-date'
	| 'title'
	| '-title';

/**
 * Body format enum
 */
export type BodyFormat =
	| 'storage'
	| 'atlas_doc_format'
	| 'view'
	| 'export_view'
	| 'anonymous_export_view'
	| 'styled_view'
	| 'editor';

/**
 * Parameters for listing pages
 */
export interface ListPagesParams {
	spaceId?: string[];
	title?: string;
	status?: ContentStatus[];
	bodyFormat?: BodyFormat;
	sort?: PageSortOrder;
	query?: string;
	cursor?: string;
	limit?: number;
	parentId?: string;
}

/**
 * Parameters for getting a specific page
 */
export interface GetPageByIdParams {
	bodyFormat?: BodyFormat;
	getDraft?: boolean;
	version?: number;
	includeAncestors?: boolean;
	includeBody?: boolean;
	includeChildTypes?: boolean;
	includeLabels?: boolean;
	includeVersion?: boolean;
	includeOperations?: boolean;
	includeWebresources?: boolean;
	includeCollaborators?: boolean;
}

/**
 * Zod schemas for Confluence API response types
 */

/**
 * Content status enum schema
 */
export const ContentStatusSchema = z.enum([
	'current',
	'deleted',
	'historical',
	'trashed',
	'archived',
	'draft',
]);

/**
 * Content representation schema
 */
export const ContentRepresentationSchema = z.object({
	representation: z.string(),
	value: z.string(),
});

/**
 * Version schema
 */
export const VersionSchema = z.object({
	number: z.number(),
	message: z.string().optional(),
	minorEdit: z.boolean().optional(),
	authorId: z.string().optional(),
	createdAt: z.string().optional(),
	contentTypeModifiedAt: z.string().optional(),
});

/**
 * Body schema
 */
export const BodySchema = z.object({
	storage: ContentRepresentationSchema.optional(),
	view: ContentRepresentationSchema.optional(),
	export_view: ContentRepresentationSchema.optional(),
	styled_view: ContentRepresentationSchema.optional(),
	atlas_doc_format: ContentRepresentationSchema.optional(),
	wiki: ContentRepresentationSchema.optional(),
	anonymous_export_view: ContentRepresentationSchema.optional(),
});

/**
 * Page links schema
 */
export const PageLinksSchema = z.object({
	webui: z.string().optional(),
	editui: z.string().optional(),
	tinyui: z.string().optional(),
	base: z.string().optional(),
	next: z.string().optional(),
});

/**
 * Web resource schema
 */
export const WebResourceSchema = z.object({
	key: z.string(),
	contexts: z.array(z.string()),
	superbatch: z.string(),
	uris: z.record(z.string(), z.string()),
	tags: z.array(z.string()),
});

/**
 * Page collaborator schema
 */
export const PageCollaboratorSchema = z.object({
	collaboratorId: z.string(),
	businessObjectId: z.string(),
	appearanceId: z.string(),
});

/**
 * Page parent schema
 */
export const PageParentSchema = z.object({
	id: z.string(),
	type: z.string(),
	status: z.string(),
	title: z.string(),
});

/**
 * Child types schema
 */
export const ChildTypesSchema = z.object({
	attachment: z.boolean().optional(),
	comment: z.boolean().optional(),
	page: z.boolean().optional(),
});

/**
 * Label schema (moved from deleted vendor.atlassian.spaces.types.js)
 */
export const LabelSchema = z.object({
	id: z.string(),
	name: z.string(),
	prefix: z.string().optional(),
});

/**
 * Operation schema (moved from deleted vendor.atlassian.spaces.types.js)
 */
export const OperationSchema = z.object({
	key: z.string().optional(),
	target: z.string().optional(),
	targetType: z.string(),
});

/**
 * Optional field metadata schema (moved from deleted vendor.atlassian.spaces.types.js)
 */
export const OptionalFieldMetaSchema = z.object({
	count: z.number().optional(),
});

/**
 * Optional field links schema (moved from deleted vendor.atlassian.spaces.types.js)
 */
export const OptionalFieldLinksSchema = z.object({
	self: z.string().optional(),
	next: z.string().optional(),
});

/**
 * Optional collection schema - used for labels, properties, operations, etc.
 * (moved from deleted vendor.atlassian.spaces.types.js)
 */
export const OptionalCollectionSchema = <T extends z.ZodTypeAny>(
	itemSchema: T,
) =>
	z.object({
		results: z.array(itemSchema),
		meta: OptionalFieldMetaSchema,
		_links: OptionalFieldLinksSchema,
	});

/**
 * Base page schema (common fields)
 */
export const PageSchema = z.object({
	id: z.string(),
	status: ContentStatusSchema,
	title: z.string(),
	spaceId: z.string(),
	parentId: z.string().nullable().optional(),
	parentType: z.string().nullable().optional(),
	authorId: z.string().optional(),
	createdAt: z.string(),
	position: z.number().nullable().optional(),
	version: VersionSchema.optional(),
	_links: PageLinksSchema,
	body: BodySchema.optional(),
});

/**
 * Detailed page schema
 */
export const PageDetailedSchema = PageSchema.extend({
	parent: PageParentSchema.optional(),
	childTypes: ChildTypesSchema.optional(),
	labels: OptionalCollectionSchema(LabelSchema).optional(),
	operations: OptionalCollectionSchema(OperationSchema).optional(),
	collaborators: z
		.union([
			OptionalCollectionSchema(PageCollaboratorSchema),
			z.array(z.any()),
		])
		.optional(),
	webResources: z
		.union([
			OptionalCollectionSchema(WebResourceSchema),
			z.object({}).passthrough(),
		])
		.optional(),
});

/**
 * Pages response schema
 */
export const PagesResponseSchema = z.object({
	results: z.array(PageSchema),
	_links: PageLinksSchema.optional(),
});

/**
 * Inferred types from Zod schemas
 */
export type PageSchemaType = z.infer<typeof PageSchema>;
export type PageDetailedSchemaType = z.infer<typeof PageDetailedSchema>;
