export function updateBrowserHistoryStack(currentStepName, nextStepName) {
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

export function getActiveStepFromUrl() {
  const { href } = window.location;
  const searchParams = new URLSearchParams(new URL(href).searchParams);
  return searchParams.get('step');
}
