import React from "react";
import { useState } from "react";
import { Button, Collapse } from "reactstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { NotificationManager } from "components/common/react-notifications";
import { CSVLink } from "react-csv";

function ComplaintMonRep({ sections, handleSection, state }) {
  // COMPLAINT_MONTHLY_REPORT

  let dispatch = useDispatch();
  const [formData, setformData] = useState({});
  const [download, setdownload] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    if (
      formData.complaintEnd &&
      formData.complaintStart &&
      formData.caseStatus &&
      formData.userId
    ) {
      dispatch({ type: "COMPLAINT_MONTHLY_REPORT", state: { ...formData } });
      setdownload(true);
    } else {
      NotificationManager.error(
        "Fields cannot be empty !",
        "Please select Date !",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  useEffect(() => {
    if (download) {
      if (state.comMontlyRep.length) {
        setdownload(false);
      } else {
        NotificationManager.error(
          "Empty List !",
          "",
          3000,
          null,
          null,
          "filled"
        );
      }
    }
  }, [state.comMontlyRep]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("ComMonthlyRep")}
          id="comMonthlyRepDrpDwn"
        >
          Complaint Monthly Report Section
          <div
            className={
              sections.includes("ComMonthlyRep") ? "dropup btn-group m-0 p-0" : ""
            }
          >
            <Button
              style={{ height: "20px" }}
              color="primary"
              className={`m-0 p-0 ${sections.includes("ComMonthlyRep") ? "mt-n1" : "mt-n3"}  dropdown-toggle-split dropdown-toggle btn table-expand`}
            ></Button>
          </div>
        </h4>
      </div>
      <div className="container shadow">
        <Collapse
          className="py-2 pb-4"
          isOpen={sections.includes("ComMonthlyRep")}
        >
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="comMonthlyStDt"
                  className="form-control border-bold"
                  name="complaintStart"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="comMonthlyEndDt"
                  className="form-control border-bold"
                  name="complaintEnd"
                  max={(new Date()).toISOString()?.split("T")[0]}
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label> Select Status</label>
                <select
                  className="form-control border-bold"
                  name="caseStatus"
                  id="comMonthlyStatus"
                  onChange={handleChange}
                >
                  <option key={"1"} value="PENDING">
                    PENDING
                  </option>
                  <option key={"2"} value="ACCEPTED">
                    ACCEPTED
                  </option>
                  <option key={"3"} value="REJECTED">
                    REJECTED
                  </option>
                  <option key={"4"} value="REPEATED">
                    REPEATED
                  </option>
                  <option key={"5"} value="OPEN">
                    OPEN
                  </option>
                  <option key={"6"} value="WRONG">
                    WRONG NUMBER
                  </option>
                  <option key={"7"} value="QUERY">
                    ONLY QUERY
                  </option>
                  <option key={"8"} value="NOINSURANCE">
                    NO INSURANCE QUERY
                  </option>
                  <option key={"9"} value="NONCONTACTABLE">
                    NON CONTACTABLE
                  </option>
                  <option key={"10"} value="DOCUMENT_PENDING">
                    DOCUMENT PENDING
                  </option>
                  <option key={"11"} value="FOLLOWUP">
                    FOLLOW UP
                  </option>
                  <option key={"12"} value="REGISTERED">
                    REGISTERED LEAD
                  </option>
                  <option key={"13"} value="EXPERT">
                    EXPERT LEAD
                  </option>
                  <option key={"14"} value="THIRD_PARTY_ACCEPTED">
                    THIRD PARTY ACCEPTED LEAD
                  </option>
                  <option key={"15"} value="CUSTOMER_NOT_RESPONDING">
                    CUSTOMER NOT RESPONDING LEAD
                  </option>
                  <option key={"16"} value="AUTOFOLLOWUP">
                    AUTO FOLLOWUP LEAD
                  </option>
                  <option key={"17"} value="ALL">
                    ALL LEAD
                  </option>
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Executive</label>
                <select
                  className="form-control border-bold"
                  name="userId"
                  id="comMonthlyDrpUser"
                  onChange={handleChange}
                >
                  <option key={"null"} value={""}>
                    Select User
                  </option>
                  {state.allUsers?.length &&
                    state.allUsers?.map((res) => {
                      return (
                        <option key={res.user_id} value={res.user_id}>
                          {res.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="d-flex mt-3">
              <button
                className="btn btn-primary"
                onClick={handleDownload}
                id="comMonthlyDwnBtn"
              >
                Download
              </button>
              {state.comMontlyRep && (
                <CSVLink
                  id="comMonthlyRep"
                  filename="complaintReport"
                  data={state.comMontlyRep}
                ></CSVLink>
              )}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default ComplaintMonRep;
