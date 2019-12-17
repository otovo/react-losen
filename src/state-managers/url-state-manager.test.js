import { UrlStateManager } from './url-state-manager';

describe('StateManager', () => {
  window.history.pushState({}, '', '?step=two');

  test('can update browser history', () => {
    UrlStateManager.updateStep('two', 'three');
    expect(window.history.length).toBe(3);
  });

  test('can get active step', () => {
    const activeStep = UrlStateManager.getActiveStep();
    expect(activeStep).toBe('three');
  });
});
