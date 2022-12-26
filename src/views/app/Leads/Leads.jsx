import {
  faArrowLeft,
  faCircleXmark,
  faClockRotateLeft,
  faCloudArrowUp,
  faContactBook,
  faFileExport,
  faFilter,
  faFolderOpen,
  faHandsHolding,
  faListCheck,
  faMessage,
  faNoteSticky,
  faPencil,
  faPenToSquare,
  faPhone,
  faPhoneSquare,
  faTable,
  faThumbsDown,
  faThumbsUp,
  faTriangleExclamation,
  faWifi,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  Card,
  CardBody,
  Row,
} from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import Select from "react-select";
import { currentUser } from "constants/defaultValues";
import EditLead from "./EditLead";
import ReactPaginate from "react-paginate";
import AssignToUser from "./Modal/AssignToUser";
import { NotificationManager } from "components/common/react-notifications";
import AssignToExpert from "./Modal/AssignToExpert";

// import

function LeadSection() {
  const [editPage, seteditPage] = useState(false);
  const [currLead, setcurrLead] = useState({});
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

  const [currentLeadDetail, setcurrentLeadDetail] = useState({});

  const [openAcceptLead, setopenAcceptLead] = useState(false);
  const [singleLeadData, setsingleLeadData] = useState({});

  const [openRejectLead, setopenRejectLead] = useState(false);
  const [rejectReason, setrejectReason] = useState("");

  const [downloadCound, setdownloadCound] = useState(1);

  const [filtrationData, setFiltrationData] = useState(false);

  const [customerCallLogs, setcustomerCallLogs] = useState(false);
  const [callLogAccordion, setcallLogAccordion] = useState(false);

  const [hoverMessage, sethoverMessage] = useState({
    index: "",
    name: "",
  });

  const [callLogCustomer, setcallLogCustomer] = useState({
    startTime: moment().subtract(1, "months").format("YYYY-MM-DD"),
    endTime: moment().format("YYYY-MM-DD"),
    customer_number: "",
  });

  const [openNewCustomerForm, setopenNewCustomerForm] = useState(false);
  const [openCustomerForm, setopenCustomerForm] = useState(false);

  const [sendMessageToUser, setsendMessageToUser] = useState(false);
  const [textMessageToCustomer, settextMessageToCustomer] = useState({
    data: {},
    message: `Good Morning/Evening Sir/Ma'am,
  Greetings of the day!
  I am Ashish Dalal from Insurance Samadhan. As per our discussion on call, we require some of your documents to go through your case. Please share the following documents:
  1. Complete Policy Pack
  2. Discharge summary
  3. Final Bill
  4. Rejection letter / Settlement letter/ Query letter
  5. Mail communication if any
  You can either whatsapp the documents on 9310487592 or mail on ashishdalal@insurancesamadhan.com.
  Thank You and Have a Nice Day!`,
  });

  const [statusHistory, setstatusHistory] = useState({
    open: false,
    data: {},
  });

  const [problemStatement, setproblemStatement] = useState(false);

  const [followUpObj, setfollowUpObj] = useState({
    open: false,
    com_by: "Admin",
    com_date: "",
    com_dis: "",
    follow_date: "",
    status: "FOLLOWUP",
    id: "",
    followUpDesc: "",
  });

  const [leadCancelDetail, setleadCancelDetail] = useState({
    open: false,
    data: {},
    state: {},
  });
  const [uploadDocForm, setuploadDocForm] = useState({ lead: {}, open: false });

  //-------------------------------Pagination

  const [currentPage, setcurrentPage] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.leadReducer);

  const getData = ({ status = "PENDING", pageIndex = 0, pageSize = 50 }) => {
    // console.log(
    //   "======================================",
    //   status,
    //   pageIndex,
    //   pageSize
    // );
    dispatch({
      type: "LEAD_DATA_WITH_STATUS",
      state: {
        status: status,
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: "",
      },
    });
  };

  useEffect(() => {
    getData({ pageIndex: currentPage });
  }, [currentPage]);

  useEffect(() => {
    if (state.message) {
      NotificationManager.success(
        state.message,
        "SuccessFul !",
        3000,
        null,
        null,
        "filled"
      );
    }
  }, [state.message, state.leadDataByStatus]);

  useEffect(() => {
    dispatch({ type: "LEAD_ASSIGN_USER" });
    dispatch({ type: "LEAD_ASSIGN_EXPERT" });
    dispatch({ type: "LEAD_INSURANCE_COMPANY" });
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
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const createExcel = () => {
    // console.log(document.getElementById("csvDownloadBTN")?.click());
    // document.getElementById("csvDownload").click()
  };

  useEffect(() => {
    document.getElementById("csvDownloadBTN")?.click();
  }, [state.leadReportData, downloadCound]);

  const commHistoryHandler = (currentLead) => {
    history.push({ pathname: `usercomment/`, state: currentLead });
  };

  //------------------------------------> Pagination
  let itemsPerPage = 50;
  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(
    state.leadDataByStatus?.totalRecords / itemsPerPage
  );

  const handlePageClick = (event) => {
    setcurrentPage(event.selected);
  };

  const [openOptions, setopenOptions] = useState([]);

  const handleShowOption = (item) => {
    if (openOptions.includes(item)) {
      let temp = openOptions.filter((res) => res !== item);
      setopenOptions(temp);
    } else {
      setopenOptions([...openOptions, item]);
    }
  };

  return editPage ? (
    <EditLead lead={currLead} seteditPage={seteditPage} getData={getData} />
  ) : (
    <div className="bg-inherit pt-5">
      <div className="w-95 d-flex  justify-content-center">
        <div
          className=" text-white b-2 h-20 pl-4 pt-2 d-flex bg-white shadow d-flex flex-wrap"
          style={{
            // background: "`linear-gradient(60deg, #2B009F, #100052)",
            borderRadius: "5px",
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
        className=" py-3 mb-5"
        style={{ borderRadius: "5px" }}
        id="leadSearcDiv"
      >
        <div className="d-flex mt-5 container mx-0 px-0 ">
          <div className="mb-3 w-40">
            <label
              className="form-label font-weight-bold h6 d-block"
              htmlFor="searchKeyword"
            >
              Search Keyword
            </label>
            <input
              onChange={handleSearch}
              name="keyword"
              className="w-80 py-2 border border-dark pl-3"
              type={"text"}
              id="searchKeyword"
              placeholder="Search Keyword"
              value={status.keyword ?? ""}
            />
          </div>
          <div className="mb-3 w-30 row   ">
            <label
              className="form-label font-weight-bold h6 d-block"
              htmlFor="leadSelectSortOrder"
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
              <option key={"select"} value={""}>
                Select Sort Order
              </option>
              <option key={"first"} value={"First"}>
                First
              </option>
              <option key={"sec"} value={"Second"}>
                Second
              </option>
              <option key={"first1"}>First</option>
            </select>
          </div>
          <div className=" d-block h-20 mt-auto mb-auto ml-auto mr-auto">
            <button
              className="btn btn-warning mr-3 rounded"
              id="leadInputClear"
              onClick={() => {
                setStatus({ status: "PENDING" });
              }}
            >
              Clear
            </button>
            <button
              className="btn btn-primary rounded"
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
        <div className="container mx-0 px-0 mt-3">
          <label
            className="h6 d-block font-weight-bold "
            htmlFor="leadSearchByMailInput"
          >
            Search By Email And Phone And Lead Id
          </label>
          <input
            className="w-40 py-1 pl-2 border-bold"
            id="leadSearchByMailInput"
            type={"text"}
            placeholder="Search By Email And Phone And Lead Id"
            onChange={(e) => {
              setsearchByMail(e.target.value);
            }}
          />
          <button
            className="btn btn-primary rounded ml-3 mr-5"
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
              className="btn btn-primary rounded mr-5"
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
              <label className="d-block" htmlFor="fromDate">
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
              <label className="d-block" htmlFor="fromDate">
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
                  setdownloadCound(downloadCound + 1);
                  dispatch({ type: "LEAD_DOWNLOAD_REPORT", ...reportDate });
                }}
              >
                {" "}
                Download
              </button>
            </div>
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
      </div>

      <div className="overflow-auto d-flex w-auto flex-column">
        <div className="d-flex ">
          <div className="d-flex bg-primary px-3 py-3 w-auto">
            <div className="" style={{ width: "100px" }}>
              <span className="font-weight-bold">S.No</span>
            </div>
            <div className="" style={{ width: "150px" }}>
              <span className="font-weight-bold">Action</span>
            </div>
            <div className="" style={{ width: "200px" }}>
              <span className="font-weight-bold">Lead Id</span>
            </div>
            <div className="" style={{ width: "150px" }}>
              <span className="font-weight-bold">OTP Varified</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Name</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Email Id</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Mobile</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Policy Type</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Complaint Type</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Assign To</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Expert To</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">SRC | MED | CPN</span>
            </div>
            <div className="" style={{ width: "250px" }}>
              <span className="font-weight-bold">Lead Time</span>
            </div>
          </div>
        </div>

        {state.leadDataByStatus?.list
          ? state.leadDataByStatus?.list?.map((res, i) => {
              return (
                <div key={i+100}>
                  {/* {
          [1,2,3,4].map((res,i) => {
            return <> */}
                  <div className="d-flex" key={i}>
                    <div className="d-flex bg-warning shadow px-3 py-3 w-auto mt-2">
                      <div className="" style={{ width: "100px" }}>
                        <span
                          className="cardCell font-weight-bold th-column mx-0"
                          style={{ width: "100px" }}
                        >
                          {i + 1 + currentPage * itemsPerPage}
                        </span>
                      </div>
                      <div
                        className=""
                        style={{ width: "150px", marginTop: "-5px" }}
                      >
                        <span
                          className="cardCell font-weight-bold th-column m-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowOption(`option${i}`)}
                        >
                          <div
                            className={
                              openOptions.includes(`option${i}`)
                                ? "dropup btn-group m-0 p-0"
                                : ""
                            }
                          >
                            <Button
                              style={{ height: "20px" }}
                              color="primary"
                              className="m-0 p-0 dropdown-toggle-split dropdown-toggle btn table-expand"
                            ></Button>
                          </div>
                        </span>
                      </div>
                      <div className="" style={{ width: "200px" }}>
                        <span className="cardCell font-weight-bold th-column m-0">
                          {res.leadId}
                        </span>
                      </div>

                      <div className="" style={{ width: "150px" }}>
                        <span className="cardCell m-0 font-weight-bold  th-column">
                          {res.isPhoneVerified ? "YES" : "NO"}
                        </span>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.name}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.email}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.phone}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.policyTypeId?.name}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.complaintTypeId?.name}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.assign_to}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.assign_to_expert ? res.assign_to_expert : "--"}
                        </p>
                      </div>
                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {res.src} || {res.med} || {res.cpn}
                        </p>
                      </div>

                      <div className="" style={{ width: "250px" }}>
                        <p className="cardCell font-weight-bold th-column m-0">
                          {moment
                            .unix(res.createdAt)
                            .format("DD MM YYYY : HH MM SS")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Collapse isOpen={openOptions.includes(`option${i}`)}>
                      <div className=" bg-light px-4 ">
                        <div className="pl-2 d-flex justify-content-between">
                          <button
                            className="btn btn-inherit m-0 p-0 mr-2"
                            id="leadCallCustomer"
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "callCustomer" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Call Customer"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faPhone}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "callCustomer",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            className="btn btn-inherit m-0 p-0 mr-2"
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
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "assignToUser" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Assign to User"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faListCheck}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "assignToUser",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            className="btn btn-inherit m-0 p-0 mr-2"
                            id="leadAE"
                            onClick={() => {
                              setopenExpertAssign(true);
                              setcurrentLeadDetail(res);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "assignToExpert" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Assign to Expert"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faFileExport}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "assignToExpert",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() => sethoverMessage(0)}
                              />
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              commHistoryHandler(res);
                            }}
                            id="leadCommHistoryBtn"
                            className="btn btn-inherit m-0 p-0 mr-2"
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "CommHistory" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Communication history"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faClockRotateLeft}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "CommHistory",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadAL"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setsingleLeadData(res);
                              setopenAcceptLead(true);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "acceptLead" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Accept Lead"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="green"
                                size="lg"
                                icon={faThumbsUp}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "acceptLead",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadRL"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setsingleLeadData(res);
                              setopenRejectLead(true);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "rejectLead" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Reject Lead"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="red"
                                size="lg"
                                icon={faThumbsDown}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "rejectLead",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadCL"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setleadCancelDetail({
                                ...leadCancelDetail,
                                open: true,
                                data: res,
                              });
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "cancelLead" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Cancel Lead"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="red"
                                size="lg"
                                icon={faXmark}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "cancelLead",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadET"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setcurrLead(res);
                              seteditPage(true);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "editTask" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Edit Task"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faPenToSquare}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "editTask",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadFollowUp"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setfollowUpObj({
                                ...followUpObj,
                                id: res._id,
                                open: true,
                              });
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "followUp" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Follow Up"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faPhone}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "followUp",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadCallLogsForCustomer"
                            className="btn btn-inherit m-0 p-0"
                            onClick={() => {
                              setcallLogCustomer({
                                ...callLogCustomer,
                                customer_number: res.phone,
                              });
                              setcustomerCallLogs(true);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "callLogsForLead" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Call Logs for Lead"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faPhoneSquare}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "callLogsForLead",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadUD"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setuploadDocForm({
                                ...uploadDocForm,
                                lead: res,
                                open: true,
                              });
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "uploadDoc" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Upload Document"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faCloudArrowUp}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "uploadDoc",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadPS"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setproblemStatement(true);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "problemStatement" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Problem Statement"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faTriangleExclamation}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "problemStatement",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadSH"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() =>
                              setstatusHistory({
                                ...statusHistory,
                                open: true,
                                data: res,
                              })
                            }
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "statusHistory" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Status History"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faWifi}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "statusHistory",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadCustoemrForm"
                            className="btn btn-inherit m-0 p-0 mr-2"
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "customerform" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Customer Form"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faTriangleExclamation}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "customerform",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          {/* <button
                          id="leadCF"
                          className="btn btn-primary m-0 p-0 mr-2"
                        >
                          CF
                        </button> */}
                          <button
                            id="leadSMU"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => {
                              setsendMessageToUser(true);
                              settextMessageToCustomer({
                                ...textMessageToCustomer,
                                data: res,
                              });
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "sendMsgToUser" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Send Message To User"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="red"
                                size="lg"
                                icon={faMessage}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "sendMsgToUser",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadNCF"
                            className="btn btn-inherit m-0 p-0 mr-2"
                            onClick={() => setopenNewCustomerForm(true)}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "newCustomerForm" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    top: "-20px",
                                    zIndex: 2,
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"New Customer Form"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faTable}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "newCustomerForm",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>
                          <button
                            id="leadCLL"
                            className="btn btn-inherit m-0 p-0"
                            onClick={() => {
                              dispatch({
                                type: "LEAD_FILTRATION_DATA",
                                state: { leadId: res._id },
                              });
                              setFiltrationData(true);
                            }}
                          >
                            <div className="position-relative py-3">
                              {hoverMessage.index == i + 1 &&
                              hoverMessage.name === "callLogLead" ? (
                                <span
                                  className="shadow-lg p-1 font-weight-bold position-absolute bg-white h-10"
                                  style={{
                                    width: "100px",
                                    top: "-20px",
                                    xIndex: "1",
                                    whiteSpace: "pre",
                                  }}
                                >
                                  {"Filtration Data"}
                                </span>
                              ) : null}
                              <FontAwesomeIcon
                                color="#2b009f"
                                size="lg"
                                icon={faFilter}
                                onMouseOver={() =>
                                  sethoverMessage({
                                    name: "callLogLead",
                                    index: i + 1,
                                  })
                                }
                                onMouseLeave={() =>
                                  sethoverMessage({ name: "", index: 0 })
                                }
                              />
                            </div>
                          </button>{" "}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>

      {/* --------------------------> Modal */}

      {/* -------------------------------------> Assign to user */}
      <Modal
        id="leadAssignToUserModal"
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
                <option key={"select"} value="">
                  Select User
                </option>
                {state.assigUser?.map((res) => {
                  return (
                    <option key={res.user_id} value={res.user_id}>
                      {res.name}
                    </option>
                  );
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
      <AssignToExpert
        isOpen={openExpertAssign}
        onClose={() => {
          setopenExpertAssign(false);
        }}
        details={currentLeadDetail}
      />

      {/* ---------------> Confirm Accept Lead */}
      <Modal
        id="leadAcceptLeadModal"
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
                    state: { ...singleLeadData, status: "ACCEPTED" },
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
        id="confirmationOnRejection"
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
                onChange={(e) => setrejectReason(e.target.value)}
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
                    state: {
                      ...singleLeadData,
                      reject_reason: rejectReason,
                      status: "REJECTED",
                    },
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
      {/* ----------------------------------------------> Call Log for customers */}

      <Modal
        id="leadCallLogModal"
        isOpen={customerCallLogs}
        toggle={() => {
          setcustomerCallLogs(false);
        }}
        size="lg"
      >
        <ModalHeader
          className="py-3 text-primary"
        >
          Call Logs For Customers
        </ModalHeader>
        <ModalBody>
          {/* <span className="h6">Confirmation</span> */}
          <div className="container">
            <div className="row">
              <input
                value={callLogCustomer.startTime}
                name="startTime"
                onChange={(e) =>
                  setcallLogCustomer({
                    ...callLogCustomer,
                    [e.target.name]: e.target.value,
                  })
                }
                className="form col-4 p-1 mx-2"
                type={"date"}
              />
              <input
                value={callLogCustomer.endTime}
                name="endTime"
                onChange={(e) =>
                  setcallLogCustomer({
                    ...callLogCustomer,
                    [e.target.name]: e.target.value,
                  })
                }
                className="form col-4 p-1 mx-2"
                type={"date"}
              />
              <button
                className="btn btn-warning col-2"
                onClick={() => {
                  dispatch({
                    type: "CALL_LOGS_FOR_CUSTOMER",
                    state: { ...callLogCustomer },
                  });
                }}
              >
                Fetch
              </button>
              <div
                className="container w-100 bg-white shadow border mt-3 py-3 d-flex justify-content-between mb-2"
                onClick={() => {
                  setcallLogAccordion(!callLogAccordion);
                  setcallLogCustomer({
                    startTime: "",
                    endTime: "",
                    customer_number: "",
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <span>Call Logs For :- </span>{" "}
                <span>{callLogCustomer.customer_number}</span>{" "}
                <span>{"<"}</span>
              </div>
              <Collapse
                isOpen={callLogAccordion}
                onClick={(id) => {
                  setcallLogAccordion(!callLogAccordion);
                  // setcallLogCustomer({
                  //   startTime: "",
                  //   endTime: "",
                  //   customer_number: "",
                  // });
                }}
                className="bg-info"
              >
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <div className="table">
                        <table>
                          <thead>
                            <tr key={"headingcallLog"} className="bg-light">
                              <th>S. No</th>
                              <th>Call Type</th>
                              <th>Call Start Time</th>
                              <th>Agent Name</th>
                              <th>Call Duration</th>
                              <th>Recording play/pause</th>
                              <th>Recording Download</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              state.callLogsCustomer?.objects?.length ? state.callLogsCustomer?.objects?.map((res,i) => {
                                return <tr key={+i+22}>
                                    <td>{i + 1}</td>
                                    <td>{res.business_call_type}</td>
                                    <td>{res.start_time}</td>
                                    <td>{res.agent_name}</td>
                                    <td>{res.call_duration}</td>
                                    <td>{"Play pause"}</td>
                                    <td>Download</td>
                                </tr>
                              }) : <tr className="text-center" key={"noDataForCallLog"}><span className="text-center">No Data</span></tr>
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="rejectionNoBtn"
                className="btn btn-danger rounded mr-2"
                onClick={() => setcustomerCallLogs(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -----------------------> Filtration data Modal */}

      <Modal
        id="leadFiltrationModal"
        isOpen={filtrationData}
        toggle={() => {
          setFiltrationData(false);
        }}
        size="lg"
      >
        <ModalHeader
          className="py-3 text-primary"
          toggle={() => {
            setFiltrationData(false);
          }}
        >
          Questions/ Answers
        </ModalHeader>
        <ModalBody>
          {/* <span className="h6">Confirmation</span> */}
          <div className="container">
            <div className="row">
              <h5>LEAD ID :-</h5>
            </div>
            <div className="border d-flex flex-wrap border border-top-warning ">
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight">Question</span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight">Answer</span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Date Of Hospitalisation
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.dateOfHospitalisation ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Date Of Discharge
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.dateOfDischarge ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Date Of Rejection
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.dateOfRejection ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Date Of Document Submission
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.dateOfDocumentSubmission ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Claim Amount
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.claimAmount ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Reason Of Rejection{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.reasonOfRejection ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Date Of Last Communication{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.dateOfLastCommunication ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Applied Claim Amount{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.appliedClaimAmount ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Approved Claim Amount{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.approvedClaimAmount ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Sum Insured{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.sumInsured ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Hospital Name{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.hospitalName ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Patient Relationship With Policyholder{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData
                      ?.patientRelationshipWithPolicyholder ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Problem Statement{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.problemStatement ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    Policy Type{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.policyType ?? "NA"}
                  </span>
                </div>
              </div>
              <div className="d-flex container mt-4 border-bottom pb-3">
                <div className=" w-70">
                  <span className="h6 my-2 font-weight-light">
                    patientName{" "}
                  </span>
                </div>
                <div className="border-left pl-4">
                  <span className="h6 font-weight-light">
                    {state.filtrationData?.patientName ?? "NA"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                id="rejectionNoBtn"
                className="btn btn-danger rounded mr-2"
                onClick={() => setFiltrationData(false)}
              >
                Close
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* ---------------------------------> Open New Customer form? */}
      <Modal
        id="leadNewCustomerModal"
        isOpen={openNewCustomerForm}
        toggle={() => {
          setopenNewCustomerForm(!openNewCustomerForm);
        }}
        size="lg"
      >
        <ModalHeader>Customer Detail Form</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-warning rounded"
              onClick={() => {
                setopenCustomerForm(true);
              }}
            >
              CUSTOMER DETAIL FORM
            </button>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex">
            <button
              className="btn btn-danger rounded"
              onClick={() => setopenNewCustomerForm(false)}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal
        id="leadNewCustomerModalSec"
        isOpen={openCustomerForm}
        toggle={() => setopenCustomerForm(false)}
        size="lg"
      >
        <ModalHeader>Claim Is ShortSettled Form</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <div className="">
              <label htmlFor="policyTypeInput" className="">
                Policy Type
              </label>
              <select
                className="form-control border-0 border"
                id="policyTypeInput"
              >
                <option key={"na"}>NA</option>
                <option key={"individual"}>Individual</option>
                <option key={"family"}>Family Floater</option>
                <option key={"group"}>Group</option>
                <option key={"bank"}>Bank</option>
                <option key={"card"}>Card</option>
              </select>
            </div>
            <div className="form-control border-0">
              <label htmlFor="complaintHolderName">Complaint Holder Name</label>
              <input
                type={"text"}
                className="form-control border"
                id="complaintHolderName"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="claimentName">Claimant Name</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="claimentName"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="diseasedName">Diseased Name</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="diseasedName"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="nomineeName">Nominee Name</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="nomineeName"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="nameOfPrevComp">Name Of Previous Company</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="nameOfPrevComp"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="nameOfPatient">Name Of Patient</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="nameOfPatient"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="nameOfTpa">Name Of TPA</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="nameOfTpa"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="dateOfIncident">Date Of Incident</label>
              <input
                type={"date"}
                className="border form-control border-dark"
                id="dateOfIncident"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="dateOfFirstInsurance">
                Date Of First Insurance
              </label>
              <input
                type={"date"}
                className="border form-control border-dark"
                id="dateOfFirstInsurance"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="policyNumberNewCustomer">Policy Number</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="policyNumberNewCustomer"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCustomerNewHospital">Hospital Name</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="newCustomerNewHospital"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCustomerSumInsured">Sum Insured</label>
              <input
                type={"number"}
                className="border form-control border-dark"
                id="newCustomerSumInsured"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="nameOfDisease">Name of Disease</label>
              <input
                type={"text"}
                className="border form-control border-dark"
                id="nameOfDisease"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="cashlessOrReimbursment">
                Cashless/ Reimbursement
              </label>
              <select
                className="form-control border"
                id="cashlessOrReimbursment"
              >
                <option key={"na"}>NA</option>
                <option key={"cashless"}>Cashless</option>
                <option key={"reim"}>Reimbursment is Applied</option>
              </select>
            </div>
            <div className="form-control border-0">
              <label id="newCustomerComplaintV">
                Customer's Complaint Version Along With Why Hospitalisation Is
                Required
              </label>
              <input
                className="
                                  form-control border-0"
                type={"file"}
                id="newCustomerComplaintV"
              />
            </div>
            <div className="form-control border-0">
              <label id="newCustomerMoreThanOnePolicy">
                Do You Have More Than 1 Policy?
              </label>
              <select
                className="form-control border"
                placeholder="Select"
                id="newCustomerMoreThanOnePolicy"
              >
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label id="newCustomerPolicyPorted">Is Your Policy Ported?</label>
              <select
                className="form-control border"
                placeholder="Select"
                id="newCustomerPolicyPorted"
              >
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label id="receiveClainRejLett">
                Did You Receive Your Claim Rejection Letter?
              </label>
              <select className="form-control border" id="receiveClainRejLett">
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCusEvidence">Evidence</label>
              <input
                className="form-control border-0"
                type={"file"}
                id="newCusEvidence"
              />
            </div>
            <div className="form-control border-0">
              <label id="prevClainHistory">Previous Claim History?</label>
              <select className="form-control border" id="prevClainHistory">
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label id="approachedIncComp">
                Have You Approached Insurance Company?
              </label>
              <select className="form-control border" id="approachedIncComp">
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label id="approachedIncOmbuds">
                Have You Approached Insurance Ombudsman?
              </label>
              <select className="form-control border" id="approachedIncOmbuds">
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCusClaimAmtApp">Claim Amount Applied</label>
              <input
                className="form-control border"
                type={"number"}
                id="newCusClaimAmtApp"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="clainAmtSettled">
                Claim Amount Settled By Company
              </label>
              <input
                className="form-control border"
                type={"number"}
                id="clainAmtSettled"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="amtToBeFought">Amount To Be Fought</label>
              <input
                className="form-control border"
                type={"number"}
                id="amtToBeFought"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="claimSattlementDate">Claim Settlement Date</label>
              <input
                className="form-control border"
                type={"date"}
                id="claimSattlementDate"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCusReasonOfDeduction">
                Reason Of ShortSettlement/ Deduction
              </label>
              <textarea
                rows={4}
                className="form-control border"
                type={"date"}
                id="newCusReasonOfDeduction"
                placeholder="Reason Of ShortSettlement/ Deduction"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCusNeedToBePaid">
                Customer's Version Of Why Balance Amount Needs To Be Paid
              </label>
              <input
                className="form-control border"
                type={"file"}
                id="newCusNeedToBePaid"
              />
            </div>
            <div className="form-control border-0">
              <label id="receivedLetter">
                Did You Receive Settlement Letter?
              </label>
              <select className="form-control border" id="receivedLetter">
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"yes"} value={"Yes"}>
                  Yes
                </option>
                <option key={"no"} value={"No"}>
                  No
                </option>
              </select>
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCusCommentBox">Comment Box</label>
              <textarea
                rows={4}
                className="form-control border"
                placeholder="Comment Box Filtration"
                id="newCusCommentBox"
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="newCusDocSelection">Document Section</label>
              <Select
                // defaultValue={[colourOptions[2], colourOptions[3]]}
                isMulti
                name="colors"
                options={[
                  { value: "chocolate", label: "Chocolate" },
                  { value: "strawberry", label: "Strawberry" },
                  { value: "vanilla", label: "Vanilla" },
                ]}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex ">
            <button
              className="btn btn-danger rounded mr-2"
              onClick={() => {
                setopenCustomerForm(false);
              }}
            >
              CLOSE
            </button>
            <button className="btn btn-primary rounded mr-2">
              COPY PREVIOUS DATA
            </button>
            <button className="btn btn-primary rounded mr-2">SUBMIT</button>
          </div>
        </ModalFooter>
      </Modal>

      {/* ----------------------------------> Send Message to user */}
      <Modal
        id="leadSendMessageToUser"
        isOpen={sendMessageToUser}
        toggle={() => {
          setsendMessageToUser(!sendMessageToUser);
        }}
      >
        <ModalHeader>
          <sapn className="h4">Text Message to Customer</sapn>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <div className="form-control border-0">
              <span>Text Message</span>
              <textarea
                className="form-control border mt-3"
                rows={10}
                value={textMessageToCustomer.message}
                onChange={(e) => {
                  settextMessageToCustomer({
                    ...textMessageToCustomer,
                    message: e.target.value,
                  });
                }}
              ></textarea>
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-danger mr-3 rounded"
                  onClick={() => setsendMessageToUser(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary rounded"
                  onClick={() => {
                    dispatch({
                      type: "LEAD_SEND_MESSAGE_TO_USER",
                      state: { ...textMessageToCustomer },
                    });
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------> Status History */}

      <Modal
        id="leadStatusHistoryModal"
        isOpen={statusHistory.open}
        toggle={() => {
          setstatusHistory({ ...statusHistory, open: !statusHistory });
        }}
      >
        <ModalHeader>
          <span className="text-primary font-weight-bold"> Stauts History</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <h4>User Details</h4>
            <div className="mb-2">
              <sapn className="h5">Id : </sapn>
              <span className="h6">{statusHistory.data?._id}</span>
            </div>
            <div className="mb-2">
              <span className="h5">Name : </span>
              <span className="h6">{statusHistory.data?.name}</span>
            </div>
            <div className="mb-2">
              <span className="h5">Name : </span>
              <span className="h6"> {statusHistory.data?.email}</span>
            </div>
            <div className="">
              <div className="table-responsive mt-3">
                <table className=" table border">
                  <thead className="font-weight-bold bg-muted">
                    <tr key={"headingStatusHistory"}>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusHistory.data?.statusHistory?.length ? (
                      statusHistory.data?.statusHistory?.map((res) => {
                        return (
                          <tr key={i + res.date} className="">
                            <td>{res.currStatus}</td>
                            <td>
                              {moment(res.date).format("YYYY-MM-DD: HH:MM")}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr key={"noData"}>No Data</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                setstatusHistory({ ...statusHistory, open: false });
              }}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* ------------------> Problem statement */}

      <Modal
        id="leadProblemStatementModal"
        isOpen={problemStatement}
        toggle={() => setproblemStatement(!problemStatement)}
      >
        <ModalHeader>
          <div>
            <span className="h4 text-primary">Problem Statement</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <div className="form-control border-0">
              <label className="font-weight-bold">Problem Statement</label>
              <textarea className="form-control border" rows={5} />
              <button
                className="btn btn-danger mt-3"
                onClick={() => setproblemStatement(false)}
              >
                Close
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* ----------------------> Follow Up Modal */}

      <Modal
        id="leadFollowUpModal"
        isOpen={followUpObj.open}
        toggle={() => setfollowUpObj({ ...followUpObj, open: false })}
      >
        <ModalHeader>
          <span className="h4"> Add Follow Up</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <div className="form-control border-0">
              <label className="" htmlFor="leadFollowUpDate">
                Follow Date
              </label>
              <input
                type={"date"}
                id="idleadFollowUpDate"
                className="form-control border"
                value={followUpObj.follow_date}
                name="follow_date"
                onChange={(e) =>
                  setfollowUpObj({
                    ...followUpObj,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control border-0">
              <label className="" htmlFor="leadFollowUpCommDate">
                Communication Date
              </label>
              <input
                type={"date"}
                id="idleadFollowUpCommDate"
                className="form-control border"
                value={followUpObj.com_date}
                name="com_date"
                onChange={(e) =>
                  setfollowUpObj({
                    ...followUpObj,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control border-0">
              <label className="" htmlFor="leadFollowUpDes">
                Communication Description
              </label>
              <select
                id="idleadFollowUpDes"
                className="form-control border"
                value={followUpObj.com_dis}
                name="com_dis"
                onChange={(e) =>
                  setfollowUpObj({
                    ...followUpObj,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option key={"select"} value={""}>
                  Select
                </option>
                <option key={"running"} value={"running"}>
                  running
                </option>
                <option key={"testing"} value={"testing"}>
                  testing
                </option>
                <option key={"other"} value={"Other"}>
                  Other
                </option>
              </select>
            </div>
            {followUpObj.com_dis == "Other" ? (
              <div className="form-control border-0">
                <label htmlhtmlFor="followUpTextarea"></label>
                <textarea
                  rows={3}
                  name="followUpDesc"
                  id="followUpTextarea"
                  className="form-control border"
                  value={followUpObj.followUpDesc}
                  onChange={(e) => {
                    setfollowUpObj({
                      ...followUpObj,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
            ) : null}
          </div>

          <button
            className="btn-sm btn-primary ml-2 mr-2"
            onClick={() => {
              dispatch({
                type: "LEAD_ADD_FOLLOW_UP",
                state: { ...followUpObj },
              });
              setfollowUpObj({
                open: false,
                com_by: "Admin",
                com_date: "",
                com_dis: "",
                follow_date: "",
                status: "FOLLOWUP",
                id: "",
                followUpDesc: "",
              });
            }}
          >
            Submit
          </button>
          <button
            id="followUpClose"
            className="btn-sm btn-danger"
            onClick={() => {
              setfollowUpObj({ ...followUpObj, open: false });
            }}
          >
            Close
          </button>
        </ModalBody>
      </Modal>

      {/*-------------------------------Cancel Lead */}
      <Modal
        id="LeadCancelLeadModal"
        isOpen={leadCancelDetail.open}
        toggle={() => setleadCancelDetail({ ...leadCancelDetail, open: false })}
      >
        <ModalHeader>
          <span className="h4 text-primary"> Cancel Lead</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <div className="form-control border-0">
              <label htmlFor="cancelLeadCommDate" className="font-weight-bold">
                Communication Date
              </label>
              <input
                id="cancelLeadCommDate"
                type={"date"}
                value={leadCancelDetail?.state?.date}
                className="form-control border"
                name="date"
                onChange={(e) => {
                  setleadCancelDetail({
                    ...leadCancelDetail,
                    state: {
                      ...leadCancelDetail.state,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="form-control border-0">
              <label htmlFor="cancelLeadCommDesc" className="font-weight-bold">
                Communication Description
              </label>
              <select
                id="cancelLeadCommDesc"
                className="form-control border"
                name="desc"
                value={leadCancelDetail?.state?.desc}
                onChange={(e) => {
                  setleadCancelDetail({
                    ...leadCancelDetail,
                    state: {
                      ...leadCancelDetail.state,
                      [e.target.name]: e.target.value,
                    },
                  });
                }}
              >
                <option key={"select"}>Select Status</option>
                <option key={"ringing"}>Ringing</option>
                <option key={"testing"}>Testing</option>
                <option key={"other"}>Other</option>
              </select>
              {leadCancelDetail.state?.desc === "Other" ? (
                <div className="form-control border-0">
                  <label
                    htmlFor="cancelLeadCommdescText"
                    className="font-weight-bold"
                  >
                    Description
                  </label>
                  <textarea
                    rows={3}
                    id="cancelLeadCommdescText"
                    type={"date"}
                    className="form-control border"
                    name="userInput"
                    onChange={(e) => {
                      setleadCancelDetail({
                        ...leadCancelDetail,
                        state: {
                          ...leadCancelDetail.state,
                          [e.target.name]: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              ) : null}
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-danger mr-3"
                  onClick={() => {
                    setleadCancelDetail({
                      ...leadCancelDetail,
                      open: false,
                      state: {},
                    });
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    leadCancelDetail.state?.date &&
                    (leadCancelDetail?.state?.userInput ||
                      leadCancelDetail?.state?.desc)
                      ? dispatch({
                          type: "LEAD_CANCEL_LEAD",
                          state: {
                            ...leadCancelDetail,
                            data: {
                              ...leadCancelDetail.data,
                              communication: [
                                ...leadCancelDetail.data.communication,
                                {
                                  com_date: leadCancelDetail.state?.date,
                                  com_dis:
                                    leadCancelDetail?.state?.userInput &&
                                    leadCancelDetail.state?.desc === "Other"
                                      ? leadCancelDetail?.state?.userInput
                                      : leadCancelDetail?.state?.desc,
                                  com_by: currentUser?.data?.userType,
                                  id: leadCancelDetail.data?._id,
                                },
                              ],
                              status: "CANCELLED",
                            },
                          },
                        })
                      : null;
                    setleadCancelDetail({
                      ...leadCancelDetail,
                      open: false,
                      state: {},
                    });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* --------------------------> Upload Document */}

      <Modal
        id="leadUploadDocModal"
        isOpen={uploadDocForm.open}
        toggle={() => {
          setuploadDocForm({ ...uploadDocForm, open: false });
        }}
      >
        <ModalHeader>
          <sapn className="alert-primary">Documents Upload</sapn>
        </ModalHeader>
        <ModalBody>
          <div className="alert alert-dark" role="alert">
            This is a dark alert—check it out!
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LeadSection;
