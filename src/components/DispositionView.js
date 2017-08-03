/*
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

import SectionView from './SectionView';
import { Row, TextInput, RadioInput, Label } from '../shared/Layout';


const DispositionView = ({ section, handleInput, handleCheckboxChange, handleSingleSelection, input }) => {
  return(
    <SectionView header="Disposition">
      <Row>
        <Label>28. Disposition</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='arrest'
              checked={input['28a'].indexOf('arrest') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Arrest</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='ep'
              checked={input['28a'].indexOf('ep') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>EP</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='voluntaryER'
              checked={input['28a'].indexOf('voluntaryER') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Voluntary ER Intake</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='bcri'
              checked={input['28a'].indexOf('bcri') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>BCRI</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='infoAndReferral'
              checked={input['28a'].indexOf('infoAndReferral') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Information and Referral</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='lead'
              checked={input['28a'].indexOf('lead') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>LEAD</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='contactedTreatementProvider'
              checked={input['28a'].indexOf('contactedTreatementProvider') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Contacted or Referred to Current Treatment Provider</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='criminalCitation'
              checked={input['28a'].indexOf('criminalCitation') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Criminal Citation</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='28a'
              value='civilCitation'
              checked={input['28a'].indexOf('civilCitation') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Civil Citation</Label>
      </Row>

      <Row>
      <Label>Transported to Hospital</Label>
        <RadioInput>
          <input
              type='radio'
              data-section={section}
              name='28b'
              value='yes'
              checked={input['28b'] === 'yes'}
              onChange={handleSingleSelection} />
        </RadioInput>
        <Label>Yes</Label>
        <RadioInput>
          <input
              type='radio'
              data-section={section}
              name='28b'  
              value='no'
              checked={input['28b'] === 'no'}
              onChange={handleSingleSelection} />
        </RadioInput>
        <Label>No</Label>
        <Label>Hospital Name</Label>
        <TextInput data-section={section} name='28c' value={input['28c']} onChange={handleInput} />
      </Row>

      <Row>
        <Label>29. De-escalation Techniques/Equipment Used</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='verbalization'
              checked={input['29a'].indexOf('verbalization') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Verbalization</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='handcuffs'
              checked={input['29a'].indexOf('handcuffs') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Handcuffs</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='legRestraints'
              checked={input['29a'].indexOf('legRestraints') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Leg Restraints</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='taser'
              checked={input['29a'].indexOf('taser') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Taser</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='arrestControl'
              checked={input['29a'].indexOf('arrestControl') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Arrest Control (Hands / Feet)</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='other'
              checked={input['29a'].indexOf('other') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Other:</Label>
        <TextInput data-section={section} name='29b' value={input['29b']} onChange={handleInput} />
        <RadioInput>
          <Checkbox
              data-section={section}
              name='29a'
              value='n/a'
              checked={input['29a'].indexOf('n/a') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>N/A</Label>
      </Row>

      <Row>
        <Label>30. Called for Specialized Resources</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='bcri'
              checked={input[30].indexOf('bcri') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>BCRI / Mobile Crisis Response Team</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='citOfficer'
              checked={input[30].indexOf('citOfficer') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>CIT Officer</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='crtUnit'
              checked={input[30].indexOf('crtUnit') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>CRT Unit</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='esu'
              checked={input[30].indexOf('esu') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>ESU</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='swat'
              checked={input[30].indexOf('swat') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>SWAT</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='negotiationTeam'
              checked={input[30].indexOf('negotiationTeam') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Negotiation Team</Label>
        <RadioInput>
          <Checkbox
              data-section={section}
              name={30}
              value='homelessOutreach'
              checked={input[30].indexOf('homelessOutreach') !== -1}
              onChange={handleCheckboxChange} />
        </RadioInput>
        <Label>Homeless Outreach</Label>
      </Row>

      <Row>
        <Label>31. Narrative of Incident, to include: Results of investigation, basis for actions taken, emotional states, additional witnesses. Property listing.</Label>
      </Row>
      <Row>
        <TextInput data-section={section} name={31} componentClass='textarea' onChange={handleInput} />
      </Row>
    </SectionView>
  );
}

export default DispositionView;
