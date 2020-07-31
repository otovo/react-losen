import { SessionStorageStateManager } from './session-storage-state-manager';

describe('StateManager', () => {
  window.sessionStorage.setItem('step', 'one');

  test('can update browser history', () => {
    SessionStorageStateManager.updateStep('one', 'two');
    expect(SessionStorageStateManager.getItem('step')).toBe('two');
  });

  test('can get active step', () => {
    const activeStep = SessionStorageStateManager.getActiveStep();
    expect(activeStep).toBe('two');
  });
});
