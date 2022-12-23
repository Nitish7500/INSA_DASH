import moment from "moment/moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faMailBulk,
  faMailReply,
  faMessage,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Customer() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.customer);
  const history = useHistory();
  const [filterData, setfilterData] = useState({
    keyword: "",
    selectedSortOrder: "",
  });
  console.log(state);

  const [currentData, setCurrentData] = useState({});
  const [viewPassword, setviewPassword] = useState(false);
  const [viewPasswordObj, setviewPasswordObj] = useState({
    pass: "",
    serviceRate: "",
  });

  const [viewGamil, setviewGamil] = useState(false);

  useEffect(() => {
    console.log(state.viewPassword);
    setviewPasswordObj({
      pass: state.viewPassword?.pwdStr,
      serviceRate: state.viewPassword?.serviceRate,
    });
  }, [state.viewPassword]);

  //-----------------------> Pagination

  const [currentPage, setcurrentPage] = useState(0);
  let pageSize = 50;

  let itemsPerPage = 50;
  const pageCount = Math.ceil(state.userList?.totalRecords / itemsPerPage);

  const handlePageClick = (event) => {
    setcurrentPage(event.selected);
  };

  useEffect(() => {
    dispatch({
      type: "CUSTOMER_GET_USER_LIST",
      state: { pageIndex: currentPage, pageSize: pageSize },
    });
  }, [currentPage]);

  const handleFilter = () => {
    console.log(filterData);
    dispatch({
      type: "CUSTOMER_FILTER_DATA",
      state: { pageIndex: currentPage, pageSize: pageSize, ...filterData },
    });
  };

  const handleUpdateServiceRate = () => {
    dispatch({
      type: "CUSTOMER_UPDATE_SERVICE_RATE",
      state: { id: currentData._id, serviceRate: +viewPasswordObj.serviceRate },
    });
    dispatch({
      type: "CUSTOMER_GET_USER_LIST",
      state: { pageIndex: currentPage, pageSize: pageSize },
    });

    setviewPassword(false);
  };

  return (
    <div className="bg-inherit pt-5">
      <div className="w-95 d-flex justify-content-center">
        <div
          className=" text-white b-2 h-20 pl-4 pt-2"
          style={{
            background: "linear-gradient(60deg, #2B009F, #100052)",
            borderRadius: "5px",
            width: "97%",
            marginTop: "-25px",
            marginBottom: "-25px",
            paddingBottom: "-17px",
          }}
        >
          <span className="h5">User List</span>
          <span className="h6 d-block mt-1">List of available users</span>
        </div>
      </div>

      <div
        className="bg-white shadow p-3 mb-5 bg-white"
        style={{ borderRadius: "5px" }}
      >
        <div className="mx-3 mt-4">
          <div className="container m-0 p-0 mb-3">
            <div className="row">
              <div className="col-lg-4 px-0">
                <div className="form-control border-0">
                  <input
                    className="form-control border"
                    id="customerSearchKeyword"
                    placeholder="Search Keyword"
                    name="keyword"
                    value={filterData.keyword}
                    onChange={(e) => {
                      setfilterData({
                        ...filterData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-control border-0">
                  <select
                    className="form-control border"
                    id="customerSort"
                    value={filterData.selectedSortOrder}
                    name="selectedSortOrder"
                    onChange={(e) => {
                      setfilterData({
                        ...filterData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <option key={"select"} value={""}>
                      Select Sort Order
                    </option>
                    <option key={"ascFirst"} value={"firstName:ASC"}>ASC First Name</option>
                    <option key={"descFirst"} value={"firstName:DESC"}>DESC First Name</option>
                    <option key={"ascLast"} value={"lastName:ASC"}>ASC Last Name</option>
                    <option key={"descLast"} value={"lastName:DESC"}>DESC Last Name</option>
                    <option key={"ascEmail"} value={"email:ASC"}>ASC Email</option>
                    <option key={"descEmail"} value={"email:DESC"}>DESC Email</option>
                    <option key={"ascPhone"} value={"phone:ASC"}>ASC Phone</option>
                    <option key={"descPhone"} value={"phone:DESC"}>DESC Phone</option>
                    <option key={"ascCreated"} value={"createdAt:ASC"}>ASC Created At</option>
                    <option key={"descCreatedAt"} value={"createdAt:DESC"}>DESC Created At</option>
                  </select>
                  {/* <input className="form-control border" id="customer" /> */}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-warning mr-2"
                    id="customerBtnClear"
                    onClick={() => {
                      setfilterData({
                        keyword: "",
                        selectedSortOrder: "",
                      });
                    }}
                  >
                    CLEAR
                  </button>
                  <button
                    className="btn btn-success"
                    id="customerBtnSearch"
                    onClick={handleFilter}
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead className="" style={{ fontSize: "16px" }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Last Login</th>
                  <th>Phone No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.userList?.list?.map((res, i) => {
                  return (
                    <tr>
                      <td>{i + 1 + currentPage * itemsPerPage}</td>
                      <td>{res.name}</td>
                      <td>{res.email}</td>
                      <td>{moment(res.loginAt).format("YYYY-MM-DD HH:MM")}</td>
                      <td>{res.phone}</td>
                      <th
                        onClick={() => {
                          setCurrentData(res);
                        }}
                      >
                        <span
                          className="mr-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setviewPassword(true);
                            dispatch({
                              type: "CUSTOMER_VIEW_PASSWORD",
                              state: { id: res._id },
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            color="blue"
                            size="lg"
                          />
                        </span>
                        <span
                          className="mr-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push({
                              pathname: `/app/digilocker/${res._id}`,
                              state: res,
                            });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faLock}
                            color="blue"
                            size="lg"
                          />
                        </span>
                        <span
                          className=""
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log(currentData);
                            dispatch({
                              type: "CUSTOMER_GMAIL_READ",
                              state: { email: res.email },
                            });
                            setviewGamil(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            color="blue"
                            size="lg"
                          />
                        </span>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center">
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
        </div>
      </div>

      {/* ------------------------------------------------> View Password Modal */}

      <Modal
        id="customerViewPassword"
        isOpen={viewPassword}
        toggle={() => setviewPassword(!viewPassword)}
      >
        <ModalHeader>Password</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <div className="form-control border-0">
              <label className="form-control border-0">Password</label>
              <input
                type={"text"}
                className="form-control border"
                id="customerPasswrodModalInput"
                name="pass"
                value={viewPasswordObj.pass}
                disabled
                onChange={(e) => {
                  setviewPasswordObj({
                    ...viewPasswordObj,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-control border-0">
              <label className="form=-control">Service Rate</label>
              <input
                className="form-control border"
                type={"text"}
                value={viewPasswordObj.serviceRate}
                name="serviceRate"
                onChange={(e) => {
                  setviewPasswordObj({
                    ...viewPasswordObj,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div className="d-flex justify-content-end mr-2 mt-2">
              <button
                className="btn btn-danger rounded"
                onClick={handleUpdateServiceRate}
              >
                Update Service Rate
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------------------> View Gmail message Modal */}

      <Modal
        id="customerGamilModal"
        isOpen={viewGamil}
        toggle={() => {
          setviewGamil(!viewGamil);
        }}
      >
        <ModalHeader>User gmail read permission ?</ModalHeader>
        <ModalBody>
          <span className="h6">{state.viewMailMessage}</span>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger rounded"
              onClick={() => {
                setviewGamil(false);
              }}
            >
              Close
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Customer;
