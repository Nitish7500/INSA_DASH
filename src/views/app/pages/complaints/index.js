import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ComplaintDetails from '../../../../containers/complaints/complaint-details';

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
);
const ImageList = React.lazy(() =>
  import(/* webpackChunkName: "product-image-list" */ './image-list')
);
const ThumbList = React.lazy(() =>
  import(/* webpackChunkName: "product-thumb-list" */ './thumb-list')
);
const Details = React.lazy(() =>
  import(/* webpackChunkName: "product-details" */ './details')
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
        path={`${match.url}/details`}
        render={(props) => <Details {...props} />}
      />
      <Route
        path={`${match.url}/complaint-details`}
        render={(props) => <ComplaintDetails {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesProduct;
