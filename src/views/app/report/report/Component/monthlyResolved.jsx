import { NotificationManager } from "components/common/react-notifications";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { Button, Collapse } from "reactstrap";

function MonthlyResolved({ sections, handleSection, state }) {
  let dispatch = useDispatch();

  const [payDoneRepForm, setpayDoneRepForm] = useState({
    allResolveStart: "",
    allResolveEnd: "",
  });
  const [download, setdownload] = useState("");

  const handlePayDoneRep = (e) => {
    if (payDoneRepForm.allResolveStart && payDoneRepForm.allResolveEnd) {
      console.log({ status: e.target.name });
      if (e.target.name) {
        dispatch({
          type: "REPORT_RESOLVED_CASES",
          state: { ...payDoneRepForm, status: e.target.name },
        });
      } else {
        dispatch({
          type: "REPORT_RESOLVED_PAYMENT_CASES",
          state: { ...payDoneRepForm, status: e.target.name },
        });
      }
      setdownload(e.target.name ? e.target.name : "payment");
    } else {
      NotificationManager.error(
        "Fields cannot be empty !",
        "Please select Date",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  useEffect(() => {
    if (download === "Resolved") {
      if (state.resolveData?.length) {
        document.getElementById("resolvedCasesBtn").click();
        setdownload("");
      }
    }
  }, [state.resolveData]);

  useEffect(() => {
    if (download === "payment") {
      console.log(state.relPaymentData);
      if (state.relPaymentData?.length) {
        document.getElementById("paymentCasesBtn")?.click();
        setdownload("");
      }
    }
  }, [state.relPaymentData]);

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          className="d-flex"
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("PayDoneRep")}
          id="MonResolveSecDrpDwn"
        >
          Monthly Resolved and Payment Done Report Section
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
        <Collapse isOpen={sections.includes("PayDoneRep")}>
          <div className="container py-4">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="monResolveStDt"
                  className="form-control border-bold"
                  name="allResolveStart"
                  type={"date"}
                  onChange={(e) => {
                    setpayDoneRepForm({
                      ...payDoneRepForm,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="monResolveEndDt"
                  className="form-control border-bold"
                  name="allResolveEnd"
                  type={"date"}
                  max={(new Date()).toISOString()?.split("T")[0]}
                  onChange={(e) => {
                    setpayDoneRepForm({
                      ...payDoneRepForm,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  id="monResolveRelCases"
                  className="btn btn-primary"
                  name="Resolved"
                  onClick={handlePayDoneRep}
                >
                  Resolved Cases
                </button>
                {state.resolveData ? (
                  <CSVLink
                    id="resolvedCasesBtn"
                    filename="resolved-casee"
                    data={state.resolveData}
                  ></CSVLink>
                ) : null}
              </div>
              <div className="col-sm-3 mt-auto">
                <button
                  className="btn btn-primary"
                  onClick={handlePayDoneRep}
                  id="monResolvePayDoneBtn"
                >
                  Payment Done Cases
                </button>
                {state.relPaymentData?.length ? (
                  <CSVLink
                    id="paymentCasesBtn"
                    filename="resolved-casee"
                    data={state.relPaymentData}
                  ></CSVLink>
                ) : null}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default MonthlyResolved;
