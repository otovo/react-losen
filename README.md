# react-losen
A super customisable Wizard for React and React Native

**Note:** This package is under development. We are expecting to have an initial release (with documentation :tada:) ready within a couple of weeks.

## Components
This package contains three main components: 
* `Wizard`, the main orchestrator. It has 2 required props 
    - render: This takes a set of `Step` as children. Minumum 2. Start and end
    - onComplete: What to do when the Wizard is complete.
* `Step`, a wrapper for what you want to show as a step. It registers the step on mount to the Wizard context
* `Controls`, the controller for which step to show next. Has 2 directions: next and previous. It also knows if you are on the last or first step.
