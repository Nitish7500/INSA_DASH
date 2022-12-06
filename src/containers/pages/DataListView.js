import React, { useEffect, useMemo } from "react";
import {
  Card,
  CustomInput,
  Badge,
  Button,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import { useState } from "react";
import StatusHistory from "components/reusable-components/modals/statusHistory";
import claimAmountModal from "components/reusable-components/modals/claimAmountModal";
import ComplaintDetails from "containers/complaints/complaint-details";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import moment from "moment";
import { useHistory } from "react-router-dom";

const DataListView = ({
  complaint,
  isSelect,
  collect,
  onCheckItem,
  onSelectedStatus,
  setStatusHistoryDetails,
  setStatusClaimAmount,
}) => {
  const {
    policyNumber,
    userId,
    email,
    phone,
    status,
    insuranceCompanyId,
    complaintTypeId,
    policyTypeId,
  } = complaint;
  const [collapse, setCollapse] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  
  
    const dispatch = useDispatch();
    const state = useSelector((state) => state.complaint);
    const history = useHistory()

    console.log(state)


  const [currUser, setcurrUser] = useState({});
  
  //----------------------------> Pay Fees State
  const [payFees, setpayFees] = useState(false);
  const [payFeeObj, setpayFeeObj] = useState({id:complaint._id, paidAt:"",payId:"",pay_via:""})
  const [paySecObj, setpaySecObj] = useState({id:"",amount:"",tdsAmount:""})
  const [finalPayObj, setfinalPayObj] = useState({id:complaint._id,finalPayId:"", finalPaidAt:"",final_payment_status:"",final_pay_via:""})


  
  //----------------------------> Pay Fees State
  const payFeesHandlerFunc = () => {
    setpayFees(true);
    dispatch({
      type: "COMPLAINT_GET_WAIVEOFF",
      state: { id: complaint.userId?._id },
    });
  };

  const handlePayFeeChange = (e) => {
    setpayFeeObj({...payFeeObj,[e.target.name]:e.target.value})
  }

  const handleSecPayFunc = (e,name) => {
    if (name === "userDetail"){
      setpaySecObj({...paySecObj, id:e.value})
    }else{

      setpaySecObj({...paySecObj, [e.target.name]:e.target.value})
    }
  }

  const finalPayFunc = (e, name) => {
    if (name === "finalUserDetail") {
      let temp = e?.map(x => x.value)
      setfinalPayObj({...finalPayObj, finalPaymentList :temp})
      console.log(e)
    }else{
      setfinalPayObj({...finalPayObj, [e.target.name]:e.target.value})
    }
  }

  const handleSavePayment = () => {
    console.log(payFeeObj)
    dispatch({type:"COMPLAINT_FEE_OPERATION",state:{...payFeeObj}})
  }

  const SubmitSecPaySu = () => {
    dispatch({type:"COMPLAINT_SECOND_ADD_FINAL_AMOUNT", state:{...paySecObj}})
  }

  const finalPaySubmit = () => {
    if (!finalPayObj.finalPaymentList?.length) {
      alert("Please Select User !")
      return;
    }
    console.log({...finalPayObj})
    dispatch({type:"COMPLAINT_FINAL_PAYMENT",state:{...finalPayObj}})
  }

  
  //----------------------------> Add Pay Amount

  const [addClaimAmtOpen, setaddClaimAmtOpen] = useState({open : false, claimAmount : complaint.claimAmount, id:complaint._id, type:"Complain"})


  var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
  var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

  const amtInWord = useMemo((num = addClaimAmtOpen.claimAmount) =>  {
        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    },[addClaimAmtOpen.claimAmount])


  const handleAddClaimAmt = () => {
    setaddClaimAmtOpen({...addClaimAmtOpen, open:true})
  }

  const addClaimHandleChange = (e) => {
    setaddClaimAmtOpen({...addClaimAmtOpen, [e.target.name]:e.target.value})
  }


  //--------------------------------------------> Show Status History
  const [statusHistoryOpen, setstatusHistoryOpen] = useState(false)

  const handleStatusHistory = () => {
    setstatusHistoryOpen(true)
  }

  //-------------------------------------------> Handle Call Log 

  const [callLogObj, setcallLogObj] = useState({
    open:false,
    start_time:"",
    end_time:"",
    customer_number:""
  })

  const handleCallLog = () => {
    setcallLogObj({...callLogObj, open:true})
  }


  //--------------------------------------> Show History

  const [showHistory, setshowHistory] = useState(false)


  // --------------------------------------> Comm



 
  return (
    <>
      <Colxx xxs="12" style={{ marginBottom: "10px", paddingLeft: "0px" }}>
        <ContextMenuTrigger id="menu_id" data={complaint.id} collect={collect}>
          <Card
            // onClick={(event) => onCheckItem(event, complaint.id)}
            className={classnames("d-flex flex-row", {
              active: isSelect,
            })}
          >
            {/* a dynamically generated table row */}
            <div className="tableRow">
              <div className="record-data">
                <div className="card-body tableRow-card align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                  <div class={collapse == true ? "dropup btn-group" : ""}>
                    <Button
                      color="primary"
                      onClick={() => setCollapse(!collapse)}
                      className="mb-1 dropdown-toggle-split dropdown-toggle btn mr-2 ml-2 table-expand cardCell--50px"
                    >
                      {/* <IntlMessages id="collapse.toggle" /> */}
                    </Button>
                  </div>
                  <NavLink
                    to={`complaint-details?complaintId=${complaint?._id}`}
                    className="cardCell cardCell--250px columnLead"
                  >
                    <p className="text-primary text-bold mb-0 truncate">
                      {policyNumber}
                    </p>
                  </NavLink>
                  <p className="mb-0 cardCell">{userId?.name}</p>
                  <p className="mb-0 cardCell cardCell--250px">{email}</p>
                  <p className="mb-0 cardCell--150px cardCell">{phone}</p>
                  <div
                    className="cardCell"
                    style={{ cursor: "pointer" }}
                    onClick={() => setStatusHistoryDetails(complaint)}
                  >
                    <Badge
                      color={complaint.statusColor}
                      pill
                      onClick={onSelectedStatus}
                    >
                      {status}
                    </Badge>
                  </div>
                  <p className="mb-0 cardCell--350px cardCell">
                    {insuranceCompanyId?.name}
                  </p>
                  <p className="mb-0 cardCell cardCell--200px">
                    {complaintTypeId?.name}
                  </p>
                  <p className="mb-0 cardCell">{policyTypeId?.name}</p>
                  <p className="mb-0 cardCell cardCell--150px">--</p>
                  <p className="mb-0 cardCell cardCell--150px">--</p>
                </div>
                <Collapse isOpen={collapse}>
                  <div className="p-2 record-options">
                    <div className="options-flex">
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/add-task.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Amount Pending</span>
                        </div>
                      </NavLink>
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/task-remove.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Document Sign Pending</span>
                        </div>
                      </NavLink>
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/list.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Payment Link not Send</span>
                        </div>
                      </NavLink>
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/create-list.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Edit Task</span>
                        </div>
                      </NavLink>
                      {/* <NavLink to={`complaint-details?complaintId=${complaint?._id}`} className="table-option"> */}
                      <div className="flex-cc p-2 mt-1 font-weight-bold" style={{cursor:"pointer"}} onClick={payFeesHandlerFunc}>
                        <img
                          src="/icons/status.png"
                          alt="option"
                          className="option-icon"
                        />
                        <span>Pay Fees</span>
                      </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                        <div className="flex-cc p-2 mt-1 font-weight-bold" style={{cursor:"pointer"}} onClick={handleAddClaimAmt} >
                          <img
                            src="/icons/send.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Add Claim Amount</span>
                        </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div className="flex-cc p-2 mt-1 font-weight-bold" style={{cursor:"pointer"}} onClick={handleStatusHistory} >
                          <img
                            src="/icons/edit.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Status History</span>
                        </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div className="flex-cc p-2 mt-1 font-weight-bold" style={{cursor:"pointer"}} onClick={handleCallLog} >
                          <img
                            src="/icons/target.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Call Logs for Lead</span>
                        </div>
                      {/* </NavLink> */}
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/warning.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>See Document</span>
                        </div>
                      </NavLink>
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div className="flex-cc p-2 mt-1 font-weight-bold" style={{cursor:"pointer"}} onClick={() => setshowHistory(true)} >
                          <img
                            src="/icons/upload.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>History</span>
                        </div>
                      {/* </NavLink> */}
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/ombudsman.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>View Complaint Details</span>
                        </div>
                      </NavLink>
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                        <div className="flex-cc" onClick={() => {history.push({pathname:"/app/pages/product/complaint/communication", state:complaint})}}>
                          <img
                            src="/icons/cancel.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Communicaion List</span>
                        </div>
                      {/* </NavLink> */}
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/cancel.png"
                            alt="option"
                            className="option-icon"
                          />
                          <span>Update Data</span>
                        </div>
                      </NavLink>
                      <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      >
                        <div className="flex-cc">
                          <img
                            src="/icons/cancel.png"
                            alt="option"
                            className="option-icon"
                          />
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

    {/* --------------------------------------------> Pay Fees Modal */}
      <Modal isOpen={payFees} toggle={() => setpayFees(!payFees)} size="lg">
        <ModalHeader>Pay Fees Discription</ModalHeader>
        <ModalBody>
          <div className="container">
            {
              complaint.paymentStatus === "PENDING" ?
              <>
            <h5>Registration Fee Section</h5>
            <hr />
            <div className="">
              <label className="font-weight-bold">Fee Pay Date</label>
              <input
              value={payFeeObj.paidAt}
              onChange={handlePayFeeChange}
              name="paidAt"
              type={"date"}
              className="form-control border border-bold"
              id="feePayDate"
              />
            </div>
            <div className="mt-3">
              <label className="font-weight-bold">Pay ID</label>
              <input
              value={payFeeObj.payId}
                type={"text"}
                name="payId"
                onChange={handlePayFeeChange}
                className="form-control border border-bold"
                id="payId"
                />
            </div>
            <div className="mt-3">
              <label className="font-weight-bold">Pay Via</label>
              <select className="form-control border-bold" id="payVia" name="pay_via" onChange={handlePayFeeChange}
              value={payFeeObj.pay_via}>
                <option value={""} disabled>
                  Select Method
                </option>
                <option value={"Cash"}>Cash</option>
                <option value={"Paytm"}>Paytm</option>
                <option value={"Phone_Pay"}>Phone Pay</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>
            {/* {console.log(complaint, policyNumber)} */}
            <div className="mt-3 d-flex justify-content-end">
              <button
                className="btn btn-danger rounded mr-2"
                id="payOptionClose"
                >
                CLOSE
              </button>
              <button className="btn btn-primary rounded" id="payOptionSave" onClick={handleSavePayment}>
                SAVE
              </button>
            </div>
            <hr />
                </>
                :
                null 
              }
            <span className="font-weight-bold">Select Policy Number</span>
            <div className="mt-3">
              <label className="fonr-weight-bold">User Details Handle</label>
              <Select
              onChange={(e) => {handleSecPayFunc(e,"userDetail")}}
                id="payUserDetailHandle"
                name="userDetail"
                options={[
                  { label: "Select All", value: "all" },
                  ...state.waiveOfUsers,
                ]}
              ></Select>
            </div>
            <div className="mt-3">
              <label className="font-weight-bold">Final Amount To Be Paid</label>
              <input
              value={paySecObj.amount}
              name="amount"
              onChange={handleSecPayFunc}
                type={"number"}
                className="form-control border border-bold"
                id="finalAmtToPaid"
              />
            </div>
            <div className="mt-3">
              <label className="font-weight-bold">TDS Amount</label>
              <input
              value={paySecObj.tdsAmount}
              name="tdsAmount"
              onChange={handleSecPayFunc}
                type={"number"}
                className="form-control border border-bold"
                id="tdsAmt"
              />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary rounded" onClick={SubmitSecPaySu}>ADD</button>
            </div>



            <hr />
            {
              complaint.finalPaymentStatus === "PENDING" ?
              
              <>
                          <span className="h4">Final Payment Section</span>
            <div className="mt-2">
                  <label className="font-weight-bold">Select Policy Number</label>
                  <Select
              onChange={(e) => {finalPayFunc(e,"finalUserDetail")}}
                id="payUserDetailHandle"
                name="finalUserDetail"
                options={[
                  { label: "Select All", value: "all" },
                  ...state.waiveOfUsers,
                ]}
                isMulti
                // onChange={selected => {
                //   console.log(selected)
                //   selected.find(option => option.value === "all") ? console.log(state.waiveOfUsers) : console.log(selected)
                // }}
              ></Select>
            </div>
            <div className="mt-2">
                <label className="font-weight-bold">Fee Pay Date</label>
                <input type={"date"} className="form-control border-bold" name="finalPaidAt" value={finalPayObj.finalPaidAt} onChange={finalPayFunc} />
            </div>
            <div className="mt-2">
                <label className="font-weight-bold">Pay ID</label>
                <input type={"text"} className="form-control border-bold" name="finalPayId" value={finalPayObj.finalPayId} onChange={finalPayFunc} />
            </div>
            
            <div className="mt-3">
              <label className="font-weight-bold">Pay Via</label>
              <select className="form-control border-bold" id="finalPayVia" name="final_pay_via" value={finalPayObj.final_pay_via}
              onChange={finalPayFunc}
              >
                <option value={""} disabled>
                  Select Method
                </option>
                <option value={"Cash"}>Cash</option>
                <option value={"Paytm"}>Paytm</option>
                <option value={"Bank_Transfer"}>Bank Transfer</option>
                <option value={"NEFT"}>NEFT</option>
                <option value={"Cheque"}>Cheque</option>
                <option value={"Google_Pay"}>Google Pay</option>
                <option value={"Phone_Pay"}>Phone Pay</option>
                <option value={"Other"}>Other</option>
              </select>
            </div>
            <div className="mt-2">
                <select className="form-control border-bold" id="finalPaymentStatus" name="final_payment_status" value={finalPayObj.final_payment_status} onChange={finalPayFunc}>
                    <option value={""} disabled>Select Final Payment Status</option>
                    <option value={"PAID"}>PAID</option>
                    <option value={"WAIVEOFF"}>WAIVEOFF</option>
                </select>
            </div>
            <div className="mt-2 d-flex justify-content-end">
                <button className="btn btn-danger rounded" >CLOSE</button>
                <button className="btn btn-primary rounded ml-2" onClick={finalPaySubmit}>SAVE</button>
            </div>
              </>
              :
              null
            }


          </div>
        </ModalBody>
      </Modal>

      {/* ---------------------------> Claim Amount Description */}

      <Modal isOpen={addClaimAmtOpen.open} toggle={() => {setaddClaimAmtOpen({...addClaimAmtOpen, open:!addClaimAmtOpen.open})}}>
            <ModalHeader>
            Claim Amount Description
            </ModalHeader>
            <ModalBody>
              <div className="container">
                  <div>
                    <label>Claim Amount</label>
                    <input className="form-control border-bold" type={"number"} value={addClaimAmtOpen.claimAmount} name="claimAmount" onChange={addClaimHandleChange} />
                  </div>
                  <div>
                    <label>Amount in Words</label>
                    <input className="form-control border-bold" type="text" value={amtInWord} disabled />
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-danger rounded mr-2" onClick={() => {setaddClaimAmtOpen({...addClaimAmtOpen, open : false})}} >CLOSE</button>
                    <button className="btn btn-primary rounded" 
                      onClick={() => {
                        dispatch({type:"COMPLAINT_CLAIM_OPERATION",state:{
                          claimAmount:addClaimAmtOpen.claimAmount,
                          id:addClaimAmtOpen.id,
                          type:"Complain"
                        }})
                        setaddClaimAmtOpen({...addClaimAmtOpen, open : false})
                      }}
                    >SAVE</button>

                  </div>
              </div>
            </ModalBody>
      </Modal>

      {/* ----------------------------------------> Show Status History */}
      <Modal isOpen={statusHistoryOpen} toggle={() => {setstatusHistoryOpen(!statusHistoryOpen)}}>
        <ModalHeader>
          Status History
        </ModalHeader>
        <ModalBody>
          <div>
            <h5 className="font-weight-bold">User Details</h5>
            <span className="h6 font-weight-bold">ID : </span><span className="h6">{complaint?._id}</span>
          </div>
          <div className="mt-2">
            <span className="h6 font-weight-bold">Name : </span><span className="h6">{complaint?.name}</span>
          </div>
          <div className="mt-2">
          <span className="h6 font-weight-bold">Email : </span><span className="h6">{complaint?.email}</span>
          </div>
          <div>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="">
                {
                  complaint?.statusHistory?.map(res => {
                    return <tr>
                      <td>{res.currStatus}</td>
                      <td>{res.date}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mr-2 mt-3">
            <button className="btn btn-danger rounded">CLOSE</button>
          </div>
        </ModalBody>

      </Modal>
                {/* ------------------------------------> Open Call Logs */}

      <Modal isOpen={callLogObj.open} toggle={() => {setcallLogObj({...callLogObj, open:!callLogObj.open})}} size="lg" >
        <ModalHeader>
          Call Logs For Customers
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="d-flex">
                <div className="mr-4">
                    <input className="form-control border-bold mr-4" type={"date"} name="start_time" value={callLogObj.start_time} onChange={(e) => {setcallLogObj({...callLogObj, [e.target.name]:e.target.value})}} />
                </div>
                <div className="mr-4">

                    <input className="form-control border-bold" name="end_time" type={"date"} value={callLogObj.end_time} onChange={(e) => {setcallLogObj({...callLogObj, [e.target.name]:e.target.value})}} />
                </div>
                <div className="mt-auto mb-auto">

                    <button className="btn btn-success rounded btn-xs" onClick={() => {
                      dispatch({
                        type:"COMPLAINT_CALL_LOG",
                        state:{
                          start_date:moment(callLogObj.start_time).startOf("day").add(330, "minute").toISOString(),
                          end_date:moment(callLogObj.end_time).endOf("day").add(330, "minute").toISOString(),
                          customer_number:complaint.phone
                          }
                      })

                    }}>Fetch</button>
                </div>
            </div>
            <div className="">
              <div className="text-primary w-100 h-30 shadow mt-4 py-3 px-2 " >

                <span> Call Logs For Customer</span>
              </div>
                <div className="table-responsive mt-3 ">

                <table className="table table-bordered">
                <thead>
                  <tr className="bg-dark text-light">
                    <th>S.No</th>
                    <th>Call Type	</th>
                    <th>Call Start Time</th>
                    <th>Agent Name</th>
                    <th>Call Duration</th>
                    <th>Recording Play/Pause</th>
                    <th>Recording Download</th>
                  </tr>
                </thead>
                </table>
                </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------> Show History */}

      <Modal isOpen={showHistory} toggle={() => {setshowHistory(!showHistory)}} size="lg">
        <ModalHeader>
          <span className="text-primary">Case History</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            {/* <span className="font-weight-bold h6">CASE HISTORY</span> */}
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Name : </span>{complaint.name}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Policy Number : </span>{complaint.policyNumber}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Added Date : </span>{moment(complaint?.createdAt).toLocaleString()}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Updated Date : </span>{moment(complaint?.update_date).toLocaleString()}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Assign To : </span>{complaint?.assign_to}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Assign Date : </span>{complaint?.assign_date}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Complain Date : </span>{complaint?.complaint_date1}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Ombudsman Date : </span>{complaint?.ombudsman_c_date}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Legal Date : </span>{complaint?.legal_notice_date1}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Assign To Ombudsman : </span>{complaint?.assignedOmd}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Assign To Mailing : </span>{complaint?.assignedMailing}</span>
            </div>
            <div className="mb-3">
                <span><span className="font-weight-bold h6">Resolution Type  : </span>{complaint?.resolutionType}</span>
            </div>

            <div className="d-flex justify-content-center" >
              <button className="btn btn-danger rounded" onClick={() => {setshowHistory(false)}}>CLOSE</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------> Communication History */}

      <Modal>

      </Modal>

    </>
  );
};

export default React.memo(DataListView);
