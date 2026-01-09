(() => {
  const ASSETS = [
    { type: 'style', path: 'style.css' },
    { type: 'script', path: 'app.js' }
  ];

  (async () => {
    const params = new URLSearchParams(window.location.search);
    const branchOverride = params.get('assets') || params.get('assetBranch') || params.get('branch') || params.get('code_branch');
    const forceLocal = ['1', 'true', 'local'].includes((params.get('localAssets') || '').toLowerCase());
    const localPath = params.get('localPath') || params.get('path');
    const preferLocal = forceLocal || isLocalHost();
    const repoFromHost = detectRepoFromLocation();
    const repoConfig = (await loadRepoConfig()) || {};

    const assetsBranch = branchOverride
      || window.RUNTIME_ASSET_BRANCH
      || repoConfig.codeBranch
      || repoConfig.pageBranch;

    const repo = (() => {
      if (repoFromHost && (repoConfig.owner || repoConfig.repo)) {
        // Prefer canonical casing from config when available
        return {
          owner: repoConfig.owner || repoFromHost.owner,
          repo: repoConfig.repo || repoFromHost.repo
        };
      }
      if (repoConfig.owner && repoConfig.repo) {
        return { owner: repoConfig.owner, repo: repoConfig.repo };
      }
      return repoFromHost;
    })();

    // Use Codeberg Pages URL format for correct MIME types and CORS
    const remoteBase = (!preferLocal && assetsBranch && repo)
      ? `https://${encodeURIComponent(repo.owner)}.codeberg.page/${encodeURIComponent(repo.repo)}/@${encodeURIComponent(assetsBranch)}/`
      : null;

    // For local, try to construct path to checked out branch directory
    const localBranchPath = (preferLocal && assetsBranch && !localPath) 
      ? `../${assetsBranch}/` 
      : null;

    if (!repo && !preferLocal) {
      renderErrorMessage({ owner: 'unknown', repo: 'unknown' }, assetsBranch || 'unknown');
      console.log('[loader] Config loaded:', { repo, assetsBranch, remoteBase, preferLocal });
      return;
    }

    try {
      await initLoader({ preferLocal, remoteBase, localPath: localPath || localBranchPath, repo, assetsBranch });
    } catch {
      renderErrorMessage(repo || { owner: 'unknown', repo: 'unknown' }, assetsBranch || 'unknown');
    }
  })();

  async function initLoader({ preferLocal, remoteBase, localPath, repo, assetsBranch }) {
    if (!preferLocal && remoteBase) {
      const loaded = await loadAssetSet(remoteBase);
      if (loaded) return;
      console.warn(`Remote assets failed for ${remoteBase}; attempting local files.`);
    }

    const localBase = localPath ? (localPath.endsWith('/') ? localPath : localPath + '/') : '';
    const localLoaded = await loadAssetSet(localBase);
    if (!localLoaded) {
      renderErrorMessageFromBase(remoteBase, repo, assetsBranch);
    }
  }

  function detectRepoFromLocation() {
    const host = (window.location.hostname || '').toLowerCase();
    const rawHost = window.location.hostname || '';
    const pathSegments = window.location.pathname
      .split('/')
      .filter(Boolean)
      .map(segment => decodeURIComponent(segment).trim())
      .filter(Boolean);
    const firstSegment = pathSegments[0];
    const hasCustomRepo = firstSegment && !firstSegment.toLowerCase().startsWith('index.');

    if (host.endsWith('.codeberg.page')) {
      const ownerFromSubdomain = rawHost.split('.')[0];
      if (ownerFromSubdomain) {
        return {
          owner: ownerFromSubdomain,
          repo: hasCustomRepo ? firstSegment : 'pages'
        };
      }
    }

    if (host === 'codeberg.org' && pathSegments.length >= 2) {
      return {
        owner: pathSegments[0],
        repo: pathSegments[1]
      };
    }

    if (host.endsWith('.codeberg.org')) {
      const parts = rawHost.split('.');
      if (parts.length >= 3) {
        const owner = parts[parts.length - 3];
        if (owner) {
          return {
            owner,
            repo: hasCustomRepo ? firstSegment : 'pages'
          };
        }
      }
    }

    return null;
  }

  async function loadRepoConfig() {
    if (typeof fetch !== 'function') return null;
    try {
      const response = await fetch('codeberg-repo.json', { cache: 'no-store' });
      if (!response.ok) return null;
      const data = await response.json();
      if (!data || !data.owner || !data.repo) return null;
      const normalized = {
        owner: String(data.owner).trim(),
        repo: String(data.repo).trim()
      };
      if (data.page_branch || data.branch) normalized.pageBranch = String(data.page_branch || data.branch).trim();
      if (data.code_branch) normalized.codeBranch = String(data.code_branch).trim();
      return normalized;
    } catch {
      return null;
    }
  }

  function isLocalHost() {
    return ['localhost', '127.0.0.1', ''].includes(window.location.hostname) || window.location.protocol === 'file:';
  }

  async function loadAssetSet(base) {
    for (const asset of ASSETS) {
      const ok = await loadAsset(base + asset.path, asset.type);
      if (!ok) {
        console.error(`[loader] Failed to load ${asset.type} from ${base + asset.path}`);
        return false;
      }
    }
    return true;
  }

  function loadAsset(url, type) {
    return new Promise(resolve => {
      if (type === 'style') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => resolve(true);
        link.onerror = (e) => {
          console.error(`[loader] Stylesheet error for ${url}`, e);
          resolve(false);
        };
        document.head.appendChild(link);
        return;
      }

      if (type === 'script') {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        script.onload = () => resolve(true);
        script.onerror = (e) => {
          console.error(`[loader] Script error for ${url}`, e);
          resolve(false);
        };
        document.head.appendChild(script);
        return;
      }

      resolve(false);
    });
  }

  function renderErrorMessage(repo, branch) {
    const error = document.createElement('div');
    error.style.padding = '16px';
    error.style.margin = '12px';
    error.style.border = '1px solid #c0152f';
    error.style.borderRadius = '8px';
    error.style.background = 'rgba(192, 21, 47, 0.08)';
    error.style.color = '#c0152f';
    error.style.fontFamily = 'sans-serif';
    error.textContent = `Failed to load assets from ${repo.owner}/${repo.repo}@${branch}. Check the branch name or use ?assets=<branch>&localAssets=true when developing locally.`;
    document.body.prepend(error);
  }

  function renderErrorMessageFromBase(remoteBase, fallbackRepo, fallbackBranch) {
    const match = /codeberg\.page\/([^/]+)\/@([^/]+)\//.exec(remoteBase || '') || [];
    const [, repo, branch] = match;
    renderErrorMessage(
      { owner: fallbackRepo?.owner || 'unknown', repo: repo || fallbackRepo?.repo || 'unknown' },
      branch || fallbackBranch || 'unknown'
    );
  }
})();
