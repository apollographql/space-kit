/* eslint-env node */
module.exports = {
  name: "Apollo GraphQL",
  email: "opensource@apollographql.com",
  owner: "Justin Anastos <justin@apollographql.com>",
  baseBranch: "main",
  plugins: [["jira", { url: "https://apollographql.atlassian.net/browse" }]],
  labels: [
    {
      releaseType: "none",
      description: "Internal changes not meriting a release",
      name: "internal",
      changelogTitle: "🏗  Internal",
      color: "#b0877e",
    },
    {
      releaseType: "patch",
      description:
        "Changes in documentation, either contained in code or external. Will always create a release",
      name: "documentation",
      changelogTitle: "📚  Documentation",
      color: "#88b68a",
    },
    {
      releaseType: "patch",
      name: "bug fix",
      changelogTitle: "🐛  Bug Fix",
      description: "Increment the patch version when merged",
      color: "#38e153",
    },
    {
      releaseType: "patch",
      name: "patch",
      changelogTitle: "Patch",
    },
    {
      releaseType: "patch",
      name: "renovate",
      changelogTitle: "⬆  Renovate Dependency Upgrade",
      description: "Automatic PR created by renovate for dependency upgrades",
      color: "yellow",
    },
  ],
};
