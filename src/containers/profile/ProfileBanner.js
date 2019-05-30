// @flow
import React from 'react';
import styled from 'styled-components';
import { Map } from 'immutable';
import { Banner } from 'lattice-ui-kit';
import * as FQN from '../../edm/DataModelFqns';

const Content = styled.div`
  display: flex;
  flex: 1;
  font-size: 24px;
  min-width: 0;
  justify-content: center;
`;

const Name = styled.strong`
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Birthdate = styled.span`
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type Props = {
  selectedPerson :Map;
}

const ProfileBanner = ({ selectedPerson } :Props) => {
  const firstName = selectedPerson.getIn([FQN.PERSON_FIRST_NAME_FQN, 0], '');
  const lastName = selectedPerson.getIn([FQN.PERSON_LAST_NAME_FQN, 0], '');
  const dob = selectedPerson.getIn([FQN.PERSON_DOB_FQN, 0], '');
  const middle = selectedPerson.getIn([FQN.PERSON_MIDDLE_NAME_FQN, 0], '');
  let middleInitial = '';

  if (middle) {
    middleInitial = `${middle.charAt(0)}.`;
  }

  return (
    <Banner isOpen={!selectedPerson.isEmpty()}>
      <Content>
        <Name>{`${lastName}, ${firstName} ${middleInitial}`}</Name>
        <Birthdate>{`DOB: ${dob}`}</Birthdate>
      </Content>
    </Banner>
  );
};

export default ProfileBanner;