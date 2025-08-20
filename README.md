# Connect AI to Your Confluence Knowledge Base

Transform how you access and interact with your team's knowledge by connecting Claude, Cursor AI, and other AI assistants directly to your Confluence spaces, pages, and documentation. Get instant answers from your knowledge base, search across all your spaces, and streamline your documentation workflow.

[![NPM Version](https://img.shields.io/npm/v/@aashari/mcp-server-atlassian-confluence)](https://www.npmjs.com/package/@aashari/mcp-server-atlassian-confluence)

[![Trust Score](https://archestra.ai/mcp-catalog/api/badge/quality/aashari/mcp-server-atlassian-confluence)](https://archestra.ai/mcp-catalog/aashari__mcp-server-atlassian-confluence)

## What You Can Do

✅ **Ask AI about your documentation**: *"What's our API authentication process?"*  
✅ **Search across all spaces**: *"Find all pages about security best practices"*  
✅ **Get instant answers**: *"Show me the latest release notes from the Product space"*  
✅ **Access team knowledge**: *"What are our HR policies for remote work?"*  
✅ **Review page comments**: *"Show me the discussion on the architecture document"*  
✅ **Find specific content**: *"Search for pages with 'onboarding' in the title"*  

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
export ATLASSIAN_API_TOKEN="your_copied_token"

# List your Confluence spaces
npx -y @aashari/mcp-server-atlassian-confluence ls-spaces

# Get details about a specific space
npx -y @aashari/mcp-server-atlassian-confluence get-space --space-key DEV

# Search for pages
npx -y @aashari/mcp-server-atlassian-confluence search --query "API documentation"
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

Restart Claude Desktop, and you'll see "🔗 confluence" in the status bar.

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

## Real-World Examples

### 📚 Explore Your Knowledge Base

Ask your AI assistant:
- *"List all the spaces in our Confluence"*
- *"Show me details about the Engineering space"*  
- *"What pages are in our Product space?"*
- *"Find the latest pages in the Marketing space"*

### 🔍 Search and Find Information

Ask your AI assistant:
- *"Search for pages about API authentication"*
- *"Find all documentation with 'security' in the title"*
- *"Show me pages labeled with 'getting-started'"*
- *"Search for content in the DEV space about deployment"*

### 📄 Access Specific Content

Ask your AI assistant:
- *"Get the content of the API Authentication Guide page"*
- *"Show me the onboarding checklist document"*
- *"What's in our security policies page?"*
- *"Display the latest release notes"*

### 💬 Review Discussions

Ask your AI assistant:
- *"Show me comments on the architecture design document"*
- *"What feedback was left on the new feature proposal?"*
- *"Display discussion on the API changes page"*

### 🎯 Advanced Searches

Ask your AI assistant:
- *"Find all pages created by John in the last month"*
- *"Show me archived pages in the Product space"*
- *"Search for pages with both 'API' and 'tutorial' labels"*
- *"Find documentation updated in the last week"*

## Troubleshooting

### "Authentication failed" or "403 Forbidden"

1. **Check your API Token permissions**:
   - Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
   - Make sure your token is still active and has the right permissions

2. **Verify your site name**:
   ```bash
   # Test your credentials work
   npx -y @aashari/mcp-server-atlassian-confluence ls-spaces
   ```

3. **Check your site name format**:
   - If your Confluence URL is `https://mycompany.atlassian.net`
   - Your site name should be just `mycompany`

### "Space not found" or "Page not found"

1. **Check space key spelling**:
   ```bash
   # List your spaces to see the correct keys
   npx -y @aashari/mcp-server-atlassian-confluence ls-spaces
   ```

2. **Verify access permissions**:
   - Make sure you have access to the space in your browser
   - Some spaces may be restricted to certain users

### "No results found" when searching

1. **Try broader search terms**:
   - Use single keywords instead of full phrases
   - Try different variations of your search terms

2. **Check space permissions**:
   - You can only search content you have permission to view
   - Ask your admin if you should have access to specific spaces

### Claude Desktop Integration Issues

1. **Restart Claude Desktop** after updating the config file
2. **Check the status bar** for the "🔗 confluence" indicator
3. **Verify config file location**:
   - macOS: `~/.claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

### Getting Help

If you're still having issues:
1. Run a simple test command to verify everything works
2. Check the [GitHub Issues](https://github.com/aashari/mcp-server-atlassian-confluence/issues) for similar problems
3. Create a new issue with your error message and setup details

## Frequently Asked Questions

### What permissions do I need?

Your Atlassian account needs:
- **Read access** to the Confluence spaces you want to search
- **API token** with appropriate permissions (automatically granted when you create one)

### Can I use this with Confluence Server (on-premise)?

Currently, this tool only supports **Confluence Cloud**. Confluence Server support may be added in future versions.

### How do I find my site name?

Your site name is the first part of your Confluence URL:
- URL: `https://mycompany.atlassian.net` → Site name: `mycompany`
- URL: `https://acme-corp.atlassian.net` → Site name: `acme-corp`

### What AI assistants does this work with?

Any AI assistant that supports the Model Context Protocol (MCP):
- Claude Desktop (most popular)
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

Yes! When you don't specify a space, searches will look across all spaces you have access to.

## Support

Need help? Here's how to get assistance:

1. **Check the troubleshooting section above** - most common issues are covered there
2. **Visit our GitHub repository** for documentation and examples: [github.com/aashari/mcp-server-atlassian-confluence](https://github.com/aashari/mcp-server-atlassian-confluence)
3. **Report issues** at [GitHub Issues](https://github.com/aashari/mcp-server-atlassian-confluence/issues)
4. **Start a discussion** for feature requests or general questions

---

*Made with ❤️ for teams who want to bring AI into their knowledge management workflow.*
