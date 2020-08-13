import { DataProcessingUtils } from 'lattice-fabricate';

import { SAFETY_TYPES } from './constants';

import {
  CATEGORY_FQN,
  TECHNIQUES_FQN,
  TRIGGER_FQN,
} from '../../../../../edm/DataModelFqns';
import { APP_TYPES_FQNS } from '../../../../../shared/Consts';

const { getEntityAddressKey, getPageSectionKey } = DataProcessingUtils;
const {
  BEHAVIOR_FQN,
  INTERACTION_STRATEGY_FQN,
  OFFICER_SAFETY_CONCERNS_FQN,
} = APP_TYPES_FQNS;

const schema = {
  definitions: {
    officerSafetyCaution: {
      type: 'object',
      properties: {
        [getEntityAddressKey(-1, OFFICER_SAFETY_CONCERNS_FQN, CATEGORY_FQN)]: {
          title: 'Safety type',
          type: 'string',
          enum: SAFETY_TYPES,
        },
      }
    },
    trigger: {
      type: 'object',
      properties: {
        [getEntityAddressKey(-1, BEHAVIOR_FQN, TRIGGER_FQN)]: {
          type: 'string',
          title: 'Trigger'
        }
      }
    },
    deescalation: {
      type: 'object',
      properties: {
        [getEntityAddressKey(-1, INTERACTION_STRATEGY_FQN, TECHNIQUES_FQN)]: {
          type: 'string',
          title: 'Technique'
        }
      }
    }
  },
  type: 'object',
  title: '',
  properties: {
    [getPageSectionKey(1, 1)]: {
      type: 'array',
      title: 'Officer Safety Concerns',
      items: {
        $ref: '#/definitions/officerSafetyCaution'
      }
    },
    [getPageSectionKey(1, 2)]: {
      type: 'array',
      title: 'Triggers',
      items: {
        $ref: '#/definitions/trigger'
      },
    },
  }
};

const uiSchema = {
  [getPageSectionKey(1, 1)]: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Officer Safety Concern',
      addActionKey: 'addOfficerSafetyConcerns',
      orderable: false
    },
    items: {
      classNames: 'grid-container',
      'ui:options': {
        editable: true
      },
      [getEntityAddressKey(-1, OFFICER_SAFETY_CONCERNS_FQN, CATEGORY_FQN)]: {
        classNames: 'column-span-12',
        'ui:options': {
          creatable: true,
        }
      },
    }
  },
  [getPageSectionKey(1, 2)]: {
    classNames: 'column-span-12',
    'ui:options': {
      addButtonText: '+ Add Trigger',
      addActionKey: 'addTrigger',
      orderable: false
    },
    items: {
      classNames: 'grid-container',
      'ui:options': {
        editable: true
      },
      [getEntityAddressKey(-1, BEHAVIOR_FQN, TRIGGER_FQN)]: {
        classNames: 'column-span-12'
      }
    }
  },
};

export { schema, uiSchema };
