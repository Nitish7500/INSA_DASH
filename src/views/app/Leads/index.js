import React from "react";
import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Default = React.lazy(() => {
  import("./Leads");
});

function Leads({ match }) {
  <Suspense fallback={<div className="loading"></div>}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <Default {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>;
  return <div>Leads</div>;
}

export default Leads;
