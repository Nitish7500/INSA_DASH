import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
function LeadSection() {
  const [activeButton, setactiveButton] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.leadReducer);
  console.log(state);

  useEffect(() => {
    dispatch({ type: "LEAD_ASSIGN_USER" });
    dispatch({ type: "LEAD_ASSIGN_EXPERT" });
    dispatch({ type: "LEAD_INSURANCE_COMPANY" });
    dispatch({
      type: "LEAD_DATA_WITH_STATUS",
      state: { status: "PENDING", pageIndex: 1, pageSize: 50, keyword: "" },
    });
    dispatch({ type: "LEAD_USERS" });
  }, [1]);

  const handleClick = (e) => {
    const allChips = document.querySelectorAll(".leadChips");
    for (let i = 0; allChips.length > i; i++) {
      // console.log(allChips[i].childNodes)
      let childs = allChips[i].childNodes;
      for (let j = 0; j < childs.length; j++) {
        childs[j].style.color = "black";
      }
      allChips[i].style.backgroundColor = "#f4f4f4";
    }
    e.target.parentNode.style.backgroundColor = "#00bbd4";
    e.target.style.color = "white";
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
            name="pending"
            onClick={handleClick}
            role={"button"}
            id="leadPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="accepted"
            onClick={handleClick}
            role={"button"}
            id="leadAccepted"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Accepted</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="thirdParty"
            onClick={handleClick}
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
            name="rejected"
            onClick={handleClick}
            role={"button"}
            id="leadRejected"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Rejected</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="executiveRejected"
            onClick={handleClick}
            role={"button"}
            id="leadRejectedByExecutive"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Rejected By Executive</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="nrFolloeUp"
            onClick={handleClick}
            role={"button"}
            id="leadFollowUp"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">NR FOLLOW UP</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="cancelled"
            onClick={handleClick}
            role={"button"}
            id="leadCancelled"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Cancelled</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="wrongNumber"
            onClick={handleClick}
            role={"button"}
            id="leadWrongNumber"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Wrong Number</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="onlyQuery"
            onClick={handleClick}
            role={"button"}
            id="leadOnlyQuery"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Only Query</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="noInsuranceQuery"
            onClick={handleClick}
            role={"button"}
            id="leadNoInsuranceQuery"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">No insureance Query</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="nonContractable"
            onClick={handleClick}
            role={"button"}
            id="leadNonContractable"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Non Contactable</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name="documentPending"
            onClick={handleClick}
            role={"button"}
            id="leadDocumentPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Document Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadFollowUp"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Follow Up</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadAutoFollwUp"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Auto Follow Up</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadRepeat"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Repeat</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadExpertReview"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Expert Review</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadRegisteredLead"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Registered Lead</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
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
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadFiltrationLead"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Filtration Lead</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadRegistrationPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Registration Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
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
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadDocUploadPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">Doc Upload Pending</span>
          </div>
          <div
            className="rounded text-dark px-3 d-flex mr-4 mb-3 shadow-sm leadChips font-weight-bold"
            name=""
            onClick={handleClick}
            role={"button"}
            id="leadPolifixCustomerPending"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <span className="mt-auto mb-auto py-2">
              Polifix Customer Pending
            </span>
          </div>
        </div>
      </div>
      <div
        className="bg-white shadow p-3 mb-5 bg-white"
        style={{ borderRadius: "5px" }}
      >
        <div className="d-flex mt-5 container">
          <div className="mb-3 w-40">
            <label
              className="form-label font-weight-bold h6 d-block"
              for="searchKeyword"
            >
              Search Keyword
            </label>
            <input
              className="w-80 py-2 border border-dark"
              type={"text"}
              id="searchKeyword"
              placeholder="Search Keyword"
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
            >
              <option>First</option>
              <option>First</option>
              <option>First</option>
            </select>
          </div>
          <div className=" d-block h-20 mt-auto mb-auto ml-auto mr-auto">
            <button
              className="btn btn-success mr-3 rounded"
              id="leadInputClear"
            >
              Clear
            </button>
            <button className="btn btn-warning" id="leadSearchBtn">
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
          />
          <button
            className="btn btn-success rounded ml-3 mr-5"
            id="leadSearchBymailBtn"
          >
            Search
          </button>
          <div className="d-inline ml-5" id="leadRefreshDownloadSection">
            <button className="btn btn-success rounded mr-5" id="leadRefresh">
              Refresh
            </button>
            <button className="btn btn-warning rounded" id="leadDownloadReport">
              Download Report
            </button>
          </div>
        </div>
        <div className="table-responsive mt-4 px-3" id="leadTableSection">
          <table className="table borderless-table" id="leadTable">
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
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeadSection;
