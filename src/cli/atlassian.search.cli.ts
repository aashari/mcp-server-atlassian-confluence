import { Command } from 'commander';
import { Logger } from '../utils/logger.util.js';
import { handleCliError } from '../utils/error.util.js';
import atlassianSearchController from '../controllers/atlassian.search.controller.js';
import { SearchToolArgsType } from '../tools/atlassian.search.types.js';

/**
 * CLI module for searching Confluence content.
 * Provides commands for searching Confluence content using Confluence Query Language (CQL).
 * All commands require valid Atlassian credentials.
 */

/**
 * Register Confluence Search CLI commands with the Commander program
 * @param program - The Commander program instance to register commands with
 * @throws Error if command registration fails
 */
function register(program: Command): void {
	const cliLogger = Logger.forContext(
		'cli/atlassian.search.cli.ts',
		'register',
	);
	cliLogger.debug('Registering Confluence Search CLI commands...');

	registerSearchCommand(program);

	cliLogger.debug('CLI commands registered successfully');
}

/**
 * Register the command for searching Confluence content
 * @param program - The Commander program instance
 */
function registerSearchCommand(program: Command): void {
	program
		.command('search')
		.description(
			'Search Confluence content using CQL (Confluence Query Language), with pagination.',
		)
		.option(
			'-l, --limit <number>',
			'Maximum number of items to return (1-100). Use this to control the response size. Useful for pagination or when you only need a few results. The Confluence search API caps results at 100 items per request.',
			'25',
		)
		.option(
			'-c, --cursor <string>',
			'Pagination cursor for retrieving the next set of results. Use this to navigate through large result sets. Obtain this opaque string from the pagination information included at the end of the previous response. Confluence uses cursor-based pagination rather than offset-based pagination.',
		)
		.option(
			'-q, --cql <cql>',
			'Full CQL query for advanced filtering. If provided, this forms the base of the search and other filter options (--title, --space-key, etc.) will be ANDed with it. Example: `space = "DOCS" AND label = "release-notes"`.',
		)
		.option(
			'-t, --title <text>',
			'Filter results to content where the title contains this text (case-insensitive search). If --cql is also provided, this will be ANDed with it. Otherwise, it will be used to build the CQL as `title ~ "YOUR_TITLE"`.',
		)
		.option(
			'-k, --space-key <key>',
			'Filter results to content within a specific space key. If --cql is also provided, this will be ANDed with it. Otherwise, it will be used to build the CQL as `space = "YOUR_SPACE"`.',
		)
		.option(
			'--label <labels...>',
			'Filter results to content tagged with ALL of these labels (repeatable option). If --cql is also provided, this will be ANDed with it. Otherwise, it will be used to build the CQL with multiple label conditions.',
		)
		.option(
			'--type <type>',
			'Filter results by content type. Choose either "page" or "blogpost". If --cql is also provided, this will be ANDed with it. Otherwise, it will be used to build the CQL as `type = "YOUR_TYPE"`.',
			(value) => {
				if (!['page', 'blogpost'].includes(value)) {
					throw new Error('Type must be either "page" or "blogpost"');
				}
				return value;
			},
		)
		.option(
			'-s, --query <text>',
			'Simple text search query. This will search for the given text within content body, title, and comments. Translates to CQL: `text ~ "YOUR_QUERY"`. If both --query and --cql are provided, they will be combined with AND.',
		)
		.action(async (options) => {
			const actionLogger = Logger.forContext(
				'cli/atlassian.search.cli.ts',
				'search',
			);
			try {
				actionLogger.debug('Processing command options:', options);

				// Validate limit if provided
				if (options.limit) {
					const limit = parseInt(options.limit, 10);
					if (isNaN(limit) || limit <= 0) {
						throw new Error(
							'Invalid --limit value: Must be a positive integer.',
						);
					}
				}

				const searchOptions: SearchToolArgsType = {
					...(options.cql && { cql: options.cql }),
					...(options.title && { title: options.title }),
					...(options.spaceKey && { spaceKey: options.spaceKey }),
					...(options.label && { labels: options.label }),
					...(options.type && {
						contentType: options.type as 'page' | 'blogpost',
					}),
					...(options.limit && {
						limit: parseInt(options.limit, 10),
					}),
					...(options.cursor && { cursor: options.cursor }),
					...(options.query && { query: options.query }),
				};

				actionLogger.debug(
					'Executing search with options:',
					searchOptions,
				);

				const result =
					await atlassianSearchController.search(searchOptions);

				actionLogger.debug('Successfully received search results');

				// Print the main content (which now includes executed CQL and pagination information)
				console.log(result.content);
			} catch (error) {
				actionLogger.error('Operation failed:', error);
				handleCliError(error);
			}
		});
}

export default { register };
