import React from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

const DefaultDashboard = ({ intl, match }) => {

  return (
    <>
      <h1 className="text-center">Work in Progress !</h1>
    </>
  );
};
export default injectIntl(DefaultDashboard);
