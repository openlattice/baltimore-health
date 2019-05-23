/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const SET_INPUT_VALUE :string = 'SET_INPUT_VALUE_NATURE_OF_CRISIS';
const setInputValue :RequestSequence = newRequestSequence(SET_INPUT_VALUE);

const SET_INPUT_VALUES :string = 'SET_INPUT_VALUES_NATURE_OF_CRISIS';
const setInputValues :RequestSequence = newRequestSequence(SET_INPUT_VALUES);

export {
  SET_INPUT_VALUE,
  SET_INPUT_VALUES,
  setInputValue,
  setInputValues,
};
