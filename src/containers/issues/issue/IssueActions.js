// @flow

import { newRequestSequence } from 'redux-reqseq';
import type { RequestSequence } from 'redux-reqseq';

const GET_ISSUE_NEIGHBORS :'GET_ISSUE_NEIGHBORS' = 'GET_ISSUE_NEIGHBORS';
const getIssueNeighbors :RequestSequence = newRequestSequence(GET_ISSUE_NEIGHBORS);

const SUBMIT_ISSUE :'SUBMIT_ISSUE' = 'SUBMIT_ISSUE';
const submitIssue :RequestSequence = newRequestSequence(SUBMIT_ISSUE);

const SELECT_ISSUE :'SELECT_ISSUE' = 'SELECT_ISSUE';
const selectIssue :RequestSequence = newRequestSequence(SELECT_ISSUE);

const RESET_ISSUE :'RESET_ISSUE' = 'RESET_ISSUE';
const resetIssue = () => ({
  type: RESET_ISSUE
});

export {
  GET_ISSUE_NEIGHBORS,
  RESET_ISSUE,
  SUBMIT_ISSUE,
  getIssueNeighbors,
  resetIssue,
  submitIssue,
  SELECT_ISSUE,
  selectIssue,
};