import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Default = React.lazy(() => {
  import("./BotTranscript");
});

const BotTranscript = ({ match }) => (
  <Suspense fallback={<div className="loading"></div>}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <Default {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

export default BotTranscript;
