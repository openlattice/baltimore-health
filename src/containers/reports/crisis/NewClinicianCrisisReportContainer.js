// @flow
import React, { useRef } from 'react';

import { Map } from 'immutable';
import {
  Breadcrumbs,
  CardStack
} from 'lattice-ui-kit';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';

import NewClinicianCrisisReport from './NewClinicianCrisisReport';
import { CRISIS_REPORT_CLINICIAN } from './schemas/constants';

import * as FQN from '../../../edm/DataModelFqns';
import { BreadcrumbItem, BreadcrumbLink } from '../../../components/breadcrumbs';
import { ContentOuterWrapper, ContentWrapper } from '../../../components/layout';
import { HOME_PATH, PROFILE_ID_PATH, PROFILE_VIEW_PATH } from '../../../core/router/Routes';
import { getEntityKeyId } from '../../../utils/DataUtils';
import { getDateShortFromIsoDate } from '../../../utils/DateUtils';
import { getFirstLastFromPerson } from '../../../utils/PersonUtils';

const NewClinicianCrisisReportContainer = () => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement | null>(null);

  const { state = {} } = location;
  const { selectedPerson = Map(), incident = Map() } = state;
  if (!Map.isMap(selectedPerson) || selectedPerson.isEmpty()) return <Redirect to={HOME_PATH} />;

  const personEKID = getEntityKeyId(selectedPerson);
  const profilePath = PROFILE_VIEW_PATH.replace(PROFILE_ID_PATH, personEKID);
  const name = getFirstLastFromPerson(selectedPerson);

  let breadcrumbLabel = `New ${CRISIS_REPORT_CLINICIAN}`;
  if (!incident.isEmpty()) {
    const incidentNumber = incident.getIn([FQN.CRIMINALJUSTICE_CASE_NUMBER_FQN, 0]);
    const incidentDatetime = incident.getIn([FQN.DATETIME_START_FQN, 0]);
    const formattedDateTime = getDateShortFromIsoDate(incidentDatetime);

    breadcrumbLabel = `${breadcrumbLabel} - #${incidentNumber} (${formattedDateTime})`;
  }

  return (
    <ContentOuterWrapper ref={pageRef}>
      <ContentWrapper>
        <Breadcrumbs>
          <BreadcrumbLink to={profilePath}>{name}</BreadcrumbLink>
          <BreadcrumbItem>{breadcrumbLabel}</BreadcrumbItem>
        </Breadcrumbs>
        <CardStack>
          <NewClinicianCrisisReport
              incident={incident}
              pageRef={pageRef}
              selectedPerson={selectedPerson} />
        </CardStack>
      </ContentWrapper>
    </ContentOuterWrapper>
  );
};

export default NewClinicianCrisisReportContainer;
