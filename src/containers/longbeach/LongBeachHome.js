// @flow
import React from 'react';

import styled from 'styled-components';
import {
  faMapMarkedAlt,
  faUser,
  faUserMd,
  faUserNurse,
  faUserTie,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardSegment } from 'lattice-ui-kit';

import LinkButton from '../../components/buttons/LinkButton';
import { ContentOuterWrapper, ContentWrapper } from '../../components/layout';
import { media } from '../../utils/StyleUtils';

const StyledCard = styled(Card)`
  flex: 1 1 auto;
`;

const MegaLinkButton = styled(LinkButton)`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  height: 100%;
  max-height: 3em;
`;

const Grid = styled.div`
  display: grid;
  flex: 1 1 100%;
  grid-gap: 30px;
  grid-auto-flow: column;
  ${media.phone`
    grid-auto-flow: row;
  `}
  @media screen and (orientation:landscape) {
    grid-auto-flow: column;
  }
  align-items: center;
`;

/* <===== BEGIN LONG BEACH HACK =====> */
const LongBeachHome = () => (
  <ContentOuterWrapper>
    <ContentWrapper>
      <StyledCard>
        <CardSegment>
          <Grid>
            <MegaLinkButton>
              <FontAwesomeIcon icon={faUser} fixedWidth />
            </MegaLinkButton>
            <MegaLinkButton>
              <FontAwesomeIcon icon={faMapMarkedAlt} fixedWidth />
            </MegaLinkButton>
            <MegaLinkButton>
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon={faUserMd} transform="shrink-1.5" />
                <FontAwesomeIcon icon={faUserNurse} transform="shrink-8 left-7 up-1.5" />
                <FontAwesomeIcon icon={faUserTie} transform="shrink-8 right-7 up-1.5" />
              </span>
            </MegaLinkButton>
          </Grid>
        </CardSegment>
      </StyledCard>
    </ContentWrapper>
  </ContentOuterWrapper>
);

export default LongBeachHome;
/* <===== END LONG BEACH HACK =====> */
