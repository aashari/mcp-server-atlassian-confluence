/**
 * Types for Atlassian Confluence Spaces API
 */
import { z } from 'zod';
import { DescriptionFormat } from './vendor.atlassian.types.js';

/**
 * Legacy type definitions - these will be replaced by inferred types from Zod schemas
 */

/**
 * Space type enum
 */
export type SpaceType =
	| 'global'
	| 'personal'
	| 'collaboration'
	| 'knowledge_base';

/**
 * Space status enum
 */
export type SpaceStatus = 'current' | 'archived';

/**
 * Space sort order enum
 */
export type SpaceSortOrder = 'id' | '-id' | 'key' | '-key' | 'name' | '-name';

/**
 * Space property object - alias for ContentProperty with no additional fields
 */
// Unused type - referenced in commented SpaceDetailed interface
// export type SpaceProperty = ContentProperty;

/**
 * Parameters for listing spaces
 */
export interface ListSpacesParams {
	ids?: string[];
	keys?: string[];
	type?: SpaceType;
	status?: SpaceStatus;
	labels?: string[];
	favoritedBy?: string;
	notFavoritedBy?: string;
	sort?: SpaceSortOrder;
	descriptionFormat?: DescriptionFormat;
	includeIcon?: boolean;
	cursor?: string;
	limit?: number;
}

/**
 * Parameters for getting a space by ID
 */
export interface GetSpaceByIdParams {
	descriptionFormat?: DescriptionFormat;
	includeIcon?: boolean;
	includeOperations?: boolean;
	includeProperties?: boolean;
	includePermissions?: boolean;
	includeRoleAssignments?: boolean;
	includeLabels?: boolean;
}

/**
 * Zod schemas for Atlassian Confluence Spaces API responses
 */

/**
 * Space type enum schema
 */
export const SpaceTypeSchema = z.enum([
	'global',
	'personal',
	'collaboration',
	'knowledge_base',
]);

/**
 * Space status enum schema
 */
export const SpaceStatusSchema = z.enum(['current', 'archived']);

/**
 * Space sort order enum schema
 */
// Unused schema - commented out
// export const SpaceSortOrderSchema = z.enum([
//     'id',
//     '-id',
//     'name',
//     '-name',
//     'key',
//     '-key'
// ]);

/**
 * Content representation schema
 */
export const ContentRepresentationSchema = z.object({
	representation: z.string(),
	value: z.string(),
});

/**
 * Space description schema
 */
export const SpaceDescriptionSchema = z
	.object({
		plain: ContentRepresentationSchema.optional(),
		view: ContentRepresentationSchema.optional(),
	})
	.nullable();

/**
 * Space icon schema
 */
export const SpaceIconSchema = z
	.object({
		path: z.string().optional(),
		apiDownloadLink: z.string().optional(),
	})
	.nullable();

/**
 * Space links schema
 */
export const SpaceLinksSchema = z.object({
	webui: z.string().optional(),
	base: z.string().optional(),
	next: z.string().optional(),
});

/**
 * Permission subject schema
 */
export const PermissionSubjectSchema = z.object({
	type: z.enum(['user', 'group']),
	identifier: z.string(),
});

/**
 * Optional field metadata schema
 */
export const OptionalFieldMetaSchema = z.object({
	count: z.number().optional(),
});

/**
 * Optional field links schema
 */
export const OptionalFieldLinksSchema = z.object({
	self: z.string().optional(),
	next: z.string().optional(),
});

/**
 * Operation schema (for permissions)
 */
export const OperationSchema = z.object({
	key: z.string().optional(),
	target: z.string().optional(),
	targetType: z.string(),
});

/**
 * Space permission assignment schema
 */
export const SpacePermissionAssignmentSchema = z.object({
	id: z.string(),
	subject: PermissionSubjectSchema,
	operation: OperationSchema,
});

/**
 * Space role assignment schema
 */
export const SpaceRoleAssignmentSchema = z.object({
	id: z.string(),
	role: z.string(),
	subject: PermissionSubjectSchema,
});

/**
 * Label schema
 */
export const LabelSchema = z.object({
	id: z.string(),
	name: z.string(),
	prefix: z.string().optional(),
});

/**
 * Space property schema
 */
export const SpacePropertySchema = z.object({
	id: z.string(),
	key: z.string(),
	value: z.any(), // Could be any JSON value
	version: z
		.object({
			number: z.number(),
			message: z.string().optional(),
			minorEdit: z.boolean().optional(),
			authorId: z.string().optional(),
		})
		.optional(),
});

/**
 * Base Space schema (common fields between basic and detailed spaces)
 */
export const SpaceSchema = z.object({
	id: z.string(),
	key: z.string(),
	name: z.string(),
	type: SpaceTypeSchema,
	status: SpaceStatusSchema,
	authorId: z.string(),
	createdAt: z.string(),
	homepageId: z.string().nullable(),
	description: SpaceDescriptionSchema.optional(),
	icon: SpaceIconSchema.optional(),
	_links: SpaceLinksSchema,
	currentActiveAlias: z.string().optional(),
	spaceOwnerId: z.string().optional(),
});

/**
 * Optional collection schema - used for labels, properties, operations, etc.
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
 * Detailed Space schema with additional properties
 */
export const SpaceDetailedSchema = SpaceSchema.extend({
	labels: OptionalCollectionSchema(LabelSchema).optional(),
	properties: OptionalCollectionSchema(SpacePropertySchema).optional(),
	operations: OptionalCollectionSchema(OperationSchema).optional(),
	permissions: OptionalCollectionSchema(
		SpacePermissionAssignmentSchema,
	).optional(),
	roleAssignments: OptionalCollectionSchema(
		SpaceRoleAssignmentSchema,
	).optional(),
});

/**
 * Paginated response schema for spaces
 */
export const SpacesResponseSchema = z.object({
	results: z.array(SpaceSchema),
	_links: SpaceLinksSchema.optional(),
});

/**
 * Inferred types from Zod schemas
 */
export type SpaceDetailedSchemaType = z.infer<typeof SpaceDetailedSchema>;
