// @flow
import { findPreviousValid } from './utils';

import {
  REGISTER_STEP,
  VALIDATING_STEP,
  VALIDATION_COMPLETE,
  UPDATE_STEP,
  NEXT_STEP,
  VALIDATE_SUCCESS,
  VALIDATE_FAILED,
  PREVIOUS_STEP,
  type Action,
} from './actions';

export const initialState: Losen$State = {
  index: 0,
  steps: [],
  isLoading: false,
};

export function reducer(state: Losen$State, action: Action) {
  switch (action.type) {
    case REGISTER_STEP: {
      const { steps } = state;
      const { step } = action;
      const alreadyRegistered = steps.map(el => el.name).includes(step.name);

      if (alreadyRegistered) {
        return state;
      }

      return {
        ...state,
        steps: [...state.steps, step],
      };
    }

    case VALIDATING_STEP:
      return {
        ...state,
        isLoading: true,
      };

    case VALIDATION_COMPLETE:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_STEP: {
      const { steps } = state;
      const { step } = action;

      const stepIndex = steps.findIndex(el => el.name === step.name);
      return {
        ...state,
        steps: [
          ...steps.slice(0, stepIndex),
          step,
          ...steps.slice(stepIndex + 1),
        ],
      };
    }

    case NEXT_STEP:
    case VALIDATE_SUCCESS: {
      return { ...state, index: action.nextIndex, isLoading: false };
    }

    case VALIDATE_FAILED: {
      return { ...state, isLoading: false };
    }

    case PREVIOUS_STEP: {
      const { steps, index } = state;
      const prev = findPreviousValid(steps, index);
      return {
        ...state,
        index: prev,
      };
    }

    default:
      console.error(`Action not implmented: ${action.type}`);
      return state;
  }
}
