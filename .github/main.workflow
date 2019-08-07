workflow "Re-run check-label when label changes" {
  resolves = ["fire check-label"]
  on = "pull_request"
}

action "action-filter" {
  uses = "actions/bin/filter@master"
  args = "action 'labeled|unlabeled'"
}

action "fire check-label" {
  uses = "swinton/httpie.action@69125d73caa2c6821f6a41a86112777a37adc171"
  needs = "action-filter"
  secrets = ["CIRCLE_API_TOKEN"]
  args = ["-v", "-a=${CIRCLE_API_TOKEN}:", "POST", "https://circleci.com/api/v1.1/project/github/apollographql/space-kit/tree/${GITHUB_REF#*refs/heads/}", "build_parameters:='{\"CIRCLE_JOB\": \"check-label\"}'"]
}

workflow "Automatic Rebase" {
  on = "issue_comment"
  resolves = "Rebase"
}

action "Rebase" {
  uses = "docker://cirrusactions/rebase:latest"
  secrets = ["GITHUB_TOKEN"]
}
