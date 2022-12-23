import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch } from "react-redux";
import { NotificationManager } from "components/common/react-notifications";

function PaymentRep({ state, handleSection, sections }) {
  const [formData, setformData] = useState({});
  const [open, setopen] = useState(false);

  let dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSerach = () => {
    if (formData.endDate && formData.startDate) {
      setopen(true);
      dispatch({ type: "PAYMENT_REPORT_DATA", state: { ...formData } });
    } else {
      NotificationManager.error(
        "Fields cannot be empty !",
        "",
        3000,
        null,
        null,
        "filled"
      );
    }
  };

  const handleStatusChange = (e) => {
    dispatch({
      type: "PAYMENT_REPORT_STATUS_DATA",
      state: { caseStatus: e.target.value },
    });
  };

  const handlePayStatusChange = (e) => {
    dispatch({
      type: "PAYMENT_REPORT_STATUS_DATA",
      state: {
        type: "FINAL",
        payStatus: e.target.value,
      },
    });
  };

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning mt-2">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("PaymentRep")}
          id="payRepSecDrpDwn"
        >
          Payment Report Section
        </h4>
      </div>
      <div className="container shadow">
        <Collapse
          className="py-2 pb-4"
          isOpen={sections.includes("PaymentRep")}
        >
          <div className="container mt-3">
            <div className="row">
              <div className="col-sm-3">
                <label>Start Date</label>
                <input
                  id="payRepStDt"
                  className="form-control border-bold"
                  name="startDate"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>End Date</label>
                <input
                  id="payRepEndDt"
                  className="form-control border-bold"
                  name="endDate"
                  type={"date"}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Payment Status</label>
                <select
                  id="payRepStatus"
                  className="form-control border-bold"
                  onChange={handleStatusChange}
                >
                  <option key={"select"} value={""}>Select Status</option>
                  <option key={"paid"} value="PAID">PAID</option>
                  <option key={"pending"} value="PENDING">PENDING</option>
                  <option key={"initiated"} value="INITIATED">INITIATED</option>
                  <option key={"failed"} value="FAILED">FAILED</option>
                  <option key={"waiveoff"} value="WAIVEOFF">WAIVEOFF</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Final Payment Status</label>
                <select
                  id="payRepFinalPayStatus"
                  className="form-control border-bold"
                  onChange={handlePayStatusChange}
                >
                  <option key={"select"} value={""}>Select Fianl Payment Status</option>
                  <option key={"paid"} value="PAID">PAID</option>
                  <option key={"pending"} value="PENDING">PENDING</option>
                  <option key={"initiated"} value="INITIATED">INITIATED</option>
                  <option key={"faild"} value="FAILED">FAILED</option>
                  <option key={"waiveOff"} value="WAIVEOFF">WAIVEOFF</option>
                </select>
              </div>
            </div>
            <div className="d-flex mt-3">
              <button
                className="btn btn-primary"
                onClick={handleSerach}
                id="payRepSearchBtn"
              >
                Search
              </button>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12">
                {open || state.payRepData.length ? (
                  <table className="table table-responsive-sm">
                    <thead>
                      <tr key={"payRepDataHead"} className="bg-dark text-white">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Policy Number</th>
                        <th>Payment Status</th>
                        <th>Final Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.payRepData.length ? (
                        state.payRepData?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <td nowrap>{res.name}</td>
                              <td>{res.email}</td>
                              <td>{res.policyNumber}</td>
                              <td>{res.paymentStatus}</td>
                              <td>{res.finalPaymentStatus}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={Math.random()}>No Data</tr>
                      )}
                      <tr></tr>
                    </tbody>
                  </table>
                ) : null}
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default PaymentRep;
