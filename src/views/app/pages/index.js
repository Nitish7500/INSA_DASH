import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Product = React.lazy(() =>
  import(/* webpackChunkName: "pages-product" */ './complaints')
);

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/product`} />
      <Route
        path={`${match.url}/product`}
        render={(props) => <Product {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Pages;
