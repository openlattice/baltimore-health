/*
 * @flow
 */

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { List, Map, OrderedMap } from 'immutable';
import { DatePicker } from '@atlaskit/datetime-picker';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BackButton from '../../../components/buttons/BackButton';
import StyledInput, { SearchInput } from '../../../components/controls/StyledInput';
import StyledCheckbox from '../../../components/controls/StyledCheckbox';
import StyledRadio from '../../../components/controls/StyledRadio';
import SearchableSelect from '../../../components/controls/SearchableSelect';
import { STATE } from '../../../utils/constants/StateConstants';
import { SUBJECT_INFORMATION, OTHER } from '../../../utils/constants/CrisisTemplateConstants';
import { GENDERS, RACES } from './Constants';
import { BLACK, OFF_WHITE } from '../../../shared/Colors';
import { MEDIA_QUERY_MD } from '../../../core/style/Sizes';
import {
  PERSON_DOB_FQN,
  PERSON_LAST_NAME_FQN,
  PERSON_FIRST_NAME_FQN,
  PERSON_MIDDLE_NAME_FQN,
  PERSON_RACE_FQN,
  PERSON_SEX_FQN,
  PERSON_ID_FQN,
  PERSON_PICTURE_FQN
} from '../../../edm/DataModelFqns';
import { getPeopleESId } from '../../../utils/AppUtils';
import {
  FormWrapper,
  FormSection,
  FormText,
  Header,
  IndentWrapper,
  RequiredField
} from '../../../components/crisis/FormComponents';

import {
  clearConsumerSearchResults,
  searchConsumers
} from '../../search/SearchActionFactory';

import * as ActionFactory from './ActionFactory';


type Props = {
  app :Map<*, *>,
  values :Map<*, *>,
  searchResults :List<*>,
  actions :{
    clear :() => void,
    setInputValue :(value :{ field :string, value :Object }) => void,
    setInputValues :(values :{}) => void,
    searchConsumers :() => void
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const HeaderWithClearButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin: 0;
  }
`;

const DatePickerWrapper = styled.div`
  width: 160px;
  margin-bottom: 20px;
`;

const Or = styled.div`
  margin: 20px 50px;
  font-size: 16px;
  font-weight: bold;
  color: ${BLACK};
`;

const UnknownPersonRow = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: none;
  width: 100%;
  background-color: rgba(228, 216, 255, 0.${props => (props.selected ? 5 : 0)});
  color: ${BLACK};
  padding: 10px 20px;

  span {
    margin-left: 10px;
  }

  @media only screen and (min-width: ${MEDIA_QUERY_MD}px) {
    padding: 10px 15px;

    span {
      margin-left: 20px;
    }
  }

  &:hover {
    background-color: rgba(228, 216, 255, 0.${props => (props.selected ? 3 : 0)});
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

class ObservedBehaviors extends React.Component<Props> {

  constructor(props) {
    super(props);

    this.searchTimeout = null;
  }

  renderInput = (field, disabledIfSelected, width) => {
    const { values, actions } = this.props;
    const disabled = disabledIfSelected && !values.get(SUBJECT_INFORMATION.IS_NEW_PERSON);
    const extraProps = width ? { width: `${width}px` } : {};

    return (
      <StyledInput
          padBottom
          name={field}
          disabled={disabled}
          value={values.get(field)}
          onChange={({ target }) => actions.setInputValue({ field, value: target.value })}
          {...extraProps} />
    );
  };

  renderRadioButtons = (field, valueList) => {
    const { values, actions } = this.props;
    const currValue = values.get(field);

    const onChange = ({ target }) => {
      actions.setInputValue({
        field,
        value: target.value
      });
    };

    return valueList.map(value => (
      <StyledRadio
          key={`${field}-${value}`}
          label={value}
          value={value}
          checked={currValue === value}
          onChange={onChange} />
    ));
  };

  handleFullNameChange = (e :SyntheticEvent) => {
    const { actions, app } = this.props;
    const { value } = e.target;

    actions.setInputValue({
      field: SUBJECT_INFORMATION.FULL_NAME,
      value
    });

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      if (value && value.length) {
        actions.searchConsumers({
          entitySetId: getPeopleESId(app),
          query: value
        });
      }
    }, 500);
  }

  formatPersonName = (person) => {
    const firstName = person.getIn([PERSON_FIRST_NAME_FQN, 0], '');
    const lastName = person.getIn([PERSON_LAST_NAME_FQN, 0], '');
    const middleName = person.getIn([PERSON_MIDDLE_NAME_FQN, 0], '');
    return `${lastName}, ${firstName} ${middleName}`;
  }

  getPersonOptions = () => {
    const { searchResults } = this.props;
    let options = OrderedMap();
    searchResults.forEach((person) => {
      const dobStr = person.getIn([PERSON_DOB_FQN, 0], '');
      const dobMoment = moment(dobStr);

      const dob = dobMoment.isValid() ? dobMoment.format('MM-DD-YYYY') : dobStr;

      options = options.set(List.of(this.formatPersonName(person), dob), person);
    });

    return options;
  }

  selectPerson = (person) => {
    const { actions } = this.props;

    actions.setInputValues({
      [SUBJECT_INFORMATION.PERSON_ID]: person.getIn([PERSON_ID_FQN, 0], ''),
      [SUBJECT_INFORMATION.FULL_NAME]: this.formatPersonName(person),
      [SUBJECT_INFORMATION.FIRST]: person.getIn([PERSON_FIRST_NAME_FQN, 0], ''),
      [SUBJECT_INFORMATION.LAST]: person.getIn([PERSON_LAST_NAME_FQN, 0], ''),
      [SUBJECT_INFORMATION.MIDDLE]: person.getIn([PERSON_MIDDLE_NAME_FQN, 0], ''),
      [SUBJECT_INFORMATION.DOB]: person.getIn([PERSON_DOB_FQN, 0], ''),
      [SUBJECT_INFORMATION.SSN_LAST_4]: 'XXXX',
      [SUBJECT_INFORMATION.IS_NEW_PERSON]: false
    });
  }

  onDobChange = (value) => {
    const { actions } = this.props;
    actions.setInputValue({ field: SUBJECT_INFORMATION.DOB, value });

    if (moment(value).isValid()) {
      actions.setInputValue({
        field: SUBJECT_INFORMATION.AGE,
        value: moment().diff(moment(value), 'years')
      })
    }
  }

  render() {
    const { actions, values } = this.props;
    const isCreatingNewPerson = values.get(SUBJECT_INFORMATION.IS_NEW_PERSON);

    const toggleNewPerson = (event) => {
      event.preventDefault();
      if (isCreatingNewPerson) {
        actions.setInputValue({
          field: SUBJECT_INFORMATION.IS_NEW_PERSON,
          value: false
        });
      }
      else {
        actions.setInputValues({
          [SUBJECT_INFORMATION.PERSON_ID]: '',
          [SUBJECT_INFORMATION.FULL_NAME]: '',
          [SUBJECT_INFORMATION.FIRST]: '',
          [SUBJECT_INFORMATION.LAST]: '',
          [SUBJECT_INFORMATION.MIDDLE]: '',
          [SUBJECT_INFORMATION.DOB]: '',
          [SUBJECT_INFORMATION.SSN_LAST_4]: '',
          [SUBJECT_INFORMATION.IS_NEW_PERSON]: true
        });
      }
    };

    return (
      <Wrapper>
        <FormWrapper>
          <FormSection>
            <Header>
              <h1>Quick Search</h1>
              <span>{'Search by last name, first name, or alias. No results? Skip to "Subject Information" below'}</span>
            </Header>
            <SearchableSelect
                value={values.get(SUBJECT_INFORMATION.FULL_NAME)}
                onInputChange={this.handleFullNameChange}
                onSelect={this.selectPerson}
                options={this.getPersonOptions()}
                transparent
                searchIcon
                fullWidth
                dropdownIcon={false}
                split
                noFilter
                withBorders
                short />
          </FormSection>
          {
            isCreatingNewPerson || values.get(SUBJECT_INFORMATION.PERSON_ID).length
              ? (
                <IndentWrapper extraIndent>
                  <Header>
                    <HeaderWithClearButton>
                      <h1>Subject Information</h1>
                      <BackButton onClick={actions.clear} noMargin>Clear Fields</BackButton>
                    </HeaderWithClearButton>
                  </Header>
                  <RequiredField><FormText noMargin>Last</FormText></RequiredField>
                  {this.renderInput(SUBJECT_INFORMATION.LAST, true)}
                  <RequiredField><FormText noMargin>First</FormText></RequiredField>
                  {this.renderInput(SUBJECT_INFORMATION.FIRST, true)}
                  <FormText noMargin>Mid.</FormText>
                  {this.renderInput(SUBJECT_INFORMATION.MIDDLE, true, 50)}
                  <RequiredField><FormText noMargin>DOB</FormText></RequiredField>
                  <DatePickerWrapper>
                    <DatePicker
                        value={values.get(SUBJECT_INFORMATION.DOB)}
                        isDisabled={!isCreatingNewPerson}
                        dateFormat="MM-DD-YYYY"
                        onChange={this.onDobChange}
                        selectProps={{
                          placeholder: 'MM-DD-YYYY'
                        }} />
                  </DatePickerWrapper>
                  <RequiredField><FormText noMargin>SSN (last 4 digits)</FormText></RequiredField>
                  {this.renderInput(SUBJECT_INFORMATION.SSN_LAST_4, true, 75)}
                </IndentWrapper>
              ) : null
          }
        </FormWrapper>
        <Or>OR</Or>
        <FormWrapper>
          <UnknownPersonRow selected={isCreatingNewPerson} onClick={toggleNewPerson} name="prow">
            <StyledCheckbox
                name="checkbox"
                checked={isCreatingNewPerson}
                onChange={toggleNewPerson}
                noMargin />
            <FontAwesomeIcon size="2x" icon={faUser} />
            <span>Unknown person</span>
          </UnknownPersonRow>
          {
            isCreatingNewPerson ? (
              <IndentWrapper extraIndent>
                <FormSection>
                  <RequiredField><FormText noMargin>Age (approximate)</FormText></RequiredField>
                  {this.renderInput(SUBJECT_INFORMATION.AGE, false, 70)}
                </FormSection>
                <FormSection>
                  <RequiredField><FormText noMargin>Gender</FormText></RequiredField>
                  {this.renderRadioButtons(SUBJECT_INFORMATION.GENDER, GENDERS)}
                </FormSection>
                <FormSection>
                  <RequiredField><FormText noMargin>Race</FormText></RequiredField>
                  {this.renderRadioButtons(SUBJECT_INFORMATION.RACE, RACES)}
                </FormSection>
              </IndentWrapper>
            ) : null
          }
        </FormWrapper>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {

  return {
    app: state.get('app', Map()),
    values: state.get(STATE.SUBJECT_INFORMATION),
    searchResults: state.getIn(['search', 'consumers', 'searchResults'], List())
  };
}

function mapDispatchToProps(dispatch) {

  const actions = {
    clearConsumerSearchResults,
    searchConsumers
  };

  Object.keys(ActionFactory).forEach((action) => {
    actions[action] = ActionFactory[action];
  });

  return {
    actions: {
      ...bindActionCreators(actions, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ObservedBehaviors));
