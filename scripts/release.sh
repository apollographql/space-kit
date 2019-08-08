export PATH=$(npm bin):$PATH

VERSION=`auto version`

## Support for label 'skip-release'
if [ ! -z "$VERSION" ]; then
  ## Update Changelog
  auto changelog

  ## Publish Package
  npm version $VERSION -m "Bump version to: %s [skip ci]"
  npm publish

  ## The remote must be https and not git to work with tokens
  git remote set-url origin https://github.com/apollographql/space-kit.git

  ## Create GitHub Release
  git remote -v
  git push --verbose --follow-tags --set-upstream origin $branch
  auto release -v
fi
