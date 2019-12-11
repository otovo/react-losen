import StateManager from './index';

describe('StateManager', () => {
  const stateManager = StateManager('url');
  window.history.pushState({}, '', '?step=two');

  test('can update browser history', () => {
    stateManager.updateHistory('two', 'three');
    expect(window.history.length).toBe(3);
  });

  test('can get active step', () => {
    const activeStep = stateManager.getActiveStep();
    expect(activeStep).toBe('three');
  });
});

describe('StateManager disabled', () => {
  test('does not init', () => {
    expect(() => {
      StateManager();
    }).toThrow();
  });
});

describe('Unsupported StateManager', () => {
  test('does not work with unsupported caches', () => {
    expect(() => {
      StateManager('memory');
    }).toThrow();
  });
});
