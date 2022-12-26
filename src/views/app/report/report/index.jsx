import Communication from 'containers/pages/Communication';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SmsData from './Component/UserReport';

const ReportData = React.lazy(() =>
  import('./Report')
);

const PagesReport = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
      <Route
        path={`${match.url}/all/`}
        render={(props) => <ReportData {...props} />}
      />
      <Route 
        path={`${match.url}/user-report`}
        render={(props) => <SmsData {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesReport;
