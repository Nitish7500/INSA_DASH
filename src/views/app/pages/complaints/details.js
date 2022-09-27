import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import GlideComponentThumbs from 'components/carousel/GlideComponentThumbs';
import { detailImages, detailThumbs } from 'data/carouselItems';
import detailsQuestionsData from 'data/questions';
import CommentWithLikes from 'components/pages/CommentWithLikes';
import { commentWithLikesData } from 'data/comments';
import QuestionAnswer from 'components/pages/QuestionAnswer';
import GalleryDetail from 'containers/pages/GalleryDetail';

const DetailsPages = ({ match, intl }) => {
  const [activeTab, setActiveTab] = useState('details');

  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12" className="my-3 ml-1">
          <h1>Complaint Details</h1>
          <div className="text-zero top-right-button-container">
              <Button color='info' size='md' className="top-right-button">
                <p className='mb-0'>Lead Communication</p>
              </Button>
              <Button color='success' size='md' className="top-right-button mx-3">
                <p className='mb-0'>Complaint Communication</p>
              </Button>
              <Button color='warning' size='md' className="top-right-button mr-3">
                <p className='mb-0'>Add More Complaint</p>
              </Button>
              <Button color='primary' size='md' className="top-right-button mr-3">
                <p className='mb-0'>Additional Button</p>
              </Button>
          </div>

          {/* <Breadcrumb match={match} />
          <Separator className="mb-5" /> */}

          <Row>
            <Colxx className="col mt-3 mr-3">
              <Card className="mb-4">
                <CardHeader>
                  <Nav tabs className="card-header-tabs ">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'details',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('details')}
                        to="#"
                        location={{}}
                      >
                        <p className='mb-0'>Complaint Details</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'comments',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('comments')}
                        to="#"
                        location={{}}
                      >
                        <p className="mb-0">Mailing Section</p>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'questions',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('questions')}
                        to="#"
                        location={{}}
                      >
                        <p className="mb-0">IGMS</p>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <TabContent activeTab={activeTab}>

                  {/* complaint details */}
                  <TabPane tabId="details">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>

                  {/* Mailing Section Tab */}
                  <TabPane tabId="comments">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>

                  {/* igms section tab */}
                  <TabPane tabId="questions">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(DetailsPages);
