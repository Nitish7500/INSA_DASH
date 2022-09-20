import React from 'react';
import { Card, CustomInput, Badge, Button, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useState } from 'react';

const DataListView = ({ complaint, isSelect, collect, onCheckItem }) => {
// policyNumber email phone status insuranceCompanyId{address name policyTypeId} policyTypeId complaintTypeId{name} 
  const {policyNumber,userId, email,phone, status, insuranceCompanyId,complaintTypeId,policyTypeId} = complaint;
  const [collapse, setCollapse] = useState(false);
  const [selectedAccordion, setSelectedAccordion] = useState(1);

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={complaint.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, complaint.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >

          <div className="tableContainer">
            {/* a dynamically generated table row */}
            <div className="tableRow">
              <div className='record-data'>
                <div className="card-body tableRow-card align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <Button
                    color="primary"
                    onClick={() => setCollapse(!collapse)}
                    className="mb-1 dropdown-toggle-split dropdown-toggle btn mr-2"
                  >
                    {/* <IntlMessages id="collapse.toggle" /> */}
                  </Button>
                  <NavLink to={`?p=${complaint?._id}`} className="w-40 w-sm-100 columnLead">
                    <p className="list-item-heading mb-0 truncate">
                      {policyNumber}
                    </p>
                  </NavLink>
                  <p className="mb-0 text-muted text-small w-15 w-sm-100 cardCell">
                    {userId?.name}
                  </p>
                  <p className="mb-0 text-muted text-small w-15 w-sm-100 cardCell">
                    {email}
                  </p>
                  <p className="mb-0 text-muted text-small w-15 w-sm-100 w-100px cardCell">
                    {phone}
                  </p>
                  
                  <p className="mb-0 text-muted text-small w-15 w-sm-100 cardCell">
                    {insuranceCompanyId?.name}
                  </p>
                  <p className="mb-0 text-muted text-small w-15 w-sm-100 cardCell">
                    {complaintTypeId?.name}
                  </p>
                  <p className="mb-0 text-muted text-small w-15 w-sm-100 cardCell">
                    {policyTypeId?.name}
                  </p>
                  <div className="w-15 w-sm-100 cardCell">
                    <Badge color={complaint.statusColor} pill>
                      {status}
                    </Badge>
                  </div>
                  {/* <p className="mb-0 text-muted text-small w-15 w-sm-100">
                    {email}
                  </p>
                  <p className="mb-0 text-muted text-small w-15 w-sm-100">
                    {email}
                  </p> */}
                </div>
                <Collapse isOpen={collapse}>
                  <div className="p-2 record-options">
                    <p className="mb-0">
                      All the options here
                    </p>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>

        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
