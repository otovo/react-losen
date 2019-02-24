// flow
export function findNextValid(steps, currentIndex) {
  const nextValid =
    currentIndex + steps.slice(currentIndex + 1).findIndex(el => !el.autoSkip);
  return steps.length > nextValid ? nextValid + 1 : nextValid;
}

export function findPreviousValid(steps, currentIndex) {
  const previousValid = [...steps]
    .reverse()
    .slice(steps.length - currentIndex)
    .findIndex(el => !el.autoSkip);
  return currentIndex - 1 - previousValid;
}
