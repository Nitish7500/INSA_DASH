import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { getCurrentUser } from 'helpers/Utils';

const user = getCurrentUser();

const DefaultDashboard = ({ intl, match }) => {

  return (
    <>
      <h1>Welcome <span className="text-warning">{user.data.userType}</span> !</h1>
      
      <p>Work in Progress...</p>
    </>
  );
};
export default injectIntl(DefaultDashboard);
