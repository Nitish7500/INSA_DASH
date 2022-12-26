import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Button, Collapse } from "reactstrap";

function BotReport({ state, sections, handleSection }) {
  // BOT_REPORT_DATA

  const [formData, setformData] = useState({
    botFollowUpEndDate: "",
    botFollowUpStartDate: "",
  });
  const [download, setdownload] = useState(false);
  const { botFollowUpEndDate, botFollowUpStartDate } = formData;

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumit = () => {
    if (botFollowUpEndDate && botFollowUpStartDate) {
      dispatch({ type: "BOT_REPORT_DATA", state: { ...formData } });
      setdownload(true);
    } else {
      NotificationManager.error(
        "Please enter Fileds !",
        "Fields cannot be empty !",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  useEffect(() => {
    if (download) {
      if (state.botData?.length) {
        document.getElementById("botReportBtn")?.click();
        setdownload(false);
      } else {
        NotificationManager.error(
          "Empty List !",
          "No Record Found !",
          3000,
          null,
          null,
          "filled"
        );
      }
    }
  }, [state.botData]);
  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("whatsRep")}
          id="WhatsBotFollowRep"
        >
          <span className="">WhatsApp Bot Follow Up Report </span>
          <div
            className={
              sections.includes("AgentMonRep") ? "dropup btn-group m-0 p-0" : ""
            }
          >
            <Button
              style={{ height: "20px" }}
              color="primary"
              className="m-0 p-0 mt-n3 dropdown-toggle-split dropdown-toggle btn table-expand"
            ></Button>
          </div>
        </h4>
      </div>
      <div className="container shadow">
        <Collapse isOpen={sections.includes("whatsRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="bolFollowStaDt"
                  className="form-control border-bold"
                  name="botFollowUpStartDate"
                  type={"date"}
                  onChange={handleChange}
                  value={botFollowUpStartDate}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="botFollwEndDt"
                  className="form-control border-bold"
                  name="botFollowUpEndDate"
                  type={"date"}
                  max={(new Date()).toISOString()?.split("T")[0]}
                  onChange={handleChange}
                  value={botFollowUpEndDate}
                />
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  className="btn btn-primary"
                  onClick={handleSumit}
                  id="botFollowRepDwnBtn"
                >
                  Download
                </button>
                <CSVLink
                  id="botReportBtn"
                  filename="monthly-b2c"
                  data={state.botData}
                ></CSVLink>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default BotReport;
