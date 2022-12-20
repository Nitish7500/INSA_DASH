import React from 'react';
import { Button, Row } from 'reactstrap';
import Pagination from './Pagination';
import DataListView from './DataListView';
import { Colxx } from 'components/common/CustomBootstrap';
import { useState } from 'react';
import StatusHistory from 'components/reusable-components/modals/statusHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import ClaimAmountModal from 'components/reusable-components/modals/claimAmountModal';
import { useHistory } from 'react-router-dom';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  // startIndex,
  // totalItemCount,
  // endIndex
}) => {
  const [isStatusHistoryModal, setIsStatusHistoryModal] = useState(false)
  const [selectedStatusHistoryInfo,setSelectedStatusHistoryInfo] = useState({});

  const [isClaimAmountModal, setIsClaimAmountModal] = useState(false)
  const [selectedStatusClaimAmount,setSelectedStatusClaimAmount] = useState({});

  // const history = useHistory();
  // console.log(history.location.state);
  
  const onCloseStatusHistoryModal = () => {
    setIsStatusHistoryModal(!isStatusHistoryModal);
    setSelectedStatusHistoryInfo({});
  }
  const onCloseClaimAmountModal = () => {
    setIsClaimAmountModal(!isClaimAmountModal);
    setSelectedStatusClaimAmount({});
  }

  return (
    <>
      <Row className='tableContainer' >

        {/* Table Header */}
        {/* Table data */}
        <div className="table-scrollable">

          <Row className='table-header'>
            <p className="mr-2 ml-1 cardCell--50px"></p>
            <p className="cardCell cardCell--250px th-column">
              <span className="column-name font-weight-bold">Policy Number</span>
              <div className="column-actions">
                {/* <Button className='tbl-sorticon' onClick={() => changeOrderBy(policyNumber)}><FontAwesomeIcon icon={faSort} /></Button> */}
              </div>
            </p>
            <p className="cardCell th-column">
              <span className="column-name font-weight-bold">Name</span>
              <div className="column-actions">
                {/* <Button className='tbl-sorticon' onClick={() => changeOrderBy(userId.name)}><FontAwesomeIcon icon={faSort} /></Button> */}
              </div>
            </p>
            <p className="cardCell font-weight-bold cardCell--250px th-column">Email ID</p>
            <p className="cardCell font-weight-bold cardCell--150px th-column">Phone Number</p>
            <p className="cardCell font-weight-bold th-column">Status</p>
            <p className="cardCell font-weight-bold cardCell--350px th-column">Insurance Company</p>
            <p className="cardCell font-weight-bold th-column cardCell--200px">Complaint Type</p>
            <p className="cardCell font-weight-bold th-column">Policy Type</p>
            <p className="cardCell font-weight-bold th-column cardCell--150px">Stopped Cases</p>
            <p className="cardCell font-weight-bold th-column cardCell--150px">TAT Breach Days</p>
          </Row>

          {((items.length == 0) 
            ?
            <div className="tabledata">
              <p className='text-center'>No Records Found. Please Refresh or try another request !</p>
            </div> 
            :
            <div className="tabledata" id='tabledata'>
              {items.map((complaint) => {
                return (
                  <DataListView
                    key={complaint._id}
                    complaint={complaint}
                    // isSelect={selectedItems.includes(complaint._id)}
                    onCheckItem={onCheckItem}
                    collect={collect}
                    onSelectedStatus = {() => setIsStatusHistoryModal(!isStatusHistoryModal)}
                    setStatusHistoryDetails = {(statusHistory)=>setSelectedStatusHistoryInfo(statusHistory)}
                    onSelectedClaimAmount = {() => setIsClaimAmountModal(!isClaimAmountModal)}
                    setStatusClaimAmount = {(ClaimAmountModal)=>setSelectedStatusClaimAmount(ClaimAmountModal)}
                    changeOrderBy={(column) => {
                      setSelectedOrderOption(
                        orderOptions.find((x) => x.column === column)
                      );
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

      </Row>
      <Pagination
        currentPage={currentPage+1}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i-1)}
      />

    <StatusHistory isOpen={isStatusHistoryModal} 
      onClose = {onCloseStatusHistoryModal}
      details = {selectedStatusHistoryInfo}
    />

    <ClaimAmountModal isOpen={isClaimAmountModal} 
      onClose = {onCloseClaimAmountModal}
      details = {selectedStatusClaimAmount}
    />

    </>
  );
};

export default React.memo(ListPageListing);