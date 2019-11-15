/*
 * @flow
 */

import { Map } from 'immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { AuthReducer } from 'lattice-auth';
import { combineReducers } from 'redux-immutable';

import { STATE } from '../../utils/constants/StateConstants';
import { INITIALIZE_APPLICATION } from '../../containers/app/AppActions';

import appReducer from '../../containers/app/AppReducer';
import authorizeReducer from '../sagas/authorize/AuthorizeReducer';
import dashboardReducer from '../../containers/dashboard/DashboardReducer';
import downloadsReducer from '../../containers/downloads/DownloadsReducer';
import edmReducer from '../../edm/EdmReducer';
import hospitalsReducer from '../../containers/form/HospitalsReducer';
import inboxReducer from '../../containers/inbox/InboxReducer';
import peopleReducer from '../../containers/people/PeopleReducer';
import profileReducer from '../../containers/profile/reducers/ProfileReducer';
import reportsReducer from '../../containers/reports/ReportsReducer';
import searchReducer from '../../containers/search/SearchReducer';
import staffReducer from '../../containers/staff/StaffReducer';

// pages
import dispositionReducer from '../../containers/pages/disposition/Reducer';
import natureOfCrisisReducer from '../../containers/pages/natureofcrisis/Reducer';
import observedBehaviorsReducer from '../../containers/pages/observedbehaviors/Reducer';
import officerSafetyReducer from '../../containers/pages/officersafety/Reducer';
import subjectInformationReducer from '../../containers/pages/subjectinformation/Reducer';

export default function reduxReducer(routerHistory :any) {

  const allReducers = combineReducers({
    app: appReducer,
    auth: AuthReducer,
    authorization: authorizeReducer,
    dashboard: dashboardReducer,
    downloads: downloadsReducer,
    edm: edmReducer,
    hospitals: hospitalsReducer,
    inbox: inboxReducer,
    people: peopleReducer,
    profile: profileReducer,
    reports: reportsReducer,
    router: connectRouter(routerHistory),
    search: searchReducer,
    staff: staffReducer,

    // page reducers
    [STATE.DISPOSITION]: dispositionReducer,
    [STATE.NATURE_OF_CRISIS]: natureOfCrisisReducer,
    [STATE.OBSERVED_BEHAVIORS]: observedBehaviorsReducer,
    [STATE.OFFICER_SAFETY]: officerSafetyReducer,
    [STATE.SUBJECT_INFORMATION]: subjectInformationReducer,
  });

  const rootReducer = (state :Map, action :Object) => {
    if (action.type === INITIALIZE_APPLICATION) {
      return allReducers(undefined, action);
    }

    return allReducers(state, action);
  };

  return rootReducer;
}
