// @flow

function updateBrowserHistoryStack(currentStepName, nextStepName) {
  const currentUrl = window.location.href;
  const basePath = currentUrl.includes('?')
    ? currentUrl.split('?')[0]
    : currentUrl;
  const searchParams = new URLSearchParams(new URL(currentUrl).searchParams);
  searchParams.set('step', nextStepName);

  window.history.pushState({ activeStep: currentStepName }, '', currentUrl);
  window.history.replaceState(
    { activeStep: nextStepName },
    '',
    `${basePath}?${searchParams.toString()}`,
  );
}

function getActiveStepFromUrl() {
  const { href } = window.location;
  const searchParams = new URLSearchParams(new URL(href).searchParams);
  return searchParams.get('step');
}

export default class StateManager {
  mode: string;

  constructor(mode: string) {
    const supportedModes = ['url'];

    if (supportedModes.includes(mode)) {
      this.mode = mode;
    } else if (!mode) {
      this.mode = '';
    } else {
      throw new Error(
        `${mode} is not yet supported as a StateManagerance layer`,
      );
    }
  }

  updateHistory(currentStepName: string, nextStepName: string) {
    switch (this.mode) {
      case 'url': {
        updateBrowserHistoryStack(currentStepName, nextStepName);
        break;
      }
      default:
        throw new Error(`Updating history via ${this.mode} is not supported`);
    }
  }

  getActiveStep() {
    switch (this.mode) {
      case 'url': {
        return getActiveStepFromUrl();
      }
      default:
        throw new Error(
          `Retrieving active step from ${this.mode} is not supported`,
        );
    }
  }
}
