import { execSync } from 'child_process';

export interface GitInfo {
  gitBranch: string
  gitHash: string
}

export function vitePluginGitInformation () {
  let gitInfo: GitInfo;

  return {
    name: 'vite-plugin-git-information',
    buildStart () {
      try {
        const gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        const gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();

        gitInfo = {
          gitBranch,
          gitHash,
        };
      } catch (error) {
        console.warn('Failed to get git info:', error);
        gitInfo = {
          gitBranch: 'unknown',
          gitHash: 'unknown',
        };
      }
    },
    resolveId (id: string) {
      if (id === 'vite-git-info') {
        return id;
      }
    },
    load (id: string) {
      if (id === 'vite-git-info') {
        return `export const gitBranch = ${JSON.stringify(gitInfo.gitBranch)};
export const gitHash = ${JSON.stringify(gitInfo.gitHash)};`;
      }
    },
  };
}
