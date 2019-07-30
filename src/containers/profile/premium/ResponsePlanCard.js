// @flow
import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardHeader,
  CardSegment,
  IconSplash,
  Spinner,
} from 'lattice-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardListCheck, faEdit } from '@fortawesome/pro-solid-svg-icons';
import { List } from 'immutable';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';

import LinkButton from '../../../components/buttons/LinkButton';
import { RESPONSE_PLAN_PATH } from '../../../core/router/Routes';

const IconWrapper = styled.span`
  vertical-align: middle;
  margin-right: 10px;
`;

const H1 = styled.h1`
  display: flex;
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  align-items: center;
`;

const EditButton = styled(LinkButton)`
  margin-left: auto;
  padding: 2px;
`;

type Props = {
  isLoading ? :boolean;
  interactionStrategies :List;
  match :Match;
};

const ResponsePlanCard = ({ isLoading, interactionStrategies, match } :Props) => (
  <Card>
    <CardHeader mode="primary" padding="sm">
      <H1>
        <IconWrapper>
          <FontAwesomeIcon icon={faClipboardListCheck} fixedWidth />
        </IconWrapper>
        Response Plan
        <EditButton mode="primary" to={`${match.url}${RESPONSE_PLAN_PATH}`}>
          <FontAwesomeIcon icon={faEdit} fixedWidth />
        </EditButton>
      </H1>
    </CardHeader>
    <CardSegment vertical padding="sm">
      { isLoading && <Spinner size="2x" /> }
      { (!isLoading && interactionStrategies.isEmpty()) && <IconSplash caption="No response plan." /> }
    </CardSegment>
  </Card>
);

ResponsePlanCard.defaultProps = {
  isLoading: false,
};

export default withRouter(ResponsePlanCard);
