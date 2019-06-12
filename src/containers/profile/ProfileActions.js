// @flow

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const GET_PERSON_DATA :'GET_PERSON_DATA' = 'GET_PERSON_DATA';
const getPersonData :RequestSequence = newRequestSequence(GET_PERSON_DATA);

const GET_PROFILE_REPORTS :'GET_PROFILE_REPORTS' = 'GET_PROFILE_REPORTS';
const getProfileReports :RequestSequence = newRequestSequence(GET_PROFILE_REPORTS);

const SELECT_PERSON :'SELECT_PERSON' = 'SELECT_PERSON';
const selectPerson :RequestSequence = newRequestSequence(SELECT_PERSON);

const UPDATE_PROFILE_ABOUT :'UPDATE_PROFILE_ABOUT' = 'UPDATE_PROFILE_ABOUT';
const updateProfileAbout :RequestSequence = newRequestSequence(UPDATE_PROFILE_ABOUT);

const CLEAR_PROFILE :'CLEAR_PROFILE' = 'CLEAR_PROFILE';
const clearProfile = () => ({
  type: CLEAR_PROFILE
});

const CREATE_PHYSICAL_APPEARANCE :'CREATE_PHYSICAL_APPEARANCE' = 'CREATE_PHYSICAL_APPEARANCE';
const createPhysicalAppearance :RequestSequence = newRequestSequence(CREATE_PHYSICAL_APPEARANCE);

export {
  CLEAR_PROFILE,
  CREATE_PHYSICAL_APPEARANCE,
  GET_PERSON_DATA,
  GET_PROFILE_REPORTS,
  SELECT_PERSON,
  UPDATE_PROFILE_ABOUT,
  clearProfile,
  createPhysicalAppearance,
  getPersonData,
  getProfileReports,
  selectPerson,
  updateProfileAbout,
};
