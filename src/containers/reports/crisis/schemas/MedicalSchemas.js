import { DataProcessingUtils } from 'lattice-fabricate';

import {
  DRUGS_ALCOHOL,
  SELECT_ALL_THAT_APPLY,
  SELECT_ONLY_ONE,
  YES_NO_UNKNOWN
} from './constants';

import * as FQN from '../../../../edm/DataModelFqns';
import { APP_TYPES_FQNS } from '../../../../shared/Consts';

const {
  DIAGNOSIS_FQN,
  MEDICATION_STATEMENT_FQN,
  SUBSTANCE_FQN,
  SUBSTANCE_HISTORY_FQN
} = APP_TYPES_FQNS;

const { getEntityAddressKey, getPageSectionKey } = DataProcessingUtils;

const schema = {
  definitions: {
    diagnosis: {
      type: 'object',
      properties: {
        [getEntityAddressKey(-1, DIAGNOSIS_FQN, FQN.NAME_FQN)]: {
          type: 'string',
          title: 'Diagnosis'
        }
      }
    },
    medication: {
      type: 'object',
      properties: {
        [getEntityAddressKey(-1, MEDICATION_STATEMENT_FQN, FQN.NAME_FQN)]: {
          type: 'string',
          title: 'Medication',
        },
        [getEntityAddressKey(-1, MEDICATION_STATEMENT_FQN, FQN.TAKEN_AS_PRESCRIBED_FQN)]: {
          type: 'string',
          description: SELECT_ONLY_ONE,
          title: 'Compliance',
          enum: YES_NO_UNKNOWN
        }
      }
    }
  },
  type: 'object',
  properties: {
    [getPageSectionKey(4, 1)]: {
      type: 'array',
      title: 'Diagnoses',
      items: {
        $ref: '#/definitions/diagnosis'
      },
      default: [{}],
    },
    [getPageSectionKey(4, 2)]: {
      type: 'array',
      title: 'Prescribed Medication',
      items: {
        $ref: '#/definitions/medication'
      },
      default: [{}],
    },
    [getPageSectionKey(4, 3)]: {
      type: 'object',
      title: 'Drugs & Alcohol Involvement',
      properties: {
        [getEntityAddressKey(0, SUBSTANCE_FQN, FQN.TYPE_FQN)]: {
          title: 'Substance use during incident',
          type: 'array',
          description: SELECT_ALL_THAT_APPLY,
          items: {
            type: 'string',
            enum: DRUGS_ALCOHOL,
          },
          // minItems: 1,
          uniqueItems: true
        },
        [getEntityAddressKey(0, SUBSTANCE_HISTORY_FQN, FQN.TYPE_FQN)]: {
          title: 'History of substance abuse or treatment',
          type: 'array',
          description: SELECT_ALL_THAT_APPLY,
          items: {
            type: 'string',
            enum: DRUGS_ALCOHOL,
          },
          // minItems: 1,
          uniqueItems: true
        },
      }
    },
  },
};

const uiSchema = {
  [getPageSectionKey(4, 1)]: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Diagnosis',
      orderable: false,
    },
    items: {
      classNames: 'grid-container',
      'ui:options': {
        editable: true
      },
      [getEntityAddressKey(-1, DIAGNOSIS_FQN, FQN.NAME_FQN)]: {
        classNames: 'column-span-12',
      }
    },
  },
  [getPageSectionKey(4, 2)]: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Medication',
      orderable: false,
    },
    items: {
      classNames: 'grid-container',
      [getEntityAddressKey(-1, MEDICATION_STATEMENT_FQN, FQN.NAME_FQN)]: {
        classNames: 'column-span-12'
      },
      [getEntityAddressKey(-1, MEDICATION_STATEMENT_FQN, FQN.TAKEN_AS_PRESCRIBED_FQN)]: {
        classNames: 'column-span-12',
        'ui:widget': 'radio',
        'ui:options': {
          mode: 'button',
          row: true,
        }
      },
    }
  },
  [getPageSectionKey(4, 3)]: {
    classNames: 'column-span-12 grid-container',
    [getEntityAddressKey(0, SUBSTANCE_FQN, FQN.TYPE_FQN)]: {
      classNames: 'column-span-12',
      'ui:widget': 'checkboxes',
      'ui:options': {
        mode: 'button',
        row: true,
        withNone: true,
        withOther: true,
      }
    },
    [getEntityAddressKey(0, SUBSTANCE_HISTORY_FQN, FQN.TYPE_FQN)]: {
      classNames: 'column-span-12',
      'ui:widget': 'checkboxes',
      'ui:options': {
        mode: 'button',
        row: true,
        withNone: true,
        withOther: true,
      }
    },
  }
};

export {
  schema,
  uiSchema
};
