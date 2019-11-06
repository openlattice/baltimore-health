/*
 * @flow
 */

import randomUUID from 'uuid/v4';
import { Map, fromJS } from 'immutable';
import { DateTime } from 'luxon';

import { CLEAR, SET_INPUT_VALUE, SET_INPUT_VALUES } from './ActionFactory';
import { CLEAR_CRISIS_REPORT } from '../../crisis/CrisisReportActions';
import { SUBJECT_INFORMATION, POST_PROCESS_FIELDS } from '../../../utils/constants/CrisisReportConstants';
import { getAgeFromIsoDate } from '../../../utils/DateUtils';
import { FORM_STEP_STATUS } from '../../../utils/constants/FormConstants';

const {
  FULL_NAME,
  PERSON_ID,
  IS_NEW_PERSON,
  LAST,
  FIRST,
  MIDDLE,
  AKA,
  DOB,
  DOB_UNKNOWN,
  GENDER,
  RACE,
  AGE,
  SSN_LAST_4
} = SUBJECT_INFORMATION;

const INITIAL_STATE :Map<*, *> = fromJS({
  [FULL_NAME]: '',
  [PERSON_ID]: '',
  [IS_NEW_PERSON]: false,
  [LAST]: '',
  [FIRST]: '',
  [MIDDLE]: '',
  [AKA]: '',
  [DOB]: '',
  [DOB_UNKNOWN]: false,
  [GENDER]: '',
  [RACE]: '',
  [AGE]: '',
  [SSN_LAST_4]: ''
});

export default function reportReducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case SET_INPUT_VALUE: {
      const { field, value } = action.value;
      return state.set(field, value);
    }

    case SET_INPUT_VALUES:
      return state.merge(fromJS(action.value));

    case CLEAR:
    case CLEAR_CRISIS_REPORT:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function getInvalidFields(state :Map<*, *>) {
  const invalidFields = [];

  if (state.get(IS_NEW_PERSON)) {

    if (!state.get(GENDER, '').length) {
      invalidFields.push(GENDER);
    }

    if (!state.get(RACE, '').length) {
      invalidFields.push(RACE);
    }

    if (state.get(DOB_UNKNOWN)) {
      const age = state.get(AGE, '');
      if (!(age > 0) && !age.length) {
        invalidFields.push(AGE);
      }
    }
    else if (!DateTime.fromISO(state.get(DOB)).isValid) {
      invalidFields.push(DOB);
    }

  }
  else if (!state.get(PERSON_ID, '').length) {
    invalidFields.push(PERSON_ID);
  }

  return invalidFields;
}

export function getStatus(state :Map<*, *>) :string {
  if (state === INITIAL_STATE) {
    return FORM_STEP_STATUS.INITIAL;
  }

  return getInvalidFields(state).length ? FORM_STEP_STATUS.IN_PROGRESS : FORM_STEP_STATUS.COMPLETED;
}

export function processForSubmit(state :Map<*, *>) :Object {
  const dobDT = DateTime.fromISO(state.get(DOB));
  const dob :string = dobDT.isValid ? dobDT.toISODate() : '';

  let preprocessedState = state.get(IS_NEW_PERSON)
    ? state.set(DOB, dob).set(PERSON_ID, randomUUID())
    : Map().set(PERSON_ID, state.get(PERSON_ID));

  if (dobDT.isValid && !state.get(AGE)) {
    preprocessedState = preprocessedState.set(AGE, getAgeFromIsoDate(dob, true));
  }

  return preprocessedState
    .set(POST_PROCESS_FIELDS.DOB, dob)
    .set(POST_PROCESS_FIELDS.RACE, state.get(RACE))
    .set(POST_PROCESS_FIELDS.GENDER, state.get(GENDER))
    .toJS();
}
