import Communication from 'containers/pages/Communication';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ComplaintDetails from '../../../../containers/complaints/complaint-details';

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
);
// const ComplaintDetails = React.lazy(() =>
//   import(/* webpackChunkName: "product-details-alt" */ './complaint-details')
// );

const PagesProduct = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
      <Route
        path={`${match.url}/data-list/:id`}
        render={(props) => <DataList {...props} />}
      />
      <Route
        path={`${match.url}/data-list/`}
        render={(props) => <DataList {...props} />}
      />
      <Route
        path={`${match.url}/complaint-details`}
        render={(props) => <ComplaintDetails {...props} />}
      />
      <Route 
        path={`${match.url}/complaint/communication`}
        render={(props) => <Communication />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesProduct;
