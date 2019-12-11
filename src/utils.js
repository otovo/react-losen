// @flow
import Step from './Step';

export function findNextValid(steps: Array<typeof Step>, currentIndex: number) {
  const nextValid =
    currentIndex + steps.slice(currentIndex + 1).findIndex(el => !el.autoSkip); // TODO
  return steps.length > nextValid ? nextValid + 1 : nextValid;
}

export function findPreviousValid(
  steps: Array<typeof Step>,
  currentIndex: number,
) {
  const previousValid = [...steps]
    .reverse()
    .slice(steps.length - currentIndex)
    .findIndex(el => !el.autoSkip); // TODO
  return currentIndex - 1 - previousValid;
}
