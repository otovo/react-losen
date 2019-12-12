// @flow
import { type StepInfo } from './Step';

export function findNextValid(steps: Array<StepInfo>, currentIndex: number) {
  const nextValid =
    currentIndex + steps.slice(currentIndex + 1).findIndex(el => !el.autoSkip);
  return steps.length > nextValid ? nextValid + 1 : nextValid;
}

export function findPreviousValid(
  steps: Array<StepInfo>,
  currentIndex: number,
) {
  const previousValid = [...steps]
    .reverse()
    .slice(steps.length - currentIndex)
    .findIndex(el => !el.autoSkip);
  return currentIndex - 1 - previousValid;
}
