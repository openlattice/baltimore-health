/*
 * @flow
 */

import Immutable from 'immutable';

import { CLEAR_CRISIS_TEMPLATE } from '../../containers/crisis/CrisisActionFactory';
import { SUBMIT } from '../constants/StateConstants';
import {
  CLEAR_SUBMIT,
  replaceAssociation,
  replaceEntity,
  submit
} from './SubmitActionFactory';


const INITIAL_STATE :Immutable.Map<*, *> = Immutable.Map().withMutations((map :Immutable.Map<*, *>) => {
  map.set(SUBMIT.SUBMITTING, false);
  map.set(SUBMIT.SUCCESS, false);
  map.set(SUBMIT.SUBMITTED, false);
  map.set(SUBMIT.ERROR, '');
});

function submitReducer(state :Immutable.Map<*, *> = INITIAL_STATE, action :Object) {
  switch (action.type) {

    case replaceEntity.case(action.type): {
      return replaceEntity.reducer(state, action, {
        REQUEST: () => state
          .set(SUBMIT.SUBMITTING, true)
          .set(SUBMIT.SUBMITTED, false)
          .set(SUBMIT.SUCCESS, false)
          .set(SUBMIT.ERROR, ''),
        SUCCESS: () => state.set(SUBMIT.SUCCESS, true).set(SUBMIT.ERROR, ''),
        FAILURE: () => state.set(SUBMIT.SUCCESS, false).set(SUBMIT.ERROR, action.value),
        FINALLY: () => state.set(SUBMIT.SUBMITTING, false).set(SUBMIT.SUBMITTED, true)
      });
    }

    case submit.case(action.type): {
      return submit.reducer(state, action, {
        REQUEST: () => state
          .set(SUBMIT.SUBMITTING, true)
          .set(SUBMIT.SUBMITTED, false)
          .set(SUBMIT.SUCCESS, false)
          .set(SUBMIT.ERROR, ''),
        SUCCESS: () => state.set(SUBMIT.SUCCESS, true).set(SUBMIT.ERROR, ''),
        FAILURE: () => state.set(SUBMIT.SUCCESS, false).set(SUBMIT.ERROR, action.value),
        FINALLY: () => state.set(SUBMIT.SUBMITTING, false).set(SUBMIT.SUBMITTED, true)
      });
    }

    case replaceAssociation.case(action.type): {
      return replaceAssociation.reducer(state, action, {
        REQUEST: () => state
          .set(SUBMIT.SUBMITTING, true)
          .set(SUBMIT.SUBMITTED, false)
          .set(SUBMIT.SUCCESS, false)
          .set(SUBMIT.ERROR, ''),
        SUCCESS: () => state.set(SUBMIT.SUCCESS, true).set(SUBMIT.ERROR, ''),
        FAILURE: () => state.set(SUBMIT.SUCCESS, false).set(SUBMIT.ERROR, action.value),
        FINALLY: () => state.set(SUBMIT.SUBMITTING, false).set(SUBMIT.SUBMITTED, true)
      });
    }

    case CLEAR_SUBMIT:
    case CLEAR_CRISIS_TEMPLATE:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default submitReducer;
