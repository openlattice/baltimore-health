/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';

const SET_INPUT_VALUE :string = 'SET_INPUT_VALUE_OFFICER_SAFETY';
const setInputValue :RequestSequence = newRequestSequence(SET_INPUT_VALUE);

const SET_INPUT_VALUES :string = 'SET_INPUT_VALUES_OFFICER_SAFETY';
const setInputValues :RequestSequence = newRequestSequence(SET_INPUT_VALUES);

export {
  SET_INPUT_VALUE,
  SET_INPUT_VALUES,
  setInputValue,
  setInputValues,
};
