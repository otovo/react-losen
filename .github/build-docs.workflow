workflow "Build docz" {
  on = "push"
  resolves = ["actions/npm@master"]
}

action "master-branch-filter" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "install deps" {
  uses = "actions/npm@master"
  needs = ["master-branch-filter"]
  runs = "yarn"
  args = "install"
}

action "actions/npm@master" {
  uses = "actions/npm@master"
  needs = ["install deps"]
  runs = "yarn"
  args = "build:docs"
}
