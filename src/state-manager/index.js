// @flow

import {
  updateBrowserHistoryStack,
  getActiveStepFromUrl,
} from './url-state-manager';

const StateManager = (mode: string) => {
  const supportedModes = ['url'];
  let selectedMode = '';

  if (supportedModes.includes(mode)) {
    selectedMode = mode;
  } else {
    throw new Error(
      `${mode} is not supported as a mode, use one of ${supportedModes.join(
        ', ',
      )}`,
    );
  }

  return {
    updateHistory(currentStepName: string, nextStepName: string) {
      switch (selectedMode) {
        case 'url': {
          updateBrowserHistoryStack(currentStepName, nextStepName);
          break;
        }
        default:
          throw new Error(
            `Updating history via ${selectedMode} is not supported`,
          );
      }
    },
    getActiveStep() {
      switch (selectedMode) {
        case 'url': {
          return getActiveStepFromUrl();
        }
        default:
          throw new Error(
            `Retrieving active step from ${selectedMode} is not supported`,
          );
      }
    },
  };
};

export default StateManager;
