import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Wizard from './Wizard';
import Step from './Step';
import { ControlsContext } from './Controls';
import { UrlStateManager } from './state-managers/url-state-manager';

const ControlsComponent = () => {
  const { onNext, onPrevious } = useContext(ControlsContext);

  return (
    <>
      <button
        id="previous-button"
        type="button"
        onClick={() => {
          onPrevious();
        }}>
        Go back
      </button>
      <button
        id="next-button"
        type="button"
        onClick={() => {
          onNext();
        }}>
        Next
      </button>
    </>
  );
};

const WizardComponent = props => (
  <Wizard {...props}>
    <div id="active-step">
      <Step name="one">Step one</Step>
      <Step name="two">Step two</Step>
      <Step name="three">Step three</Step>
    </div>
    <ControlsComponent />
  </Wizard>
);

describe('Wizard', () => {
  const component = mount(<WizardComponent />);

  test('renders first step', () => {
    expect(component.find('#active-step').text()).toBe('Step one');
  });

  test('can go to next step', () => {
    component.find('#next-button').simulate('click');
    expect(component.find('#active-step').text()).toBe('Step two');
  });

  test('can go to previous step', () => {
    component.find('#previous-button').simulate('click');
    expect(component.find('#active-step').text()).toBe('Step one');
  });
});

describe('Wizard caches step state in url', () => {
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
  let component;

  beforeEach(() => {
    window.history.pushState({ activeStep: 'one' }, '', '?step=one');
    component = mount(<WizardComponent stateManager={UrlStateManager} />);
  });

  test('renders correct step upon load', () => {
    expect(component.find('#active-step').text()).toBe('Step one');
  });

  test('renders previous step on back button', () => {
    window.history.pushState({ activeStep: 'two' }, '', '?step=two');
    window.history.back();
    expect(component.find('#active-step').text()).toBe('Step one');
  });

  test('url changes upon click of next button', () => {
    component.find('#next-button').simulate('click');
    expect(component.find('#active-step').text()).toBe('Step two');
    const searchParams = new URLSearchParams(
      new URL(window.location.href).searchParams,
    );
    expect(searchParams.get('step')).toBe('two');
  });
});
