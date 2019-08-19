// @flow
import { DataProcessingUtils } from 'lattice-fabricate';
import { APP_TYPES_FQNS } from '../../../../../shared/Consts';
import {
  PERSON_NICK_NAME_FQN,
  PERSON_DOB_FQN,
  PERSON_FIRST_NAME_FQN,
  PERSON_LAST_NAME_FQN,
  PERSON_MIDDLE_NAME_FQN,
  PERSON_RACE_FQN,
  PERSON_SEX_FQN,

  HEIGHT_FQN,
  WEIGHT_FQN,
  EYE_COLOR_FQN,
  HAIR_COLOR_FQN,
} from '../../../../../edm/DataModelFqns';
import {
  SEX_VALUES,
  RACE_VALUES
} from '../../../constants';

const { getEntityAddressKey, getPageSectionKey } = DataProcessingUtils;
const {
  PEOPLE_FQN,
  PHYSICAL_APPEARANCE_FQN,
} = APP_TYPES_FQNS;

const schema = {
  type: 'object',
  title: 'Basics',
  properties: {
    [getPageSectionKey(1, 1)]: {
      type: 'object',
      title: '',
      properties: {
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_LAST_NAME_FQN)]: {
          type: 'string',
          title: 'Last Name'
        },
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_FIRST_NAME_FQN)]: {
          type: 'string',
          title: 'First Name'
        },
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_MIDDLE_NAME_FQN)]: {
          type: 'string',
          title: 'Middle Name'
        },
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_NICK_NAME_FQN)]: {
          type: 'array',
          title: 'Aliases',
          items: {
            type: 'string',
            enum: ['']
          },
          uniqueItems: true,
          default: []
        },
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_DOB_FQN)]: {
          type: 'string',
          title: 'Date of Birth',
          format: 'date'
        },
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_SEX_FQN)]: {
          type: 'string',
          title: 'Sex',
          enum: SEX_VALUES
        },
        [getEntityAddressKey(0, PEOPLE_FQN, PERSON_RACE_FQN)]: {
          type: 'string',
          title: 'Race',
          enum: RACE_VALUES
        },
      },
    }
  }
};

const uiSchema = {
  [getPageSectionKey(1, 1)]: {
    classNames: 'column-span-12 grid-container',
    'ui:options': {
      editable: true
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_LAST_NAME_FQN)]: {
      classNames: 'column-span-4'
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_FIRST_NAME_FQN)]: {
      classNames: 'column-span-4'
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_MIDDLE_NAME_FQN)]: {
      classNames: 'column-span-4'
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_NICK_NAME_FQN)]: {
      classNames: 'column-span-12',
      'ui:options': {
        creatable: true,
        hideMenu: true,
        placeholder: 'Press “Enter” or “Tab” after each item',
      }
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_DOB_FQN)]: {
      classNames: 'column-span-4'
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_SEX_FQN)]: {
      classNames: 'column-span-4',
    },
    [getEntityAddressKey(0, PEOPLE_FQN, PERSON_RACE_FQN)]: {
      classNames: 'column-span-4'
    },
  }
};

export {
  schema,
  uiSchema
};
