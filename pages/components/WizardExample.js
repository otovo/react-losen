// @flow
import React, { useState } from 'react';

import { Wizard, Step } from '../../src';
import { UrlStateManager } from '../../src/state-managers/url-state-manager';
import Controls from './Controls';
import InputComponent from './InputComponent';
import StepWithInput from './StepWithInput';

const someAsyncFunc = () =>
  new Promise(res =>
    setTimeout(() => {
      console.log('inner timeout done');
      res();
    }, 800),
  );

const WizardExample = () => {
  const [stepEnabled, setEnabledStep] = useState(true);
  const [passValidation, setPassValidation] = useState(true);

  function onComplete(step) {
    console.log('Wizard completed ', step);
  }
  return (
    <>
      <Wizard onComplete={onComplete} stateManager={UrlStateManager} debug>
        <div>
          <Step
            name="step 1"
            validator={() => {
              console.log('validator done');
            }}>
            <p className="f3 tc">First step</p>
          </Step>
          <Step
            name="step 2"
            autoSkip={!stepEnabled}
            validator={async () => {
              await someAsyncFunc();
              console.log('waiting for timeout done');
            }}>
            <InputComponent name="step 2" />
          </Step>

          <StepWithInput />

          <Step
            name="step 4"
            validator={() => new Promise(res => setTimeout(() => res(), 800))}>
            <p className="f3 tc">Third step</p>
          </Step>
        </div>

        <Controls />
      </Wizard>

      <hr />

      <div className="pa4 courier bg-black-05">
        <h3 className="db">Debug panel</h3>
        <label htmlFor="step-2-checkbox">
          <input
            id="step-2-checkbox"
            className="mr2 inline-flex"
            type="checkbox"
            checked={stepEnabled}
            onChange={() => setEnabledStep(prev => !prev)}
          />
          Step 2 enabled
        </label>
        <label htmlFor="step-2-pass-validation" className="db">
          <input
            id="step-2-pass-validation"
            className="mr2 inline-flex"
            type="checkbox"
            checked={passValidation}
            onChange={() => setPassValidation(prev => !prev)}
          />
          Step 2 passes validation
        </label>
      </div>
    </>
  );
};

export default WizardExample;
