/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { RequestStates } from 'redux-reqseq';

import {
  exploreFile,
  explorePeople,
} from './ExploreActions';

import { APP_TYPES_FQNS } from '../../shared/Consts';
import { getPeoplePhotos, getRecentIncidents } from '../people/PeopleActions';

const {
  FILE_FQN,
  PEOPLE_FQN,
} = APP_TYPES_FQNS;

const INITIAL_STATE :Map = fromJS({
  [PEOPLE_FQN]: {
    fetchState: RequestStates.STANDBY,
    hits: List(),
    profilePicsByEKID: Map(),
    recentIncidentsByEKID: Map({
      data: Map(),
      fetchState: RequestStates.STANDBY,
    }),
    searchTerm: '',
    totalHits: 0,
  },
  [FILE_FQN]: {
    fetchState: RequestStates.STANDBY,
    hits: List(),
    // profilePicsByEKID: Map(),
    // recentIncidentsByEKID: Map({
    //   data: Map(),
    //   fetchState: RequestStates.STANDBY,
    // }),
    searchTerm: '',
    totalHits: 0,
  },
});

export default function exploreReducer(state :Map = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case explorePeople.case(action.type): {
      return explorePeople.reducer(state, action, {
        REQUEST: () => state
          .setIn([PEOPLE_FQN, 'fetchState'], RequestStates.PENDING)
          .mergeIn([PEOPLE_FQN], action.value),
        SUCCESS: () => state
          .setIn([PEOPLE_FQN, 'fetchState'], RequestStates.SUCCESS)
          .mergeIn([PEOPLE_FQN], action.value),
        FAILURE: () => state.setIn([PEOPLE_FQN, 'fetchState'], RequestStates.FAILURE)
      });
    }

    case exploreFile.case(action.type): {
      return exploreFile.reducer(state, action, {
        REQUEST: () => state
          .setIn([FILE_FQN, 'fetchState'], RequestStates.PENDING)
          .mergeIn([FILE_FQN], action.value),
        SUCCESS: () => state
          .setIn([FILE_FQN, 'fetchState'], RequestStates.SUCCESS)
          .mergeIn([FILE_FQN], action.value),
        FAILURE: () => state.setIn([FILE_FQN, 'fetchState'], RequestStates.FAILURE)
      });
    }

    case getPeoplePhotos.case(action.type): {
      return getPeoplePhotos.reducer(state, action, {
        SUCCESS: () => state
          .setIn([PEOPLE_FQN, 'fetchState'], RequestStates.SUCCESS)
          .setIn([PEOPLE_FQN, 'profilePicsByEKID'], action.value),
        FAILURE: () => state.setIn([PEOPLE_FQN, 'fetchState'], RequestStates.FAILURE),
      });
    }

    case getRecentIncidents.case(action.type): {
      return getRecentIncidents.reducer(state, action, {
        REQUEST: () => state
          .setIn([PEOPLE_FQN, 'recentIncidentsByEKID', 'fetchState'], RequestStates.PENDING),
        SUCCESS: () => state
          .setIn([PEOPLE_FQN, 'recentIncidentsByEKID', 'fetchState'], RequestStates.SUCCESS)
          .setIn([PEOPLE_FQN, 'recentIncidentsByEKID', 'data'], action.value),
        FAILURE: () => state
          .setIn([PEOPLE_FQN, 'recentIncidentsByEKID', 'fetchState'], RequestStates.FAILURE),
      });
    }

    default:
      return state;
  }

}