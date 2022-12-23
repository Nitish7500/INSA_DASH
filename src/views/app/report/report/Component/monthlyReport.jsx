import React from "react";
import { Collapse } from "reactstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { NotificationManager } from "components/common/react-notifications";

function MonthlyReport({ sections, handleSection, state }) {
  let dispatch = useDispatch();
  const [formData, setformData] = useState({});
  const [download, setdownload] = useState(false);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    if (formData.startDate && formData.endDate) {
      dispatch({ type: "MONTHLY_REPORT_DATA", state: { ...formData } });
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
      document.getElementById("monthlyRepDown").click();
      setdownload(false);
    }
  }, [download, state.monthlyRepData]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("MonthlyRep")}
          id="MonthlyRepSecDrpDwn"
        >
          Monthly Report Section(Complaints,Agent Cases,Partner leads)
        </h4>
      </div>
      <div className="container shadow">
        <Collapse isOpen={sections.includes("MonthlyRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="MonRepStDt"
                  className="form-control border-bold"
                  name="startDate"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="MonRepEndDt"
                  className="form-control border-bold"
                  name="endDate"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-2 d-flex mt-4">
                <button
                  className="btn btn-primary"
                  onClick={handleDownload}
                  id="MonRepDwnBtn"
                >
                  Download
                </button>
                {state.monthlyRepData && (
                  <CSVLink
                    id="monthlyRepDown"
                    filename="monthlyReport"
                    data={state.monthlyRepData}
                  ></CSVLink>
                )}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default MonthlyReport;
