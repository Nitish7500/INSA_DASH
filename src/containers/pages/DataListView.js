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
import { adminStatusChangePasswords, awsUrl } from "constants/defaultValues";
import UpdateData from "./UpdateData";

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
  const history = useHistory();

  // useEffect(() => {
  // },[1])

  //----------------------------> Pay Fees State
  const [payFees, setpayFees] = useState(false);
  const [payFeeObj, setpayFeeObj] = useState({
    id: complaint._id,
    paidAt: "",
    payId: "",
    pay_via: "",
  });
  const [paySecObj, setpaySecObj] = useState({
    id: "",
    amount: "",
    tdsAmount: "",
  });
  const [finalPayObj, setfinalPayObj] = useState({
    id: complaint._id,
    finalPayId: "",
    finalPaidAt: "",
    final_payment_status: "",
    final_pay_via: "",
  });

  //----------------------------> Pay Fees State
  const payFeesHandlerFunc = () => {
    setpayFees(true);
    dispatch({
      type: "COMPLAINT_GET_WAIVEOFF",
      state: { id: complaint.userId?._id },
    });
  };

  const handlePayFeeChange = (e) => {
    setpayFeeObj({ ...payFeeObj, [e.target.name]: e.target.value });
  };

  const handleSecPayFunc = (e, name) => {
    if (name === "userDetail") {
      setpaySecObj({ ...paySecObj, id: e.value });
    } else {
      setpaySecObj({ ...paySecObj, [e.target.name]: e.target.value });
    }
  };

  const finalPayFunc = (e, name) => {
    if (name === "finalUserDetail") {
      let temp = e?.map((x) => x.value);
      setfinalPayObj({ ...finalPayObj, finalPaymentList: temp });
      console.log(e);
    } else {
      setfinalPayObj({ ...finalPayObj, [e.target.name]: e.target.value });
    }
  };

  const handleSavePayment = () => {
    console.log(payFeeObj);
    dispatch({ type: "COMPLAINT_FEE_OPERATION", state: { ...payFeeObj } });
  };

  const SubmitSecPaySu = () => {
    dispatch({
      type: "COMPLAINT_SECOND_ADD_FINAL_AMOUNT",
      state: { ...paySecObj },
    });
  };

  const finalPaySubmit = () => {
    if (!finalPayObj.finalPaymentList?.length) {
      alert("Please Select User !");
      return;
    }
    console.log({ ...finalPayObj });
    dispatch({ type: "COMPLAINT_FINAL_PAYMENT", state: { ...finalPayObj } });
  };

  //----------------------------> Add Pay Amount

  const [addClaimAmtOpen, setaddClaimAmtOpen] = useState({
    open: false,
    claimAmount: complaint.claimAmount,
    id: complaint._id,
    type: "Complain",
  });

  var a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen ",
  ];
  var b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const amtInWord = useMemo(
    (num = addClaimAmtOpen.claimAmount) => {
      if ((num = num?.toString())?.length > 9) return "overflow";
      let n = ("000000000" + num)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = "";
      str +=
        n[1] != 0
          ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
          : "";
      str +=
        n[2] != 0
          ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
          : "";
      str +=
        n[3] != 0
          ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
          : "";
      str +=
        n[4] != 0
          ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
          : "";
      str +=
        n[5] != 0
          ? (str != "" ? "and " : "") +
            (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
            "only "
          : "";
      return str;
    },
    [addClaimAmtOpen.claimAmount]
  );

  const handleAddClaimAmt = () => {
    setaddClaimAmtOpen({ ...addClaimAmtOpen, open: true });
  };

  const addClaimHandleChange = (e) => {
    setaddClaimAmtOpen({ ...addClaimAmtOpen, [e.target.name]: e.target.value });
  };

  //-------------------------------------> See Document

  const [seeDocumentOpen, setseeDocumentOpen] = useState(false);

  //--------------------------------------------> Show Status History
  const [statusHistoryOpen, setstatusHistoryOpen] = useState(false);

  const handleStatusHistory = () => {
    setstatusHistoryOpen(true);
  };

  //-------------------------------------------> Handle Call Log

  const [callLogObj, setcallLogObj] = useState({
    open: false,
    start_time: "",
    end_time: "",
    customer_number: "",
  });

  const handleCallLog = () => {
    setcallLogObj({ ...callLogObj, open: true });
  };

  //--------------------------------------> Show History

  const [showHistory, setshowHistory] = useState(false);

  // --------------------------------------> Update Information

  const updateDataClick = () => {
    dispatch({
      type: "COMPLAINANT_GET_USER_BASED_DATA",
      state: { ...complaint },
    });
    setupdateInfo({ ...updateInfo, open: true });
    dispatch({ type: "COMPLAINANT_GET_STATUS_BUCKET" });
  };

  const [updateInfo, setupdateInfo] = useState({
    open: false,
    section: "",
    sudo_user: "",
    sudo_password: "",
  });

  const [updateInfoOmb, setupdateInfoOmb] = useState({
    actualRefundAmount: "",
    fieldValue: "",
    id: "",
  });

  const handleUpdateRow = (index, id) => {
    if (
      adminStatusChangePasswords[updateInfo["sudo_user"]] ===
      updateInfo["sudo_password"]
    ) {
      if (updateInfo[`status${index}`]) {
        dispatch({
          type: "COMPLAINANT_UPDATE_COMPLAINT_STATUS",
          state: {
            id: id,
            field: "status",
            fieldValue: updateInfo[`status${index}`],
            doneBy: updateInfo["sudo_user"],
            type: "Complaint",
            typeSection: "statusSection",
          },
        });
      } else {
        alert("Please select status !");
      }
    } else {
      alert("Wrong Password !");
    }
  };

  const handleUpdateClaimAmt = (index, id) => {
    if (id && updateInfoOmb[`fieldValue${index}`]) {
      dispatch({
        type: "COMPLAINANT_UPDATE_COMPLAINT_STATUS",
        state: {
          fieldValue: updateInfoOmb[`fieldValue${index}`],
          field: "actualRefundAmount",
          id: id,
          type: "Complaint",
          typeSection: "ombudsmanSection",
        },
      });
    } else {
      alert("Please enter Claim Amount !");
    }
  };

  const [updateData, setupdateData] = useState(false);

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
                    className="py-1"
                      color={complaint.statusColor}
                      pill
                      onClick={onSelectedStatus}
                    >
                      <span className="text-capitalize">{status[0]}</span><span className="text-lowercase">{status?.slice(1,)}</span>
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
                      {/* <NavLink
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
                      </NavLink> */}
                      <NavLink
                        to={`edit-complaint`}
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
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        style={{ cursor: "pointer" }}
                        onClick={payFeesHandlerFunc}
                      >
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
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        style={{ cursor: "pointer" }}
                        onClick={handleAddClaimAmt}
                      >
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
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        style={{ cursor: "pointer" }}
                        onClick={handleStatusHistory}
                      >
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
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        style={{ cursor: "pointer" }}
                        onClick={handleCallLog}
                      >
                        <img
                          src="/icons/target.png"
                          alt="option"
                          className="option-icon"
                        />
                        <span>Call Logs for Lead</span>
                      </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setseeDocumentOpen(true);
                          dispatch({
                            type: "COMPLAINT_GET_LEAD",
                            state: { id: complaint.leadId },
                          });
                        }}
                      >
                        <img
                          src="/icons/warning.png"
                          alt="option"
                          className="option-icon"
                        />
                        <span>See Document</span>
                      </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        style={{ cursor: "pointer" }}
                        onClick={() => setshowHistory(true)}
                      >
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
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        onClick={() => {
                          history.push({
                            pathname:
                              "/app/pages/product/complaint/communication",
                            state: complaint,
                          });
                        }}
                      >
                        <img
                          src="/icons/cancel.png"
                          alt="option"
                          className="option-icon"
                        />
                        <span>Communicaion List</span>
                      </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        onClick={() => {
                          setupdateData(true);
                          dispatch({ type: "COMPLAINT_STATES" });
                        }}
                      >
                        <img
                          src="/icons/cancel.png"
                          alt="option"
                          className="option-icon"
                        />
                        <span>Update Data</span>
                      </div>
                      {/* </NavLink> */}
                      {/* <NavLink
                        to={`complaint-details?complaintId=${complaint?._id}`}
                        className="table-option"
                      > */}
                      <div
                        className="flex-cc p-2 mt-1 font-weight-bold"
                        onClick={updateDataClick}
                      >
                        <img
                          src="/icons/cancel.png"
                          alt="option"
                          className="option-icon"
                        />
                        <span>Update Single Data</span>
                      </div>
                      {/* </NavLink> */}
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
      <Modal
        isOpen={payFees}
        toggle={() => setpayFees(!payFees)}
        size="lg"
        id="complaintModal1"
      >
        <ModalHeader>Pay Fees Discription</ModalHeader>
        <ModalBody>
          <div className="container">
            {complaint.paymentStatus === "PENDING" ? (
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
                  <select
                    className="form-control border-bold"
                    id="payVia"
                    name="pay_via"
                    onChange={handlePayFeeChange}
                    value={payFeeObj.pay_via}
                  >
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
                  <button
                    className="btn btn-primary rounded"
                    id="payOptionSave"
                    onClick={handleSavePayment}
                  >
                    SAVE
                  </button>
                </div>
                <hr />
              </>
            ) : null}
            <span className="font-weight-bold">Select Policy Number</span>
            <div className="mt-3">
              <label className="fonr-weight-bold">User Details Handle</label>
              <Select
                onChange={(e) => {
                  handleSecPayFunc(e, "userDetail");
                }}
                id="payUserDetailHandle"
                name="userDetail"
                options={[
                  { label: "Select All", value: "all" },
                  ...state.waiveOfUsers,
                ]}
              ></Select>
            </div>
            <div className="mt-3">
              <label className="font-weight-bold">
                Final Amount To Be Paid
              </label>
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
              <button
                className="btn btn-primary rounded"
                onClick={SubmitSecPaySu}
              >
                ADD
              </button>
            </div>

            <hr />
            {complaint.finalPaymentStatus === "PENDING" ? (
              <>
                <span className="h4">Final Payment Section</span>
                <div className="mt-2">
                  <label className="font-weight-bold">
                    Select Policy Number
                  </label>
                  <Select
                    onChange={(e) => {
                      finalPayFunc(e, "finalUserDetail");
                    }}
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
                  <input
                    type={"date"}
                    className="form-control border-bold"
                    name="finalPaidAt"
                    value={finalPayObj.finalPaidAt}
                    onChange={finalPayFunc}
                    id="finalPayAt01"
                  />
                </div>
                <div className="mt-2">
                  <label className="font-weight-bold">Pay ID</label>
                  <input
                    type={"text"}
                    className="form-control border-bold"
                    name="finalPayId"
                    value={finalPayObj.finalPayId}
                    onChange={finalPayFunc}
                    id="finalPayId01"
                  />
                </div>

                <div className="mt-3">
                  <label className="font-weight-bold">Pay Via</label>
                  <select
                    className="form-control border-bold"
                    id="finalPayVia"
                    name="final_pay_via"
                    value={finalPayObj.final_pay_via}
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
                  <select
                    className="form-control border-bold"
                    id="finalPaymentStatus"
                    name="final_payment_status"
                    value={finalPayObj.final_payment_status}
                    onChange={finalPayFunc}
                  >
                    <option value={""} disabled>
                      Select Final Payment Status
                    </option>
                    <option value={"PAID"}>PAID</option>
                    <option value={"WAIVEOFF"}>WAIVEOFF</option>
                  </select>
                </div>
                <div className="mt-2 d-flex justify-content-end">
                  <button className="btn btn-danger rounded">CLOSE</button>
                  <button
                    id="finalPaySubmitBtn"
                    className="btn btn-primary rounded ml-2"
                    onClick={finalPaySubmit}
                  >
                    SAVE
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </ModalBody>
      </Modal>

      {/* ---------------------------> Claim Amount Description */}

      <Modal
        isOpen={addClaimAmtOpen.open}
        toggle={() => {
          setaddClaimAmtOpen({
            ...addClaimAmtOpen,
            open: !addClaimAmtOpen.open,
          });
        }}
        id="complaintModa2"
      >
        <ModalHeader>Claim Amount Description</ModalHeader>
        <ModalBody>
          <div className="container">
            <div>
              <label>Claim Amount</label>
              <input
              id="claimAmtDesc1"
                className="form-control border-bold"
                type={"number"}
                value={addClaimAmtOpen.claimAmount}
                name="claimAmount"
                onChange={addClaimHandleChange}
              />
            </div>
            <div>
              <label>Amount in Words</label>
              <input
              id="claimAmtDesc2"
                className="form-control border-bold"
                type="text"
                value={amtInWord}
                disabled
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
              id="claimAmtDesModalClose"
                className="btn btn-danger rounded mr-2"
                onClick={() => {
                  setaddClaimAmtOpen({ ...addClaimAmtOpen, open: false });
                }}
              >
                CLOSE
              </button>
              <button
              id="claimAmtDesModalOpen"
                className="btn btn-primary rounded"
                onClick={() => {
                  dispatch({
                    type: "COMPLAINT_CLAIM_OPERATION",
                    state: {
                      claimAmount: addClaimAmtOpen.claimAmount,
                      id: addClaimAmtOpen.id,
                      type: "Complain",
                    },
                  });
                  setaddClaimAmtOpen({ ...addClaimAmtOpen, open: false });
                }}
              >
                SAVE
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* ----------------------------------------> Show Status History */}
      <Modal
        isOpen={statusHistoryOpen}
        toggle={() => {
          setstatusHistoryOpen(!statusHistoryOpen);
        }}
        id="complaintModal3"
      >
        <ModalHeader>Status History</ModalHeader>
        <ModalBody>
          <div>
            <h5 className="font-weight-bold">User Details</h5>
            <span className="h6 font-weight-bold">ID : </span>
            <span className="h6">{complaint?._id}</span>
          </div>
          <div className="mt-2">
            <span className="h6 font-weight-bold">Name : </span>
            <span className="h6">{complaint?.name}</span>
          </div>
          <div className="mt-2">
            <span className="h6 font-weight-bold">Email : </span>
            <span className="h6">{complaint?.email}</span>
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
                {complaint?.statusHistory?.map((res,i) => {
                  return (
                    <tr key={i}>
                      <td>{res.currStatus}</td>
                      <td>{res.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mr-2 mt-3">
            <button className="btn btn-danger rounded">CLOSE</button>
          </div>
        </ModalBody>
      </Modal>
      {/* ------------------------------------> Open Call Logs */}

      <Modal
        isOpen={callLogObj.open}
        toggle={() => {
          setcallLogObj({ ...callLogObj, open: !callLogObj.open });
        }}
        size="lg"
        id="complaintModal4"
      >
        <ModalHeader>Call Logs For Customers</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="d-flex">
              <div className="mr-4">
                <input
                id="complaintModal41"
                  className="form-control border-bold mr-4"
                  type={"date"}
                  name="start_time"
                  value={callLogObj.start_time}
                  onChange={(e) => {
                    setcallLogObj({
                      ...callLogObj,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mr-4">
                <input
                id="complaintModal42"
                  className="form-control border-bold"
                  name="end_time"
                  type={"date"}
                  value={callLogObj.end_time}
                  onChange={(e) => {
                    setcallLogObj({
                      ...callLogObj,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mt-auto mb-auto">
                <button
                id="complaintModaFetch"
                  className="btn btn-success rounded btn-xs"
                  onClick={() => {
                    dispatch({
                      type: "COMPLAINT_CALL_LOG",
                      state: {
                        start_date: moment(callLogObj.start_time)
                          .startOf("day")
                          .add(330, "minute")
                          .toISOString(),
                        end_date: moment(callLogObj.end_time)
                          .endOf("day")
                          .add(330, "minute")
                          .toISOString(),
                        customer_number: complaint.phone,
                      },
                    });
                  }}
                >
                  Fetch
                </button>
              </div>
            </div>
            <div className="">
              <div className="text-primary w-100 h-30 shadow mt-4 py-3 px-2 ">
                <span> Call Logs For Customer</span>
              </div>
              <div className="table-responsive mt-3 ">
                <table className="table table-bordered">
                  <thead>
                    <tr className="bg-dark text-light">
                      <th>S.No</th>
                      <th>Call Type </th>
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

      {/* //-------------------------------------> See Document */}

      <Modal
        isOpen={seeDocumentOpen}
        toggle={() => {
          setseeDocumentOpen(!seeDocumentOpen);
        }}
        id="complaintSeeDoc"
        size="lg"
      >
        <ModalHeader>
          <span>Documents Uploads</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="mt-3">
              <span className="font-weight-bold h5">Lead ID : </span>
              <span className="h6">{complaint._id}</span>
            </div>
            <div className="mt-3">
              {console.log(state.leadData[0])}
              <span className="font-weight-bold h6">
                DOCUMENT UPLOAD BY USER :{" "}
              </span>
              <span className="h6">{complaint._id}</span>
            </div>
            <div className="mt-3">
              <label className="h4 mt-2"><u>All Documents</u></label>
              {state.leadData[0]?.doc?.length ? state.leadData[0]?.doc?.map((res,i) => {
                return (
                  <div className="mt-3" id={i}>
                    <label className="h6 mr-3">{res} :- </label><label><a className="text-primary h6" href={`${awsUrl}upload/lead_docs/${complaint.leadId}/${res}`} target="_blank" > <u>Download Doc</u></a></label>
                    {/* <iframe
                      src={`${awsUrl}upload/lead_docs/${complaint.leadId}/${res}`}
                      width="500"
                      height={"600"}
                    /> */}
                  </div>
                );
              }) : <div className="d-flex justify-content-center mt-3"><label className="h5">No Document Found</label></div>}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button id="complaintSeeDocClose" className="btn  btn-danger rounded px-5 py-1" onClick={() => {setseeDocumentOpen(false)}}>CLOSE </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------> Show History */}

      <Modal
        isOpen={showHistory}
        toggle={() => {
          setshowHistory(!showHistory);
        }}
        size="lg"
        id="complaintModal5"
      >
        <ModalHeader>
          <span className="text-primary">Case History</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            {/* <span className="font-weight-bold h6">CASE HISTORY</span> */}
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Name : </span>
                {complaint.name}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Policy Number : </span>
                {complaint.policyNumber}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Added Date : </span>
                {moment(complaint?.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Updated Date : </span>
                {moment(complaint?.update_date).toLocaleString()}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Assign To : </span>
                {complaint?.assign_to}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Assign Date : </span>
                {complaint?.assign_date}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Complain Date : </span>
                {complaint?.complaint_date1}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Ombudsman Date : </span>
                {complaint?.ombudsman_c_date}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Legal Date : </span>
                {complaint?.legal_notice_date1}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">
                  Assign To Ombudsman :{" "}
                </span>
                {complaint?.assignedOmd}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">
                  Assign To Mailing :{" "}
                </span>
                {complaint?.assignedMailing}
              </span>
            </div>
            <div className="mb-3">
              <span>
                <span className="font-weight-bold h6">Resolution Type : </span>
                {complaint?.resolutionType}
              </span>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger rounded"
                onClick={() => {
                  setshowHistory(false);
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------> UPDATE COMPLAINT */}

      <Modal
        isOpen={updateInfo.open}
        toggle={() => {
          setupdateInfo({ ...updateInfo, open: !updateInfo.open });
        }}
        id="complaintModal6"
        size="xl"
      >
        <ModalHeader>Update Information</ModalHeader>
        <ModalBody>
          <div className="container">
            <div>
              <label>Select the Section</label>
              <select
                className="form-control border-bold"
                id="complaintModal61"
                name="section"
                onChange={(e) => {
                  setupdateInfo({
                    ...updateInfo,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value={""}>Select the Section</option>
                <option value={"status_section"}>Status Section</option>
                <option value={"ombudsman_section"}>Ombudsman Section</option>
              </select>
            </div>
            {updateInfo.section === "status_section" ? (
              <div className="mt-3">
                <div>
                  <label>Select SUDO User</label>
                  <select
                    id="complaintModal62"
                    className="form-control border-bold"
                    name="sudo_user"
                    value={updateInfo.sudo_user}
                    onChange={(e) => {
                      setupdateInfo({
                        ...updateInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Select Sudo User</option>
                    {Object.entries(adminStatusChangePasswords)?.map((res) => {
                      return <option value={res[0]}>{res[0]}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label>Enter Password</label>
                  <input
                    id="complaintModal63"
                    type={"password"}
                    className="form-control border-bold"
                    name="sudo_password"
                    autoComplete="new-password"
                    value={updateInfo.sudo_password}
                    placeholder="Enter Super User Password"
                    onChange={(e) => {
                      setupdateInfo({
                        ...updateInfo,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  {updateInfo.sudo_user ? (
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th>Policy Number</th>
                          <th>Status</th>
                          <th>Company Name</th>
                          <th>Select Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.userBasedData?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <td>{res.policyNumber}</td>
                              <td>{res.status}</td>
                              <td>{res.insuranceCompanyId?.name}</td>
                              <td>
                                <select
                                  id="complaintModal64"
                                  className="form-control border-bold"
                                  name="status"
                                  onChange={(e) => {
                                    setupdateInfo({
                                      ...updateInfo,
                                      [`${e.target.name + i}`]: e.target.value,
                                    });
                                  }}
                                >
                                  <option value={""}>Select Status</option>
                                  {state.statusBucket?.map((res) => {
                                    return <option value={res}>{res}</option>;
                                  })}
                                </select>
                              </td>
                              <td>
                                <button
                                  className="btn btn-info"
                                  onClick={() => handleUpdateRow(i, res._id)}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : null}
                </div>
              </div>
            ) : null}
            {updateInfo.section === "ombudsman_section" ? (
              <div>
                <div className="mt-4">
                  <label>Select the Field</label>
                  <select
                    id="complaintModal65"
                    className="form-control border-bold"
                    name="actualRefundAmount"
                    value={updateInfoOmb.actualRefundAmount}
                    onChange={(e) => {
                      setupdateInfoOmb({
                        ...updateInfoOmb,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>Select Field</option>
                    <option className="" value={"actualRefundAmount"}>
                      {" "}
                      Resolved Amount
                    </option>
                  </select>
                </div>
                {updateInfoOmb.actualRefundAmount === "actualRefundAmount" ? (
                  <div>
                    <table className="table  table-responsive">
                      <thead>
                        <tr key={Math.random()}>
                          <th>Policy Number</th>
                          <th>Status</th>
                          <th>Company Name</th>
                          <th>Claim Amount</th>
                          <th>Field Update</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.userBasedData?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <td>{res.policyNumber}</td>
                              <td>{res.status}</td>
                              <td>{res.insuranceCompanyId?.name}</td>
                              <td>{res.claimAmount}</td>
                              <td>
                                <input
                                id="complaintModal601"
                                  className="form-control border-bold"
                                  type={"number"}
                                  name="fieldValue"
                                  placeholder="Enter Claim Amount"
                                  onChange={(e) => {
                                    setupdateInfoOmb({
                                      ...updateInfoOmb,
                                      [`${e.target.name}${i}`]: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td>
                                <button
                                id="complaintModal6Update"
                                  className="btn btn-info py-1"
                                  onClick={() => {
                                    handleUpdateClaimAmt(i, res._id);
                                  }}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="d-flex justify-content-center mt-5 mb-3">
              <button
                id="complaintModal66"
                className="btn btn-danger px-5"
                onClick={() => {
                  setupdateInfo({
                    open: false,
                    section: "",
                    sudo_user: "",
                    sudo_password: "",
                  });
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------> Update Data Modal */}
      <UpdateData
        updateData={updateData}
        setupdateData={setupdateData}
        complaint={complaint}
      />
    </>
  );
};

export default React.memo(DataListView);
