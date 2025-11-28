# Connect AI to Your Confluence Knowledge Base

Transform how you access and interact with your team's knowledge by connecting Claude, Cursor AI, and other AI assistants directly to your Confluence spaces, pages, and documentation. Get instant answers from your knowledge base, search across all your spaces, and streamline your documentation workflow.

[![NPM Version](https://img.shields.io/npm/v/@aashari/mcp-server-atlassian-confluence)](https://www.npmjs.com/package/@aashari/mcp-server-atlassian-confluence)

## What You Can Do

- **Ask AI about your documentation**: "What's our API authentication process?"
- **Search across all spaces**: "Find all pages about security best practices"
- **Get instant answers**: "Show me the latest release notes from the Product space"
- **Access team knowledge**: "What are our HR policies for remote work?"
- **Review page comments**: "Show me the discussion on the architecture document"
- **Create and update content**: "Create a new page in the DEV space"

## Perfect For

- **Developers** who need quick access to technical documentation and API guides
- **Product Managers** searching for requirements, specs, and project updates
- **HR Teams** accessing policy documents and employee resources quickly
- **Support Teams** finding troubleshooting guides and knowledge base articles
- **Anyone** who wants to interact with Confluence using natural language

## Quick Start

Get up and running in 2 minutes:

### 1. Get Your Confluence Credentials

Generate a Confluence API Token:
1. Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**
3. Give it a name like **"AI Assistant"**
4. **Copy the generated token** immediately (you won't see it again!)

### 2. Try It Instantly

```bash
# Set your credentials
export ATLASSIAN_SITE_NAME="your-company"  # for your-company.atlassian.net
export ATLASSIAN_USER_EMAIL="your.email@company.com"
export ATLASSIAN_API_TOKEN="your_api_token"

# List your Confluence spaces
npx -y @aashari/mcp-server-atlassian-confluence get --path "/wiki/api/v2/spaces"

# Get details about a specific space
npx -y @aashari/mcp-server-atlassian-confluence get --path "/wiki/api/v2/spaces/123456"

# Get a page with JMESPath filtering
npx -y @aashari/mcp-server-atlassian-confluence get --path "/wiki/api/v2/pages/789" --jq "{id: id, title: title, status: status}"
```

## Connect to AI Assistants

### For Claude Desktop Users

Add this to your Claude configuration file (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "confluence": {
      "command": "npx",
      "args": ["-y", "@aashari/mcp-server-atlassian-confluence"],
      "env": {
        "ATLASSIAN_SITE_NAME": "your-company",
        "ATLASSIAN_USER_EMAIL": "your.email@company.com",
        "ATLASSIAN_API_TOKEN": "your_api_token"
      }
    }
  }
}
```

Restart Claude Desktop, and you'll see the confluence server in the status bar.

### For Other AI Assistants

Most AI assistants support MCP. Install the server globally:

```bash
npm install -g @aashari/mcp-server-atlassian-confluence
```

Then configure your AI assistant to use the MCP server with STDIO transport.

### Alternative: Configuration File

Create `~/.mcp/configs.json` for system-wide configuration:

```json
{
  "confluence": {
    "environments": {
      "ATLASSIAN_SITE_NAME": "your-company",
      "ATLASSIAN_USER_EMAIL": "your.email@company.com",
      "ATLASSIAN_API_TOKEN": "your_api_token"
    }
  }
}
```

**Alternative config keys:** The system also accepts `"atlassian-confluence"`, `"@aashari/mcp-server-atlassian-confluence"`, or `"mcp-server-atlassian-confluence"` instead of `"confluence"`.

## Available Tools

This MCP server provides 5 generic tools that can access any Confluence API endpoint:

| Tool | Description |
|------|-------------|
| `conf_get` | GET any Confluence API endpoint (read data) |
| `conf_post` | POST to any endpoint (create resources) |
| `conf_put` | PUT to any endpoint (replace resources) |
| `conf_patch` | PATCH any endpoint (partial updates) |
| `conf_delete` | DELETE any endpoint (remove resources) |

### Common API Paths

**Spaces:**
- `/wiki/api/v2/spaces` - List all spaces
- `/wiki/api/v2/spaces/{id}` - Get space details

**Pages:**
- `/wiki/api/v2/pages` - List pages (use `space-id` query param to filter)
- `/wiki/api/v2/pages/{id}` - Get page details
- `/wiki/api/v2/pages/{id}/body` - Get page body (use `body-format` param)
- `/wiki/api/v2/pages/{id}/children` - Get child pages
- `/wiki/api/v2/pages/{id}/labels` - Get page labels

**Comments:**
- `/wiki/api/v2/pages/{id}/footer-comments` - List/add footer comments
- `/wiki/api/v2/pages/{id}/inline-comments` - List/add inline comments
- `/wiki/api/v2/footer-comments/{comment-id}` - Get/update/delete comment

**Blog Posts:**
- `/wiki/api/v2/blogposts` - List blog posts
- `/wiki/api/v2/blogposts/{id}` - Get blog post

**Search:**
- `/wiki/rest/api/search` - Search content (use `cql` query param)

### JMESPath Filtering

All tools support optional JMESPath (`jq`) filtering to extract specific data:

```bash
# Get just space names and keys
npx -y @aashari/mcp-server-atlassian-confluence get \
  --path "/wiki/api/v2/spaces" \
  --jq "results[].{id: id, key: key, name: name}"

# Get page title and status
npx -y @aashari/mcp-server-atlassian-confluence get \
  --path "/wiki/api/v2/pages/123456" \
  --jq "{id: id, title: title, status: status}"
```

## Real-World Examples

### Explore Your Knowledge Base

Ask your AI assistant:
- *"List all the spaces in our Confluence"*
- *"Show me details about the Engineering space"*
- *"What pages are in our Product space?"*
- *"Find the latest pages in the Marketing space"*

### Search and Find Information

Ask your AI assistant:
- *"Search for pages about API authentication"*
- *"Find all documentation with 'security' in the title"*
- *"Show me pages labeled with 'getting-started'"*
- *"Search for content in the DEV space about deployment"*

### Access Specific Content

Ask your AI assistant:
- *"Get the content of the API Authentication Guide page"*
- *"Show me the onboarding checklist document"*
- *"What's in our security policies page?"*
- *"Display the latest release notes"*

### Create and Update Content

Ask your AI assistant:
- *"Create a new page in the DEV space titled 'API Guide'"*
- *"Add a comment to the architecture document"*
- *"Update the page content with the new release info"*

## CLI Commands

The CLI mirrors the MCP tools for direct terminal access:

```bash
# GET request
npx -y @aashari/mcp-server-atlassian-confluence get --path "/wiki/api/v2/spaces"

# GET with query parameters
npx -y @aashari/mcp-server-atlassian-confluence get \
  --path "/wiki/api/v2/pages" \
  --query-params '{"space-id": "123456", "limit": "10"}'

# POST request (create a page)
npx -y @aashari/mcp-server-atlassian-confluence post \
  --path "/wiki/api/v2/pages" \
  --body '{"spaceId": "123456", "status": "current", "title": "New Page", "body": {"representation": "storage", "value": "<p>Content here</p>"}}'

# POST request (add a comment)
npx -y @aashari/mcp-server-atlassian-confluence post \
  --path "/wiki/api/v2/pages/789/footer-comments" \
  --body '{"body": {"representation": "storage", "value": "<p>My comment</p>"}}'

# PUT request (update page - requires version increment)
npx -y @aashari/mcp-server-atlassian-confluence put \
  --path "/wiki/api/v2/pages/789" \
  --body '{"id": "789", "status": "current", "title": "Updated Title", "spaceId": "123456", "body": {"representation": "storage", "value": "<p>Updated content</p>"}, "version": {"number": 2}}'

# DELETE request
npx -y @aashari/mcp-server-atlassian-confluence delete \
  --path "/wiki/api/v2/pages/789"
```

## Troubleshooting

### "Authentication failed" or "403 Forbidden"

1. **Check your API Token permissions**:
   - Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
   - Make sure your token is still active and hasn't expired

2. **Verify your site name format**:
   - If your Confluence URL is `https://mycompany.atlassian.net`
   - Your site name should be just `mycompany`

3. **Test your credentials**:
   ```bash
   npx -y @aashari/mcp-server-atlassian-confluence get --path "/wiki/api/v2/spaces?limit=1"
   ```

### "Resource not found" or "404"

1. **Check the API path**:
   - Paths are case-sensitive
   - Use numeric IDs for spaces and pages (not keys)
   - Verify the resource exists in your browser

2. **Verify access permissions**:
   - Make sure you have access to the space/page in your browser
   - Some content may be restricted to certain users

### "No results found" when searching

1. **Try different search terms**:
   - Use CQL syntax for advanced searches
   - Try broader search criteria

2. **Check CQL syntax**:
   - Validate your CQL in Confluence's advanced search first

### Claude Desktop Integration Issues

1. **Restart Claude Desktop** after updating the config file
2. **Verify config file location**:
   - macOS: `~/.claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Getting Help

If you're still having issues:
1. Run a simple test command to verify everything works
2. Check the [GitHub Issues](https://github.com/aashari/mcp-server-atlassian-confluence/issues) for similar problems
3. Create a new issue with your error message and setup details

## Frequently Asked Questions

### What permissions do I need?

Your Atlassian account needs:
- **Access to Confluence** with the appropriate permissions for the spaces you want to query
- **API token** with appropriate permissions (automatically granted when you create one)

### Can I use this with Confluence Server (on-premise)?

Currently, this tool only supports **Confluence Cloud**. Confluence Server/Data Center support may be added in future versions.

### How do I find my site name?

Your site name is the first part of your Confluence URL:
- URL: `https://mycompany.atlassian.net` -> Site name: `mycompany`
- URL: `https://acme-corp.atlassian.net` -> Site name: `acme-corp`

### What AI assistants does this work with?

Any AI assistant that supports the Model Context Protocol (MCP):
- Claude Desktop
- Cursor AI
- Continue.dev
- Many others

### Is my data secure?

Yes! This tool:
- Runs entirely on your local machine
- Uses your own Confluence credentials
- Never sends your data to third parties
- Only accesses what you give it permission to access

### Can I search across all my spaces at once?

Yes! Use CQL queries for cross-space searches. For example:
```bash
npx -y @aashari/mcp-server-atlassian-confluence get \
  --path "/wiki/rest/api/search" \
  --query-params '{"cql": "type=page AND text~\"API documentation\""}'
```

## Migration from v2.x

Version 3.0 replaces 8+ specific tools with 5 generic HTTP method tools. If you're upgrading from v2.x:

**Before (v2.x):**
```
conf_ls_spaces, conf_get_space, conf_ls_pages, conf_get_page,
conf_search, conf_ls_comments, conf_add_comment, ...
```

**After (v3.0):**
```
conf_get, conf_post, conf_put, conf_patch, conf_delete
```

**Migration examples:**
- `conf_ls_spaces` -> `conf_get` with path `/wiki/api/v2/spaces`
- `conf_get_space` -> `conf_get` with path `/wiki/api/v2/spaces/{id}`
- `conf_ls_pages` -> `conf_get` with path `/wiki/api/v2/pages?space-id={id}`
- `conf_get_page` -> `conf_get` with path `/wiki/api/v2/pages/{id}`
- `conf_search` -> `conf_get` with path `/wiki/rest/api/search?cql=...`
- `conf_add_comment` -> `conf_post` with path `/wiki/api/v2/pages/{id}/footer-comments`

## Support

Need help? Here's how to get assistance:

1. **Check the troubleshooting section above** - most common issues are covered there
2. **Visit our GitHub repository** for documentation and examples: [github.com/aashari/mcp-server-atlassian-confluence](https://github.com/aashari/mcp-server-atlassian-confluence)
3. **Report issues** at [GitHub Issues](https://github.com/aashari/mcp-server-atlassian-confluence/issues)
4. **Start a discussion** for feature requests or general questions

---

*Made with care for teams who want to bring AI into their knowledge management workflow.*
