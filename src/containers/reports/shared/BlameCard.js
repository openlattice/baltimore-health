// @flow
import React from 'react';

import styled from 'styled-components';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardSegment,
  Colors,
} from 'lattice-ui-kit';
import { DateTime } from 'luxon';
import type Map from 'immutable';

import * as FQN from '../../../edm/DataModelFqns';

const { PURPLES } = Colors;

const BlameWrapper = styled.span`
  text-align: center;
  font-size: 0.875rem;
  > svg {
    margin-right: 0.5rem;
  }
`;

type Props = {
  reporterData :Map;
};

const BlameCard = (props :Props) => {
  const { reporterData } = props;

  const reported = reporterData.getIn(['associationDetails', FQN.COMPLETED_DT_FQN, 0]);
  const reportedDT = DateTime.fromISO(reported).toLocaleString(DateTime.DATE_SHORT);
  const reporter = reporterData.getIn(['neighborDetails', FQN.PERSON_ID_FQN, 0]);

  return (
    <Card>
      <CardSegment vertical>
        <BlameWrapper>
          <FontAwesomeIcon icon={faCheck} color={PURPLES[1]} />
          {`Submitted on ${reportedDT} by ${reporter}`}
        </BlameWrapper>
      </CardSegment>
    </Card>
  );
};

export default BlameCard;