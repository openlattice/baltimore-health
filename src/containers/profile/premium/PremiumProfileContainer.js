// @flow

import React, { useCallback, useEffect, useMemo } from 'react';

import styled from 'styled-components';
import { faFolderOpen } from '@fortawesome/pro-duotone-svg-icons';
import { List, Map } from 'immutable';
import {
  Card,
  CardSegment,
  CardStack,
  IconSplash,
  SearchResults,
  StyleUtils
} from 'lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RequestStates } from 'redux-reqseq';
import type { Dispatch } from 'redux';
import type { RequestSequence, RequestState } from 'redux-reqseq';

import BackgroundInformationCard from './BackgroundInformationCard';
import BehaviorCard from './BehaviorCard';
import DeescalationCard from './DeescalationCard';
import IntroCard from './IntroCard';
import OfficerSafetyCard from './OfficerSafetyCard';
import ReportsSummary from './ReportsSummary';
import ResponsePlanCard from './ResponsePlanCard';
import { countCrisisCalls } from './Utils';

import AboutPlanCard from '../../../components/premium/aboutplan/AboutPlanCard';
import AddressCard from '../../../components/premium/address/AddressCard';
import ContactCarousel from '../../../components/premium/contacts/ContactCarousel';
import CrisisCountCard from '../CrisisCountCard';
import LinkButton from '../../../components/buttons/LinkButton';
import Portrait from '../../../components/portrait/Portrait';
import ProfileBanner from '../ProfileBanner';
import ProfileResult from '../ProfileResult';
import RecentIncidentCard from '../RecentIncidentCard';
import { useAuthorization, usePeopleRoute } from '../../../components/hooks';
import { ContentOuterWrapper, ContentWrapper } from '../../../components/layout';
import {
  CRISIS_PATH,
  REPORT_ID_PATH,
  REPORT_VIEW_PATH,
} from '../../../core/router/Routes';
import { goToPath } from '../../../core/router/RoutingActions';
import { getAuthorization } from '../../../core/sagas/authorize/AuthorizeActions';
import { getImageDataFromEntity } from '../../../utils/BinaryUtils';
import { getEntityKeyId } from '../../../utils/DataUtils';
import { reduceRequestStates } from '../../../utils/StateUtils';
import { getProfileReports } from '../ProfileActions';
import { labelMapReport } from '../constants';
import { getAboutPlan } from '../edit/about/AboutActions';
import { getBasicInformation } from '../edit/basicinformation/actions/BasicInformationActions';
import { getContacts } from '../edit/contacts/ContactsActions';
import { getOfficerSafety } from '../edit/officersafety/OfficerSafetyActions';
import { getResponsePlan } from '../edit/responseplan/ResponsePlanActions';
import type { RoutingAction } from '../../../core/router/RoutingActions';

const { media } = StyleUtils;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`;

const CenteredSegment = styled(CardSegment)`
  align-items: center;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  ${media.phone`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `}
`;

const BehaviorAndSafetyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  overflow-x: auto;
  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `}
`;

const ScrollStack = styled(CardStack)`
  overflow-x: auto;
`;

type Props = {
  actions :{
    getAboutPlan :RequestSequence;
    getAuthorization :RequestSequence;
    getBasicInformation :RequestSequence;
    getContacts :RequestSequence;
    getOfficerSafety :RequestSequence;
    getProfileReports :RequestSequence;
    getResponsePlan :RequestSequence;
    goToPath :(path :string) => RoutingAction;
  };
  address :Map;
  appearance :Map;
  contactInfoByContactEKID :Map;
  contacts :List<Map>;
  fetchAboutPlanState :RequestState;
  fetchAboutState :RequestState;
  fetchOfficerSafetyState :RequestState;
  fetchReportsState :RequestState;
  fetchResponsePlanState :RequestState;
  interactionStrategies :List<Map>;
  isContactForByContactEKID :Map;
  officerSafety :List<Map>;
  photo :Map;
  reports :List<Map>;
  responsePlan :Map;
  responsibleUser :Map;
  scars :Map;
  selectedPerson :Map;
  techniques :List<Map>;
  triggers :List<Map>;
};

const PremiumProfileContainer = (props :Props) => {

  useEffect(() => {
    window.scrollTo({
      top: 0
    })
  }, []);

  const {
    actions,
    address,
    appearance,
    contactInfoByContactEKID,
    contacts,
    fetchAboutPlanState,
    fetchAboutState,
    fetchOfficerSafetyState,
    fetchReportsState,
    fetchResponsePlanState,
    interactionStrategies,
    isContactForByContactEKID,
    officerSafety,
    photo,
    reports,
    responsePlan,
    responsibleUser,
    scars,
    selectedPerson,
    techniques,
    triggers,
  } = props;

  usePeopleRoute(actions.getAboutPlan);
  usePeopleRoute(actions.getBasicInformation);
  usePeopleRoute(actions.getContacts);
  usePeopleRoute(actions.getOfficerSafety);
  usePeopleRoute(actions.getProfileReports);
  usePeopleRoute(actions.getResponsePlan);

  const handleResultClick = useCallback((result :Map) => {
    const reportEKID = getEntityKeyId(result);
    actions.goToPath(REPORT_VIEW_PATH.replace(REPORT_ID_PATH, reportEKID));
  }, [actions]);

  const [isAuthorized] = useAuthorization('profile', actions.getAuthorization);

  const { recent, total } = countCrisisCalls(reports);
  const isLoadingIntro = fetchAboutState !== RequestStates.SUCCESS;
  const isLoadingAboutPlan = fetchAboutPlanState !== RequestStates.SUCCESS;

  const isLoadingBody = reduceRequestStates([
    fetchOfficerSafetyState,
    fetchReportsState,
    fetchResponsePlanState,
  ]) === RequestStates.PENDING;

  const imageURL :string = useMemo(() => getImageDataFromEntity(photo), [photo]);
  return (
    <ContentOuterWrapper>
      <ProfileBanner selectedPerson={selectedPerson} />
      <ContentWrapper>
        <ProfileGrid>
          <Aside>
            <CardStack>
              <Card>
                <CenteredSegment padding="sm" vertical>
                  <Portrait imageUrl={imageURL} />
                </CenteredSegment>
                {
                  !isLoadingIntro && (
                    <CardSegment padding="sm" vertical>
                      <LinkButton mode="primary" to={`${CRISIS_PATH}/1`} state={selectedPerson}>
                        New Crisis Report
                      </LinkButton>
                    </CardSegment>
                  )
                }
              </Card>
              <IntroCard
                  appearance={appearance}
                  isLoading={isLoadingIntro}
                  scars={scars}
                  selectedPerson={selectedPerson}
                  showEdit={isAuthorized} />
              <AddressCard
                  address={address}
                  isLoading={isLoadingIntro}
                  showEdit={isAuthorized} />
              <AboutPlanCard
                  isLoading={isLoadingAboutPlan}
                  responsibleUser={responsibleUser}
                  showEdit={isAuthorized} />
            </CardStack>
          </Aside>
          <ScrollStack>
            {
              reports.isEmpty() && !isLoadingBody
                ? <IconSplash icon={faFolderOpen} caption="No reports have been filed." />
                : (
                  <>
                    <CrisisCountCard
                        count={total}
                        isLoading={isLoadingBody} />
                    <RecentIncidentCard
                        count={recent}
                        isLoading={isLoadingBody}/>
                    <BehaviorAndSafetyGrid>
                      <BehaviorCard
                          reports={reports}
                          isLoading={isLoadingBody} />
                      <OfficerSafetyCard
                          isLoading={isLoadingBody}
                          officerSafety={officerSafety}
                          reports={reports}
                          showEdit={isAuthorized}
                          triggers={triggers} />
                    </BehaviorAndSafetyGrid>
                    <DeescalationCard
                        isLoading={isLoadingBody}
                        showEdit={isAuthorized}
                        techniques={techniques} />
                    <ResponsePlanCard
                        interactionStrategies={interactionStrategies}
                        isLoading={isLoadingBody}
                        showEdit={isAuthorized} />
                    <BackgroundInformationCard
                        backgroundInformation={responsePlan}
                        isLoading={isLoadingBody}
                        showEdit={isAuthorized} />
                    <ContactCarousel
                        contacts={contacts}
                        contactInfoByContactEKID={contactInfoByContactEKID}
                        isContactForByContactEKID={isContactForByContactEKID} />
                    <SearchResults
                        hasSearched={false}
                        onResultClick={handleResultClick}
                        results={reports}
                        resultLabels={labelMapReport}
                        resultComponent={ProfileResult} />
                    {/* <ReportsSummary isLoading={isLoadingBody} reports={reports} /> */}
                  </>
                )
            }
          </ScrollStack>
        </ProfileGrid>
      </ContentWrapper>
    </ContentOuterWrapper>
  );
};

const mapStateToProps = (state :Map) => {
  const fetchAboutStates = [
    state.getIn(['profile', 'basicInformation', 'basics', 'fetchState']),
    state.getIn(['profile', 'basicInformation', 'appearance', 'fetchState']),
    state.getIn(['profile', 'basicInformation', 'scars', 'fetchState']),
    state.getIn(['profile', 'basicInformation', 'address', 'fetchState']),
  ];

  const fetchOfficerSafetyStates = [
    state.getIn(['profile', 'officerSafety', 'fetchState']),
    state.getIn(['profile', 'reports', 'fetchState'])
  ];

  return {
    address: state.getIn(['profile', 'basicInformation', 'address', 'data'], Map()),
    appearance: state.getIn(['profile', 'basicInformation', 'appearance', 'data'], Map()),
    contacts: state.getIn(['profile', 'contacts', 'data', 'contacts'], List()),
    contactInfoByContactEKID: state.getIn(['profile', 'contacts', 'data', 'contactInfoByContactEKID'], Map()),
    isContactForByContactEKID: state.getIn(['profile', 'contacts', 'data', 'isContactForByContactEKID'], Map()),
    fetchAboutState: reduceRequestStates(fetchAboutStates),
    fetchOfficerSafetyState: reduceRequestStates(fetchOfficerSafetyStates),
    fetchReportsState: state.getIn(['profile', 'reports', 'fetchState'], RequestStates.STANDBY),
    fetchResponsePlanState: state.getIn(['profile', 'responsePlan', 'fetchState'], RequestStates.STANDBY),
    fetchAboutPlanState: state.getIn(['profile', 'about', 'fetchState'], RequestStates.STANDBY),
    interactionStrategies: state.getIn(['profile', 'responsePlan', 'interactionStrategies'], List()),
    officerSafety: state.getIn(['profile', 'officerSafety', 'data', 'officerSafetyConcerns'], List()),
    photo: state.getIn(['profile', 'basicInformation', 'photos', 'data'], Map()),
    reports: state.getIn(['profile', 'reports', 'data'], List()),
    responsePlan: state.getIn(['profile', 'responsePlan', 'data'], Map()),
    responsibleUser: state.getIn(['profile', 'about', 'data'], Map()),
    scars: state.getIn(['profile', 'basicInformation', 'scars', 'data'], Map()),
    selectedPerson: state.getIn(['profile', 'basicInformation', 'basics', 'data'], Map()),
    techniques: state.getIn(['profile', 'officerSafety', 'data', 'interactionStrategies'], List()),
    triggers: state.getIn(['profile', 'officerSafety', 'data', 'behaviors'], List()),
  };
};

const mapDispatchToProps = (dispatch :Dispatch<any>) => ({
  actions: bindActionCreators({
    getAboutPlan,
    getAuthorization,
    getBasicInformation,
    getContacts,
    getOfficerSafety,
    getProfileReports,
    getResponsePlan,
    goToPath,
  }, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(PremiumProfileContainer);
