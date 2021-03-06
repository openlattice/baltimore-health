// @flow
import React, { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

import { List } from 'immutable';
import {
  PaginationToolbar,
  SearchResults,
  Spinner,
} from 'lattice-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { RequestStates } from 'redux-reqseq';
import type { FQN } from 'lattice';
import type { RequestSequence } from 'redux-reqseq';

import { ExploreResultsWrapper, NoResults } from './styled';

import Accordion from '../../components/accordion';
import type { SearchResultProps } from '../../types';

const MAX_HITS = 10;

type Props = {
  appType :FQN;
  resultComponent :ComponentType<SearchResultProps>;
  searchAction :RequestSequence;
  title :string;
}

const ExploreGenericResults = ({
  appType,
  resultComponent,
  searchAction,
  title
} :Props) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((store) => store.getIn(['explore', appType, 'hits'], List()));
  const totalHits = useSelector((store) => store.getIn(['explore', appType, 'totalHits'], 0));
  const searchTerm = useSelector((store) => store.getIn(['explore', appType, 'searchTerm']));
  const fetchState = useSelector((store) => store.getIn(['explore', appType, 'fetchState']));
  const savedPage = useSelector((store) => store.getIn(['explore', appType, 'page']));
  const [page, setPage] = useState(savedPage);

  const hasSearched = fetchState !== RequestStates.STANDBY;
  const isLoading = fetchState === RequestStates.PENDING;

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  useEffect(() => {
    setPage(savedPage);
  }, [savedPage]);

  const dispatchSearch = (start = 0, pageNumber) => {
    if (searchTerm.trim().length) {
      dispatch(searchAction({
        searchTerm: searchTerm.trim(),
        start,
        maxHits: MAX_HITS,
        page: pageNumber
      }));
    }
  };

  const onPageChange = ({ page: newPage, start }) => {
    dispatchSearch(start, newPage);
    setPage(newPage);
  };

  const caption = isLoading ? <Spinner /> : `(${totalHits} results)`;

  if (hasSearched) {
    return (
      <div>
        <Accordion>
          <div caption={caption} headline={title} defaultOpen={false}>
            <ExploreResultsWrapper>
              <SearchResults
                  noResults={NoResults}
                  hasSearched={hasSearched}
                  isLoading={isLoading}
                  resultComponent={resultComponent}
                  results={searchResults} />
              <PaginationToolbar
                  count={totalHits}
                  onPageChange={onPageChange}
                  page={page}
                  rowsPerPage={MAX_HITS} />
            </ExploreResultsWrapper>
          </div>
        </Accordion>
      </div>
    );
  }
  return null;
};

export default ExploreGenericResults;
