import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import {useDispatch} from "react-redux"
import { useEffect } from "react";
import { NotificationManager } from "components/common/react-notifications";
import { CSVLink } from "react-csv";

function ComplaintMonRep({ sections, handleSection, state }) {
  // COMPLAINT_MONTHLY_REPORT

  let dispatch = useDispatch()
  const [formData, setformData] = useState({})
  const [download, setdownload] = useState(false)

  const handleChange = (e) => {
    setformData({...formData, [e.target.name]:e.target.value})
  } 

  const handleDownload = () => {
    if (formData.complaintEnd && formData.complaintStart && formData.caseStatus && formData.userId) {
        dispatch({type:"COMPLAINT_MONTHLY_REPORT", state:{...formData}})
        setdownload(true)
    }else{
        NotificationManager.error(
            "Fields cannot be empty !",
            "Please select Date !",
            3000,
            null,
            null,
            "filled"
          );
        }
  }

  useEffect(() => {
    if (download) {
        if (state.comMontlyRep.length) {
            setdownload(false)
        }else{
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
  },[state.comMontlyRep])

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className=""
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("ComMonthlyRep")}
        >
          Complaint Monthly Report Section
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
                  className="form-control border-bold"
                  name="complaintStart"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  className="form-control border-bold"
                  name="complaintEnd"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div class="col-sm-3">
                <label> Select Status</label>
                <select class="form-control border-bold" name="caseStatus"
                  onChange={handleChange}>
                  <option value="PENDING">PENDING</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="REPEATED">REPEATED</option>
                  <option value="OPEN">OPEN</option>
                  <option value="WRONG">WRONG NUMBER</option>
                  <option value="QUERY">ONLY QUERY</option>
                  <option value="NOINSURANCE">NO INSURANCE QUERY</option>
                  <option value="NONCONTACTABLE">NON CONTACTABLE</option>
                  <option value="DOCUMENT_PENDING">DOCUMENT PENDING</option>
                  <option value="FOLLOWUP">FOLLOW UP</option>
                  <option value="REGISTERED">REGISTERED LEAD</option>
                  <option value="EXPERT">EXPERT LEAD</option>
                  <option value="THIRD_PARTY_ACCEPTED">
                    THIRD PARTY ACCEPTED LEAD
                  </option>
                  <option value="CUSTOMER_NOT_RESPONDING">
                    CUSTOMER NOT RESPONDING LEAD
                  </option>
                  <option value="AUTOFOLLOWUP">AUTO FOLLOWUP LEAD</option>
                  <option value="ALL">ALL LEAD</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Executive</label>
                <select className="form-control border-bold" name="userId"
                  onChange={handleChange}>
                  <option value={""}>Select User</option>
                  {state.allUsers?.length &&
                    state.allUsers?.map((res) => {
                      return <option value={res.user_id}>{res.name}</option>;
                    })}
                </select>
              </div>
            </div>
            <div className="d-flex mt-3">
              <button className="btn btn-primary" onClick={handleDownload}>Download</button>
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
