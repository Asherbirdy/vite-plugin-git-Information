# vite-plugin-git-information

A Vite plugin that injects Git branch and commit information into your build, making it accessible in your application code. Perfect for displaying version information in console logs or UI to track what's running in production.

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
import { gitBranch, gitHash } from 'vite-git-info'

// 在 console 顯示版本資訊，方便除錯
console.log(`🌿 Branch: ${gitBranch}`)
console.log(`📝 Commit: ${gitHash}`)
console.log(`🚀 Build: ${gitBranch}@${gitHash}`)

// 在介面上顯示版本資訊
const versionInfo = `v${gitBranch}-${gitHash}`
document.querySelector('#version')?.textContent = versionInfo

// 或加到頁面 footer
const footer = `Built from ${gitBranch}@${gitHash}`
// Output: "Built from main@a1b2c3d"
```

### 3. TypeScript Projects

If you're using TypeScript and encounter the error:
```
Cannot find module 'vite-git-info' or its corresponding type declarations
```

Add the following type declaration to your `vite-env.d.ts` file (or create one if it doesn't exist):

```typescript
declare module 'vite-git-info' {
  export const gitBranch: string;
  export const gitHash: string;
}
```

## API

The plugin exposes two variables through the `vite-git-info` virtual module:

- `gitBranch`: Current Git branch name
- `gitHash`: Current Git hash (short format)

## Error Handling

If Git information cannot be retrieved (e.g., not in a Git repository), the plugin will:
- Log a warning to the console
- Set both values to `'unknown'`
- Continue the build process normally

