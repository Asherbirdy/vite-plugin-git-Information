import { execSync } from 'child_process';

export interface GitInfo {
  gitBranch: string
  gitCommit: string
}

export function vitePluginGitInformation () {
  let gitInfo: GitInfo;

  return {
    name: 'vite-plugin-git-information',
    buildStart () {
      try {
        const gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        const gitCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();

        gitInfo = {
          gitBranch,
          gitCommit,
        };
      } catch (error) {
        console.warn('Failed to get git info:', error);
        gitInfo = {
          gitBranch: 'unknown',
          gitCommit: 'unknown',
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
export const gitCommit = ${JSON.stringify(gitInfo.gitCommit)};`;
      }
    },
  };
}
