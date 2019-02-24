// @flow
import React, { useState } from 'react';

import Wizard from '../../v2/Wizard';
import Step from '../../v2/Step';
import Controls from './Controls';

const WizardExample = () => {
  const [stepEnabled, setEnabledStep] = useState(true);
  return (
    <>
      <Wizard>
        <div>
          <Step name="1">
            <div>Første steg</div>
          </Step>
          <Step name="2" autoSkip={!stepEnabled}>
            <div>Andre steg</div>
          </Step>
          <Step name="3">
            <div>Tredje steg</div>
          </Step>
        </div>

        <Controls />
      </Wizard>
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
      </div>
    </>
  );
};

export default WizardExample;
