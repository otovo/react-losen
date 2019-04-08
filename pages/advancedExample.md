---

name: Advanced example

---
import { Playground, PropsTable } from 'docz';

import WizardExample from './components/WizardExample';

# Losen, reinvented 🚢


## Todo

- [x] Add support for registering steps
- [x] Only render active step
- [x] Add support for changing steps
- [x] Add support for updating steps
- [x] Add support for autoskip steps
- [x] Add support for step validation
- [x] Add support for Jest/tests
- [x] Add support for `onComplete`

## Test

- [ ] Test performance (remove unnecessary renders)
- [ ] Test nested Wizards – does it even  work?

## Feature, or bug?

- [ ] First step is not skippable (initially)

---


## Example 

This example uses async validation for step 2 and 3. Use the debug panel to tweak settings

<WizardExample />
