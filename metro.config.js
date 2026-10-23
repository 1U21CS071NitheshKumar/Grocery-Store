const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Normalize any Windows multi-drive path concatenation like A:\...\C:\... or ./C:\...
const cleanPath = (p) => {
  if (typeof p === 'string') {
    const idx = p.lastIndexOf(':');
    if (idx > 1) {
      return p.slice(idx - 1);
    }
    if (/^\.?[\\\/][A-Za-z]:/.test(p)) {
      return p.replace(/^\.?[\\\/]/, '');
    }
  }
  return p;
};

const origReadFileSync = fs.readFileSync;
fs.readFileSync = function (p, options) {
  return origReadFileSync.call(this, cleanPath(p), options);
};

const origReadFile = fs.readFile;
fs.readFile = function (p, ...args) {
  return origReadFile.call(this, cleanPath(p), ...args);
};

if (fs.promises) {
  const origPromisesReadFile = fs.promises.readFile;
  fs.promises.readFile = function (p, ...args) {
    return origPromisesReadFile.call(this, cleanPath(p), ...args);
  };
  const origPromisesStat = fs.promises.stat;
  fs.promises.stat = function (p, ...args) {
    return origPromisesStat.call(this, cleanPath(p), ...args);
  };
}

const origStatSync = fs.statSync;
fs.statSync = function (p, options) {
  return origStatSync.call(this, cleanPath(p), options);
};

const origExistsSync = fs.existsSync;
fs.existsSync = function (p) {
  return origExistsSync.call(this, cleanPath(p));
};

try {
  const Assets = require('metro/src/Assets');
  const origGetAsset = Assets.getAsset;
  Assets.getAsset = function (relativePath, projectRoot, watchFolders, platform, assetExts, fileExistsInFileMap) {
    relativePath = cleanPath(relativePath);
    if (!watchFolders || !watchFolders.some((f) => typeof f === 'string' && f.includes('FreshMart_modules'))) {
      watchFolders = [...(watchFolders || []), 'C:\\FreshMart_modules'];
    }
    return origGetAsset.call(
      this,
      relativePath,
      projectRoot,
      watchFolders,
      platform,
      assetExts,
      (filePath) => fs.existsSync(cleanPath(filePath))
    );
  };
} catch (e) {}

try {
  const DependencyGraph = require('metro/src/node-haste/DependencyGraph');

  // Patch DependencyGraph to allow resolving files and directories through Windows directory junctions
  const origCreateModuleResolver = DependencyGraph.prototype._createModuleResolver;
  DependencyGraph.prototype._createModuleResolver = function () {
    const origDoesFileExist = this._doesFileExist;
    this._doesFileExist = (filePath) => {
      filePath = cleanPath(filePath);
      if (origDoesFileExist.call(this, filePath)) return true;
      try {
        return fs.existsSync(filePath);
      } catch (e) {
        return false;
      }
    };

    origCreateModuleResolver.call(this);

    if (this._moduleResolver && this._moduleResolver._options) {
      this._moduleResolver._options.dirExists = (filePath) => {
        filePath = cleanPath(filePath);
        try {
          return fs.statSync(filePath).isDirectory();
        } catch (e) {
          return false;
        }
      };

      this._moduleResolver._options.doesFileExist = (filePath) => {
        filePath = cleanPath(filePath);
        if (origDoesFileExist.call(this, filePath)) return true;
        try {
          return fs.existsSync(filePath);
        } catch (e) {
          return false;
        }
      };

      const origLookup = this._moduleResolver._options.fileSystemLookup;
      this._moduleResolver._options.fileSystemLookup = (filePath) => {
        filePath = cleanPath(filePath);
        const res = origLookup ? origLookup(filePath) : { exists: false };
        if (res && res.exists) return res;
        try {
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            return {
              exists: true,
              realPath: filePath,
              type: stat.isDirectory() ? 'd' : 'f',
            };
          }
        } catch (e) {}
        return { exists: false };
      };

      const origResolveAsset = this._moduleResolver._options.resolveAsset;
      this._moduleResolver._options.resolveAsset = (dirPath, assetName, extension) => {
        dirPath = cleanPath(dirPath);
        try {
          const res = origResolveAsset ? origResolveAsset(dirPath, assetName, extension) : null;
          if (res && res.length) return res;
        } catch (e) {}

        const basePath = path.join(dirPath, assetName);
        const candidates = [
          basePath + extension,
          basePath + '@1x' + extension,
          basePath + '@2x' + extension,
          basePath + '@3x' + extension,
          basePath + '@4x' + extension,
        ];
        const existing = candidates.filter((p) => {
          try {
            return fs.existsSync(p);
          } catch (e) {
            return false;
          }
        });
        return existing.length ? existing : null;
      };
    }
  };

  // Patch getSha1 for junction files not present in haste cache
  const origGetSha1 = DependencyGraph.prototype.getSha1;
  DependencyGraph.prototype.getSha1 = function (filename) {
    filename = cleanPath(filename);
    try {
      const sha1 = this._fileSystem.getSha1(filename);
      if (sha1) return sha1;
    } catch (e) {}

    const normalized = path.normalize(filename);
    try {
      const sha1 = this._fileSystem.getSha1(normalized);
      if (sha1) return sha1;
    } catch (e) {}

    try {
      if (fs.existsSync(filename)) {
        return crypto.createHash('sha1').update(fs.readFileSync(filename)).digest('hex');
      }
    } catch (e) {}

    return origGetSha1.call(this, filename);
  };
} catch (e) {}

const config = getDefaultConfig(__dirname);
config.watchFolders = [
  path.resolve(__dirname),
  'C:\\FreshMart_modules',
];

module.exports = config;
