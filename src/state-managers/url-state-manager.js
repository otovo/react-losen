// @flow

function setSearchParam(key: string, value: string) {
  const searchParams = new URLSearchParams(
    new URL(window.location.href).searchParams,
  );
  searchParams.set(key, value);
  return searchParams.toString() || '';
}

function getSearchParam(key: string) {
  const { href } = window.location;
  const searchParams = new URLSearchParams(new URL(href).searchParams);
  return searchParams.get(key) || '';
}

export const UrlStateManager: Losen$StateManager = {
  updateStep: (currentStepName, nextStepName) => {
    const currentUrl = window.location.href;
    const basePath = currentUrl.includes('?')
      ? currentUrl.split('?')[0]
      : currentUrl;
    const searchParams = setSearchParam('step', nextStepName);

    window.history.pushState({ activeStep: currentStepName }, '', currentUrl);
    window.history.replaceState(
      { activeStep: nextStepName },
      '',
      `${basePath}?${searchParams}`,
    );
  },
  getActiveStep: () => {
    return getSearchParam('step');
  },
  getItem: (key: string) => {
    return getSearchParam(key);
  },
  setItem: (key: string, value: string) => {
    const searchParams = setSearchParam(key, value);
    const currentUrl = window.location.href;
    const basePath = currentUrl.includes('?')
      ? currentUrl.split('?')[0]
      : currentUrl;
    window.history.replaceState(
      { ...window.history.state, [key]: value },
      '',
      `${basePath}?${searchParams}`,
    );
  },
};
