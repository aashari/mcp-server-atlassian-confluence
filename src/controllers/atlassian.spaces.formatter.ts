import {
	SpaceDetailed,
	SpacesResponse,
} from '../services/vendor.atlassian.spaces.types.js';
import {
	formatUrl,
	formatDate,
	formatHeading,
	formatBulletList,
	formatSeparator,
	formatNumberedList,
} from '../utils/formatter.util.js';

/**
 * Format a list of spaces for display
 * @param spacesData - Raw spaces data from the API
 * @returns Formatted string with spaces information in markdown format
 */
export function formatSpacesList(spacesData: SpacesResponse): string {
	if (!spacesData.results || spacesData.results.length === 0) {
		return 'No Confluence spaces found matching your criteria.';
	}

	const lines: string[] = [formatHeading('Confluence Spaces', 1), ''];

	// Use the numbered list formatter for consistent formatting
	const formattedList = formatNumberedList(
		spacesData.results,
		(space, index) => {
			const itemLines: string[] = [];
			itemLines.push(formatHeading(space.name, 2));

			// Basic properties
			const properties: Record<string, unknown> = {
				ID: space.id,
				Key: space.key,
				Type: space.type,
				Status: space.status,
				Created: space.createdAt
					? formatDate(new Date(space.createdAt))
					: 'Not available',
				'Homepage ID': space.homepageId || 'Not set',
				Description: space.description?.view?.value || 'Not available',
				URL: formatUrl(
					`${spacesData._links.base}/spaces/${space.key}`,
					space.key,
				),
			};

			if (space.currentActiveAlias) {
				properties['Alias'] = space.currentActiveAlias;
			}

			// Format as a bullet list with proper formatting for each value type
			itemLines.push(formatBulletList(properties, (key) => key));

			// Add separator between spaces except for the last one
			if (index < spacesData.results.length - 1) {
				itemLines.push('');
				itemLines.push(formatSeparator());
			}

			return itemLines.join('\n');
		},
	);

	lines.push(formattedList);

	// Add timestamp for when this information was retrieved
	lines.push('');
	lines.push(`*Space information retrieved at ${formatDate(new Date())}*`);

	return lines.join('\n');
}

/**
 * Format detailed space information for display
 * @param spaceData - Raw space details from the API
 * @param homepageContent - Optional homepage content to include
 * @returns Formatted string with space details in markdown format
 */
export function formatSpaceDetails(
	spaceData: SpaceDetailed,
	homepageContent?: string,
): string {
	// Create URL
	const baseUrl = spaceData._links.base || '';
	const spaceUrl = spaceData._links.webui || '';
	const fullUrl = spaceUrl.startsWith('http')
		? spaceUrl
		: `${baseUrl}${spaceUrl}`;

	const lines: string[] = [
		formatHeading(`Confluence Space: ${spaceData.name}`, 1),
		'',
		`> A ${spaceData.status} ${spaceData.type} space with key \`${spaceData.key}\` created on ${formatDate(spaceData.createdAt)}.`,
		'',
		formatHeading('Basic Information', 2),
	];

	// Format basic information as a bullet list
	const basicProperties: Record<string, unknown> = {
		ID: spaceData.id,
		Key: spaceData.key,
		Type: spaceData.type,
		Status: spaceData.status,
		'Created At': spaceData.createdAt,
		'Author ID': spaceData.authorId,
		'Homepage ID': spaceData.homepageId,
		'Current Alias': spaceData.currentActiveAlias,
	};

	lines.push(formatBulletList(basicProperties, (key) => key));

	// Description section
	if (
		spaceData.description?.view?.value ||
		spaceData.description?.plain?.value
	) {
		lines.push('');
		lines.push(formatHeading('Description', 2));

		const viewValue = spaceData.description?.view?.value;
		const plainValue = spaceData.description?.plain?.value;

		if (viewValue && viewValue.trim()) {
			lines.push(viewValue.trim());
		} else if (plainValue && plainValue.trim()) {
			lines.push(plainValue.trim());
		} else {
			lines.push('*No description provided*');
		}
	}

	// Homepage content section (placed after description)
	if (spaceData.homepageId) {
		lines.push('');
		lines.push(formatHeading('Homepage Content', 2));
		if (homepageContent) {
			lines.push(homepageContent);
		} else {
			lines.push('*No homepage content available*');
		}
	}

	// Labels section
	if (spaceData.labels?.results) {
		lines.push('');
		lines.push(formatHeading('Labels', 2));

		if (spaceData.labels.results.length === 0) {
			lines.push('*No labels assigned to this space*');
		} else {
			const labelLines: string[] = [];
			spaceData.labels.results.forEach((label) => {
				const prefix = label.prefix ? `${label.prefix}:` : '';
				labelLines.push(
					`- **${prefix}${label.name}** (ID: ${label.id})`,
				);
			});

			lines.push(labelLines.join('\n'));

			if (spaceData.labels.meta?.hasMore) {
				lines.push('');
				lines.push('*More labels are available but not shown*');
			}
		}
	}

	// Links section
	lines.push('');
	lines.push(formatHeading('Links', 2));

	const links: string[] = [];
	links.push(`- **Web UI**: ${fullUrl}`);
	links.push(`- ${formatUrl(fullUrl, 'Open in Confluence')}`);

	if (spaceData.homepageId) {
		const homepageUrl = `${baseUrl}/wiki/spaces/${spaceData.key}/overview`;
		links.push(`- ${formatUrl(homepageUrl, 'View Homepage')}`);
	}

	lines.push(links.join('\n'));

	// Footer
	lines.push('');
	lines.push(formatSeparator());
	lines.push(`*Space information retrieved at ${formatDate(new Date())}*`);
	lines.push(`*To view this space in Confluence, visit: ${fullUrl}*`);

	return lines.join('\n');
}
