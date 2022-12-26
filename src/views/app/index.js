import React, { Suspense } from "react";
import {
  Route,
  withRouter,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "layout/AppLayout";
import Pages from "./pages";
import Customer from "./Customer/Customer";
import Report from "./report";
// import BotTranscript from './BotTranscript';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ "./dashboards")
);

const BotTranscript = React.lazy(() => import("./BotTranscript/BotTranscript"));
const Leads = React.lazy(() => import("./Leads/Leads"));
const LeadCommHistory = React.lazy(() =>
  import("./Leads/CommunicationHistory")
);

const DigiLocker = React.lazy(() => import("./Customer/DigiLocker"));
const Users = React.lazy(() => import("./Users/Users"))

const App = ({ match }) => {
  const history = useHistory();
  return (
    <AppLayout history={history}>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/report`}
              render={(props) => <Report {...props} />}
            />
            <Redirect
              exact
              path={`${match.url}/`}
              to={`${match.url}/botTranscript`}
            />
            <Route
              path={`${match.url}/botTranscript`}
              render={(props) => <BotTranscript {...props} />}
            />
            <Redirect exact path={`${match.url}/`} to={`${match.url}/leads`} />
            <Route
              path={`${match.url}/leads`}
              render={(props) => <Leads {...props} />}
            ></Route>
            <Route
              path={`${match.url}/usercomment`}
              render={(props) => <LeadCommHistory {...props} />}
            />

            <Route
              path={`${match.url}/customer`}
              render={(props) => <Customer />}
            ></Route>
            <Route
              path={`${match.url}/digilocker/:id`}
              render={(props) => <DigiLocker />}
            />
            <Route
            path={`${match.url}/users`}
            render={props => <Users/> }
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
