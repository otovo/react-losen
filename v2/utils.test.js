import { findNextValid, findPreviousValid } from './utils';

const regularStep = { autoSkip: false };
const skipStep = { autoSkip: true };

describe('findNextValid', () => {
  test('it returns the next element', () => {
    const steps = [regularStep, regularStep];
    const next = findNextValid(steps, 0);
    expect(next).toBe(1);
  });

  test('it skips single step where autoStep === true', () => {
    const steps = [regularStep, { autoSkip: true }, regularStep];

    const next = findNextValid(steps, 0);
    expect(next).toBe(2);
  });

  test('it skips multiple steps where autoStep === true', () => {
    const steps = [
      regularStep,
      { autoSkip: true },
      { autoSkip: true },
      regularStep,
    ];

    const next = findNextValid(steps, 0);
    expect(next).toBe(3);
  });

  test('it respects array boundaries if last element', () => {
    const steps = [regularStep, regularStep];
    const next = findNextValid(steps, steps.length);
    expect(next).toBe(steps.length);
  });
});

describe('findPreviousValid', () => {
  test('it respects boundaries if first element', () => {
    const steps = [regularStep, { autoSkip: true }, regularStep];
    const previous = findPreviousValid(steps, 0);
    expect(previous).toBe(0);
  });

  test('it returns the previous element', () => {
    const steps = [regularStep, regularStep, regularStep];
    const previous = findPreviousValid(steps, 2);
    expect(previous).toBe(1);
  });

  test('it skips a step if previous has autoStep === true', () => {
    const steps = [regularStep, regularStep, skipStep, regularStep];
    const previous = findPreviousValid(steps, steps.length - 1);
    expect(previous).toBe(1);
  });

  test('it skips multiple steps if previous has autoStep === true', () => {
    const steps = [regularStep, skipStep, skipStep, regularStep];
    const previous = findPreviousValid(steps, steps.length - 1);
    expect(previous).toBe(0);
  });

  test('it does not mutate original array', () => {
    const steps = [
      { autoSkip: true, index: 1 },
      { autoSkip: false, index: 2 },
      { autoSkip: true, index: 3 },
    ];
    const backup = [...steps];
    findPreviousValid(steps, steps.length - 1);
    expect(backup).toEqual(steps);
  });
});
