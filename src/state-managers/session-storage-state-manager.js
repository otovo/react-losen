// @flow
const { sessionStorage } = window;

export const SessionStorageStateManager: Losen$StateManager = {
  updateStep: (currentStepName, nextStepName) => {
    sessionStorage.setItem('step', nextStepName);
  },
  getActiveStep: () => {
    return sessionStorage.getItem('step');
  },
  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  },
};
