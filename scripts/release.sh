## https://intuit.github.io/auto/docs/welcome/getting-started#enabling-skip-release-label

export PATH=$(npm bin):$PATH

VERSION=`auto version`

## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog

  ## Publish Package
  npm version $VERSION -m "Bump version to: %s [skip ci]"
  npm publish

  ## Create GitHub Release
  git push --verbose --follow-tags --set-upstream origin $branch
  auto release
fi
