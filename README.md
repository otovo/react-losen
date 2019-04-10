---
name: Home
route: /
---

![react-losen](https://user-images.githubusercontent.com/2470775/39097362-8093ab6e-465b-11e8-845e-b21b893d6091.png)

# react-losen &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/otovo/react-losen/blob/master/LICENSE)

> A brutallty simple wizard for React and React Native.

**Note:** This module is currently in beta. First official release is right around the corner, and will include some nice changes:

  - [ ] Async step validation
  - [ ] Upgrade to new React Context API

Please submit issues/feedback on GitHub ✌️

## Install

```shell
yarn add react-losen
```

## Example

```jsx
import { Wizard, Step, Controls } from 'react-losen';

<Wizard
  render={() => (
    <>
      <Step name="start">Step one</Step>
      <Step name="second-step">This is the second step</Step>
      <Step name="final-step">Click next to finish</Step>

      <Controls
        render={(onNext, onPrevious, isFirstStep) => (
          <>
            <Button onClick={onPrevious} disabled={isFirstStep}>
              Previous
            </Button>

            <Button onClick={onNext}>Next</Button>
          </>
        )}
      />
    </>
  )}
/>;
```

## Developing

### Built With

`react-losen` is built with React and it's [Context API](https://reactjs.org/docs/context.html) under the hood. We use [render props](https://reactjs.org/docs/render-props.html) to expose functionality to child components.

### Developing

Use `yarn dev` to spin up a dev server which let's you view and play with the source components. To get started, create a `.md` in the `./pages` directory. It uses MDX which let's you import and write
JSX within markdown documents. For more info out the [Docz website](https://www.docz.site/) and read up on the [MDX spec](https://github.com/mdx-js/mdx/).

### Building

```
yarn run build
```

This command uses [`@pika/pack`](https://www.pikapkg.com/blog/introducing-pika-pack/) to build for browsers. Plugins are specified under `@pika/pack` in `package.json`.

### Publishing

Publish new versions with `yarn run publish`. `Pack` guides you through the Through a wizard, this helps you bump the version number and publish to npm. **Note:** It's importaint to use the `run` argument, as `yarn publish` is a built in command and won't use `Pack`

### Building docs

The documentation is built by running `yarn docs:build`. This generates a static site in `./docs/`. Currently the site is deployed and hosted with [Zeit's Now](https://zeit.co/blog/now-static).

Todo: Add information on how to deploy docs with Now.

## Versioning

react-losen use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Tests

Testing is done using the [Jest](https://facebook.github.io/jest/) test
framework. Assertions is done [with Jest's `Expect`
matchers](https://facebook.github.io/jest/docs/en/expect.html).

Todo: Add CI.

## Style guide

For code quality, react-losen use the following tools:

- [Flow](https://flow.org/) for static type checking
- [Prettier](https://prettier.io/) for code formatting
- [Eslint](https://eslint.org/) for linting

## API reference

See [documentation](https://docs-geycgwirqi.now.sh/)


## Licensing

[MIT](https://github.com/otovo/react-losen/blob/master/LICENSE)
