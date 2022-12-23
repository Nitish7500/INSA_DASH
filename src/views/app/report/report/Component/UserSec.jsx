import {
  faStreetView,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import {
  groupWiseData,
  statusWise,
  userReport,
} from "services/report.services";

function UserSec({ sections, handleSection }) {
  const [userSecForm, setuserSecForm] = useState({ show: false });
  const [data, setdata] = useState([]);

  const handleUserSecChange = (e) => {
    setuserSecForm({ ...userSecForm, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    //status change
    statusWise({ status: e.target.value }).then((res) => {
      console.log(res);
      setdata(res.data);
      setuserSecForm({ ...userSecForm, show: true });
    });
  };

  const handleGroupChange = (e) => {
    //group chnage
    groupWiseData({ group: e.target.value }).then((res) => {
      console.log(res);
      setdata(res.data);
      setuserSecForm({ ...userSecForm, show: true });
    });
  };

  const handleSearch = () => {
    if (userSecForm.userEndDate && userSecForm.userStartDate) {
      setuserSecForm({ ...userSecForm, show: true });
      userReport({
        startDate: userSecForm.userStartDate,
        endDate: userSecForm.userEndDate,
      }).then((res) => {
        console.log(res);
        setdata(res.data);
      });
    }
  };

  return (
    <div>
      <div className="container text-primary font-weight-bold py-2 bg-warning">
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => handleSection("UserRep")}
          id="userSecDrpDwn"
        >
          User Section
        </h4>
      </div>
      <div className="container shadow">
        <Collapse className=" pb-4" isOpen={sections.includes("UserRep")}>
          <div className="container py-3">
            <div className="row">
              <div className="col-sm-3">
                <label className="font-weight-bold">Start Date</label>
                <input
                  id="userSecStDt"
                  type={"date"}
                  className="form-control border-bold"
                  name="userStartDate"
                  onChange={handleUserSecChange}
                />
              </div>
              <div className="col-sm-3">
                <label className="font-weight-bold">End Date</label>
                <input
                  id="userSecEndDt"
                  type={"date"}
                  className="form-control border-bold"
                  name="userEndDate"
                  onChange={handleUserSecChange}
                />
              </div>
              <div className="col-sm-3">
                <label>Select Status</label>
                <select
                  id="userSecStatus"
                  className="form-control  border-bold"
                  name="status"
                  onChange={handleStatusChange}
                >
                  <option key={"true"} value="true">True</option>
                  <option key={"false"} value="false">false</option>
                </select>
              </div>
              <div className="col-sm-3">
                <label>Select Group</label>
                <select
                  id="userSecGrp"
                  className="form-control border-bold"
                  name="groupWise"
                  onChange={handleGroupChange}
                >
                  <option key={"advisor"} value="Advisor">Advisor</option>
                  <option key={"user"} value="User">User</option>
                  <option key={"admin"} value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="btn rounded px-4 mt-3 btn-primary mt-2"
                onClick={handleSearch}
                id="userSecSearchBtn"
              >
                Search
              </button>
            </div>
            {data.length || userSecForm.show ? (
              <div className="row mt-4">
                <div className="col-sm-12 table-responsive">
                  <table className="table table-hover">
                    <thead className="bg-dark text-white">
                      <tr key={Math.random()}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Id</th>
                        <th>Company Name</th>
                        <th>Phone</th>
                        <th>Contact Status</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((res, i) => {
                        return (
                          <tr key={i}>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.user_id}</td>
                            <td>{res.company_name}</td>
                            <td>{res.mobile}</td>
                            <td>{res.contract_status}</td>
                            <td>{res.address}</td>
                            <td>{res.status}</td>
                            <td>
                              <FontAwesomeIcon
                                icon={faUsersViewfinder}
                                id="userSecView"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default UserSec;
