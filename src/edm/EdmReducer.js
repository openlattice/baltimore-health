/*
 * @flow
 */

import { List, Map, fromJS } from 'immutable';
import { Models } from 'lattice';
import { EntityDataModelApiActions } from 'lattice-sagas';
import type { SequenceAction } from 'redux-reqseq';

const { FQN } = Models;
const { getAllPropertyTypes } = EntityDataModelApiActions;

const INITIAL_STATE :Map<*, *> = fromJS({
  fqnToIdMap: Map(),
  isFetchingAllPropertyTypes: false,
  propertyTypesById: Map(),
});

export default function reducer(state :Map<*, *> = INITIAL_STATE, action :Object) {

  switch (action.type) {

    case getAllPropertyTypes.case(action.type): {
      return getAllPropertyTypes.reducer(state, action, {
        REQUEST: () => state.set('isFetchingAllPropertyTypes', true),
        SUCCESS: () => {
          const seqAction :SequenceAction = (action :any);
          const propertyTypes :List<Map<*, *>> = fromJS(seqAction.value);
          const propertyTypesById :Map<string, number> = Map().asMutable();
          const fqnToIdMap :Map<FQN, string> = Map().asMutable();
          propertyTypes.forEach((propertyType :Map<*, *>) => {
            propertyTypesById.set(propertyType.get('id'), propertyType);
            fqnToIdMap.set(FQN.of(propertyType.get('type')), propertyType.get('id'));
          });
          return state
            .set('fqnToIdMap', fqnToIdMap.asImmutable())
            .set('propertyTypesById', propertyTypesById.asImmutable());
        },
        FAILURE: () => state
          .set('fqnToIdMap', Map())
          .set('propertyTypesById', Map()),
        FINALLY: () => state.set('isFetchingAllPropertyTypes', false)
      });
    }

    default:
      return state;
  }
}
