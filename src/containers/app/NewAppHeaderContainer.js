// @flow
import React, { useCallback } from 'react';
import { Map } from 'immutable';
import styled, { css } from 'styled-components';
import {
  faDownload,
  faHome,
  faFileAlt,
  faUsers,
  faUserChart,
  faQuestionCircle,
  faSignOut
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { AppHeaderWrapper, AppNavigationWrapper } from 'lattice-ui-kit';

import OpenLatticeLogo from '../../assets/images/logo_v2.png';
import { useOrganization, useLogout } from '../../components/hooks';
import { media } from '../../utils/StyleUtils';
import {
  DASHBOARD_PATH,
  DOWNLOADS_PATH,
  HOME_PATH,
  LOGOUT_PATH,
  PEOPLE_PATH,
  REPORTS_PATH,
} from '../../core/router/Routes';

const StyledAppHeaderWrapper = styled(AppHeaderWrapper)`
  > div {
    min-width: 375px;
  }

  /* hide app title for smaller screens */
  .app-nav-root > h1 {
    ${media.tablet(css`
      display: none;
    `)}
  }
`;

const NavLabel = styled.span`
  margin-left: 20px;
`;

type Props = {
  organizations :Map;
};

const NewAppHeaderContainer = (props :Props) => {
  const { organizations = Map() } = props;
  const [selectedOrganizationId, isLoading, switchOrganization] = useOrganization();
  const logout = useLogout();

  const onChange = useCallback(({ value } :any) => {
    switchOrganization(value);
  }, [switchOrganization]);

  return (
    <StyledAppHeaderWrapper
        appIcon={OpenLatticeLogo}
        appTitle="Behavioral Health Report"
        organizationsSelect={{
          isLoading,
          onChange,
          organizations,
          selectedOrganizationId
        }}>
      <AppNavigationWrapper drawer>
        <NavLink to={HOME_PATH} />
        <NavLink to={HOME_PATH}>
          <FontAwesomeIcon size="lg" fixedWidth icon={faHome} />
          <NavLabel>Home</NavLabel>
        </NavLink>
        <NavLink to={REPORTS_PATH}>
          <FontAwesomeIcon size="lg" fixedWidth icon={faFileAlt} />
          <NavLabel>Reports</NavLabel>
        </NavLink>
        <NavLink to={DASHBOARD_PATH}>
          <FontAwesomeIcon size="lg" fixedWidth icon={faUserChart} />
          <NavLabel>Dashboard</NavLabel>
        </NavLink>
        <NavLink to={PEOPLE_PATH}>
          <FontAwesomeIcon size="lg" fixedWidth icon={faUsers} />
          <NavLabel>People</NavLabel>
        </NavLink>
        <NavLink to={DOWNLOADS_PATH}>
          <FontAwesomeIcon size="lg" fixedWidth icon={faDownload} />
          <NavLabel>Downloads</NavLabel>
        </NavLink>
        <hr />
        <a
            href="https://support.openlattice.com/servicedesk/customer/portal/1"
            rel="noopener noreferrer"
            target="_blank">
          <FontAwesomeIcon size="lg" fixedWidth icon={faQuestionCircle} />
          <NavLabel>Contact Support</NavLabel>
        </a>
        <NavLink to={LOGOUT_PATH}>
          <FontAwesomeIcon size="lg" fixedWidth icon={faSignOut} />
          <NavLabel>Logout</NavLabel>
        </NavLink>
      </AppNavigationWrapper>
    </StyledAppHeaderWrapper>
  );
};

export default NewAppHeaderContainer;
