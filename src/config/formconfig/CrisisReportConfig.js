import * as FQN from '../../edm/DataModelFqns';
import { APP_TYPES_FQNS } from '../../shared/Consts';
import {
  SUBJECT_INFORMATION,
  OBSERVED_BEHAVIORS,
  CRISIS_NATURE,
  OFFICER_SAFETY,
  DISPOSITION,
  POST_PROCESS_FIELDS
} from '../../utils/constants/CrisisReportConstants';

const {
  APPEARS_IN_FQN,
  BEHAVIORAL_HEALTH_REPORT_FQN,
  PEOPLE_FQN,
  REPORTED_FQN,
  STAFF_FQN
} = APP_TYPES_FQNS;

export const BHR_CONFIG = {
  name: BEHAVIORAL_HEALTH_REPORT_FQN,
  alias: 'report',
  fields: {
    [SUBJECT_INFORMATION.PERSON_ID]: FQN.PERSON_ID_FQN,
    [POST_PROCESS_FIELDS.DOB]: FQN.DOB_FQN,
    [POST_PROCESS_FIELDS.GENDER]: FQN.GENDER_FQN,
    [POST_PROCESS_FIELDS.RACE]: FQN.RACE_FQN,
    [SUBJECT_INFORMATION.AGE]: FQN.AGE_FQN,

    [OBSERVED_BEHAVIORS.BEHAVIORS]: FQN.OBSERVED_BEHAVIORS_FQN,
    [OBSERVED_BEHAVIORS.OTHER_BEHAVIOR]: FQN.OBSERVED_BEHAVIORS_OTHER_FQN,
    [OBSERVED_BEHAVIORS.SUICIDE_ATTEMPT_TYPE]: FQN.SUICIDAL_ACTIONS_FQN,
    [OBSERVED_BEHAVIORS.SUICIDE_METHODS]: FQN.SUICIDE_ATTEMPT_METHOD_FQN,
    [OBSERVED_BEHAVIORS.OTHER_SUICIDE_METHOD]: FQN.SUICIDE_ATTEMPT_METHOD_OTHER_FQN,
    [OBSERVED_BEHAVIORS.DEMEANORS]: FQN.DEMEANORS_FQN,
    [OBSERVED_BEHAVIORS.OTHER_DEMEANOR]: FQN.OTHER_DEMEANORS_FQN,
    [POST_PROCESS_FIELDS.MILITARY_STATUS]: FQN.MILITARY_STATUS_FQN,
    [POST_PROCESS_FIELDS.IS_SUICIDAL]: FQN.SUICIDAL_FQN,

    [CRISIS_NATURE.NATURE_OF_CRISIS]: FQN.DISPATCH_REASON_FQN,
    [CRISIS_NATURE.BIOLOGICAL_CAUSES]: FQN.BIOLOGICALLY_INDUCED_CAUSES_FQN,
    [CRISIS_NATURE.CHEMICAL_CAUSES]: FQN.CHEMICALLY_INDUCED_CAUSES_FQN,
    [CRISIS_NATURE.ASSISTANCE]: FQN.PERSON_ASSISTING_FQN,
    [CRISIS_NATURE.OTHER_ASSISTANCE]: FQN.OTHER_PERSON_ASSISTING_FQN,
    [CRISIS_NATURE.HOUSING]: FQN.HOUSING_SITUATION_FQN,
    [POST_PROCESS_FIELDS.HOMELESS]: FQN.HOMELESS_FQN,

    [OFFICER_SAFETY.TECHNIQUES]: FQN.DEESCALATION_TECHNIQUES_FQN,
    [OFFICER_SAFETY.HAD_WEAPON]: FQN.ARMED_WITH_WEAPON_FQN,
    [OFFICER_SAFETY.WEAPONS]: FQN.ARMED_WEAPON_TYPE_FQN,
    [OFFICER_SAFETY.OTHER_WEAPON]: FQN.OTHER_WEAPON_TYPE_FQN,
    [OFFICER_SAFETY.THREATENED_VIOLENCE]: FQN.THREATENED_INDICATOR_FQN,
    [OFFICER_SAFETY.THREATENED_PERSON_RELATIONSHIP]: FQN.DIRECTED_AGAINST_RELATION_FQN,
    [OFFICER_SAFETY.INJURY_TYPE]: FQN.INJURIES_FQN,
    [OFFICER_SAFETY.OTHER_INJURY_TYPE]: FQN.INJURIES_OTHER_FQN,
    [OFFICER_SAFETY.INJURED_PARTIES]: FQN.PERSON_INJURED_FQN,
    [OFFICER_SAFETY.OTHER_INJURED_PERSON]: FQN.OTHER_PERSON_INJURED_FQN,

    [DISPOSITION.SPECIALISTS]: FQN.SPECIAL_RESOURCES_CALLED_FQN,
    [DISPOSITION.DISPOSITIONS]: FQN.DISPOSITION_FQN,
    [DISPOSITION.VERBAL_REFERRALS]: FQN.REFERRAL_DEST_FQN,
    [DISPOSITION.OTHER_VERBAL_REFERRAL]: FQN.OTHER_TEXT_FQN,
    [DISPOSITION.REPORT_NUMBER]: FQN.OL_ID_FQN,
    [DISPOSITION.INCIDENT_DESCRIPTION]: FQN.INCIDENT_NARRATIVE_FQN,
    [DISPOSITION.WAS_VOLUNTARY_TRANSPORT]: FQN.VOLUNTARY_ACTION_INDICATOR_FQN,
    [DISPOSITION.PEOPLE_NOTIFIED]: FQN.CATEGORY_FQN,
    [DISPOSITION.OTHER_PEOPLE_NOTIFIED]: FQN.OTHER_NOTIFIED_FQN,
    [DISPOSITION.COURTESY_TRANSPORTS]: FQN.ORGANIZATION_NAME_FQN,
    [DISPOSITION.INCIDENT_DATE_TIME]: FQN.DATE_TIME_OCCURRED_FQN,

    [POST_PROCESS_FIELDS.FORM_ID]: FQN.COMPLAINT_NUMBER_FQN,
    [POST_PROCESS_FIELDS.FORM_TYPE]: FQN.TYPE_FQN,
    [POST_PROCESS_FIELDS.VERBAL_REFERRAL_INDICATOR]: FQN.REFERRAL_PROVIDER_INDICATOR_FQN,
    [POST_PROCESS_FIELDS.HOSPITAL_TRANPORT]: FQN.HOSPITAL_TRANSPORT_INDICATOR_FQN,
    [POST_PROCESS_FIELDS.TRANSPORT_INDICATOR]: FQN.TRANSPORT_INDICATOR_FQN,
    [POST_PROCESS_FIELDS.NARCAN_ADMINISTERED]: FQN.NARCAN_ADMINISTERED_FQN,
    [POST_PROCESS_FIELDS.ARRESTABLE_OFFENSE]: FQN.ARRESTABLE_OFFENSE_FQN,
    [POST_PROCESS_FIELDS.ARREST_INDICATOR]: FQN.ARREST_INDICATOR_FQN,
    [POST_PROCESS_FIELDS.CRIMES_AGAINST_PERSON]: FQN.CRIMES_AGAINST_PERSON_FQN,
    [POST_PROCESS_FIELDS.FELONY_COMMITTED]: FQN.FELONY_INDICATOR_FQN,
    [POST_PROCESS_FIELDS.NO_ACTION_POSSIBLE]: FQN.NO_ACTION_POSSIBLE_FQN,
    [POST_PROCESS_FIELDS.UNABLE_TO_CONTACT]: FQN.UNABLE_TO_CONTACT_FQN,
    [POST_PROCESS_FIELDS.RESOURCES_DECLINED]: FQN.RESOURCES_DECLINED_FQN
  }
};

const config = {
  entitySets: [
    {
      name: PEOPLE_FQN,
      alias: 'person',
      fields: {
        [SUBJECT_INFORMATION.PERSON_ID]: FQN.PERSON_ID_FQN,
        [SUBJECT_INFORMATION.LAST]: FQN.PERSON_LAST_NAME_FQN,
        [SUBJECT_INFORMATION.FIRST]: FQN.PERSON_FIRST_NAME_FQN,
        [SUBJECT_INFORMATION.MIDDLE]: FQN.PERSON_MIDDLE_NAME_FQN,
        [SUBJECT_INFORMATION.AKA]: FQN.PERSON_NICK_NAME_FQN,
        [SUBJECT_INFORMATION.DOB]: FQN.PERSON_DOB_FQN,
        [SUBJECT_INFORMATION.GENDER]: FQN.PERSON_SEX_FQN,
        [SUBJECT_INFORMATION.RACE]: FQN.PERSON_RACE_FQN,
        [SUBJECT_INFORMATION.SSN_LAST_4]: FQN.PERSON_SSN_LAST_4_FQN,
      }
    },
    BHR_CONFIG,
    {
      name: STAFF_FQN,
      alias: 'staff',
      fields: {
        [POST_PROCESS_FIELDS.USER_EMAIL]: FQN.PERSON_ID_FQN
      }
    },
    {
      name: APPEARS_IN_FQN,
      alias: 'appearsin',
      entityId: POST_PROCESS_FIELDS.TIMESTAMP,
      fields: {
        [POST_PROCESS_FIELDS.TIMESTAMP]: FQN.DATE_TIME_FQN
      }
    },
    {
      name: REPORTED_FQN,
      alias: 'reported',
      entityId: POST_PROCESS_FIELDS.TIMESTAMP,
      fields: {
        [POST_PROCESS_FIELDS.TIMESTAMP]: FQN.DATE_TIME_FQN
      }
    }
  ],
  associations: [
    {
      src: 'person',
      dst: 'report',
      association: 'appearsin'
    },
    {
      src: 'staff',
      dst: 'report',
      association: 'reported'
    }
  ]
};

export default config;