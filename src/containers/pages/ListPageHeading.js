/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
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
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;

  return (
    <Row>
      <Colxx xxs="12" className="position-relative p-2" style={{height: '130px'}}>
        <div className="fixedSectionHeader">
          <div className="mb-2">
            <h1> {heading} </h1>

            <div className="text-zero top-right-button-container">

              <Button color='info' size='md' className="top-right-button">
                <i className="simple-icon-reload" />
              </Button>
              <Button color='success' size='md' className="top-right-button mx-3">
                <i className="simple-icon-cloud-download" />
              </Button>
              <Button color='warning' size='md' className="top-right-button mr-3">
                <i className="simple-icon-cloud-download" />
              </Button>

              <Button
                color="primary"
                size="md"
                className="top-right-button"
                onClick={() => toggleModal()}
              >
                <IntlMessages id="pages.add-new" />
              </Button>
              {/* Select options Check Box Dropdown :: after exports */}
            </div>
            {/* <Breadcrumb match={match} /> */}
          </div>

          <div className="mb-2">
            {/* <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="pages.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button> */}
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
                    onKeyPress={(e) => onSearchKey(e)}
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

{/* Select options Check Box Dropdown */}
{/* <ButtonDropdown
  isOpen={dropdownSplitOpen}
  toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
>
  <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
    <CustomInput
      className="custom-checkbox mb-0 d-inline-block"
      type="checkbox"
      id="checkAll"
      checked={selectedItemsLength >= itemsLength}
      onChange={() => handleChangeSelectAll(true)}
      label={
        <span
          className={`custom-control-label ${
            selectedItemsLength > 0 &&
            selectedItemsLength < itemsLength
              ? 'indeterminate'
              : ''
          }`}
        />
      }
    />
  </div>
  <DropdownToggle
    caret
    color="primary"
    className="dropdown-toggle-split btn-lg"
  />
  <DropdownMenu right>
    <DropdownItem>
      <IntlMessages id="pages.delete" />
    </DropdownItem>
    <DropdownItem>
      <IntlMessages id="pages.another-action" />
    </DropdownItem>
  </DropdownMenu>
</ButtonDropdown> */}

{/* Sort By Order Dropdown */}
{/* <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
  <DropdownToggle caret color="outline-dark" size="sm">
    <IntlMessages id="pages.orderby" />
    {selectedOrderOption.label}
  </DropdownToggle>
  <DropdownMenu>
    {orderOptions.map((order, index) => {
      return (
        <DropdownItem
          key={index}
          onClick={() => changeOrderBy(order.column)}
        >
          {order.label}
        </DropdownItem>
      );
    })}
  </DropdownMenu>
</UncontrolledDropdown> */}

{/* Data List Show Options */}
{/* <span className="mr-3 d-inline-block float-md-left">
  <a
    href="#/"
    className={`mr-2 view-icon ${
      displayMode === 'list' ? 'active' : ''
    }`}
    onClick={() => changeDisplayMode('list')}
  >
    <DataListIcon />
  </a>
  <a
    href="#/"
    className={`mr-2 view-icon ${
      displayMode === 'thumblist' ? 'active' : ''
    }`}
    onClick={() => changeDisplayMode('thumblist')}
  >
    <ThumbListIcon />
  </a>
  <a
    href="#/"
    className={`mr-2 view-icon ${
      displayMode === 'imagelist' ? 'active' : ''
    }`}
    onClick={() => changeDisplayMode('imagelist')}
  >
    <ImageListIcon />
  </a>
</span> */}