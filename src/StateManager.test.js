import StateManager from './StateManager';

describe('StateManager with URL', () => {
  const stateManager = new StateManager('url');
  window.history.pushState({}, '', '?step=two');

  test('can init', () => {
    expect(stateManager instanceof StateManager).toBeTruthy();
  });

  test('gets active step from url', () => {
    const activeStep = stateManager.getActiveStep();
    expect(activeStep).toBe('two');
  });

  test('updates browser history', () => {
    stateManager.updateHistory('two', 'three');
    expect(window.location.href).toContain('three');
  });
});

describe('StateManager disabled', () => {
  const stateManager = new StateManager();

  test('can init without args', () => {
    expect(stateManager instanceof StateManager).toBeTruthy();
  });

  test('does not get active step from url', () => {
    expect(() => {
      stateManager.getActiveStep();
    }).toThrow();
  });

  test('does not update browser history', () => {
    expect(() => {
      stateManager.updateHistory('thisStep', 'nextStep');
    }).toThrow();
  });
});

describe('Unsupported StateManager mode', () => {
  test('can init without args', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const stateManager = new StateManager('memory');
    }).toThrow();
  });
});
