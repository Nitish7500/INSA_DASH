import {
  faContactBook,
  faNoteSticky,
  faPencil,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function LeadSection() {
  const [activeButton, setactiveButton] = useState("");
  const [status, setStatus] = useState({ status: "PENDING" });
  const [searchByMail, setsearchByMail] = useState("");
  const [openDownload, setopenDownload] = useState(false);
  const [policyNumber, setpolicyNumber] = useState("");
  const [reportDate, setreportDate] = useState({
    fromDate: 0,
    tillDate: 0,
  });

  const [openLeadAssign, setopenLeadAssign] = useState(false);
  const [assignToUser, setassignToUser] = useState({
    assignTo: "",
    id: "",
  });

  const [openExpertAssign, setopenExpertAssign] = useState(false);
  const [assignToExpert, setassignToExpert] = useState({
    assignTo: "",
    id: "",
  });

  const [openAcceptLead, setopenAcceptLead] = useState(false);
  const [singleLeadData, setsingleLeadData] = useState({});

  const [openRejectLead, setopenRejectLead] = useState(false);
  const [rejectReason, setrejectReason] = useState("")
  

  const dispatch = useDispatch();
  const state = useSelector((state) => state.leadReducer);
  console.log(state);

  useEffect(() => {
    dispatch({ type: "LEAD_ASSIGN_USER" });
    dispatch({ type: "LEAD_ASSIGN_EXPERT" });
    dispatch({ type: "LEAD_INSURANCE_COMPANY" });
    dispatch({
      type: "LEAD_DATA_WITH_STATUS",
      state: { status: "PENDING", pageIndex: 0, pageSize: 50, keyword: "" },
    });
    dispatch({ type: "LEAD_USERS" });
  }, [1]);

  const handleClick = (e, status) => {
    //-------------------> Call Redux
    dispatch({ type: "LEAD_DATA_WITH_STATUS", state: { status: status } });

    //------------------> Set button to non-active
    const allChips = document.querySelectorAll(".leadChips");
    for (let i = 0; allChips.length > i; i++) {
      // console.log(allChips[i].childNodes)
      let childs = allChips[i].childNodes;
      for (let j = 0; j < childs.length; j++) {
        childs[j].style.color = "black";
      }
      allChips[i].style.backgroundColor = "#f4f4f4";
    }
    //----------------------------> Set color to Active
    e.target.parentNode.style.backgroundColor = "#00bbd4";
    e.target.style.color = "white";
  };

  const handleSearch = (e) => {
    console.log(e.target.name, e.target.value);
    setStatus({ ...status, [e.target.name]: e.target.value });
    console.log(status);
  };

  const createExcel = () => {
    console.log(document.getElementById("csvDownloadBTN").click());
    // document.getElementById("csvDownload").click()
  };

  return (
    <div className="bg-inherit pt-5">
      <div className="w-95 d-flex justify-content-center">
        <div
          className=" text-white b-2 h-20 pl-4 pt-2 d-flex bg-white shadow d-flex flex-wrap"
          style={{
            // background: "`linear-gradient(60deg, #2B009F, #100052)",
            borderRadius: "5px",
            width: "97%",
            marginTop: "-25px",
            marginBottom: "-25px",
            paddingBottom: "-17px",
          }}
        >
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips active font-weight-bold"
            onClick={(e) => handleClick(e, "PENDING")}
            role={"button"}
            id="leadPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span name="PENDING" className="mt-auto mb-auto py-2">
              Pending
            </span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="ACCEPTED"
            onClick={(e) => {
              handleClick(e, "ACCEPTED");
            }}
            role={"button"}
            id="leadAccepted"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Accepted</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="THIRD_PARTY_ACCEPTED"
            onClick={(e) => {
              handleClick(e, "THIRD_PARTY_ACCEPTED");
            }}
            role={"button"}
            id="leadThirdPartyAcceptedLead"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">
              Third Party Accepted Lead
            </span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="REJECTED"
            onClick={(e) => {
              handleClick(e, "REJECTED");
            }}
            role={"button"}
            id="leadRejected"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Rejected</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="REJECTED BY EXECUTIVE"
            onClick={(e) => {
              handleClick(e, "REJECTED BY EXECUTIVE");
            }}
            role={"button"}
            id="leadRejectedByExecutive"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Rejected By Executive</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="NR FOLLOW UP"
            onClick={(e) => {
              handleClick(e, "NR FOLLOW UP");
            }}
            role={"button"}
            id="leadFollowUp"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">NR FOLLOW UP</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="CANCELLED"
            onClick={(e) => {
              handleClick(e, "CANCELLED");
            }}
            role={"button"}
            id="leadCancelled"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Cancelled</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="WRONG"
            onClick={(e) => {
              handleClick(e, "WRONG");
            }}
            role={"button"}
            id="leadWrongNumber"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Wrong Number</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="QUERY"
            onClick={(e) => {
              handleClick(e, "QUERY");
            }}
            role={"button"}
            id="leadOnlyQuery"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Only Query</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="NOINSURANCE"
            onClick={(e) => {
              handleClick(e, "NOINSURANCE");
            }}
            role={"button"}
            id="leadNoInsuranceQuery"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">No insureance Query</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="NONCONTACTABLE"
            onClick={(e) => {
              handleClick(e, "NONCONTACTABLE");
            }}
            role={"button"}
            id="leadNonContractable"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Non Contactable</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="DOCUMENT_PENDING"
            onClick={(e) => {
              handleClick(e, "DOCUMENT_PENDING");
            }}
            role={"button"}
            id="leadDocumentPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Document Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="FOLLOWUP"
            onClick={(e) => {
              handleClick(e, "FOLLOWUP");
            }}
            role={"button"}
            id="leadFollowUp"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Follow Up</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="AUTOFOLLOWUP"
            onClick={(e) => {
              handleClick(e, "AUTOFOLLOWUP");
            }}
            role={"button"}
            id="leadAutoFollwUp"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Auto Follow Up</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="REPEATED"
            onClick={(e) => {
              handleClick(e, "REPEATED");
            }}
            role={"button"}
            id="leadRepeat"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Repeat</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="EXPERT"
            onClick={(e) => {
              handleClick(e, "EXPERT");
            }}
            role={"button"}
            id="leadExpertReview"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Expert Review</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="REGISTERED"
            onClick={(e) => {
              handleClick(e, "REGISTERED");
            }}
            role={"button"}
            id="leadRegisteredLead"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Registered Lead</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="CUSTOMER_NOT_RESPONDING"
            onClick={(e) => {
              handleClick(e, "CUSTOMER_NOT_RESPONDING");
            }}
            role={"button"}
            id="leadCustomerNotResponding"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">
              Customer Not Responding
            </span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="FILTRATION_LEADS"
            onClick={(e) => {
              handleClick(e, "FILTRATION_LEADS");
            }}
            role={"button"}
            id="leadFiltrationLead"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Filtration Lead</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="REGISTRATION_PENDING"
            onClick={(e) => {
              handleClick(e, "REGISTRATION_PENDING");
            }}
            role={"button"}
            id="leadRegistrationPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Registration Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="DOC VERIFICATION PENDING"
            onClick={(e) => {
              handleClick(e, "DOC VERIFICATION PENDING");
            }}
            role={"button"}
            id="leadDocVerificationPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">
              Doc Varification Pending(PA)
            </span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="DOC UPLOAD PENDING"
            onClick={(e) => {
              handleClick(e, "DOC UPLOAD PENDING");
            }}
            role={"button"}
            id="leadDocUploadPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Doc Upload Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="POLIFYX CUSTOMER PENDING"
            onClick={(e) => {
              handleClick(e, "POLIFYX CUSTOMER PENDING");
            }}
            role={"button"}
            id="leadPolifixCustomerPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span id="leadPolifixHeading" className="mt-auto mb-auto py-2">
              Polifix Customer Pending
            </span>
          </div>
        </div>
      </div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white"
        style={{ borderRadius: "5px" }}
        id="leadSearcDiv"
      >
        {/* <div className="d-flex mt-5 px-5 border border-info shadow">
          <div className="border-1 mb-3 w-40">
            <label className="d-block" for="fromDate">
              From Date
            </label>
            <input
              className="w-80 py-2 border border-dark"
              id="fromDate"
              placeholder="From Date"
              type={"date"}
            />
          </div>
          <div className="border-1 mb-3 w-40">
            <label className="d-block" for="fromDate">
              From Date
            </label>
            <input
              className="w-80 py-2 border border-dark"
              id="fromDate"
              placeholder="From Date"
              type={"date"}
            />
          </div>
        </div> */}
        <div className="d-flex mt-5 container">
          <div className="mb-3 w-40">
            <label
              className="form-label font-weight-bold h6 d-block"
              for="searchKeyword"
            >
              Search Keyword
            </label>
            <input
              onChange={handleSearch}
              name="keyword"
              className="w-80 py-2 border border-dark"
              type={"text"}
              id="searchKeyword"
              placeholder="Search Keyword"
              value={status.keyword ?? ""}
            />
          </div>
          <div className="mb-3 w-30 row   ">
            <label
              className="form-label font-weight-bold h6 d-block"
              for="leadSelectSortOrder"
            >
              Select Sort Order
            </label>
            <select
              className="form-control border-0 border border-dark"
              id="leadSelectSortOrder"
              name="selectedSortOrder"
              value={status.selectedSortOrder ?? ""}
              onChange={handleSearch}
            >
              <option value={""}>Select Sort Order</option>
              <option value={"First"}>First</option>
              <option value={"Second"}>Second</option>
              <option>First</option>
            </select>
          </div>
          <div className=" d-block h-20 mt-auto mb-auto ml-auto mr-auto">
            <button
              className="btn btn-success mr-3 rounded"
              id="leadInputClear"
              onClick={() => {
                setStatus({ status: "PENDING" });
              }}
            >
              Clear
            </button>
            <button
              className="btn btn-warning"
              id="leadSearchBtn"
              onClick={() => {
                dispatch({
                  type: "LEAD_DATA_WITH_STATUS",
                  state: { ...status },
                });
              }}
            >
              SEARCH
            </button>
          </div>
        </div>
        <div className="container">
          <label
            className="h6 d-block font-weight-bold"
            for="leadSearchByMailInput"
          >
            Search By Email And Phone And Lead Id
          </label>
          <input
            className="w-40 py-1"
            id="leadSearchByMailInput"
            type={"text"}
            placeholder="Search By Email And Phone And Lead Id"
            onChange={(e) => {
              setsearchByMail(e.target.value);
            }}
          />
          <button
            className="btn btn-success rounded ml-3 mr-5"
            id="leadSearchBymailBtn"
            onClick={() => {
              dispatch({
                type: "SEARCH_BY_MAIL_AND_PHONE",
                state: { keyword: searchByMail },
              });
            }}
          >
            Search
          </button>
          <div className="d-inline ml-5" id="leadRefreshDownloadSection">
            <button
              className="btn btn-success rounded mr-5"
              id="leadRefresh"
              onClick={() => {
                dispatch({
                  type: "LEAD_DATA_WITH_STATUS",
                  state: { status: "PENDING" },
                });
              }}
            >
              Refresh
            </button>
            <button
              className="btn btn-warning rounded"
              id="leadDownloadReport"
              onClick={() => {
                setopenDownload(!openDownload);
              }}
            >
              Download Report
            </button>
          </div>
        </div>
        {openDownload ? (
          <div className="d-flex mt-5 px-5 border border-info shadow rounded pt-3 pb-2">
            <div className="border-1 mb-3 w-40">
              <label className="d-block" for="fromDate">
                From Date
              </label>
              <input
                className="w-80 py-2 border border-dark"
                id="fromDate"
                placeholder="From Date"
                type={"date"}
                onChange={(e) => {
                  setreportDate({ ...reportDate, fromDate: e.target.value });
                }}
              />
            </div>
            <div className="border-1 mb-3 w-40">
              <label className="d-block" for="fromDate">
                To Date
              </label>
              <input
                className="w-80 py-2 border border-dark"
                id="fromDate"
                placeholder="From Date"
                type={"date"}
                onChange={(e) => {
                  setreportDate({ ...reportDate, tillDate: e.target.value });
                }}
              />
            </div>
            <div className="d-inline ml-5 my-auto">
              <button
                className="btn btn-warning rounded"
                id="downloadReport"
                onClick={() => {
                  createExcel();
                  dispatch({ type: "LEAD_DOWNLOAD_REPORT", ...reportDate });
                }}
              >
                {" "}
                Download
              </button>
            </div>
            {console.log(state.leadReportData.split(","))}
            {state.leadReportData.length ? (
              // console.log(state.leadReportData.split(","))
              <CSVLink
                filename={"leads"}
                id="csvDownloadBTN"
                data={state.leadReportData}
              ></CSVLink>
            ) : null}
          </div>
        ) : null}
        <div className="table-responsive mt-4 px-3" id="leadTableSection">
          <table className="table table-bordered" id="leadTable">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Action</th>
                <th>Lead Id</th>
                <th>OTP Verified</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Mobile</th>
                <th>Policy Type</th>
                <th>Complaint Type</th>
                <th>Assign To</th>
                <th>Expert To</th>
                <th>SRC | MED | CPN</th>
                <th>Lead Time</th>
              </tr>
            </thead>
            <tbody>
              {state.leadDataByStatus?.list ? (
                state.leadDataByStatus?.list?.map((res, i) => {
                  return (
                    <tr id="leadTableRow">
                      <td className="font-weight-bold" id="leadTableCellOne">
                        {i + 1}
                      </td>
                      <td id="leadTableRowCellTwo">
                        {/* <button id="lead" className="btn btn-primary m-0 p-0 ">CC</button> */}
                        <button
                          className="btn btn-primary m-0 p-0 "
                          id="leadLM"
                          onClick={() => {
                            setopenLeadAssign(true);
                            setassignToUser({
                              ...assignToUser,
                              assignTo: res.assign_to,
                              id: res._id,
                            });
                            dispatch({
                              type: "LEAD_GET_MISSELLING",
                              state: { leadId: res.assign_to },
                            });
                          }}
                        >
                          AT
                        </button>
                        <button
                          className="btn btn-primary m-0 p-0 "
                          id="leadAE"
                          onClick={() => {
                            setopenExpertAssign(true);
                            setassignToExpert({
                              ...assignToExpert,
                              assignTo: res.expert_to,
                              id: res._id,
                            });
                          }}
                        >
                          AE
                        </button>
                        <button className="btn btn-primary m-0 p-0 ">CH</button>
                        <button
                        id="leadAL"
                          className="btn btn-primary m-0 p-0 "
                          onClick={() => {
                            setsingleLeadData(res);
                            setopenAcceptLead(true);
                          }}
                        >
                          AL
                        </button>
                        <button
                        id="leadRL"
                          className="btn btn-primary m-0 p-0 "
                          onClick={() => {
                            setsingleLeadData(res)
                            setopenRejectLead(true);
                          }}
                        >
                          RL
                        </button>
                        <button id="leadCL" className="btn btn-primary m-0 p-0 ">CL</button>
                        <button id="leadET" className="btn btn-primary m-0 p-0 ">ET</button>
                        <button id="leadFU" className="btn btn-primary m-0 p-0 ">FU</button>
                        <button id="leadCLL" className="btn btn-primary m-0 p-0 ">
                          CLL
                        </button>
                        <button id="leadUD" className="btn btn-primary m-0 p-0 ">UD</button>
                        <button id="leadPS" className="btn btn-primary m-0 p-0 ">PS</button>
                        <button id="leadSH" className="btn btn-primary m-0 p-0 ">SH</button>
                        <button id="leadCF" className="btn btn-primary m-0 p-0 ">CF</button>
                        <button id="leadSMU" className="btn btn-primary m-0 p-0 ">
                          SMU
                        </button>
                        <button id="leadNCF" className="btn btn-primary m-0 p-0 ">
                          NCF
                        </button>
                        <button id="leadCLL" className="btn btn-primary m-0 p-0 ">
                          CLL
                        </button>{" "}
                        {/* <FontAwesomeIcon
                          icon={faPhone}
                          style={{ cursor: "pointer" }}
                          color="#9c27b0"
                          fontSize={"1.2rem"}
                        />
                        <FontAwesomeIcon icon={faContactBook} />
                        <FontAwesomeIcon icon={faNoteSticky} />
                        <FontAwesomeIcon icon="fa-sharp fa-solid fa-clock-rotate-left" /> */}
                        <img src="" alt="" />
                        {/* <FontAwesomeIcon icon={fa} /> */}
                        {"Action"}
                      </td>
                      <td id="leadTableRowCellThree">{res.leadId}</td>
                      <td id="leadTableRowCellFour">
                        {res.isPhoneVerified ? "YES" : "NO"}
                      </td>
                      <td id="leadTableRowCellFive">{res.name}</td>
                      <td id="leadTableRowCellSix">{res.email}</td>
                      <td id="leadTableRowCellSeven">{res.phone}</td>
                      <td id="leadTableRowCellEight">
                        {res.policyTypeId?.name}
                      </td>
                      <td id="leadTableRowCellNine">
                        {res.complaintTypeId?.name}
                      </td>
                      <td id="leadTableRowCellTen">{res.assign_to}</td>
                      <td id="leadTableRowCellEleven">
                        {res.assign_to_expert ? res.assign_to_expert : "--"}
                      </td>
                      <td id="leadTableRowCellTwelve">
                        {res.src} || {res.med} || {res.cpn}
                      </td>
                      {/* {console.log(moment.unix(res.createdAt).format("DD MM YYYY : HH MM SS")  )} */}
                      <td id="leadTableRowCeellThirteen">
                        {moment
                          .unix(res.createdAt)
                          .format("DD MM YYYY : HH MM SS")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>No Data</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* --------------------------> Modal */}

      {/* -------------------------------------> Assign to user */}
      <Modal
        isOpen={openLeadAssign}
        toggle={() => {
          setopenLeadAssign(false);
        }}
        size=""
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={() => {
            setopenLeadAssign(false);
          }}
        >
          Lead Assign to User
        </ModalHeader>
        <ModalBody>
          <span className="h6">Policy Number</span>
          <div className="container">
            <div className="row">
              <select
              id="assignDropdownUser"
                value={assignToUser.assignTo}
                className="w-80 mt-3 py-2"
                onChange={(e) =>
                  setassignToUser({ ...assignToUser, assignTo: e.target.value })
                }
              >
                <option disabled>Select User</option>
                {state.assigUser?.map((res) => {
                  return <option value={res.user_id}>{res.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
              id="closeAssignUserModal"
                className="btn btn-danger rounded mr-2"
                onClick={() => setopenLeadAssign(false)}
              >
                Close
              </button>
              <button
              id="saveAssignUserModal"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  setopenLeadAssign(false);
                  dispatch({
                    type: "LEAD_ASSIGN_USER_SAVE",
                    state: assignToUser,
                  });
                  dispatch({
                    type: "LEAD_DATA_WITH_STATUS",
                    state: {
                      status: "PENDING",
                      pageIndex: 0,
                      pageSize: 50,
                      keyword: "",
                    },
                  });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/*-------------------------------------> Assign To Exprt */}
      <Modal
        isOpen={openExpertAssign}
        toggle={() => {
          setopenExpertAssign(false);
        }}
        size=""
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={() => {
            setopenExpertAssign(false);
          }}
        >
          Lead Assign to Expert
        </ModalHeader>
        <ModalBody>
          <span className="h6">Policy Number</span>
          <div className="container">
            <div className="row">
              <select
              id="assignExpertModal"
                value={assignToExpert.assignTo}
                className="w-80 mt-3 py-2"
                onChange={(e) =>
                  setassignToExpert({
                    ...assignToExpert,
                    assignTo: e.target.value,
                  })
                }
              >
                <option disabled>Select User</option>
                {state.assigUser?.map((res) => {
                  console.log(res, assignToExpert);
                  return <option value={res.user_id}>{res.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
              id="closeAssignExpertModal"
                className="btn btn-danger rounded mr-2"
                onClick={() => setopenExpertAssign(false)}
              >
                Close
              </button>
              <button
              id="saveAssignExpertBtn"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  setopenExpertAssign(false);
                  dispatch({
                    type: "LEAD_ASSIGN_EXPERT_SAVE",
                    state: assignToExpert,
                  });
                  dispatch({
                    type: "LEAD_DATA_WITH_STATUS",
                    state: {
                      status: "PENDING",
                      pageIndex: 0,
                      pageSize: 50,
                      keyword: "",
                    },
                  });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* ---------------> Confirm Accept Lead */}
      <Modal
        isOpen={openAcceptLead}
        toggle={() => {
          setopenAcceptLead(false);
        }}
        size=""
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={() => {
            setopenAcceptLead(false);
          }}
        >
          Confirmation
        </ModalHeader>
        <ModalBody>
          {/* <span className="h6">Confirmation</span> */}
          <div className="container">
            <div className="row">
              <span className="h5">Are you sure you want to proceed ?</span>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
              id="NoacceptLeadConfirmation"
                className="btn btn-danger rounded mr-2"
                onClick={() => setopenAcceptLead(false)}
              >
                No
              </button>
              <button
              id="YesacceptLeadConfirmation"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  setopenAcceptLead(false);
                  dispatch({
                    type: "LEAD_ACCEPT_LEAD",
                    state: { ...singleLeadData, status:"ACCEPTED" },
                  });
                  dispatch({
                    type: "LEAD_DATA_WITH_STATUS",
                    state: {
                      status: "PENDING",
                      pageIndex: 0,
                      pageSize: 50,
                      keyword: "",
                    },
                  });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* ----------------------------------------------> Confirm Modal for reject Lead */}

      <Modal
        isOpen={openRejectLead}
        toggle={() => {
          setopenRejectLead(false);
        }}
        size=""
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={() => {
            setopenRejectLead(false);
          }}
        >
          Reason for Rejection
        </ModalHeader>
        <ModalBody>
          {/* <span className="h6">Confirmation</span> */}
          <div className="container">
            <div className="row">
              <h6 className="col-12 p-0">Reason for Rejection</h6>
              <textarea
                id="inputOnRejectionLead"
                className="col-10 d-block p-2 form-control border"
                rows={4}
                value={rejectReason}
                onChange={e => setrejectReason(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="rejectionNoBtn"
                className="btn btn-danger rounded mr-2"
                onClick={() => setopenRejectLead(false)}
              >
                No
              </button>
              <button
                id="rejectionYesBtn"
                className="btn btn-primary rounded ml-2"
                onClick={() => {
                  setopenRejectLead(false);
                  dispatch({
                    type: "LEAD_REJECT_LEAD",
                    state: { ...singleLeadData, reject_reason:rejectReason, status:"REJECTED" },
                  });
                  dispatch({
                    type: "LEAD_DATA_WITH_STATUS",
                    state: {
                      status: "PENDING",
                      pageIndex: 0,
                      pageSize: 50,
                      keyword: "",
                    },
                  });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LeadSection;
