import { Command } from 'commander';
import { Logger } from '../utils/logger.util.js';

import atlassianSpacesCli from './atlassian.spaces.cli.js';
import atlassianPagesCli from './atlassian.pages.cli.js';
import atlassianSearchCli from './atlassian.search.cli.js';

// Get the version from package.json
const VERSION = '1.12.1'; // This should match the version in src/index.ts
const NAME = '@aashari/mcp-atlassian-confluence';
const DESCRIPTION =
	'A Model Context Protocol (MCP) server for Atlassian Confluence integration';

// Create a contextualized logger for this file
const cliLogger = Logger.forContext('cli/index.ts');

export async function runCli(args: string[]) {
	cliLogger.info(`Starting Confluence CLI v${VERSION}`);

	const program = new Command();
	program.name(NAME).description(DESCRIPTION).version(VERSION);

	// Register CLI commands
	cliLogger.debug('Registering CLI commands...');
	atlassianSpacesCli.register(program);
	atlassianPagesCli.register(program);
	atlassianSearchCli.register(program);
	cliLogger.debug('All CLI commands registered successfully');

	// Handle unknown commands
	program.on('command:*', (operands) => {
		cliLogger.error(`Unknown command: ${operands[0]}`);
		console.log('');
		program.help();
		process.exit(1);
	});

	cliLogger.info(`Executing command: ${args.join(' ')}`);

	// Parse arguments; default to help if no command provided
	await program.parseAsync(args.length ? args : ['--help'], { from: 'user' });

	cliLogger.info('CLI command execution completed');
}
