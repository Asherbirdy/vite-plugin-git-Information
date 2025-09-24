# vite-plugin-git-information

A Vite plugin that injects Git branch and commit information into your build, making it accessible in your application code.

## Features

- 🔧 Zero configuration setup
- 📦 Lightweight and fast
- 🌿 Provides current Git branch name
- 📝 Provides current Git hash (short)
- 🚀 Works with Vite 3.x, 4.x, and 5.x
- 💪 TypeScript support included

## Installation

```bash
npm install vite-plugin-git-information
```

## Usage

### 1. Add to Vite Config

```typescript
import { defineConfig } from 'vite'
import { vitePluginGitInformation } from 'vite-plugin-git-information'

export default defineConfig({
  plugins: [
    vitePluginGitInformation()
  ]
})
```

### 2. Use in Your Code

```typescript
import { gitBranch, githash } from 'vite-git-info'

console.log(`Running on branch: ${gitBranch}`)
console.log(`Commit: ${githash}`)

// Example: Add to your app footer
const footer = `Built from ${gitBranch}@${githash}`
// Output: "Built from main@a1b2c3d"
```

## API

The plugin exposes two variables through the `vite-git-info` virtual module:

- `gitBranch`: Current Git branch name
- `githash`: Current Git hash (short format)

## Error Handling

If Git information cannot be retrieved (e.g., not in a Git repository), the plugin will:
- Log a warning to the console
- Set both values to `'unknown'`
- Continue the build process normally

