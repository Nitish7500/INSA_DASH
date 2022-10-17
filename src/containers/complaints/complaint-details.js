import React, { useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
} from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';

import Breadcrumb from 'containers/navs/Breadcrumb';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import FormikCustomComponents from 'containers/form-validations/FormikCustomComponents';
import DetailsForm from 'components/reusable-components/tabpanes/forms/details-form';
import MailingSectionForm from 'components/reusable-components/tabpanes/forms/mailing-section';
import IGMSForm from 'components/reusable-components/tabpanes/forms/igms-form';
import OmbudsmanForm from 'components/reusable-components/tabpanes/forms/ombudsman-form';
import ResolutionForm from 'components/reusable-components/tabpanes/forms/resolution-form';
import LegalForm from 'components/reusable-components/tabpanes/forms/legal-form';
import SavedEmail from 'components/reusable-components/tabpanes/forms/save-email';
import GetEmailData from 'components/reusable-components/tabpanes/forms/get-email';
import DocumentForm from 'components/reusable-components/tabpanes/forms/document-form';
import NonResponsive from 'components/reusable-components/tabpanes/forms/non-responsive';

const ComplaintDetails = ({ match }) => {
  const [activeTab, setActiveTab] = useState('details');

  let {search} = useLocation();
  const query = new URLSearchParams(search);
  const complaintId = query.get('complaintId');
  console.log(complaintId);

  // const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12" className="my-3">
          <h1 className='mb-4'>Complaint Details </h1>
          <div className="text-zero top-right-button-container">
            <Button color='danger' size='md' className="top-right-button mr-3">
              <p className='mb-0'>Add More Complaint</p>
            </Button>
          </div>
          <Breadcrumb match={match} />

          {/* <h2 className='mb-4'>Complaint ID : {complaintId}</h2> */}
          <Nav tabs className="separator-tabs ml-0 mt-3 mb-5">
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'details',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('details')}
              >
                <span>Complaint Details</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'mailing',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('mailing')}
              >
                <span>Mailing Section</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'igms',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('igms')}
              >
                <span>IGMS</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'ombudsman',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('ombudsman')}
              >
                <span>Ombudsman</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'resolution',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('resolution')}
              >
                <span>Resolution</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'legal',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('legal')}
              >
                <span>Legal</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'saveEmail',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('saveEmail')}
              >
                <span>Save Email</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'getEmail',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('getEmail')}
              >
                <span>Get Email Data</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'document',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('document')}
              >
                <span>Document</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                location={{}}
                to="#"
                className={classnames({
                  active: activeTab === 'nonResponsive',
                  'nav-link': true,
                })}
                onClick={() => setActiveTab('nonResponsive')}
              >
                <span>Non Responsive</span>
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>

            <TabPane tabId="details">
              <DetailsForm heading='Complaint Details Form' />
            </TabPane>

            <TabPane tabId="mailing">
              <MailingSectionForm heading='Mailing Section' />
            </TabPane>

            <TabPane tabId="igms">
              <IGMSForm heading='IGMS Section' />
            </TabPane>

            <TabPane tabId="ombudsman">
              <OmbudsmanForm heading='Ombudsman Section'/>
            </TabPane>

            <TabPane tabId="resolution">
              <ResolutionForm heading='Resolution Section'/>
            </TabPane>

            <TabPane tabId="legal">
              <LegalForm heading='Legal Section' />
            </TabPane>

            <TabPane tabId="saveEmail">
              <SavedEmail heading='Send Email Section' />
            </TabPane>

            <TabPane tabId="getEmail">
              <GetEmailData heading='Get Email Data' />
            </TabPane>
          
            <TabPane tabId="document">
              <DocumentForm heading='Document Uploads' />
            </TabPane>

            <TabPane tabId="nonResponsive">
              <NonResponsive heading='Non Responsive Customer Flow' />
            </TabPane>

          </TabContent>

        </Colxx>
      </Row>
    </>
  );
};
export default ComplaintDetails;
