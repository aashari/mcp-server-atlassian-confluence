# Atlassian Confluence MCP Server

## What is MCP and Why Use It?

Model Context Protocol (MCP) is a technology that allows AI assistants like Claude to access external tools and information. Think of it as giving AI the ability to "see" and interact with your organization's systems - in this case, your Confluence spaces and pages.

**Benefits:**

- Your AI assistant can directly access real-time Confluence content
- No need to copy/paste information between tools
- AI can help search, summarize, and analyze your Confluence documentation
- Keeps sensitive information secure (the AI only sees what you share)

<a href="https://glama.ai/mcp/servers/@aashari/mcp-server-atlassian-confluence">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@aashari/mcp-server-atlassian-confluence/badge" alt="Atlassian Confluence Server MCP server" />
</a>

This MCP server connects Claude, Cursor, or other compatible AI assistants with your Confluence instance, allowing them to search content, list spaces and pages, and access detailed documentation.

## Quick Start Guide

### Step 1: Get Your Atlassian API Token

1. **Create an API token** in your Atlassian account:
    - Go to [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
    - Click "Create API token"
    - Give it a name (e.g., "MCP Connection")
    - Copy the generated token to a secure location

### Step 2: Set Up Configuration

Choose one of these methods:

#### Easy Setup: Create a Config File (Recommended)

1. Create a folder called `.mcp` in your home directory
2. Create a file called `configs.json` inside it with this content:

```json
{
	"@aashari/mcp-server-atlassian-confluence": {
		"environments": {
			"ATLASSIAN_SITE_NAME": "your-instance",
			"ATLASSIAN_USER_EMAIL": "your-email@example.com",
			"ATLASSIAN_API_TOKEN": "your_api_token"
		}
	}
}
```

Replace the values with your actual information:

- `your-instance`: Your Atlassian site name (e.g., for `example.atlassian.net`, enter `example`)
- `your-email@example.com`: Your Atlassian account email address
- `your_api_token`: The API token you created in Step 1

#### Alternative: Use Environment Variables

If you prefer, you can provide the configuration directly when running commands:

```bash
ATLASSIAN_SITE_NAME=your-instance ATLASSIAN_USER_EMAIL=your-email@example.com ATLASSIAN_API_TOKEN=your_token npx -y @aashari/mcp-server-atlassian-confluence
```

### Step 3: Connect Your AI Assistant

#### For Claude Desktop

1. Open Claude Desktop and click the **gear icon** (Settings) in the top-right
2. Click **Edit Config**
3. Add the following to your configuration file:

```json
{
	"mcpServers": {
		"aashari/mcp-server-atlassian-confluence": {
			"command": "npx",
			"args": ["-y", "@aashari/mcp-server-atlassian-confluence"]
		}
	}
}
```

4. Save and close the file
5. Restart Claude Desktop
6. Click the **hammer icon** to verify Confluence tools are listed

#### For Cursor AI

1. Open Cursor and press `CMD + SHIFT + P` (macOS) or `CTRL + SHIFT + P` (Windows/Linux)
2. Select **Cursor Settings > MCP**
3. Click **+ Add new MCP server**
4. Fill in the details:
    - **Name**: `aashari/mcp-server-atlassian-confluence`
    - **Type**: `command`
    - **Command**: `npx -y @aashari/mcp-server-atlassian-confluence`
5. Click **Add**
6. Look for a green indicator showing the server is active

### Step 4: Start Using It!

In your AI assistant, try asking:

- "List all the Confluence spaces I have access to"
- "Search Confluence for information about project X"
- "Show me the 'Getting Started' page content"
- "Find Confluence pages about API documentation"

## Available Tools

This MCP server provides the following tools:

| Tool            | Purpose                       | Example Usage                         |
| --------------- | ----------------------------- | ------------------------------------- |
| **search**      | Search across spaces with CQL | "Find pages about API documentation"  |
| **list-spaces** | View all available spaces     | "Show me all Confluence spaces"       |
| **get-space**   | Get details about a space     | "Tell me about the DEV space"         |
| **list-pages**  | View pages in a space         | "Show pages in the Engineering space" |
| **get-page**    | Get full content of a page    | "Show me the Getting Started page"    |

## Advanced Configuration

### Using Multiple MCP Servers

You can configure multiple MCP servers in your global config file (`$HOME/.mcp/configs.json`):

```json
{
	"@aashari/mcp-server-atlassian-confluence": {
		"environments": {
			"ATLASSIAN_SITE_NAME": "your-instance",
			"ATLASSIAN_USER_EMAIL": "your-email@example.com",
			"ATLASSIAN_API_TOKEN": "your_api_token"
		}
	},
	"@aashari/mcp-server-atlassian-jira": {
		"environments": {
			"ATLASSIAN_SITE_NAME": "your-instance",
			"ATLASSIAN_USER_EMAIL": "your-email@example.com",
			"ATLASSIAN_API_TOKEN": "your_api_token"
		}
	}
}
```

Then add both to your AI assistant's configuration.

### Debugging

To enable debug logging:

- Add `"DEBUG": "true"` to your environment configuration
- Or prefix commands with `DEBUG=true`

### Using as a Command-Line Tool

You can also use this as a standalone command-line tool:

```bash
# Install globally
npm install -g @aashari/mcp-server-atlassian-confluence

# Then run commands
mcp-confluence list-spaces
mcp-confluence get-page 123456789
mcp-confluence search "type=page AND text~API"
```

## For Developers: Contributing to This Project

### Project Architecture

This MCP server follows a layered architecture:

1. **CLI/Tool Layer**: End-user interfaces with minimal logic
2. **Controller Layer**: Business logic, validation, and formatting
3. **Service Layer**: API communication and data retrieval
4. **Utilities**: Shared functionality (error handling, pagination, etc.)

The flow of data is: User → CLI/Tool → Controller → Service → Atlassian API → back up the chain with responses.

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies: `npm install`
3. Run in development mode: `npm run dev:server`

### Development Scripts

- `npm run dev:server`: Run with hot reloading and debug logging
- `npm test`: Run test suite
- `npm run lint`: Check for code issues
- `npm run format`: Format code with Prettier

### Adding a New Feature

1. Implement API access in the Service layer
2. Add business logic to the Controller layer
3. Expose functionality via Tool and CLI interfaces
4. Update tests and documentation
5. Submit a pull request with a clear description

### Documentation Standards

- Use JSDoc comments for all public functions
- Follow the AI-friendly documentation format for tools
- Include examples of using your new functionality
- Update the README if adding major features

### Standard Formatting Template for Tools

When documenting new tools, follow our standard template:

```
PURPOSE: What the tool does and its main functionality

WHEN TO USE:
- Primary use case
- Secondary use cases
- When this tool is the best choice

WHEN NOT TO USE:
- When another tool would be better
- Inefficient use cases
- Performance considerations

RETURNS: Description of the output format

EXAMPLES:
- Simple example
- More complex example

ERRORS:
- Common error scenarios and how to resolve them
```

## Versioning Note

This project follows semantic versioning independently from other MCP servers in the same family (like the Jira MCP server). Version differences between these projects are expected and reflect their individual development cycles and feature implementations.

## License

[ISC](https://opensource.org/licenses/ISC)