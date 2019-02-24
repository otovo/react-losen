// @flow
import React, { useState } from 'react';

import Wizard, { ValidationError } from '../../v2/Wizard';
import Step from '../../v2/Step';
import Controls from './Controls';

const WizardExample = () => {
  const [stepEnabled, setEnabledStep] = useState(true);
  const [passValidation, setPassValidation] = useState(true);
  return (
    <>
      <Wizard>
        <div>
          <Step name="1">
            <div>Første steg</div>
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
            <div>Andre steg</div>
          </Step>
          <Step name="3">
            <div>Tredje steg</div>
          </Step>
        </div>

        <Controls />
      </Wizard>

      <hr />

      <div className="pa4">
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
