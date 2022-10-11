import React from 'react';
import { Button, Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';
import ImageListView from './ImageListView';
import ThumbListView from './ThumbListView';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useState } from 'react';
import StatusHistory from 'views/app/pages/complaints/modals/statusHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import ClaimAmountModal from 'views/app/pages/complaints/modals/claimAmountModal';
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
              <span className="column-name">Policy Number</span>
              <div className="column-actions">
                <Button className='tbl-sorticon' onClick={() => changeOrderBy(policyNumber)}><FontAwesomeIcon icon={faSort} /></Button>
              </div>
            </p>
            <p className="cardCell th-column">
              <span className="column-name">Name</span>
              <div className="column-actions">
                <Button className='tbl-sorticon' onClick={() => changeOrderBy(userId.name)}><FontAwesomeIcon icon={faSort} /></Button>
              </div>
            </p>
            <p className="cardCell cardCell--250px th-column">Email ID</p>
            <p className="cardCell cardCell--150px th-column">Phone Number</p>
            <p className="cardCell th-column">Status</p>
            <p className="cardCell cardCell--350px th-column">Insurance Company</p>
            <p className="cardCell th-column cardCell--200px">Complaint Type</p>
            <p className="cardCell th-column">Policy Type</p>
            <p className="cardCell th-column cardCell--150px">Stopped Cases</p>
            <p className="cardCell th-column cardCell--150px">TAT Breach Days</p>
          </Row>

          <div className="tabledata">
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
            })}<p className='text-center'>No Records Found</p>
          </div>

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
      {/* <Row>
        <Colxx xxs="12" className="p-3 text-center">
          <span className="text-muted text-small mr-3">
            <IntlMessages id="pages.viewing" />
            {startIndex + 1}-
            {totalItemCount >= endIndex ? endIndex : totalItemCount}
            {` | `}
            <IntlMessages id="pages.total" />
            {totalItemCount}
          </span>
        </Colxx>
      </Row> 
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      /> */}
    </>
  );
};

export default React.memo(ListPageListing);



// return (
//   <Row>
//     {items.map((complaint) => {
//       if (displayMode === 'imagelist') {
//         return (
//           <ImageListView
//             key={complaint._id}
//             complaint={complaint}
//             isSelect={selectedItems.includes(complaint._id)}
//             collect={collect}
//             onCheckItem={onCheckItem}
//           />
//         );
//       }
//       if (displayMode === 'thumblist') {
//         return (
//           <ThumbListView
//             key={complaint._id}
//             complaint={complaint}
//             isSelect={selectedItems.includes(complaint._id)}
//             collect={collect}
//             onCheckItem={onCheckItem}
//           />
//         );
//       }
//       return (
//         <DataListView
//           key={complaint._id}
//           complaint={complaint}
//           isSelect={selectedItems.includes(complaint._id)}
//           onCheckItem={onCheckItem}
//           collect={collect}
//         />
//       );
//     })}
//     <Pagination
//       currentPage={currentPage}
//       totalPage={totalPage}
//       onChangePage={(i) => onChangePage(i)}
//     />
//     <ContextMenuContainer
//       onContextMenuClick={onContextMenuClick}
//       onContextMenu={onContextMenu}
//     />
//   </Row>
// );