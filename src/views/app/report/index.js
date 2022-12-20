import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Comp = React.lazy(() =>
  import('./report')
);

const Report = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route
        path={`${match.url}`}
        render={(props) => <Comp {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Report;
