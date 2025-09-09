import fs from 'fs';
import path from 'path';
import { Logger } from './logger.util.js';
import dotenv from 'dotenv';
import os from 'os';

/**
 * Configuration loader that handles multiple sources with priority:
 * 1. Direct ENV pass (process.env)
 * 2. .env file in project root
 * 3. Global config file at $HOME/.mcp/configs.json
 */
class ConfigLoader {
	private packageName: string;
	private configLoaded: boolean = false;

	/**
	 * Create a new ConfigLoader instance
	 * @param packageName The package name to use for global config lookup
	 */
	constructor(packageName: string) {
		this.packageName = packageName;
	}

	/**
	 * Load configuration from all sources with proper priority
	 */
	load(): void {
		const loadLogger = Logger.forContext('utils/config.util.ts', 'load');

		if (this.configLoaded) {
			loadLogger.debug('Configuration already loaded, skipping');
			return;
		}

		loadLogger.debug('Loading configuration...');

		// Priority 3: Load from global config file
		this.loadFromGlobalConfig();

		// Priority 2: Load from .env file
		this.loadFromEnvFile();

		// Priority 1: Direct ENV pass is already in process.env
		// No need to do anything as it already has highest priority

		this.configLoaded = true;
		loadLogger.debug('Configuration loaded successfully');
	}

	/**
	 * Load configuration from .env file in project root
	 */
	private loadFromEnvFile(): void {
		const envLogger = Logger.forContext(
			'utils/config.util.ts',
			'loadFromEnvFile',
		);

		try {
			// Use quiet mode to prevent dotenv from outputting to STDIO
			// which interferes with MCP's JSON-RPC communication
			const result = dotenv.config({ quiet: true });
			if (result.error) {
				envLogger.debug('No .env file found or error reading it');
				return;
			}
			envLogger.debug('Loaded configuration from .env file');
		} catch (error) {
			envLogger.error('Error loading .env file', error);
		}
	}

	/**
	 * Load configuration from global config file at $HOME/.mcp/configs.json
	 */
	private loadFromGlobalConfig(): void {
		const globalLogger = Logger.forContext(
			'utils/config.util.ts',
			'loadFromGlobalConfig',
		);

		try {
			const homedir = os.homedir();
			const globalConfigPath = path.join(homedir, '.mcp', 'configs.json');

			if (!fs.existsSync(globalConfigPath)) {
				globalLogger.debug('Global config file not found');
				return;
			}

			const configContent = fs.readFileSync(globalConfigPath, 'utf8');
			const config = JSON.parse(configContent);

			// Determine the potential keys for the current package
			const shortKey = 'confluence'; // Project-specific short key
			const atlassianProductKey = 'atlassian-confluence'; // New supported key
			const fullPackageName = this.packageName; // e.g., '@aashari/mcp-server-atlassian-confluence'
			const unscopedPackageName =
				fullPackageName.split('/')[1] || fullPackageName; // e.g., 'mcp-server-atlassian-confluence'

			// Define the prioritized order of keys to check
			const potentialKeys = [
				shortKey,
				atlassianProductKey,
				fullPackageName,
				unscopedPackageName,
			];
			let foundConfigSection: {
				environments?: Record<string, unknown>;
			} | null = null;
			let usedKey: string | null = null;

			for (const key of potentialKeys) {
				if (
					config[key] &&
					typeof config[key] === 'object' &&
					config[key].environments
				) {
					foundConfigSection = config[key];
					usedKey = key;
					globalLogger.debug(`Found configuration using key: ${key}`);
					break; // Stop once found
				}
			}

			if (!foundConfigSection || !foundConfigSection.environments) {
				globalLogger.debug(
					`No configuration found for ${
						this.packageName
					} using keys: ${potentialKeys.join(', ')}`,
				);
				return;
			}

			const environments = foundConfigSection.environments;
			for (const [key, value] of Object.entries(environments)) {
				// Only set if not already defined in process.env
				if (process.env[key] === undefined) {
					process.env[key] = String(value);
				}
			}

			globalLogger.debug(
				`Loaded configuration from global config file using key: ${usedKey}`,
			);
		} catch (error) {
			globalLogger.error('Error loading global config file', error);
		}
	}

	/**
	 * Get a configuration value
	 * @param key The configuration key
	 * @param defaultValue The default value if the key is not found
	 * @returns The configuration value or the default value
	 */
	get(key: string, defaultValue?: string): string | undefined {
		return process.env[key] || defaultValue;
	}

	/**
	 * Get a boolean configuration value
	 * @param key The configuration key
	 * @param defaultValue The default value if the key is not found
	 * @returns The boolean configuration value or the default value
	 */
	getBoolean(key: string, defaultValue: boolean = false): boolean {
		const value = this.get(key);
		if (value === undefined) {
			return defaultValue;
		}
		return value.toLowerCase() === 'true';
	}
}

// Create and export a singleton instance with the package name from package.json
export const config = new ConfigLoader(
	'@aashari/mcp-server-atlassian-confluence',
);
