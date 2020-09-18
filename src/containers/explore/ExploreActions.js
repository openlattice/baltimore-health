/*
 * @flow
 */

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const CLEAR_EXPLORE_RESULTS :'CLEAR_EXPLORE_RESULTS' = 'CLEAR_EXPLORE_RESULTS';
const clearExploreResults = (value :boolean = false) => ({
  type: CLEAR_EXPLORE_RESULTS,
  value,
});

const EXPLORE_PEOPLE :'EXPLORE_PEOPLE' = 'EXPLORE_PEOPLE';
const explorePeople :RequestSequence = newRequestSequence(EXPLORE_PEOPLE);

const EXPLORE_FILE :'EXPLORE_FILE' = 'EXPLORE_FILE';
const exploreFile :RequestSequence = newRequestSequence(EXPLORE_FILE);

const GET_INVOLVED_PEOPLE :'GET_INVOLVED_PEOPLE' = 'GET_INVOLVED_PEOPLE';
const getInvolvedPeople :RequestSequence = newRequestSequence(GET_INVOLVED_PEOPLE);

export {
  CLEAR_EXPLORE_RESULTS,
  EXPLORE_FILE,
  EXPLORE_PEOPLE,
  GET_INVOLVED_PEOPLE,
  clearExploreResults,
  exploreFile,
  explorePeople,
  getInvolvedPeople,
};
