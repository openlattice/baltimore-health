import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Map } from 'immutable';


import ReportsListContainer from './ReportsListContainer';
import BHRSummaryContainer from './BHRSummaryContainer';
import {
  PAGE_1,
  PAGE_2
} from './ConsumerSummaryConstants';
import StyledCard from '../../components/cards/StyledCard';
import { ContainerInnerWrapper, ContainerOuterWrapper } from '../../shared/Layout';
import { APP_TYPES_FQNS } from '../../shared/Consts';

const {
  APPEARS_IN_FQN,
  BEHAVIORAL_HEALTH_REPORT_FQN,
  PEOPLE_FQN
} = APP_TYPES_FQNS;


class ConsumerSummaryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: Map()
    };
  }

  onSelectSearchResult = (report) => {
    this.setState(
      {
        selectedReport: report
      },
      () => {
        this.props.history.push(PAGE_2);
      }
    );
  }

  renderReportsList = () => (
    <ReportsListContainer onSelectSearchResult={this.onSelectSearchResult} />
  )

  renderReportSummary = () => (
    <BHRSummaryContainer selectedReport={this.state.selectedReport} />
  )

  render() {
    return (
      <Switch>
        <Route path={PAGE_1} render={this.renderReportsList} />
        <Route path={PAGE_2} render={this.renderReportSummary} />
        <Redirect to={PAGE_1} />
      </Switch>
    );
  }
}

export default ConsumerSummaryContainer;
