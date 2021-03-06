// @flow
import React, { useCallback, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { Map } from 'immutable';
import {
  Breadcrumbs,
  Button,
  Card,
  CardStack,
  Spinner,
} from 'lattice-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import { RequestStates } from 'redux-reqseq';

import LastContactWith from './LastContactWith';
import NewSymptomsReport from './NewSymptomsReport';
import { clearSymptomsReport } from './SymptomsReportActions';

import SuccessSplash from '../shared/SuccessSplash';
import { BreadcrumbItem, BreadcrumbLink } from '../../../components/breadcrumbs';
import { usePosition } from '../../../components/hooks';
import { ContentOuterWrapper, ContentWrapper } from '../../../components/layout';
import { HOME_PATH, PROFILE_ID_PATH, PROFILE_VIEW_PATH } from '../../../core/router/Routes';
import { getEntityKeyId } from '../../../utils/DataUtils';
import { getFirstLastFromPerson } from '../../../utils/PersonUtils';

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px 30px 30px;
`;

const NewSymptomsReportContainer = () => {
  const location = useLocation();
  const formRef = useRef();
  const dispatch = useDispatch();
  const [position, error] = usePosition(500);
  const submitState = useSelector((store) => store.getIn(['symptomsReport', 'submitState']));
  useEffect(() => () => dispatch(clearSymptomsReport()), [dispatch]);

  const isLoading = !position.coords && !error;
  const isSubmitting = submitState === RequestStates.PENDING;
  const submitSuccess = submitState === RequestStates.SUCCESS;

  const handleExternalSubmit = useCallback(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  const { state: selectedPerson = Map() } = location;
  if (!Map.isMap(selectedPerson) || selectedPerson.isEmpty()) return <Redirect to={HOME_PATH} />;

  const personEKID = getEntityKeyId(selectedPerson);
  const profilePath = PROFILE_VIEW_PATH.replace(PROFILE_ID_PATH, personEKID);
  const name = getFirstLastFromPerson(selectedPerson);

  const content = submitSuccess
    ? (
      <CardStack>
        <SuccessSplash reportType="Symptoms Report" selectedPerson={selectedPerson} />
        <LastContactWith selectedPerson={selectedPerson} />
      </CardStack>
    )
    : (
      <Card>
        <NewSymptomsReport
            ref={formRef}
            position={position}
            selectedPerson={selectedPerson} />
        <ActionRow>
          <Button
              fullWidth
              isLoading={isSubmitting}
              color="primary"
              onClick={handleExternalSubmit}>
            Create Symptom Report
          </Button>
        </ActionRow>
      </Card>
    );

  return (
    <ContentOuterWrapper>
      <ContentWrapper>
        <Breadcrumbs>
          <BreadcrumbLink to={profilePath}>{name}</BreadcrumbLink>
          <BreadcrumbItem>New Symptoms Report</BreadcrumbItem>
        </Breadcrumbs>
        <CardStack>
          {
            isLoading
              ? <Spinner size="3x" />
              : content
          }
        </CardStack>
      </ContentWrapper>
    </ContentOuterWrapper>
  );
};

export default NewSymptomsReportContainer;
