import { execSync } from 'child_process';

export interface GitInfo {
  gitBranch: string
  githash: string
}

export function vitePluginGitInformation () {
  let gitInfo: GitInfo;

  return {
    name: 'vite-plugin-git-information',
    buildStart () {
      try {
        const gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        const githash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();

        gitInfo = {
          gitBranch,
          githash,
        };
      } catch (error) {
        console.warn('Failed to get git info:', error);
        gitInfo = {
          gitBranch: 'unknown',
          githash: 'unknown',
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
export const githash = ${JSON.stringify(gitInfo.githash)};`;
      }
    },
  };
}
