/*
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Col } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import SectionView from './SectionView';
import { PaddedRow, Label, InlineCheckbox, InlineRadio, TitleLabel, OtherWrapper } from '../shared/Layout';

const ConsumerInfoView = ({ section, handleTextInput, handleDateInput, handleSingleSelection, handleCheckboxChange, input }) => {

  return (
    <div>
      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>12. Consumer Last Name</TitleLabel>
          <FormControl data-section={section} name='lastName' value={input.lastName} onChange={handleTextInput} />
        </Col>
        <Col lg={6}>
          <TitleLabel>Consumer First Name</TitleLabel>
          <FormControl data-section={section} name='firstName' value={input.firstName} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>Consumer Middle Name</TitleLabel>
          <FormControl data-section={section} name='middleName' value={input.middleName} onChange={handleTextInput} />
        </Col>
        <Col lg={6}>
          <TitleLabel>13. Consumer Identification</TitleLabel>
          <FormControl data-section={section} name='identification' value={input.identification} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>14. Residence / Address (Street, Apt Number, City, County, State, Zip)</TitleLabel>
          <FormControl data-section={section} name='address' value={input.address} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>Consumer Phone Number</TitleLabel>
          <FormControl data-section={section} name='phone' value={input.phone} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={3}>
          <TitleLabel>15. Military Status</TitleLabel>
            <InlineRadio
                inline
                data-section={section}
                name='militaryStatus'
                value='active'
                checked={input.militaryStatus === 'active'}
                onChange={handleSingleSelection}>Active</InlineRadio>
            <InlineRadio
                inline
                data-section={section}
                name ='militaryStatus'
                value='veteran'
                checked={input.militaryStatus === 'veteran'}
                onChange={handleSingleSelection}>Veteran</InlineRadio>
            <InlineRadio
                inline
                data-section={section}
                name ='militaryStatus'
                value='n/a'
                checked={input.militaryStatus === 'n/a'}
                onChange={handleSingleSelection}>N/A</InlineRadio>
        </Col>

        <Col lg={3}>
          <TitleLabel>Gender</TitleLabel>
          <FormControl
              componentClass='select'
              placeholder='select'
              data-section={section}
              name='gender'
              value={input.gender}
              onChange={handleSingleSelection}>
            <option value=''>Select</option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
            <option value='nonbinary'>Non-binary</option>
          </FormControl>
        </Col>

        <Col lg={6}>
          <TitleLabel>Race</TitleLabel>
          <FormControl
              componentClass='select'
              placeholder='select'
              data-section={section}
              name='race'
              value={input.race}
              onChange={handleSingleSelection}>
            <option value=''>Select</option>
            <option value='americanIndian'>American Indian or Alaska Native</option>
            <option value='asian'>Asian</option>
            <option value='black'>Black or African American</option>
            <option value='hispanic'>Hispanic or Latino</option>
            <option value='nativeHawaiian'>Native Hawaiian or Other Pacific Islander</option>
            <option value='white'>White</option>
            <option value='other'>Other</option>
          </FormControl>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>Age</TitleLabel>
          <FormControl data-section={section} name='age' value={input.age} onChange={handleTextInput} />
        </Col>
        <Col lg={6}>
          <TitleLabel>DOB</TitleLabel>
          <DatePicker value={input.dob} onChange={(e) => {handleDateInput(e, section, 'dob')}} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>16. Homeless</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='homeless'
              value={true}
              checked={input.homeless === 'true'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name ='homeless'
              value={false}
              checked={input.homeless === 'false'}
              onChange={handleSingleSelection}>No</InlineRadio>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>If Yes, Where Do They Usually Sleep / Frequent?</TitleLabel>
          <FormControl data-section={section} name='homelessLocation' value={input.homelessLocation} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>17. Consumer Using Drugs, Alcohol</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='drugsAlcohol'
              value='drugs'
              checked={input.drugsAlcohol === 'drugs'}
              onChange={handleSingleSelection}>Drugs</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name ='drugsAlcohol'
              value='alcohol'
              checked={input.drugsAlcohol === 'alcohol'}
              onChange={handleSingleSelection}>Alcohol</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name ='drugsAlcohol'
              value='both'
              checked={input.drugsAlcohol === 'both'}
              onChange={handleSingleSelection}>Both</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name ='drugsAlcohol'
              value='n/a'
              checked={input.drugsAlcohol === 'n/a'}
              onChange={handleSingleSelection}>N/A</InlineRadio>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>Drug type</TitleLabel>
          <FormControl data-section={section} name='drugType' value={input.drugType} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={6}>
          <TitleLabel>18. Prescribed Medication</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='prescribedMedication'
              value='yes'
              checked={input.prescribedMedication === 'yes'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='prescribedMedication'
              value='no'
              checked={input.prescribedMedication === 'no'}
              onChange={handleSingleSelection}>No</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='prescribedMedication'
              value='unknown'
              checked={input.prescribedMedication === 'unknown'}
              onChange={handleSingleSelection}>Unknown</InlineRadio>
        </Col>
        <Col lg={6}>
          <TitleLabel>If yes, is Consumer Taking Medication?</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='takingMedication'
              value='yes'
              checked={input.takingMedication === 'yes'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='takingMedication'
              value='no'
              checked={input.takingMedication === 'no'}
              onChange={handleSingleSelection}>No</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='takingMedication'
              value='unknown'
              checked={input.takingMedication === 'unknown'}
              onChange={handleSingleSelection}>Unknown</InlineRadio>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>19. Does Consumer Have Previous Psychiatric Hospital Admission?</TitleLabel>
          <InlineRadio
              inline
              type='radio'
              data-section={section}
              name='prevPsychAdmission'
              value='yes'
              checked={input.prevPsychAdmission === 'yes'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              type='radio'
              data-section={section}
              name='prevPsychAdmission'
              value='no'
              checked={input.prevPsychAdmission === 'no'}
              onChange={handleSingleSelection}>No</InlineRadio>
          <InlineRadio
              inline
              type='radio'
              data-section={section}
              name='prevPsychAdmission'
              value='unknown'
              checked={input.prevPsychAdmission === 'unknown'}
              onChange={handleSingleSelection}>Unknown</InlineRadio>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>19. Self Diagnosis</TitleLabel>
            <FormGroup>
              <InlineCheckbox
                  inline
                  data-section={section}
                  name='selfDiagnosis'
                  value='bipolar'
                  checked={input.selfDiagnosis.indexOf('bipolar') !== -1}
                  onChange={handleCheckboxChange}>Bipolar</InlineCheckbox>
              <InlineCheckbox
                  inline
                  data-section={section}
                  name='selfDiagnosis'
                  value='depression'
                  checked={input.selfDiagnosis.indexOf('depression') !== -1}
                  onChange={handleCheckboxChange}>Depression</InlineCheckbox>
              <InlineCheckbox
                  inline
                  data-section={section}
                  name='selfDiagnosis'
                  value='ptsd'
                  checked={input.selfDiagnosis.indexOf('ptsd') !== -1}
                  onChange={handleCheckboxChange}>PTSD</InlineCheckbox>
              <InlineCheckbox
                  inline
                  data-section={section}
                  name='selfDiagnosis'
                  value='schizophrenia'
                  checked={input.selfDiagnosis.indexOf('schizophrenia') !== -1}
                  onChange={handleCheckboxChange}>Schizophrenia</InlineCheckbox>
              <InlineCheckbox
                  inline
                  data-section={section}
                  name='selfDiagnosis'
                  value='dementia'
                  checked={input.selfDiagnosis.indexOf('dementia') !== -1}
                  onChange={handleCheckboxChange}>Dementia</InlineCheckbox>
            <OtherWrapper>
              <InlineCheckbox
                  data-section={section}
                  name='selfDiagnosis'
                  value='other'
                  checked={input.selfDiagnosis.indexOf('other') !== -1}
                  onChange={handleCheckboxChange}>Other:</InlineCheckbox>
              <FormControl data-section={section} name='selfDiagnosisOther' value={input['selfDiagnosisOther']} onChange={handleTextInput} />
            </OtherWrapper>
          </FormGroup>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={2}>
          <TitleLabel>20. Armed with Weapon?</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='armedWithWeapon'
              value={true}
              checked={input.armedWithWeapon === 'true'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='armedWithWeapon'
              value={false}
              checked={input.armedWithWeapon === 'false'}
              onChange={handleSingleSelection}>No</InlineRadio>
        </Col>
        <Col lg={4}>
          <Label>If Yes, Weapon Type</Label>
          <FormControl data-section={section} name='armedWeaponType' value={input.armedWeaponType} onChange={handleTextInput} />
        </Col>
        <Col lg={2}>
          <TitleLabel>21. Have Access to Weapons?</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='accessToWeapons'
              value={true}
              checked={input.accessToWeapons === 'true'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='accessToWeapons'
              value={false}
              checked={input.accessToWeapons === 'false'}
              onChange={handleSingleSelection}>No</InlineRadio>
        </Col>
        <Col lg={4}>
          <Label>If Yes, Weapon Type</Label>
          <FormControl data-section={section} name='accessibleWeaponType' value={input.accessibleWeaponType} onChange={handleTextInput} />
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>22. Observed Behaviors (Check all that apply)</TitleLabel>
          <FormGroup>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='disorientation'
                checked={input.observedBehaviors.indexOf('disorientation') !== -1}
                onChange={handleCheckboxChange}>Disorientation / Confusion</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='abnormalBehavior'
                checked={input.observedBehaviors.indexOf('abnormalBehavior') !== -1}
                onChange={handleCheckboxChange}>Abnormal Behavior / Appearance (neglect self-care)</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='hearingVoices'
                checked={input.observedBehaviors.indexOf('hearingVoices') !== -1}
                onChange={handleCheckboxChange}>Hearing Voices / Hallucinating</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='anxious'
                checked={input.observedBehaviors.indexOf('anxious') !== -1}
                onChange={handleCheckboxChange}>Anxious / Excited / Agitated</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='depressed'
                checked={input.observedBehaviors.indexOf('depressed') !== -1}
                onChange={handleCheckboxChange}>Depressed Mood</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='paranoid'
                checked={input.observedBehaviors.indexOf('paranoid') !== -1}
                onChange={handleCheckboxChange}>Paranoid or Suspicious</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='self-mutilation'
                checked={input.observedBehaviors.indexOf('self-mutilation') !== -1}
                onChange={handleCheckboxChange}>Self-mutilation</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='observedBehaviors'
                value='threatening'
                checked={input.observedBehaviors.indexOf('threatening') !== -1}
                onChange={handleCheckboxChange}>Threatening / Violent Towards Others</InlineCheckbox>
            <OtherWrapper>
              <InlineCheckbox
                  data-section={section}
                  name='observedBehaviors'
                  value='other'
                  checked={input.observedBehaviors.indexOf('other') !== -1}
                  onChange={handleCheckboxChange}>Other:</InlineCheckbox>
              <FormControl data-section={section} name='observedBehaviorsOther' value={input.observedBehaviorsOther} onChange={handleTextInput} />
            </OtherWrapper>
          </FormGroup>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>23. Emotional State (Check all that apply)</TitleLabel>
          <FormGroup>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='angry'
                checked={input.emotionalState.indexOf('angry') !== -1}
                onChange={handleCheckboxChange}>Angry</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='afraid'
                checked={input.emotionalState.indexOf('afraid') !== -1}
                onChange={handleCheckboxChange}>Afraid</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='apologetic'
                checked={input.emotionalState.indexOf('apologetic') !== -1}
                onChange={handleCheckboxChange}>Apologetic</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='calm'
                checked={input.emotionalState.indexOf('calm') !== -1}
                onChange={handleCheckboxChange}>Calm</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='crying'
                checked={input.emotionalState.indexOf('crying') !== -1}
                onChange={handleCheckboxChange}>Crying</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='fearful'
                checked={input.emotionalState.indexOf('fearful') !== -1}
                onChange={handleCheckboxChange}>Fearful</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='emotionalState'
                value='nervous'
                checked={input.emotionalState.indexOf('nervous') !== -1}
                onChange={handleCheckboxChange}>Nervous</InlineCheckbox>
            <OtherWrapper>
              <InlineCheckbox
                  inline
                  data-section={section}
                  name='emotionalState'
                  value='other'
                  checked={input.emotionalState.indexOf('other') !== -1}
                  onChange={handleCheckboxChange}>Other:</InlineCheckbox>
              <FormControl data-section={section} name='emotionalStateOther' value={input.emotionalStateOther} onChange={handleTextInput} />
            </OtherWrapper>
          </FormGroup>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>24. Photos Taken Of:</TitleLabel>
          <FormGroup>
            <InlineCheckbox
                inline
                data-section={section}
                name='photosTakenOf'
                value='injuries'
                checked={input.photosTakenOf.indexOf('injuries') !== -1}
                onChange={handleCheckboxChange}>Injuries</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='photosTakenOf'
                value='propertyDamage'
                checked={input.photosTakenOf.indexOf('propertyDamage') !== -1}
                onChange={handleCheckboxChange}>Damage / Crime Scene</InlineCheckbox>
          </FormGroup>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>25. Consumer Injuries</TitleLabel>
          <FormGroup>
            <InlineCheckbox
                inline
                data-section={section}
                name='injuries'
                value='abrasions'
                checked={input.injuries.indexOf('abrasions') !== -1}
                onChange={handleCheckboxChange}>Abrasions</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='injuries'
                value='bruises'
                checked={input.injuries.indexOf('bruises') !== -1}
                onChange={handleCheckboxChange}>Bruises</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='injuries'
                value='complaintsOfPain'
                checked={input.injuries.indexOf('complaintsOfPain') !== -1}
                onChange={handleCheckboxChange}>Complaints of Pain</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='injuries'
                value='concussion'
                checked={input.injuries.indexOf('concussion') !== -1}
                onChange={handleCheckboxChange}>Concussion</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='injuries'
                value='fractures'
                checked={input.injuries.indexOf('fractures') !== -1}
                onChange={handleCheckboxChange}>Fractures</InlineCheckbox>
            <OtherWrapper>
              <InlineCheckbox
                  data-section={section}
                  name='injuries'
                  value='other'
                  checked={input.injuries.indexOf('other') !== -1}
                  onChange={handleCheckboxChange}>Other:</InlineCheckbox>
              <FormControl data-section={section} name='injuriesOther' value={input.injuriesOther} onChange={handleTextInput} />
            </OtherWrapper>
          </FormGroup>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={1}>
          <TitleLabel>26. Suicidal</TitleLabel>
          <InlineRadio
              inline
              data-section={section}
              name='suicidal'
              value={true}
              checked={input.suicidal === 'true'}
              onChange={handleSingleSelection}>Yes</InlineRadio>
          <InlineRadio
              inline
              data-section={section}
              name='suicidal'
              value={false}
              checked={input.suicidal === 'false'}
              onChange={handleSingleSelection}>No</InlineRadio>
        </Col>

        <Col lg={11}>
          <TitleLabel>If Suicidal:</TitleLabel>
          <InlineCheckbox
              inline
              data-section={section}
              name='suicidalActions'
              value='thoughts'
              checked={input.suicidalActions.indexOf('thoughts') !== -1}
              onChange={handleCheckboxChange}>Thoughts</InlineCheckbox>
          <InlineCheckbox
              inline
              data-section={section}
              name='suicidalActions'
              value='threat'
              checked={input.suicidalActions.indexOf('threat') !== -1}
              onChange={handleCheckboxChange}>Threat</InlineCheckbox>
          <InlineCheckbox
              inline
              data-section={section}
              name='suicidalActions'
              value='attempt'
              checked={input.suicidalActions.indexOf('attempt') !== -1}
              onChange={handleCheckboxChange}>Attempt</InlineCheckbox>
          <InlineCheckbox
              inline
              data-section={section}
              name='suicidalActions'
              value='completed'
              checked={input.suicidalActions.indexOf('completed') !== -1}
              onChange={handleCheckboxChange}>Completed</InlineCheckbox>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col lg={12}>
          <TitleLabel>27. Method Used to Attempt, Threaten, or Complete Suicide</TitleLabel>
          <FormGroup>
            <InlineCheckbox
                inline
                data-section={section}
                name='suicideAttemptMethod'
                value='narcotics'
                checked={input.suicideAttemptMethod.indexOf('narcotics') !== -1}
                onChange={handleCheckboxChange}>Narcotics (Prescription or Illicit)</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='suicideAttemptMethod'
                value='alcohol'
                checked={input.suicideAttemptMethod.indexOf('alcohol') !== -1}
                onChange={handleCheckboxChange}>Alcohol</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='suicideAttemptMethod'
                value='knife'
                checked={input.suicideAttemptMethod.indexOf('knife') !== -1}
                onChange={handleCheckboxChange}>Knife / Cutting Tool</InlineCheckbox>
            <InlineCheckbox
                inline
                data-section={section}
                name='suicideAttemptMethod'
                value='firearm'
                checked={input.suicideAttemptMethod.indexOf('firearm') !== -1}
                onChange={handleCheckboxChange}>Firearm</InlineCheckbox>
            <OtherWrapper>
              <InlineCheckbox
                  data-section={section}
                  name='suicideAttemptMethod'
                  value='other'
                  checked={input.suicideAttemptMethod.indexOf('other') !== -1}
                  onChange={handleCheckboxChange}>Other:</InlineCheckbox>
              <FormControl data-section={section} name='suicideAttemptMethodOther' value={input.suicideAttemptMethodOther} onChange={handleTextInput} />
            </OtherWrapper>
          </FormGroup>
        </Col>
      </PaddedRow>
    </div>
  );
}

ConsumerInfoView.propTypes = {
  handleTextInput: PropTypes.func.isRequired,
  handleSingleSelection: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired
}

export default ConsumerInfoView;
// TODO: IF 15 is yes -> send copy of report to Homelessoutreach@BaltimorePolice.org
