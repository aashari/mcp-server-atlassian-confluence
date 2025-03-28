# Atlassian Confluence MCP Server

This project provides a Model Context Protocol (MCP) server that acts as a bridge between AI assistants (like Anthropic's Claude, Cursor AI, or other MCP-compatible clients) and your Atlassian Confluence instance. It allows AI to securely access and interact with your Confluence spaces and pages in real-time.

## What is MCP and Why Use This Server?

Model Context Protocol (MCP) is an open standard enabling AI models to connect securely to external tools and data sources. This server implements MCP specifically for Confluence.

**Benefits:**

- **Real-time Access:** Your AI assistant can directly access up-to-date Confluence content.
- **Eliminate Copy/Paste:** No need to manually transfer information between Confluence and your AI assistant.
- **Enhanced AI Capabilities:** Enables AI to search, summarize, analyze, and reference your Confluence documentation contextually.
- **Security:** You control access via an API token. The AI interacts through the server, and sensitive operations remain contained.

## Available Tools

This MCP server provides the following tools for your AI assistant:

- **List Spaces (`list-spaces`)**

    - **Purpose:** Discover available Confluence spaces and find their 'keys' (unique identifiers).
    - **Use When:** You need to know which spaces exist, find a space's key, or filter spaces by type/status.
    - **Conversational Example:** "Show me all the Confluence spaces."
    - **Parameter Example:** `{}` (no parameters needed for basic list) or `{ type: "global", status: "current" }` (to filter).

- **Get Space (`get-space`)**

    - **Purpose:** Retrieve detailed information about a _specific_ space using its key. Includes homepage content snippet.
    - **Use When:** You know the space key (e.g., "DEV") and need its full details, labels, or homepage overview.
    - **Conversational Example:** "Tell me about the 'DEV' space in Confluence."
    - **Parameter Example:** `{ spaceKey: "DEV" }`

- **List Pages (`list-pages`)**

    - **Purpose:** List pages within specific spaces (using numeric space IDs) or across the instance, with filtering options.
    - **Use When:** You need to find pages in a known space (requires numeric ID), filter by status, or do simple text searches on titles/labels.
    - **Conversational Example:** "Show me current pages in space ID 123456." (Use `list-spaces` first if you only know the key).
    - **Parameter Example:** `{ spaceId: ["123456"] }` or `{ status: ["archived"], query: "Meeting Notes" }`.

- **Get Page (`get-page`)**

    - **Purpose:** Retrieve the full content (in Markdown) and metadata of a _specific_ page using its numeric ID.
    - **Use When:** You know the numeric page ID (found via `list-pages` or `search`) and need to read, analyze, or summarize its content.
    - **Conversational Example:** "Get the content of Confluence page ID 12345678."
    - **Parameter Example:** `{ pageId: "12345678" }`

- **Search (`search`)**
    - **Purpose:** Perform powerful searches across Confluence content (pages, blogs, attachments) using CQL (Confluence Query Language).
    - **Use When:** You need complex searches involving multiple criteria, full-text search, or filtering by labels, dates, contributors, etc.
    - **Conversational Example:** "Search Confluence for pages labeled 'meeting-notes' created in the last week."
    - **Parameter Example:** `{ cql: "label = meeting-notes AND created > -7d" }`

## Interface Philosophy: Simple Input, Rich Output

This server follows a "Minimal Interface, Maximal Detail" approach:

1.  **Simple Tools:** Ask for only essential identifiers or filters (like `pageId`, `spaceKey`, `cql`).
2.  **Rich Details:** When you ask for a specific item (like `get-page`), the server provides all relevant information by default (content, labels, links, etc.) without needing extra flags.

## Prerequisites

- **Node.js and npm:** Ensure you have Node.js (which includes npm) installed. Download from [nodejs.org](https://nodejs.org/).
- **Atlassian Account:** An active Atlassian account with access to the Confluence instance you want to connect to.

## Quick Start Guide

Follow these steps to connect your AI assistant to Confluence:

### Step 1: Get Your Atlassian API Token

**Important:** Treat your API token like a password. Do not share it or commit it to version control.

1.  Go to your Atlassian API token management page:
    [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2.  Click **Create API token**.
3.  Give it a descriptive **Label** (e.g., `mcp-confluence-access`).
4.  Click **Create**.
5.  **Immediately copy the generated API token.** You won't be able to see it again. Store it securely.

### Step 2: Configure the Server Credentials

Choose **one** of the following methods:

#### Method A: Global MCP Config File (Recommended)

This keeps credentials separate and organized.

1.  **Create the directory** (if needed): `~/.mcp/`
2.  **Create/Edit the file:** `~/.mcp/configs.json`
3.  **Add the configuration:** Paste the following JSON structure, replacing the placeholders:

    ```json
    {
    	"@aashari/mcp-server-atlassian-confluence": {
    		"environments": {
    			"ATLASSIAN_SITE_NAME": "<YOUR_SITE_NAME>",
    			"ATLASSIAN_USER_EMAIL": "<YOUR_ATLASSIAN_EMAIL>",
    			"ATLASSIAN_API_TOKEN": "<YOUR_COPIED_API_TOKEN>"
    		}
    	}
    	// Add other servers here if needed
    }
    ```

    - `<YOUR_SITE_NAME>`: Your Confluence site name (e.g., `mycompany` for `mycompany.atlassian.net`).
    - `<YOUR_ATLASSIAN_EMAIL>`: Your Atlassian account email.
    - `<YOUR_COPIED_API_TOKEN>`: The API token from Step 1.

#### Method B: Environment Variables (Alternative)

Set environment variables when running the server.

```bash
ATLASSIAN_SITE_NAME="<YOUR_SITE_NAME>" \
ATLASSIAN_USER_EMAIL="<YOUR_EMAIL>" \
ATLASSIAN_API_TOKEN="<YOUR_API_TOKEN>" \
npx -y @aashari/mcp-server-atlassian-confluence
```

### Step 3: Connect Your AI Assistant

Configure your MCP client (Claude Desktop, Cursor, etc.) to run this server.

#### Claude Desktop

1.  Open Settings (gear icon) > Edit Config.
2.  Add or merge into `mcpServers`:

    ```json
    {
    	"mcpServers": {
    		"aashari/mcp-server-atlassian-confluence": {
    			"command": "npx",
    			"args": ["-y", "@aashari/mcp-server-atlassian-confluence"]
    		}
    		// ... other servers
    	}
    }
    ```

3.  Save and **Restart Claude Desktop**.
4.  **Verify:** Click the "Tools" (hammer) icon; Confluence tools should be listed.

#### Cursor AI

1.  Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) > **Cursor Settings > MCP**.
2.  Click **+ Add new MCP server**.
3.  Enter:
    - Name: `aashari/mcp-server-atlassian-confluence`
    - Type: `command`
    - Command: `npx -y @aashari/mcp-server-atlassian-confluence`
4.  Click **Add**.
5.  **Verify:** Wait for the indicator next to the server name to turn green.

### Step 4: Using the Tools

You can now ask your AI assistant questions related to your Confluence instance:

- "List the Confluence spaces."
- "Search Confluence using CQL: `label = meeting-notes AND created > -7d`"
- "Get the content of Confluence page ID 12345678."
- "Summarize the 'API Guidelines' page in the DEV space." (You might need to use `search` or `list-pages` first to find the page ID).

## Using as a Command-Line Tool (CLI)

You can also use this package directly from your terminal. Ensure credentials are set first (Method A or B above).

#### Quick Use with `npx`

```bash
npx -y @aashari/mcp-server-atlassian-confluence list-spaces
npx -y @aashari/mcp-server-atlassian-confluence get-page --page 123456
npx -y @aashari/mcp-server-atlassian-confluence search --cql "type=page AND text~API" --limit 10
```

#### Global Installation (Optional)

1.  `npm install -g @aashari/mcp-server-atlassian-confluence`
2.  Use the `mcp-atlassian-confluence` command:

```bash
mcp-atlassian-confluence list-spaces --limit 5
mcp-atlassian-confluence get-space --space DEV
mcp-atlassian-confluence list-pages --space-id 12345 --status archived
mcp-atlassian-confluence --help # See all commands
```

## Troubleshooting

- **Authentication Errors (401/403):**
    - Double-check your `ATLASSIAN_SITE_NAME`, `ATLASSIAN_USER_EMAIL`, and `ATLASSIAN_API_TOKEN` in `~/.mcp/configs.json` or environment variables.
    - Ensure the API token is correct, valid, and not revoked.
    - Verify your user account has permission to access the Confluence instance and relevant spaces/pages.
- **Server Not Connecting (in AI Client):**
    - Ensure the command (`npx ...`) is correct in your client's config.
    - Check Node.js/npm installation and PATH.
    - Run the `npx` command directly in your terminal for error messages.
- **Resource Not Found (404):**
    - Verify the `pageId` (must be numeric) or `spaceKey` is correct.
    - Check your permissions for the specific page or space.
- **CQL Query Errors (400):**
    - Check your CQL syntax carefully. Refer to [Confluence CQL documentation](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).
    - Ensure field names and values are valid.
- **Enable Debug Logs:** Set `DEBUG=true` environment variable (e.g., add `"DEBUG": "true"` in `configs.json` or run `DEBUG=true npx ...`).

## For Developers: Contributing

Contributions are welcome! If you'd like to contribute:

- **Architecture:** The server uses a layered approach (CLI/Tool -> Controller -> Service). See `.cursorrules` or code comments for details.
- **Setup:** Clone repo, `npm install`. Use `npm run dev:server` or `npm run dev:cli -- <command>`.
- **Code Style:** Use `npm run lint` and `npm run format`.
- **Tests:** Add tests via `npm test`.
- **Consistency:** Follow existing patterns and the "Minimal Interface, Maximal Detail" philosophy.

## Versioning Note

This project (`@aashari/mcp-server-atlassian-confluence`) follows Semantic Versioning and is versioned independently from other `@aashari/mcp-server-*` packages.

## License

[ISC](https://opensource.org/licenses/ISC)
