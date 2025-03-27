#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Logger } from './utils/logger.util.js';
import { config } from './utils/config.util.js';
import { createUnexpectedError } from './utils/error.util.js';
import { runCli } from './cli/index.js';

// Import Confluence-specific tools
import atlassianSpacesTools from './tools/atlassian.spaces.tool.js';
import atlassianPagesTools from './tools/atlassian.pages.tool.js';
import atlassianSearchTools from './tools/atlassian.search.tool.js';

// Define version constant for easier management and consistent versioning
const VERSION = '1.12.1';

// Create a contextualized logger for this file
const indexLogger = Logger.forContext('index.ts');

let serverInstance: McpServer | null = null;
let transportInstance: SSEServerTransport | StdioServerTransport | null = null;

export async function startServer(mode: 'stdio' | 'sse' = 'stdio') {
	// Load configuration
	indexLogger.info('Starting MCP server initialization...');
	config.load();
	indexLogger.info('Configuration loaded successfully');

	// Enable debug logging if DEBUG is set to true
	if (config.getBoolean('DEBUG')) {
		indexLogger.debug('Debug mode enabled');
	}

	// Log debug configuration settings at debug level
	indexLogger.debug(`DEBUG environment variable: ${process.env.DEBUG}`);
	indexLogger.debug(
		`ATLASSIAN_API_TOKEN exists: ${Boolean(process.env.ATLASSIAN_API_TOKEN)}`,
	);
	indexLogger.debug(`Config DEBUG value: ${config.get('DEBUG')}`);

	indexLogger.info(`Initializing Confluence MCP server v${VERSION}`);
	serverInstance = new McpServer({
		name: '@aashari/mcp-atlassian-confluence',
		version: VERSION,
	});

	if (mode === 'stdio') {
		indexLogger.info('Using STDIO transport for MCP communication');
		transportInstance = new StdioServerTransport();
	} else {
		throw createUnexpectedError('SSE mode is not supported yet');
	}

	// Register tools
	indexLogger.info('Registering MCP tools...');
	atlassianSpacesTools.register(serverInstance);
	indexLogger.debug('Spaces tools registered');

	atlassianPagesTools.register(serverInstance);
	indexLogger.debug('Pages tools registered');

	atlassianSearchTools.register(serverInstance);
	indexLogger.debug('Search tools registered');

	indexLogger.info('All tools registered successfully');

	try {
		indexLogger.info(`Connecting to ${mode.toUpperCase()} transport...`);
		await serverInstance.connect(transportInstance);
		indexLogger.info(
			'MCP server started successfully and ready to process requests',
		);
		return serverInstance;
	} catch (err) {
		indexLogger.error(`Failed to start server`, err);
		process.exit(1);
	}
}

// Main entry point - this will run when executed directly
async function main() {
	// Load configuration
	config.load();

	// Check if arguments are provided (CLI mode)
	if (process.argv.length > 2) {
		// CLI mode: Pass arguments to CLI runner
		indexLogger.info('Starting in CLI mode');
		await runCli(process.argv.slice(2));
		indexLogger.info('CLI execution completed');
	} else {
		// MCP Server mode: Start server with default STDIO
		indexLogger.info('Starting in server mode');
		await startServer();
		indexLogger.info('Server is now running');
	}
}

// If this file is being executed directly (not imported), run the main function
if (require.main === module) {
	main().catch((err) => {
		indexLogger.error('Unhandled error in main process', err);
		process.exit(1);
	});
}

// Export key utilities for library users
export { Logger } from './utils/logger.util.js';
export { config };
export * from './utils/error.util.js';
