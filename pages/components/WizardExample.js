// @flow
import React, { useState } from 'react';

import { Wizard, ValidationError, Step } from '../../src';
import Controls from './Controls';
import InputComponent from './InputComponent';
import StepWithInput from './StepWithInput';

const WizardExample = () => {
  const [stepEnabled, setEnabledStep] = useState(true);
  const [passValidation, setPassValidation] = useState(true);

  function onComplete(step) {
    console.log('Wizard completed ', step);
  }
  return (
    <>
      <Wizard onComplete={onComplete} debug>
        <div>
          <Step name="1">
            <p className="f3 tc">First step</p>
          </Step>
          <Step
            name="2"
            autoSkip={!stepEnabled}
            validator={(resolve, reject) =>
              setTimeout(() => {
                if (passValidation) {
                  resolve();
                } else {
                  reject(new ValidationError('Not ready to continue'));
                }
              }, 800)
            }>
            <InputComponent />
          </Step>

          <StepWithInput />

          <Step
            name="3"
            validator={resolve =>
              setTimeout(() => {
                resolve();
              }, 800)
            }>
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
