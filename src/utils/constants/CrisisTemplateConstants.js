/* Field names */

export const INCOMPLETE = 'incomplete';

export const OTHER = 'Other';

export const SUBJECT_INFORMATION = {
  FULL_NAME: 'fullName',
  PERSON_ID: 'personId',
  IS_NEW_PERSON: 'isNewPerson',
  LAST: 'lastName',
  FIRST: 'firstName',
  MIDDLE: 'middleInitial',
  DOB: 'dob',
  GENDER: 'gender',
  RACE: 'race',
  AGE: 'age',
  SSN_LAST_4: 'last4SSN'
};

export const OBSERVED_BEHAVIORS = {
  VETERAN: 'isVeteran',
  BEHAVIORS: 'behaviors',
  OTHER_BEHAVIOR: 'otherBehavior',
  DEMEANORS: 'demeanors',
  OTHER_DEMEANOR: 'otherDemeanor'
};

export const CRISIS_NATURE = {
  NATURE_OF_CRISIS: 'natureOfCrisis',
  ASSISTANCE: 'assistance',
  OTHER_ASSISTANCE: 'otherAssistance',
  HOUSING: 'currentHousing'
};

export const OFFICER_SAFETY = {
  TECHNIQUES: 'techniques',
  HAD_WEAPON: 'hadWeapon',
  WEAPONS: 'weapons',
  OTHER_WEAPON: 'otherWeapon',
  THREATENED_VIOLENCE: 'threatenedViolence',
  THREATENED_PERSON_NAME: 'threatenedPersonName',
  THREATENED_PERSON_RELATIONSHIP: 'threatenedPersonRelationship',
  HAD_INJURIES: 'hadInjuries',
  INJURY_DESCRIPTION: 'injuryDescription',
  INJURY_TYPE: 'injuryType',
  OTHER_INJURY_TYPE: 'otherInjuryType'
};

export const DISPOSITION = {
  SPECIALISTS: 'specialists',
  DISPOSITIONS: 'dispositions',
  HAS_REPORT_NUMBER: 'hasReportNumber',
  REPORT_NUMBER: 'reportNumber',
  INCIDENT_DESCRIPTION: 'incidentDescription',

  // for disposition field
  PEOPLE_NOTIFIED: 'peopleNotified',
  OTHER_PEOPLE_NOTIFIED: 'otherPeopleNotified',
  VERBAL_REFERRALS: 'verbalReferrals',
  OTHER_VERBAL_REFERRAL: 'otherVerbalReferral',
  COURTESY_TRANSPORTS: 'courtesyTransports',
  TRANSPORT_INDICATOR: 'tranportDidHappen',
  HOSPITALS: 'hospitals',
  WAS_VOLUNTARY_TRANSPORT: 'wasVoluntaryTransport',
  ARRESTABLE_OFFENSES: 'arrestableOffenses',
  NO_ACTION_VALUES: 'noActionPossibleValues'
};

export const POST_PROCESS_FIELDS = {
  FORM_TYPE: 'formSubmissionType',
  TIMESTAMP: 'timestamp',
  FORM_ID: 'formId',
  HOMELESS: 'isHomeless',
  DOB: 'personDOB',
  GENDER: 'personGender',
  RACE: 'personRace',

  MILITARY_STATUS: 'militaryStatus',

  VERBAL_REFERRAL_INDICATOR: 'verbalReferralIndicator',
  HOSPITAL_TRANPORT: 'hospitalTransport',
  NARCAN_ADMINISTERED: 'narcanAdministered',
  ARRESTABLE_OFFENSE: 'arrestableOffense',

  ARREST_INDICATOR: 'personWasArrested',
  CRIMES_AGAINST_PERSON: 'crimesAgainstPerson',
  FELONY_COMMITTED: 'felonyWasCommitted',
  NO_ACTION_POSSIBLE: 'noActionPossible',
  UNABLE_TO_CONTACT: 'unableToContact',
  RESOURCES_DECLINED: 'resourcesOfferedAndDeclined'
};
