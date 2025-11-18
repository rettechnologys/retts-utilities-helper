# Publishing Guide

## Prerequisites

1. **npm account**: Create one at https://www.npmjs.com/signup
2. **Login to npm**: Run `npm login` and enter your credentials
3. **Package name**: Ensure `@retts/frontend-helper` is available (scoped packages require paid npm account or use public scope)

## Pre-publish Checklist

- [ ] Update version in `package.json`
- [ ] Build the package: `npm run build`
- [ ] Verify build output in `dist/` folder
- [ ] Test the package locally (see below)
- [ ] Update CHANGELOG (if you have one)
- [ ] Commit all changes

## Testing Locally Before Publishing

### Method 1: npm link

```bash
# In this package directory
npm run build
npm link

# In your test project
npm link @retts/frontend-helper

# Use it in your project
import { isString } from '@retts/frontend-helper';
```

### Method 2: Local install

```bash
# In this package directory
npm run build
npm pack

# This creates a .tgz file, then in your test project:
npm install /path/to/retts-frontend-helper-1.0.0.tgz
```

## Publishing Steps

### First Time (Public Package)

If using a scoped package name without a paid account:

```bash
# Build
npm run build

# Publish as public
npm publish --access public
```

### Subsequent Updates

1. **Update version** (choose one):
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Publish**:
   ```bash
   npm publish
   ```

## Publishing Workflow

```bash
# 1. Make your changes in src/

# 2. Test locally
npm run build

# 3. Version bump
npm version patch

# 4. Publish
npm publish --access public

# 5. Push to git (if using version control)
git push && git push --tags
```

## Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Package Visibility

### Public Package (Free)
```bash
npm publish --access public
```

### Private Package (Requires npm Pro/Teams)
```bash
npm publish  # Default for scoped packages
```

## Verifying Published Package

After publishing:

1. **Check on npm**:
   ```
   https://www.npmjs.com/package/@retts/frontend-helper
   ```

2. **Install in a test project**:
   ```bash
   npm install @retts/frontend-helper
   ```

3. **Verify imports work**:
   ```typescript
   import { isString } from '@retts/frontend-helper';
   console.log(isString('test')); // Should work
   ```

## Unpublishing (Emergency Only)

⚠️ **WARNING**: Unpublishing is restricted by npm. You can only unpublish within 72 hours of publishing, and it may be permanently blocked.

```bash
# Unpublish specific version
npm unpublish @retts/frontend-helper@1.0.0

# Unpublish entire package (NOT RECOMMENDED)
npm unpublish @retts/frontend-helper --force
```

## Deprecating a Version

Better alternative to unpublishing:

```bash
npm deprecate @retts/frontend-helper@1.0.0 "Please use version 1.0.1 or higher"
```

## Common Issues

### Issue: Package name already taken
**Solution**: Use a different package name or scoped name like `@yourusername/helper`

### Issue: 402 Payment Required
**Solution**: Scoped packages require payment unless published as public:
```bash
npm publish --access public
```

### Issue: Build files missing
**Solution**: Ensure `npm run build` completes and `dist/` folder exists

### Issue: Types not working
**Solution**: Verify `types` field in package.json and `.d.ts` files in dist/

## Best Practices

1. **Semantic Versioning**: Follow semver (major.minor.patch)
2. **Changelog**: Keep a CHANGELOG.md documenting changes
3. **Tests**: Add tests before publishing (currently missing)
4. **CI/CD**: Automate builds and tests with GitHub Actions
5. **README**: Keep README up to date with examples
6. **License**: Add a LICENSE file

## Updating Package

Regular update workflow:

```bash
# 1. Make changes
# 2. Build
npm run build

# 3. Test locally
npm link
# Test in another project

# 4. Version bump
npm version patch

# 5. Publish
npm publish --access public

# 6. Tag and push
git push origin main --follow-tags
```

## Package Stats

After publishing, monitor your package:

- **Downloads**: https://www.npmjs.com/package/@retts/frontend-helper
- **Bundle size**: https://bundlephobia.com/package/@retts/frontend-helper
- **Package health**: https://snyk.io/advisor/npm-package/@retts/frontend-helper
