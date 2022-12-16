/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

import { DataListIcon, ThumbListIcon, ImageListIcon } from 'components/svg';
import Breadcrumb from '../navs/Breadcrumb';
import { capitalizeEachWordInString, capitalizeFirstLetter } from 'helpers/CommonHelper';
import { downloadComplaintsReport, downloadCustomerReport, getComplaints } from 'services/complaints.services';
import { NotificationManager } from 'components/common/react-notifications';

const ListPageHeading = ({
  intl,
  displayMode,
  changeDisplayMode,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
  filter,
 handleSearch
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;
  const [items, setItems] = useState([]);
  
  const currentFilter = ( (typeof(filter)==undefined) ? 'All Complaints' : capitalizeEachWordInString(filter));

  // Download Complaints
  const downloadReport = async () => {
    try {
      const {message} = await downloadComplaintsReport();
      setItems(message);
      NotificationManager.success(
        message,
        'Report Downloaded Sucessfully',
        3000,
        null,
        null,
        'filled'
      );
    } catch (error) {
      console.log("Download Report",error)
    }
  }

  // Download Customer Report
  const downloadCustReport = async () => {
    try {
      const {message, success} = await downloadCustomerReport();
      setItems(message, success);
      console.log('items', items)
      if (success === true) {
        NotificationManager.success(
          message,
          'Report Downloaded Sucessfully',
          3000,
          null,
          null,
          'filled'
        );
      } else if (success === false) {
        NotificationManager.error(
          message,
          'Some Error Occured !',
          3000,
          null,
          null,
          'filled'
        );
      }
    } catch (error) {
      console.log("Download Report",error);
      NotificationManager.error(
        error.message,
        'Failed to download Reports',
        3000,
        null,
        null,
        'filled'
      );
    }
  }

  return (
    <Row>
      <Colxx xxs="12" className="position-relative p-2" style={{height: '130px'}}>
        <div className="fixedSectionHeader">
          <div className="mb-2">
            <h1> {currentFilter ? currentFilter : 'All'} Complaints </h1>

            <div className="text-zero top-right-button-container">

              <Button color='info' size='md' className="top-right-button" onClick={() => window.location.reload()} >
                <i className="simple-icon-reload" />
              </Button>
              <Button color='success' size='md' className="top-right-button mx-3" onClick={downloadReport}>
                <i className="simple-icon-cloud-download mr-2" /> <span>Download Complaint Report</span>
              </Button>
              <Button color='warning' size='md' className="top-right-button mr-3" onClick={downloadCustReport}>
                <i className="simple-icon-cloud-download mr-2" /> <span>Download Customer Report</span>
              </Button>

              {/* Select options Check Box Dropdown :: after exports */}
            </div>
            {/* <Breadcrumb match={match} /> */}
          </div>

          <div className="mb-2">
            <Collapse isOpen={displayOptionsIsOpen} className="d-md-block row" id="displayOptions" >
              
              {/* Data List Show Options :: after export */}
              <div className="d-block d-md-inline-block pt-1 col-md-4 col-sm-12" style={{paddingLeft: '0px'}}>

                {/* Sort By Order Dropdown :: after export */}

                {/* Search Bar */}
                <div className="search-sm d-inline-block float-md-left ml-2 mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder={messages['menu.search']}
                    onChange={handleSearch}
                    className={'py-2'}
                  />
                </div>
              </div>
              <div className="float-md-right pt-1 mr-3">
                <span className="text-muted text-small mr-3">
                  <IntlMessages id="pages.viewing" />
                  {startIndex + 1}-
                  {totalItemCount >= endIndex ? endIndex : totalItemCount}
                  {` | `}
                  <IntlMessages id="pages.total" />
                  {totalItemCount}
                </span>
                <UncontrolledDropdown className="d-inline-block">
                  <DropdownToggle caret color="outline-dark" size="sm">
                    {selectedPageSize}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {pageSizes.map((size, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changePageSize(size)}
                        >
                          {size}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Collapse>
          </div>
        
          {/* <Separator className="mb-5" /> */}
        </div>
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);