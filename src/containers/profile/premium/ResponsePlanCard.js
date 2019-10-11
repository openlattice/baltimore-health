// @flow
import React from 'react';
import {
  Card,
  CardHeader,
  CardSegment,
  IconSplash,
  Spinner,
} from 'lattice-ui-kit';
import { Constants } from 'lattice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardListCheck } from '@fortawesome/pro-solid-svg-icons';
import { List } from 'immutable';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';

import EditLinkButton from '../../../components/buttons/EditLinkButton';
import { RESPONSE_PLAN_PATH, EDIT_PATH } from '../../../core/router/Routes';
import { TITLE_FQN, DESCRIPTION_FQN } from '../../../edm/DataModelFqns';
import InteractionStrategy from '../../../components/premium/responseplan/InteractionStrategy';
import { H1, IconWrapper } from '../../../components/layout';

const { OPENLATTICE_ID_FQN } = Constants;

type Props = {
  isLoading ? :boolean;
  interactionStrategies :List;
  match :Match;
  showEdit :boolean;
};

const ResponsePlanCard = ({
  isLoading,
  interactionStrategies,
  match,
  showEdit
} :Props) => (
  <Card>
    <CardHeader mode="primary" padding="sm">
      <H1>
        <IconWrapper>
          <FontAwesomeIcon icon={faClipboardListCheck} fixedWidth />
        </IconWrapper>
        Response Plan
        { showEdit && <EditLinkButton mode="primary" to={`${match.url}${EDIT_PATH}${RESPONSE_PLAN_PATH}`} /> }
      </H1>
    </CardHeader>
    <CardSegment vertical padding="sm">
      { isLoading && <Spinner size="2x" /> }
      { (!isLoading && interactionStrategies.isEmpty()) && <IconSplash caption="No response plan." /> }
      { (!isLoading && !interactionStrategies.isEmpty())
        && (
          interactionStrategies
            .map((strategy, step) => {
              const title = strategy.getIn([TITLE_FQN, 0]) || '';
              const description = strategy.getIn([DESCRIPTION_FQN, 0]) || '';
              const ekid = strategy.getIn([OPENLATTICE_ID_FQN, 0]);
              return <InteractionStrategy key={ekid} description={description} index={step + 1} title={title} />;
            })
        )}
    </CardSegment>
  </Card>
);

ResponsePlanCard.defaultProps = {
  isLoading: false,
};

export default withRouter(ResponsePlanCard);
