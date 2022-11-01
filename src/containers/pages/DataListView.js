import React from 'react';
import { Card, CustomInput, Badge, Button, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useState } from 'react';
import StatusHistory from 'components/reusable-components/modals/statusHistory';
import claimAmountModal from 'components/reusable-components/modals/claimAmountModal';
import ComplaintDetails from 'containers/complaints/complaint-details';

const DataListView = ({ complaint, isSelect, collect, onCheckItem, onSelectedStatus, setStatusHistoryDetails, setStatusClaimAmount}) => {
  const {policyNumber, userId, email, phone, status, insuranceCompanyId, complaintTypeId, policyTypeId} = complaint;
  const [collapse, setCollapse] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);

  // console.log(complaint ? '1' : '0');

  return (
    <>
    <Colxx xxs="12" style={{marginBottom: '10px', paddingLeft: '0px'}}>
      <ContextMenuTrigger id="menu_id" data={complaint.id} collect={collect}>
        <Card
          // onClick={(event) => onCheckItem(event, complaint.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* a dynamically generated table row */}
          <div className="tableRow">
            <div className='record-data'>
              <div className="card-body tableRow-card align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <div class={(collapse == true) ? 'dropup btn-group' : ''}>
                  <Button
                    color="primary"
                    onClick={() => setCollapse(!collapse)}
                    className="mb-1 dropdown-toggle-split dropdown-toggle btn mr-2 ml-2 table-expand cardCell--50px"
                    >
                    {/* <IntlMessages id="collapse.toggle" /> */}
                  </Button>
                </div>
                <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="cardCell cardCell--250px columnLead">
                  <p className="text-primary text-bold mb-0 truncate">
                    {policyNumber}
                  </p>
                </NavLink>
                <p className="mb-0 cardCell">
                  {userId?.name}
                </p>
                <p className="mb-0 cardCell cardCell--250px">
                  {email}
                </p>
                <p className="mb-0 cardCell--150px cardCell">
                  {phone}
                </p>
                <div className="cardCell" style={{cursor:"pointer"}} onClick = {() => setStatusHistoryDetails(complaint)} >
                  <Badge color={complaint.statusColor} pill onClick={onSelectedStatus}>
                    {status}
                  </Badge>
                </div>
                <p className="mb-0 cardCell--350px cardCell">
                  {insuranceCompanyId?.name}
                </p>
                <p className="mb-0 cardCell cardCell--200px">
                  {complaintTypeId?.name}
                </p>
                <p className="mb-0 cardCell">
                  {policyTypeId?.name}
                </p>
                <p className="mb-0 cardCell cardCell--150px">
                  --
                </p>
                <p className="mb-0 cardCell cardCell--150px">
                  --
                </p>
              </div>
              <Collapse isOpen={collapse}>
                <div className="p-2 record-options">
                  <div className="options-flex">
                    <NavLink to = {`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/add-task.png" alt="option" className="option-icon" />
                        <span>Amount Pending</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/task-remove.png" alt="option" className="option-icon" />
                        <span>Document Sign Pending</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/list.png" alt="option" className="option-icon" />
                        <span>Payment Link not Send</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/create-list.png" alt="option" className="option-icon" />
                        <span>Edit Task</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/status.png" alt="option" className="option-icon" />
                        <span>Pay Fees</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/send.png" alt="option" className="option-icon" />
                        <span>Add Claim Amount</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/edit.png" alt="option" className="option-icon" />
                        <span>Status History</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/target.png" alt="option" className="option-icon" />
                        <span>Call Logs for Lead</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/warning.png" alt="option" className="option-icon" />
                        <span>See Document</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/upload.png" alt="option" className="option-icon" />
                        <span>History</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/ombudsman.png" alt="option" className="option-icon" />
                        <span>View Complaint Details</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/cancel.png" alt="option" className="option-icon" />
                        <span>Communicaion List</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/cancel.png" alt="option" className="option-icon" />
                        <span>Update Data</span>
                      </div>
                    </NavLink>
                    <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option">
                      <div className="flex-cc">
                        <img src="/icons/cancel.png" alt="option" className="option-icon" />
                        <span>Update Single Data</span>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
    {/* <StatusHistory isOpen={modalBasic && Object.keys(statusHistoryDetails).length} 
      onClose = {() => setModalBasic(!modalBasic)}
      details = {statusHistoryDetails}
    /> */}
    </>
  );

};

export default React.memo(DataListView);
