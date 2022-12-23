import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import { getCurrentUser } from "helpers/Utils";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import DashboardCard from "./DashboardCard";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Chart from "./Chart";

const user = getCurrentUser();

const DefaultDashboard = ({ intl, match }) => {
  const [collapse, setCollapse] = useState("");
  const [leadSection, setleadSection] = useState("");
  const [regSection, setregSection] = useState("");
  const [resolutionSection, setResolutionSection] = useState("");
  const [legalSection, setlegalSection] = useState("");
  const [ombudsmanSec, setombudsmanSec] = useState("");
  const [mailingSec, setmailingSec] = useState("");

  // ----------------> Filter states
  const ombudsmanStatusList = [
    "Ombudsman Pending",
    "OMBUDSMAN REQUIREMENT PENDING",
    "OMBUDSMAN REQUIREMENT PUSHED",
    "COMPLAINT FORM SENT",
    "OMBUDSMAN REQUIREMENT SENT",
    "Ombudsman without Legal",
    "FORM 6A RECEIVED",
    "FORM 6A PUSHED",
    "FORM 6A SENT",
    "HEARING DATE RECEIVED",
    "HEARING POSTPONED",
    "HEARING DONE",
    "AWARD ACCEPTED",
    "AWARD REJECTED",
  ];
  const [isDateSelected, setisDateSelected] = useState({});
  const [dateWise, setDateWise] = useState("Monthly");
  const [filterObj, setFilterObj] = useState({
    user_id: null,
    KeyRefresh: false,
  });
  const [dateObj, setDateObj] = useState({
    endDate: "",
    startDate: "",
  });
  const [ombObj, setOmbObj] = useState({
    omdLocation: "All",
    selectedStatus: "OMBUDSMAN PENDING",
  });

  useEffect(() => {
    dispatch({ type: "GET_ACTIVE_USER", user });
    dispatch({ type: "GET_STATES" });
  }, []);

  const data = useSelector((state) => state.bucket);
  const dispatch = useDispatch();
  // console.log(data);
  const leadCollapse = (e) => {
    if (e == collapse) {
      setCollapse("");
      return;
    } else {
      setCollapse(e);
    }
  };

  const leadSectionHandler = (name) => {
    if (name === leadSection) {
      setleadSection("");
      return;
    }
    setleadSection(name);
  };

  const regSectionHandler = (name) => {
    if (name === regSection) {
      setregSection("");
      return;
    }
    setregSection(name);
  };

  const resolutionSectionHandler = (name) => {
    if (resolutionSection === name) {
      setResolutionSection("");
      return;
    } else {
      setResolutionSection(name);
    }
  };

  const handleLegalSection = (name) => {
    if (legalSection === name) {
      setlegalSection("");
    } else {
      setlegalSection(name);
    }
  };

  const ombudsmanHandler = (name) => {
    if (name === ombudsmanSec) {
      setombudsmanSec("");
      return;
    } else {
      setombudsmanSec(name);
    }
  };

  const mailingHandler = (name) => {
    if (mailingSec === name) {
      setmailingSec("");
      return;
    } else {
      setmailingSec(name);
    }
  };

  const handleDate = (e) => {
    if (e.target.name === "endDate") {
      if (moment() < moment(e.target.value)) {
        alert("Date cannot be greater than today !");
        return;
      } else {
        setDateObj({ ...dateObj, [e.target.name]: e.target.value });
        return;
      }
    } else if (e.target.name === "startDate") {
      if (moment() < moment(e.target.value)) {
        alert("Date cannot be grater than today");
        return;
      } else {
        setDateObj({ ...dateObj, [e.target.name]: e.target.value });
        return;
      }
    }
  };

  useEffect(() => {
    if (dateObj.endDate && dateObj.startDate) {
      setisDateSelected({ ...filterObj, ...dateObj });
      setDateWise("");
      stateEmptyFunc();
    }
  }, [dateObj]);

  const stateEmptyFunc = () => {
    setmailingSec("");
    setombudsmanSec("");
    setlegalSection("");
    setResolutionSection("");
    setregSection("");
    setleadSection("");
  };

  const handleDateWiseChange = (e) => {
    setDateWise(e.target.value);
    setDateObj({ ...dateObj, endDate: "" });
    stateEmptyFunc();
  };

  const handleNavClick = (e) => {
    const temp = document.querySelectorAll(".letter-spacing");
    for (let i = 0; i < temp.length; i++) {
      temp[i].style.backgroundColor = "white";
      temp[i].style.color = "black";
    }
    e.target.style.backgroundColor = "#fd7e14";
    e.target.style.color = "white";
  };

  return (
    <>
      <h1>
        Welcome <span className="text-warning">{user.data?.userType}</span> !
      </h1>
      <p>Work in Progress...</p>
      <div className="bg-light shadow pt-3" style={{ borderRadius: "5px" }}>
        {/* <div className="container m-2 mb-4"> */}
        <div className="row align-items-start mr-auto ml-auto">
          <div className="col-sm">
            <label className="d-block font-weight-bold">
              Select Executive:-
            </label>
            <select
              className="form-control border-0"
              id="ex1"
              name="user_id"
              onChange={(e) => {
                stateEmptyFunc();
                setFilterObj({
                  ...filterObj,
                  [e.target.name]:
                    e.target.value === "--All--" ? null : e.target.value,
                });
              }}
            >
              <option key={"select"}>--All--</option>
              {data.activeUsers?.length
                ? data.activeUsers?.map((res) => {
                    return (
                      <option key={res.user_id} value={res.user_id}>
                        {res.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="col-sm">
            <label className="d-block font-weight-bold">
              Daily/Monthly/Yearly
            </label>
            <select
              className="form-control border-0"
              id="ex2"
              name="dateWise"
              onChange={handleDateWiseChange}
            >
              <option key={"daily"} value={"Daily"}>
                Daily
              </option>
              <option key={"monthly"} value={"Monthly"}>
                Monthly
              </option>
              <option key={"yearly"} value={"Yearly"}>
                Yearly
              </option>
            </select>
          </div>
          <div className="col-md">
            <label className="d-block font-weight-bold">Start Date</label>
            <input
              className="form-control input-lg pt-2 border-0"
              id="ex3"
              type={"date"}
              value={dateObj.startDate}
              name="startDate"
              onChange={handleDate}
            />
          </div>
          <div className="col-md">
            <label className="d-block font-weight-bold">End Date</label>
            <input
              className="form-control border-0"
              id="ex4"
              type={"date"}
              name="endDate"
              value={dateObj.endDate}
              onChange={handleDate}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-xl">
            <label className="d-block font-weight-bold">
              Ombudsman Location
            </label>
            <select
              className="form-control border-0"
              id="ex5"
              name="omdLocation"
              value={ombObj.omdLocation}
              onChange={(e) => {
                stateEmptyFunc();
                setOmbObj({ ...ombObj, [e.target.name]: e.target.value });
              }}
            >
              <option key={"select"} value={""}>
                Select Location
              </option>
              <option key={"all"} value={"All"}>
                --All--
              </option>
              {data.states?.length
                ? data.states?.map((x) => {
                    return (
                      <option key={x.name} value={x.name}>
                        {x.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="col-md-6 col-lg-6 col-xl">
            <label className="d-block font-weight-bold">Ombudsman Status</label>
            <select
              className="form-control border-0"
              id="ex6"
              name="selectedStatus"
              value={ombObj.selectedStatus}
              onChange={(e) => {
                stateEmptyFunc();
                setOmbObj({ ...ombObj, [e.target.name]: e.target.value });
              }}
            >
              <option key={"select"} value={""}>
                Select Status
              </option>
              {ombudsmanStatusList?.map((res) => {
                return (
                  <option key={res?.toString()} value={res}>
                    {res}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* </div> */}
        {/* <hr /> */}
        <div className="d-flex justify-content-between  flex-wrap bg-white px-5 my-5">
          <div className="text-dark px-3 py-3">
            <span
              className="h6 px-3 letter-spacing rounded py-2 font-weight-bold"
              onClick={(e) => {
                handleNavClick(e);
                leadCollapse("leadSection");
              }}
            >
              LEAD
            </span>
          </div>
          <div className="text-dark px-3 py-3">
            <span
              className="h6 px-3 letter-spacing rounded font-weight-bold py-2"
              onClick={(e) => {
                handleNavClick(e);
                leadCollapse("registration");
              }}
            >
              REGISTRATION
            </span>
          </div>
          <div className="text-dark px-3 py-3">
            <span
              className="h6 px-3 letter-spacing rounded font-weight-bold py-2"
              onClick={(e) => {
                handleNavClick(e);
                leadCollapse("resolution");
              }}
            >
              RESOLUTION
            </span>
          </div>
          <div className="text-dark px-3 py-3">
            <span
              className="h6 px-3 letter-spacing rounded font-weight-bold py-2"
              onClick={(e) => {
                handleNavClick(e);
                leadCollapse("legal");
              }}
            >
              LEGAL
            </span>
          </div>
          <div className="text-dark px-3 py-3">
            <span
              className="h6 px-3 letter-spacing rounded font-weight-bold py-2"
              onClick={(e) => {
                handleNavClick(e);
                leadCollapse("ombudsman");
              }}
            >
              OMBUDSMAN
            </span>
          </div>
          <div className="text-dark px-3 py-3">
            <span
              className="h6 px-3 letter-spacing rounded font-weight-bold py-2"
              onClick={(e) => {
                handleNavClick(e);
                leadCollapse("mailing");
              }}
            >
              MAILING
            </span>
          </div>
        </div>
      </div>
      <div>
        {/* <button
        id="leadSecBtn"
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("leadSection")}
          style={{ marginBottom: "1rem" }}
        >
          LEAD
        </button> */}
        {/* <button
          id="regSecBtn"
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("registration")}
          style={{ marginBottom: "1rem" }}
        >
          Registration
        </button> */}
        {/* <button
          id="resolutionSecBtn"
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("resolution")}
          style={{ marginBottom: "1rem" }}
        >
          Resolution
        </button> */}
        {/* <button
          id="legalSecBtn"
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("legal")}
          style={{ marginBottom: "1rem" }}
        >
          LEGAL
        </button> */}
        {/* <button
          id="ombudsmanSecBtn"
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("ombudsman")}
          style={{ marginBottom: "1rem" }}
        >
          OMBUDSMAN
        </button> */}
        {/* <button
          id="mailingSecBtn"
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("mailing")}
          style={{ marginBottom: "1rem" }}
        >
          MAILING
        </button> */}

        {/* ------------------------------------------------> All Lead Section Begin */}

        <Collapse isOpen={collapse == "leadSection"} className="bg-info">
          <Card>
            <CardBody>
              {/* <hr/> */}
              <h1>Lead Section</h1>
              <hr />
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li key={"1"} className="mr-3">
                  <button
                    id="allLeadSecBtn"
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("allLeadBuckets");
                      dispatch({
                        type: "ALL_LEAD_BUCKET",
                        state: {
                          ...filterObj,
                          dailyAll: "Total",
                          ...isDateSelected,
                        },
                      });
                    }}
                  >
                    All Lead Buckets
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    id="todayLeadBtn"
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("todaysLead");
                      dispatch({
                        type: "TODAY_LEAD_BUCKET",
                        state: {
                          ...filterObj,
                          dailyAll: "Daily",
                          ...isDateSelected,
                        },
                      });
                    }}
                  >
                    Todays Lead Buckets Movement
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    id="monthlyLeadBtn"
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("leadMarketing");
                      dispatch({
                        type: "MONTHLY_LEAD_BUCKET",
                        state: {
                          ...filterObj,
                          dailyAll: "Monthly",
                          ...isDateSelected,
                        },
                      });
                    }}
                  >
                    Leads Marketing Channel Dashboard(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    id="leadExpBtn"
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("leadExperts");
                      dispatch({
                        type: "LEAD_EXPERT_BUCKET",
                        state: { ...filterObj, ...isDateSelected },
                      });
                    }}
                  >
                    Leads Experts Dashboard
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    id="leadBucCount"
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("bucketCount");
                      dispatch({
                        type: "LEAD_BUCKET_COUNT",
                        state: { ...filterObj },
                      });
                    }}
                  >
                    Buckets Count
                  </button>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div>
        <Collapse
          isOpen={leadSection == "allLeadBuckets" && collapse === "leadSection"}
        >
          <Card className="" style={{ backgroundColor: "inherit" }}>
            <CardBody>
              <div>
                <div className="mx-auto text-light mb-2">
                  <div className="p-2 bg-primary mb-3 p-2 d-flex flex-wrap justify-content-between">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      All Lead Buckets
                    </h2>
                    <button
                      id="allLeadBucketRefBtn"
                      className="btn btn-warning py-1"
                      onClick={() => {
                        dispatch({
                          type: "ALL_LEAD_BUCKET",
                          state: {
                            ...filterObj,
                            dailyAll: "Total",
                            ...isDateSelected,
                            KeyRefresh: true,
                          },
                        });
                      }}
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="container">
                    <div className="row">
                      <DashboardCard
                        name="Total Leads"
                        value={data.allLeadBucket?.total}
                      />
                      <DashboardCard
                        name="Pending Leads"
                        value={data.allLeadBucket?.PENDING}
                      />
                      <DashboardCard
                        name="Accepted Leads"
                        value={data.allLeadBucket?.ACCEPTED}
                      />
                      <DashboardCard
                        name="Rejected Leads"
                        value={data.allLeadBucket?.REJECTED}
                      />
                      <DashboardCard
                        name="Follow Up Leads"
                        value={data.allLeadBucket?.FOLLOWUP}
                      />
                      <DashboardCard
                        name="Document Pending Leads"
                        value={data.allLeadBucket?.DOCUMENT_PENDING}
                      />
                      <DashboardCard
                        name="Third party Accepted Leads"
                        value={data.allLeadBucket?.THIRD_PARTY_ACCEPTED}
                      />
                      <DashboardCard
                        name="Auto Follow Up Leads"
                        value={data.allLeadBucket?.AUTOFOLLOWUP}
                      />
                      <DashboardCard
                        name="Query Leads"
                        value={data.allLeadBucket?.QUERY}
                      />
                      <DashboardCard
                        name="No Insurance Leads"
                        value={data.allLeadBucket?.NOINSURANCE}
                      />
                      <DashboardCard
                        name="Non Contactable Leads"
                        value={data.allLeadBucket?.NONCONTACTABLE}
                      />
                      <DashboardCard
                        name="Repeated Leads"
                        value={data.allLeadBucket?.REPEATED}
                      />
                      <DashboardCard
                        name="Expert Leads"
                        value={data.allLeadBucket?.EXPERT}
                      />
                      <DashboardCard
                        name="Registered Leads"
                        value={data.allLeadBucket?.REGISTERED}
                      />
                      <DashboardCard
                        name="Customer Not Responding Leads"
                        value={data.allLeadBucket?.CUSTOMER_NOT_RESPONDING}
                      />
                      <DashboardCard
                        name="Registration Pending Leads"
                        value={data.allLeadBucket?.REGISTRATION_PENDING}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        <Collapse
          isOpen={leadSection == "todaysLead" && collapse === "leadSection"}
        >
          <Card className="" style={{ backgroundColor: "inherit" }}>
            <CardBody>
              <div>
                <div className="mx-auto text-light mb-2">
                  <div className="p-2 bg-primary mb-3 p-2 d-flex justify-content-between">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Today's Lead Buckets
                    </h2>
                    <button
                      id="todaysLeadBucRefBtn"
                      className="btn btn-warning py-1"
                      onClick={() => {
                        dispatch({
                          type: "TODAY_LEAD_BUCKET",
                          state: {
                            ...filterObj,
                            dailyAll: "Daily",
                            ...isDateSelected,
                            KeyRefresh: true,
                          },
                        });
                      }}
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="container">
                    <div className="row">
                      <DashboardCard
                        name="Total Leads"
                        value={data.todayLeadBucket?.total}
                      />
                      <DashboardCard
                        name="Pending Leads"
                        value={data.todayLeadBucket?.PENDING}
                      />
                      <DashboardCard
                        name="Accepted Leads"
                        value={data.todayLeadBucket?.ACCEPTED}
                      />
                      <DashboardCard
                        name="Rejected Leads"
                        value={data.todayLeadBucket?.REJECTED}
                      />
                      <DashboardCard
                        name="Follow Up Leads"
                        value={data.todayLeadBucket?.FOLLOWUP}
                      />
                      <DashboardCard
                        name="Document Pending Leads"
                        value={data.todayLeadBucket?.DOCUMENT_PENDING}
                      />
                      <DashboardCard
                        name="Third party Accepted Leads"
                        value={data.todayLeadBucket?.THIRD_PARTY_ACCEPTED}
                      />
                      <DashboardCard
                        name="Auto Follow Up Leads"
                        value={data.todayLeadBucket?.AUTOFOLLOWUP}
                      />
                      <DashboardCard
                        name="Query Leads"
                        value={data.todayLeadBucket?.QUERY}
                      />
                      <DashboardCard
                        name="No Insurance Leads"
                        value={data.todayLeadBucket?.NOINSURANCE}
                      />
                      <DashboardCard
                        name="Non Contactable Leads"
                        value={data.todayLeadBucket?.NONCONTACTABLE}
                      />
                      <DashboardCard
                        name="Repeated Leads"
                        value={data.todayLeadBucket?.REPEATED}
                      />
                      <DashboardCard
                        name="Expert Leads"
                        value={data.todayLeadBucket?.EXPERT}
                      />
                      <DashboardCard
                        name="Registered Leads"
                        value={data.todayLeadBucket?.REGISTERED}
                      />
                      <DashboardCard
                        name="Customer Not Responding Leads"
                        value={data.todayLeadBucket?.CUSTOMER_NOT_RESPONDING}
                      />
                      <DashboardCard
                        name="Registration Pending Leads"
                        value={data.todayLeadBucket?.REGISTRATION_PENDING}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        <Collapse
          isOpen={leadSection == "leadMarketing" && collapse === "leadSection"}
        >
          <Card className="" style={{ backgroundColor: "inherit" }}>
            <CardBody>
              <div>
                <div className="mx-auto text-light mb-2">
                  <div className="p-2 bg-primary mb-3 p-2 d-flex justify-content-between">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Leads Marketing Channel Dashboard(Monthly)
                    </h2>
                    <button
                      id="monthlyLeadBucRefBtn"
                      className="btn btn-warning py-1"
                      onClick={() => {
                        dispatch({
                          type: "MONTHLY_LEAD_BUCKET",
                          state: {
                            ...filterObj,
                            dailyAll: "Monthly",
                            ...isDateSelected,
                            KeyRefresh: true,
                          },
                        });
                      }}
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="container">
                    <div className="row">
                      <DashboardCard
                        name="IVR"
                        value={
                          data.monthlyLeadBucket?.ivr
                            ? data.monthlyLeadBucket?.ivr
                            : 0
                        }
                      />
                      <DashboardCard
                        name="Direct"
                        value={
                          data.monthlyLeadBucket?.direct
                            ? data.monthlyLeadBucket?.direct
                            : 0
                        }
                      />
                      <DashboardCard
                        name="WhatsApp"
                        value={
                          data.monthlyLeadBucket?.whatsapp
                            ? data.monthlyLeadBucket?.whatsapp
                            : 0
                        }
                      />
                      <DashboardCard
                        name="ChatBots"
                        value={
                          data.monthlyLeadBucket?.chatbot
                            ? data.monthlyLeadBucket?.chatbot
                            : 0
                        }
                      />
                      <DashboardCard
                        name="WhiteGrapes"
                        value={
                          data.monthlyLeadBucket?.whitegrapes
                            ? data.monthlyLeadBucket?.whitegrapes
                            : 0
                        }
                      />
                      <DashboardCard
                        name="Organic"
                        value={
                          data.monthlyLeadBucket?.organic
                            ? data.monthlyLeadBucket?.organic
                            : 0
                        }
                      />
                      <DashboardCard
                        name="INSA-Website"
                        value={
                          data?.monthlyLeadBucket?.["insa-website"]
                            ? data?.monthlyLeadBucket?.["insa-website"]
                            : 0
                        }
                      />
                      <DashboardCard
                        name="Total"
                        value={
                          data.monthlyLeadBucket?.total
                            ? data.monthlyLeadBucket?.total
                            : 0
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        <Collapse
          isOpen={leadSection == "leadExperts" && collapse === "leadSection"}
        >
          <Card className="" style={{ backgroundColor: "inherit" }}>
            <CardBody>
              <div>
                <div className="mx-auto text-light mb-2">
                  <div className="p-2 bg-primary mb-3 p-2 d-flex justify-content-between">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Leads Experts Dashboard
                    </h2>
                    <button
                      id="leadExpBucRefBtn"
                      className="btn btn-warning py-1"
                      onClick={() => {
                        dispatch({
                          type: "LEAD_EXPERT_BUCKET",
                          state: {
                            ...filterObj,
                            ...isDateSelected,
                            KeyRefresh: true,
                          },
                        });
                      }}
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="container">
                    <div className="row">
                      {data.leadExports?.length &&
                        data.leadExports?.map((res) => {
                          return (
                            <DashboardCard name={res.name} value={res.count} />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        <Collapse
          isOpen={leadSection == "bucketCount" && collapse === "leadSection"}
        >
          <Card className="" style={{ backgroundColor: "inherit" }}>
            <CardBody>
              <div>
                <div className="mx-auto text-light mb-2">
                  <div className="p-2 bg-primary mb-3 p-2 d-flex justify-content-between">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Buckets Count
                    </h2>
                    <button
                      id="leadBucCountRefBtn"
                      className="btn btn-warning py-1"
                      onClick={() => {
                        dispatch({
                          type: "LEAD_BUCKET_COUNT",
                          state: { ...filterObj, KeyRefresh: true },
                        });
                      }}
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="container">
                    <div className="row">
                      {data.bucketCount?.length &&
                        data.bucketCount.map((res) => {
                          return (
                            <DashboardCard name={res.Name} value={res.Total} />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
      {/* ------------------------------------------------> All Lead Section End */}

      {/* ------------------------------------------------> Registration Section Starts */}

      <div>
        <Collapse isOpen={collapse === "registration"}>
          <Card>
            <CardBody>
              <h1>Registration Section</h1>
              <hr />
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      regSectionHandler("regComplaints");
                      dispatch({
                        type: "COMPLAINT_DASHBOARD",
                        state: { ...filterObj },
                      });
                    }}
                  >
                    Complaint Dashboard(All Cases)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-danger rounded"
                    color="primary"
                    onClick={() => {
                      regSectionHandler("regB2C");
                      dispatch({
                        type: "B2C_REGISTRATION",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    B2C Registration Dashboard
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-dark rounded"
                    color="primary"
                    onClick={() => {
                      regSectionHandler("regB2CCases");
                      dispatch({
                        type: "B2C_REGISTRATION_CASES",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          type: "Registration Data",
                        },
                      });
                    }}
                  >
                    B2C Registration Cases(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-success rounded"
                    color="primary"
                    onClick={() => {
                      regSectionHandler("regPartner");
                      dispatch({
                        type: "PARTNER_REGISTRATION",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    Partner Registration Dashboard
                  </button>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration Complaints */}

        <Collapse
          isOpen={collapse === "registration" && regSection == "regComplaints"}
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-0">Complaint Dashboard </h1>
                <button
                  className="btn btn-warning py-0"
                  onClick={() => {
                    dispatch({
                      type: "COMPLAINT_DASHBOARD",
                      state: { ...filterObj, KeyRefresh: true },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  {data.complaintDashboard ? (
                    Object.entries(data.complaintDashboard)?.map((res) => {
                      return <DashboardCard name={res[0]} value={res[1]} />;
                    })
                  ) : (
                    <tr key={"noData000"} className="text-center" style={{ margin: "auto" }}>No Data</tr>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Registration */}

        <Collapse
          isOpen={collapse === "registration" && regSection == "regB2C"}
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-0">B2C Registration Section </h1>
                <button
                  className="btn btn-warning py-1"
                  onClick={() => {
                    dispatch({
                      type: "B2C_REGISTRATION",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  {data.b2cRegistration ? (
                    <>
                      {dateWise === "Yearly" ? (
                        <>
                          <Chart
                            header="Cases"
                            labels={["Li", "Hi", "Gi"]}
                            chartData={[
                              data?.b2cRegistration?.caseMonthLi,
                              data?.b2cRegistration?.caseMonthHi,
                              data?.b2cRegistration?.caseMonthGi,
                            ]}
                          />
                          <Chart
                            header="Claim Amount"
                            labels={["Li", "Hi", "Gi"]}
                            chartData={[
                              data?.b2cRegistration?.claimCaseLi?.slice(2),
                              data?.b2cRegistration?.claimCaseHi?.slice(2),
                              data?.b2cRegistration?.claimCaseGi?.slice(2),
                            ]}
                          />
                          <Chart
                            header="Customers"
                            labels={["Li", "Hi", "Gi"]}
                            chartData={[
                              data?.b2cRegistration?.allCustomerMonthLi,
                              data?.b2cRegistration?.allCustomerMonthHi,
                              data?.b2cRegistration?.allCustomerMonthGi,
                            ]}
                          />
                        </>
                      ) : null}
                      <DashboardCard
                        name={"Life Insurance"}
                        value={
                          <div className="text-right">
                            <h3>Cases : {data.b2cRegistration?.caseMonthLi}</h3>
                            <h3>
                              Claim Amount : {data.b2cRegistration?.claimCaseLi}
                            </h3>
                            <h3>
                              Customers :{" "}
                              {data.b2cRegistration?.allCustomerMonthLi}
                            </h3>
                          </div>
                        }
                      />
                      <DashboardCard
                        name={"Health Insurance"}
                        value={
                          <div className="text-right">
                            <h3>Cases : {data.b2cRegistration?.caseMonthHi}</h3>
                            <h3>
                              Claim Amount : {data.b2cRegistration?.claimCaseHi}
                            </h3>
                            <h3>
                              Customers :{" "}
                              {data.b2cRegistration?.allCustomerMonthHi}
                            </h3>
                          </div>
                        }
                      />
                      <DashboardCard
                        name={"General Insurance"}
                        value={
                          <div className="text-right">
                            <h3>Cases : {data.b2cRegistration?.caseMonthGi}</h3>
                            <h3>
                              Claim Amount : {data.b2cRegistration?.claimCaseGi}
                            </h3>
                            <h3>
                              Customers :{" "}
                              {data.b2cRegistration?.allCustomerMonthGi}
                            </h3>
                          </div>
                        }
                      />
                      <DashboardCard
                        name={"Total"}
                        value={
                          <div className="text-right">
                            <h3>Cases : {data.b2cRegistration?.caseMonth}</h3>
                            <h3>
                              Claim Amount : {data.b2cRegistration?.claimCase}
                            </h3>
                            <h3>
                              Customers :{" "}
                              {data.b2cRegistration?.allCustomerMonth}
                            </h3>
                          </div>
                        }
                      />
                      <div className="overflow-auto">
                        <table className="table text-center table-borderless font-weight-bold">
                          <thead className="bg-primary">
                            <tr key={"heading"}>
                              <th colSpan={4}>Life Insurance</th>
                              <th colSpan={3}>General Insurance</th>
                              <th colSpan={3}>Health Insurance</th>
                              <th colSpan={3}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              key={"heading2"}
                              style={{ backgroundColor: "#e0ecf4" }}
                            >
                              <td>Marketing Channel</td>
                              <td>Cases</td>
                              <td>Claim Amount</td>
                              <td>Customers</td>
                              <td>Cases</td>
                              <td>Claim Amount</td>
                              <td>Customers</td>
                              <td>Cases</td>
                              <td>Claim Amount</td>
                              <td>Customers</td>
                              <td>Cases</td>
                              <td>Claim Amount</td>
                              <td>Customers</td>
                            </tr>
                            <tr key={"row3"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                IVR
                              </td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                            <tr key={"row4"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Direct
                              </td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                            <tr key={"row5"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                WhatsApp
                              </td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                            <tr key={"row6"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Chatbot
                              </td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                            <tr key={"row7"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Whitegrape
                              </td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                            <tr key={"row8"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Organic
                              </td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </tr>
                            <tr key={"row9"}>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Insa Website
                              </td>
                              <td>
                                {data.b2cRegistration?.allCustomerMonthLi}
                              </td>
                              <td>{data.b2cRegistration?.claimCaseLi}</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>{data.b2cRegistration?.caseMonthHi}</td>
                              <td>{data.b2cRegistration?.claimCaseHi}</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>{data.b2cRegistration?.claimCase}</td>
                              <td>-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <h4 key={"noData999"} style={{ margin: "auto" }} className="text-center">No Data</h4>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Cases */}
        <Collapse
          isOpen={collapse === "registration" && regSection == "regB2CCases"}
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-0">B2C Registration Cases(Monthly) </h1>
                <button
                  className="btn btn-warning py-1"
                  onClick={() => {
                    dispatch({
                      type: "B2C_REGISTRATION_CASES",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        type: "Registration Data",
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>

              <div className="container">
                <div className="row">
                  <table className="table table-borderless font-weight-bold">
                    <thead className="bg-primary">
                      <tr key={"heading"}>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Policy Number</th>
                        <th>Paid At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.b2cRegistrationCases?.sendData ? (
                        data.b2cRegistrationCases?.sendData?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{res.name}</td>
                              <td>{res.policyNumber}</td>
                              <td>{res.paidAt}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center" key={"noData"}>No Data</tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration Partner Registration */}
        <Collapse
          isOpen={collapse === "registration" && regSection == "regPartner"}
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-0">
                  Partner Registration Dashboard(Monthly){" "}
                </h1>
                <button
                  className="btn btn-warning py-1"
                  onClick={() => {
                    dispatch({
                      type: "PARTNER_REGISTRATION",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  {" "}
                  {dateWise === "Yearly" ? (
                    <>
                      <Chart
                        header="Cases"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data?.partnerRegistration?.caseMonthLi,
                          data?.partnerRegistration?.caseMonthHi,
                          data?.partnerRegistration?.caseMonthGi,
                        ]}
                      />
                      <Chart
                        header="Claim Amount"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data?.partnerRegistration?.claimCaseLi?.slice(2),
                          data?.partnerRegistration?.claimCaseHi?.slice(2),
                          data?.partnerRegistration?.claimCaseGi?.slice(2),
                        ]}
                      />
                      <Chart
                        header="Customers"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data?.partnerRegistration?.allCustomerMonthLi,
                          data?.partnerRegistration?.allCustomerMonthHi,
                          data?.partnerRegistration?.allCustomerMonthGi,
                        ]}
                      />
                    </>
                  ) : null}
                  <DashboardCard
                    name={"Life Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases : {data.partnerRegistration?.caseMonthLi}</h3>
                        <h3>
                          Claim Amount : {data.partnerRegistration?.claimCaseLi}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerRegistration?.allCustomerMonthLi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Health Insurance"}
                    value={
                      <div className="text-right">
                        <h3>Cases : {data.partnerRegistration?.caseMonthHi}</h3>
                        <h3>
                          Claim Amount : {data.partnerRegistration?.claimCaseHi}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerRegistration?.allCustomerMonthHi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"General Insurance"}
                    value={
                      <div className="text-right">
                        <h3>Cases : {data.partnerRegistration?.caseMonthGi}</h3>
                        <h3>
                          Claim Amount : {data.partnerRegistration?.claimCaseGi}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerRegistration?.allCustomerMonthGi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Total"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases : {data.partnerRegistration?.caseMonth}</h3>
                        <h3>
                          Claim Amount : {data.partnerRegistration?.claimCase}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerRegistration?.allCustomerMonth}
                        </h3>
                      </div>
                    }
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>

      {/* ------------------------------------------------> Registration Section End */}

      {/* ----------------------------------------------> RESOLUTION SECTION STARTS */}

      <div>
        <Collapse isOpen={collapse === "resolution"}>
          <Card>
            <CardBody>
              <h1>Registration Section</h1>
              <hr />
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      resolutionSectionHandler("resolutionOne");
                      dispatch({
                        type: "B2C_RESOLUTION",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    B2C Resolution Dashboard
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      resolutionSectionHandler("resolutionTwo");
                      dispatch({
                        type: "PARTNER_RESOLUTION",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    Partner Resolution Dashboard
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      resolutionSectionHandler("resolutionThree");
                      dispatch({
                        type: "B2C_SATTLED",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          type: "Settled Data",
                        },
                      });
                    }}
                  >
                    B2C Sattled Cases
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      resolutionSectionHandler("resolutionFour");
                      dispatch({
                        type: "PARTNER_SATTLED_CASES",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          type: "Settled Data",
                        },
                      });
                    }}
                  >
                    Partner Sattled Cases(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      resolutionSectionHandler("resolutionFive");
                      dispatch({
                        type: "B2C_INVOICE_RAISED",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          type: "Invoice Data",
                        },
                      });
                    }}
                  >
                    B2C Invoice Raised Cases(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      resolutionSectionHandler("resolutionSix");
                      dispatch({
                        type: "PARTNER_INVOICE",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          type: "Invoice Data",
                        },
                      });
                    }}
                  >
                    Partner Invoice Cases(Monthly)
                  </button>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> B2C Resolution Section */}

        <Collapse
          isOpen={
            collapse === "resolution" && resolutionSection == "resolutionOne"
          }
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-0 p-0 py-1">B2C Resolution Dashboard </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "B2C_RESOLUTION",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  {dateWise === "Yearly" ? (
                    <>
                      <Chart
                        header="Cases"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data.b2cResolution?.caseMonthLi,
                          data.b2cResolution?.caseMonthHi,
                          data.b2cResolution?.caseMonthGi,
                        ]}
                      />
                      <Chart
                        header="Claim Amount"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data.b2cResolution?.claimCaseLi?.slice(2),
                          data.b2cResolution?.claimCaseHi?.slice(2),
                          data.b2cResolution?.claimCaseGi?.slice(2),
                        ]}
                      />
                      <Chart
                        header="Customers"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data.b2cResolution?.allCustomerMonthLi,
                          data.b2cResolution?.allCustomerMonthHi,
                          data.b2cResolution?.allCustomerMonthGi,
                        ]}
                      />
                    </>
                  ) : null}
                  <DashboardCard
                    name={"Life Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h6>Cases : {data.b2cResolution?.caseMonthLi}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCaseLi}
                        </h6>
                        <h6>
                          Approved Claim Amount :{" "}
                          {data.b2cResolution?.claimCaseTotalLi}
                        </h6>
                        <h6>
                          Pending Claim Amount :{" "}
                          {data.b2cResolution?.claimCasePendingLi}
                        </h6>
                        <h6>
                          Customers : {data.b2cResolution?.allCustomerMonthLi}
                        </h6>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Health Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h6>Cases : {data.b2cResolution?.caseMonthHi}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCaseHi}
                        </h6>
                        <h6>
                          Approved Claim Amount :{" "}
                          {data.b2cResolution?.claimCaseTotalHi}
                        </h6>
                        <h6>
                          Pending Claim Amount :{" "}
                          {data.b2cResolution?.claimCasePendingHi}
                        </h6>
                        <h6>
                          Customers : {data.b2cResolution?.allCustomerMonthHi}
                        </h6>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"General Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h6>Cases : {data.b2cResolution?.caseMonthGi}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCaseGi}
                        </h6>
                        <h6>
                          Approved Claim Amount :{" "}
                          {data.b2cResolution?.claimCaseTotalGi}
                        </h6>
                        <h6>
                          Pending Claim Amount :{" "}
                          {data.b2cResolution?.claimCasePendingGi}
                        </h6>
                        <h6>
                          Customers : {data.b2cResolution?.allCustomerMonthGi}
                        </h6>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Total"}
                    value={
                      <div className="text-right w-100">
                        <h6>Cases : {data.b2cResolution?.caseMonth}</h6>
                        <h6>Claim Amount : {data.b2cResolution?.claimCase}</h6>
                        <h6>
                          Approved Claim Amount :{" "}
                          {data.b2cResolution?.claimCaseTotal}
                        </h6>
                        <h6>
                          Pending Claim Amount :{" "}
                          {data.b2cResolution?.claimCasePendingTotal}
                        </h6>
                        <h6>
                          Customers : {data.b2cResolution?.allCustomerMonth}
                        </h6>
                      </div>
                    }
                  />

                  <div className="overflow-auto">
                    <table className="table text-center table-borderless font-weight-bold">
                      <thead className="bg-primary">
                        <tr key={"heading"}>
                          <th colSpan={4}>Life Insurance</th>
                          <th colSpan={3}>General Insurance</th>
                          <th colSpan={3}>Health Insurance</th>
                          <th colSpan={3}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          key={"heading2"}
                          style={{ backgroundColor: "#e0ecf4" }}
                        >
                          <td>Marketing Channel</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                        </tr>
                        <tr key={"row3"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>IVR</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row4"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>Direct</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row5"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            WhatsApp
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row1"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Chatbot
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row8"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Whitegrape
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row9"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Organic
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row10"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Insa Website
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row11"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Resolution Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row12"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Company Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row13"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Ombudsman Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row14"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Legal Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Partner Resolution  */}

        <Collapse
          isOpen={
            collapse === "resolution" && resolutionSection == "resolutionTwo"
          }
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">Partner Resolution Dashboard </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "PARTNER_RESOLUTION",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  {dateWise === "Yearly" ? (
                    <>
                      <Chart
                        header="Cases"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data.partnerResolution?.caseMonthLi,
                          data.partnerResolution?.caseMonthHi,
                          data.partnerResolution?.caseMonthGi,
                        ]}
                      />
                      <Chart
                        header="Claim Amount"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data.partnerResolution?.claimCaseLi?.slice(2),
                          data.partnerResolution?.claimCaseHi?.slice(2),
                          data.partnerResolution?.claimCaseGi?.slice(2),
                        ]}
                      />
                      <Chart
                        header="Customers"
                        labels={["Li", "Hi", "Gi"]}
                        chartData={[
                          data.partnerResolution?.allCustomerMonthLi,
                          data.partnerResolution?.allCustomerMonthHi,
                          data.partnerResolution?.allCustomerMonthGi,
                        ]}
                      />
                    </>
                  ) : null}
                  <DashboardCard
                    name={"Life Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases : {data.partnerResolution?.caseMonthLi}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCaseLi}
                        </h3>
                        <h3>
                          Approved Claim Amount :{" "}
                          {data.partnerResolution?.claimCaseTotalLi}
                        </h3>
                        <h3>
                          Pending Claim Amount :{" "}
                          {data.partnerResolution?.claimCasePendingLi}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerResolution?.allCustomerMonthLi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Health Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases : {data.partnerResolution?.caseMonthHi}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCaseHi}
                        </h3>
                        <h3>
                          Approved Claim Amount :{" "}
                          {data.partnerResolution?.claimCaseTotalHi}
                        </h3>
                        <h3>
                          Pending Claim Amount :{" "}
                          {data.partnerResolution?.claimCasePendingHi}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerResolution?.allCustomerMonthHi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"General Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases : {data.partnerResolution?.caseMonthGi}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCaseGi}
                        </h3>
                        <h3>
                          Approved Claim Amount :{" "}
                          {data.partnerResolution?.claimCaseTotalGi}
                        </h3>
                        <h3>
                          Pending Claim Amount :{" "}
                          {data.partnerResolution?.claimCasePendingGi}
                        </h3>
                        <h3>
                          Customers :{" "}
                          {data.partnerResolution?.allCustomerMonthGi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Total"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases : {data.partnerResolution?.caseMonth}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCase}
                        </h3>
                        <h3>
                          Approved Claim Amount :{" "}
                          {data.partnerResolution?.claimCaseTotal}
                        </h3>
                        <h3>
                          Pending Claim Amount :{" "}
                          {data.partnerResolution?.claimCasePendingTotal}
                        </h3>
                        <h3>
                          Customers : {data.partnerResolution?.allCustomerMonth}
                        </h3>
                      </div>
                    }
                  />

                  <div className="overflow-auto">
                    <table className="table text-center table-borderless font-weight-bold">
                      <thead className="bg-primary">
                        <tr key={"heading1"}>
                          <th colSpan={4}>Life Insurance</th>
                          <th colSpan={3}>General Insurance</th>
                          <th colSpan={3}>Health Insurance</th>
                          <th colSpan={3}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          key={"heading2"}
                          style={{ backgroundColor: "#e0ecf4" }}
                        >
                          <td>Marketing Channel</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                          <td>Cases</td>
                          <td>Claim Amount</td>
                          <td>Customers</td>
                        </tr>
                        <tr key={"row1"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Company Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row2"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Ombudsman Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                        <tr key={"row3"}>
                          <td style={{ backgroundColor: "#e0ecf4" }}>
                            Legal Level
                          </td>
                          <td>{data.b2cRegistration?.allCustomerMonthLi}</td>
                          <td>{data.b2cRegistration?.claimCaseLi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.caseMonthHi}</td>
                          <td>{data.b2cRegistration?.claimCaseHi}</td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>{data.b2cRegistration?.claimCase}</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Cases */}
        <Collapse
          isOpen={
            collapse === "resolution" && resolutionSection == "resolutionThree"
          }
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">B2C Settled Cases(Monthly) </h1>

                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "B2C_SATTLED",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        type: "Settled Data",
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>Cases : {data.b2cSattled?.countData?.lifeCount}</h4>
                        <h4>
                          {" "}
                          Revenue : {data.b2cSattled?.countData?.lifeAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.b2cSattled?.countData?.healthCount}
                        </h4>
                        <h4>
                          {" "}
                          Revenue : {data.b2cSattled?.countData?.healthAmt}
                        </h4>
                      </div>
                    }
                    name={"Health Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.b2cSattled?.countData?.generalCount}
                        </h4>
                        <h4>
                          {" "}
                          Revenue : {data.b2cSattled?.countData?.generalAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.b2cSattled?.countData?.sendDataCount}
                        </h4>
                        <h4>
                          Total Revenue : {data.b2cSattled?.countData?.totalAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />

                  <table className="table table-borderless font-weight-bold">
                    <thead className="bg-primary">
                      <tr key={"heading"}>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Policy Number</th>
                        <th>Final Amt to be Paid</th>
                        <th>Invoice Date</th>
                        <th>Fianl Paid At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.b2cSattled?.sendData ? (
                        data.b2cSattled?.sendData.map((res, i) => {
                          return (
                            <tr key={"row1"}>
                              <td>{i + 1}</td>
                              <td>{res.name}</td>
                              <td>{res.policyNumber}</td>
                              <td>{res.finalAmountToBePaid}</td>
                              <td>{res.invoiceRaisedDate}</td>
                              <td>{res.finalPaidAt}</td>
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
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration Partner Registration */}
        <Collapse
          isOpen={
            collapse === "resolution" && resolutionSection == "resolutionFour"
          }
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">Partner Sattled Cases(Monthly) </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "PARTNER_SATTLED_CASES",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        type: "Settled Data",
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.partnerSattled?.countData?.lifeCount}
                        </h4>
                        <h4>
                          {" "}
                          Revenue : {data.partnerSattled?.countData?.lifeAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.partnerSattled?.countData?.healthCount}
                        </h4>
                        <h4>
                          {" "}
                          Revenue : {data.partnerSattled?.countData?.healthAmt}
                        </h4>
                      </div>
                    }
                    name={"Health Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.partnerSattled?.countData?.generalCount}
                        </h4>
                        <h4>
                          {" "}
                          Revenue : {data.partnerSattled?.countData?.generalAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.partnerSattled?.countData?.sendDataCount}
                        </h4>
                        <h4>
                          Total Revenue :{" "}
                          {data.partnerSattled?.countData?.totalAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        {/* -------------------------> Registration Partner Registration */}
        <Collapse
          isOpen={
            collapse === "resolution" && resolutionSection == "resolutionFive"
          }
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">B2C Invoice Cases(Monthly) </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "B2C_INVOICE_RAISED",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        type: "Invoice Data",
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div
                  className="row font-weight-bold"
                  style={{ fontWeight: "900" }}
                >
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases : {data.b2cInvoiceRaised?.countData?.lifeCount}
                        </h4>
                        <h4>
                          {" "}
                          Final Amt to be Paid :{" "}
                          {data.b2cInvoiceRaised?.countData?.lifeAmt}
                        </h4>
                        <h4>
                          Final Amt Settled :{" "}
                          {data.b2cInvoiceRaised?.countData?.lifeSettleCount}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.b2cInvoiceRaised?.countData?.healthCount}
                        </h4>
                        <h4>
                          {" "}
                          Final Amt to be Paid :{" "}
                          {data.b2cInvoiceRaised?.countData?.healthAmt}
                        </h4>
                        <h4>
                          Final Amt Settled :{" "}
                          {data.b2cInvoiceRaised?.countData?.healthSettleCount}
                        </h4>
                      </div>
                    }
                    name={"Health Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.b2cInvoiceRaised?.countData?.generalCount}
                        </h4>
                        <h4>
                          {" "}
                          Final Amt to be Paid :{" "}
                          {data.b2cInvoiceRaised?.countData?.generalAmt}
                        </h4>
                        <h4>
                          Final Amt Settled :{" "}
                          {data.b2cInvoiceRaised?.countData?.generalSettleCount}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.b2cInvoiceRaised?.countData?.sendDataCount}
                        </h4>
                        <h4>
                          Total Final Amt to be Paid :{" "}
                          {data.b2cInvoiceRaised?.countData?.totalAmt}
                        </h4>
                        <h4>
                          Final Amt Settled :{" "}
                          {data.b2cInvoiceRaised?.countData?.totalSettleCount}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <table className="table table-borderless font-weight-bold">
                    <thead className="bg-primary">
                      <tr key={"heading"}>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Policy Number</th>
                        <th>Final Amt to be Paid</th>
                        <th>Invoice Date</th>
                        <th>Fianl Paid At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.b2cInvoiceRaised?.sendData ? (
                        data.b2cInvoiceRaised?.sendData?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{res.name}</td>
                              <td>{res.policyNumber}</td>
                              <td>{res.finalAmountToBePaid}</td>
                              <td>{res.invoiceRaisedDate}</td>
                              <td>{res.paidAt}</td>
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
            </CardBody>
          </Card>
        </Collapse>
        {/* -------------------------> Registration Partner Registration */}
        <Collapse
          isOpen={
            collapse === "resolution" && resolutionSection == "resolutionSix"
          }
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">Partner Invoice Cases(Monthly) </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "PARTNER_INVOICE",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        type: "Invoice Data",
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.partnerInvoiceCases?.countData?.lifeCount}
                        </h4>
                        <h4>
                          {" "}
                          Life Insurance :{" "}
                          {data.partnerInvoiceCases?.countData?.lifeAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.partnerInvoiceCases?.countData?.healthCount}
                        </h4>
                        <h4>
                          Health Insurance :{" "}
                          {data.partnerInvoiceCases?.countData?.healthAmt}
                        </h4>
                      </div>
                    }
                    name={"Health Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.partnerInvoiceCases?.countData?.generalCount}
                        </h4>
                        <h4>
                          {" "}
                          General Insurance :{" "}
                          {data.partnerInvoiceCases?.countData?.generalAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                  <DashboardCard
                    value={
                      <div className="text-right">
                        <h4>
                          Cases :{" "}
                          {data.partnerInvoiceCases?.countData?.sendDataCount}
                        </h4>
                        <h4>
                          Total :{" "}
                          {data.partnerInvoiceCases?.countData?.totalAmt}
                        </h4>
                      </div>
                    }
                    name={"Life Insurance"}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>

      {/* -----------------------------------------------> RESOLUTION SECTION END */}

      {/* ------------------------------------------------> LEGAL Section Starts */}

      <div>
        <Collapse isOpen={collapse === "legal"}>
          <Card>
            <CardBody>
              <h1>Legal Section</h1>
              <hr />
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      handleLegalSection("legalOne");
                      dispatch({
                        type: "LEGAL_PARTNER_DASHBOARD",
                        state: { ...filterObj },
                      });
                    }}
                  >
                    Partner Dashboard(All Cases)
                  </button>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Legal Partner Dashbord */}

        <Collapse isOpen={collapse === "legal" && legalSection == "legalOne"}>
          <Card>
            <CardBody>
              {/* <h1>Parnter Dashboard </h1> */}
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">Partner Dashboard(All Cases)</h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "LEGAL_PARTNER_DASHBOARD",
                      state: { ...filterObj, KeyRefresh: true },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard
                    name={"Cases for which invoicing is done"}
                    value={data.legalPartner?.complaintCaseInvoice}
                  />
                  <DashboardCard
                    name={"Cases Registered in GI"}
                    value={data.legalPartner?.complaintCaseGI}
                  />
                  <DashboardCard
                    name={"Total claim amount in GI"}
                    value={data.legalPartner?.claimComplaintCaseGI}
                  />
                  <DashboardCard
                    name={"No. of Cases Registered in HI"}
                    value={data.legalPartner?.complaintCaseHI}
                  />
                  <DashboardCard
                    name={"Total claim amount in HI"}
                    value={data.legalPartner?.claimComplaintCaseHI}
                  />
                  <DashboardCard
                    name={"No. of Cases Registered in LI"}
                    value={data.legalPartner?.complaintCaseLI}
                  />
                  <DashboardCard
                    name={"Total claim amount in LI"}
                    value={data.legalPartner?.claimComplaintCaseLI}
                  />
                  <DashboardCard
                    name={"No. of Cases in IGMS"}
                    value={data.legalPartner?.complaintCaseIGMS}
                  />
                  <DashboardCard
                    name={"Total claim amount in IGMS"}
                    value={data.legalPartner?.claimComplaintCaseIGMS}
                  />
                  <DashboardCard
                    name={"No. of Cases in Ombudsman"}
                    value={data.legalPartner?.complaintCaseOMD}
                  />
                  <DashboardCard
                    name={"Total claim amount in Ombudsman"}
                    value={data.legalPartner?.claimComplaintCaseOMD}
                  />
                  <DashboardCard
                    name={"As a Service Cases"}
                    value={data.legalPartner?.caseAsAService}
                  />
                  <DashboardCard
                    name={"Total claim amount in As a Service Cases"}
                    value={data.legalPartner?.claimCaseAsAService}
                  />
                  <DashboardCard
                    name={"Total Number of cases(01/Jan/2021 - 31/12/2021)"}
                    value={data.legalPartner?.complaintCaseYear}
                  />
                  <DashboardCard
                    name={"Total claim amount(01/Jan/2021 - 31/12/2021)"}
                    value={data.legalPartner?.claimComplaintCaseYear}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Registration */}
      </div>

      {/* ------------------------------------------------> Legal Section End */}

      {/* ------------------------------------------------> LEGAL Section Starts */}

      <div>
        <Collapse isOpen={collapse === "ombudsman"}>
          <Card>
            <CardBody>
              <h1>Ombudsman Section</h1>
              <hr />
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      ombudsmanHandler("ombudsmanOne");
                      dispatch({
                        type: "B2C_OMBUDSMAN_COUNT",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    B2C Ombudsman Count(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      ombudsmanHandler("ombudsmanTwo");
                      dispatch({
                        type: "PARTNER_OMBUDSMAN_COUNT",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    Partner Ombudsman Count(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      ombudsmanHandler("ombudsmanThree");
                      dispatch({
                        type: "NEW_OMBUDSMAN_COUNT_B2C",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          omdLocation: ombObj.omdLocation,
                        },
                      });
                    }}
                  >
                    New Ombudsman Count(B2C)(Yearly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      ombudsmanHandler("ombudsmanFour");
                      dispatch({
                        type: "NEW_OMBUDSMAN_COUNT_PARTNER",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          omdLocation: ombObj.omdLocation,
                        },
                      });
                    }}
                  >
                    New Ombudsman Count(Partner)(Yearly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      ombudsmanHandler("ombudsmanFive");
                      dispatch({
                        type: "OMBUDSMAN_RESEND_CASES_B2C",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          selectedStatus: ombObj.selectedStatus,
                        },
                      });
                    }}
                  >
                    Resend B2C Cases(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      ombudsmanHandler("ombudsmanSix");
                      dispatch({
                        type: "OMBUDSMAN_RESEND_CASES_PARTNER",
                        state: {
                          ...filterObj,
                          dateWise,
                          ...isDateSelected,
                          selectedStatus: ombObj.selectedStatus,
                        },
                      });
                    }}
                  >
                    Resend Partner Cases(Monthly)
                  </button>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Legal Partner Dashbord */}

        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanOne"}
        >
          <Card>
            <CardBody>
              <div className=" mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">B2C Ombudsman Dashboard(Monthly) </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "B2C_OMBUDSMAN_COUNT",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading"} className="bg-primary text-center">
                        <th colSpan={4}>Life Insurance</th>
                        <th colSpan={3}>General Insurance</th>
                        <th colSpan={3}>Health Insurance</th>
                        <th colSpan={3}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={"heading2"}
                        style={{ backgroundColor: "#DAEEF3" }}
                      >
                        <th>Status</th>
                        <th>Cases</th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                      </tr>
                      {data?.b2cOmbudsmanCount ? (
                        data?.b2cOmbudsmanCount?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <th style={{ backgroundColor: "#DAEEF3" }}>
                                {res.status}
                              </th>
                              <td>{res.count?.caseLi}</td>
                              <td>{res.count?.claimCaseLi}</td>
                              <td>{res.count?.allCustomerMonthLi}</td>
                              <td>{res.count?.caseHi}</td>
                              <td>{res.count?.claimCaseHi}</td>
                              <td>{res.count?.allCustomerMonthHi}</td>
                              <td>{res.count?.caseGi}</td>
                              <td>{res.count?.claimCaseGi}</td>
                              <td>{res.count?.allCustomerMonthGi}</td>
                              <td>{res.count?.case}</td>
                              <td>{res.count?.claimCase}</td>
                              <td>{res.count?.allCustomerMonth}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Registration */}

        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanTwo"}
        >
          <Card>
            <CardBody>
              <div className="mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">
                  Partner Ombudsman Dashboard(Monthly)dsf{" "}
                </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "PARTNER_OMBUDSMAN_COUNT",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading"} className="bg-primary text-center">
                        <th colSpan={4}>Life Insurance</th>
                        <th colSpan={3}>General Insurance</th>
                        <th colSpan={3}>Health Insurance</th>
                        <th colSpan={3}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={"heading2"}
                        style={{ backgroundColor: "#DAEEF3" }}
                      >
                        <th>Status</th>
                        <th>Cases</th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                      </tr>
                      {data?.partnerOmbudsmanCount ? (
                        data?.partnerOmbudsmanCount?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <th style={{ backgroundColor: "#DAEEF3" }}>
                                {res.status}
                              </th>
                              <td>{res.count?.caseLi}</td>
                              <td>{res.count?.claimCaseLi}</td>
                              <td>{res.count?.allCustomerMonthLi}</td>
                              <td>{res.count?.caseHi}</td>
                              <td>{res.count?.claimCaseHi}</td>
                              <td>{res.count?.allCustomerMonthHi}</td>
                              <td>{res.count?.caseGi}</td>
                              <td>{res.count?.claimCaseGi}</td>
                              <td>{res.count?.allCustomerMonthGi}</td>
                              <td>{res.count?.case}</td>
                              <td>{res.count?.claimCase}</td>
                              <td>{res.count?.allCustomerMonth}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData88"} className="text-center">No Data</tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanThree"}
        >
          <Card>
            <CardBody>
              <div className=" mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">New Ombudsman Count(B2C)(Yearly) </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "NEW_OMBUDSMAN_COUNT_B2C",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        omdLocation: ombObj.omdLocation,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading1"} className="bg-primary text-center">
                        <th colSpan={4}>Life Insurance</th>
                        <th colSpan={3}>General Insurance</th>
                        <th colSpan={3}>Health Insurance</th>
                        <th colSpan={3}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={"heading2"}
                        style={{ backgroundColor: "#DAEEF3" }}
                      >
                        <th>Status</th>
                        <th>Cases</th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                      </tr>
                      {data?.newB2COmbudsmanCount ? (
                        data?.newB2COmbudsmanCount?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <th style={{ backgroundColor: "#DAEEF3" }}>
                                {res.status}
                              </th>
                              <td>{res.count?.caseLi}</td>
                              <td>{res.count?.claimCaseLi}</td>
                              <td>{res.count?.allCustomerMonthLi}</td>
                              <td>{res.count?.caseHi}</td>
                              <td>{res.count?.claimCaseHi}</td>
                              <td>{res.count?.allCustomerMonthHi}</td>
                              <td>{res.count?.caseGi}</td>
                              <td>{res.count?.claimCaseGi}</td>
                              <td>{res.count?.allCustomerMonthGi}</td>
                              <td>{res.count?.case}</td>
                              <td>{res.count?.claimCase}</td>
                              <td>{res.count?.allCustomerMonth}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanFour"}
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">
                  New Ombudsman Count(Partner)(Yearly){" "}
                </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "NEW_OMBUDSMAN_COUNT_PARTNER",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        omdLocation: ombObj.omdLocation,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading1"} className="bg-primary text-center">
                        <th colSpan={4}>Life Insurance</th>
                        <th colSpan={3}>General Insurance</th>
                        <th colSpan={3}>Health Insurance</th>
                        <th colSpan={3}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={"heading2"}
                        style={{ backgroundColor: "#DAEEF3" }}
                      >
                        <th>Status</th>
                        <th>Cases</th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                      </tr>
                      {data?.nerPartnerOmbudsmanCount ? (
                        data?.nerPartnerOmbudsmanCount?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <th style={{ backgroundColor: "#DAEEF3" }}>
                                {res.status}
                              </th>
                              <td>{res.count?.caseLi}</td>
                              <td>{res.count?.claimCaseLi}</td>
                              <td>{res.count?.allCustomerMonthLi}</td>
                              <td>{res.count?.caseHi}</td>
                              <td>{res.count?.claimCaseHi}</td>
                              <td>{res.count?.allCustomerMonthHi}</td>
                              <td>{res.count?.caseGi}</td>
                              <td>{res.count?.claimCaseGi}</td>
                              <td>{res.count?.allCustomerMonthGi}</td>
                              <td>{res.count?.case}</td>
                              <td>{res.count?.claimCase}</td>
                              <td>{res.count?.allCustomerMonth}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanFive"}
        >
          <Card>
            <CardBody>
              <div className=" mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">
                  B2C Resend Cases(Monthly)-(Ombudsman Pending){" "}
                </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "OMBUDSMAN_RESEND_CASES_B2C",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        selectedStatus: ombObj.selectedStatus,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading1"} className="bg-primary text-center">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Policy Number</th>
                        <th>Claim Amount</th>
                        <th>Count </th>
                        <th>Latest Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.resendB2CCases ? (
                        Object.entries(data.resendB2CCases)?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{res[1]?.name}</td>
                              <td>{res[1]?.policyNumber}</td>
                              <td>{res[1]?.claimAmount}</td>
                              <td>{res[1]?.statusCount}</td>
                              <td>{res[1]?.latestDate}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanSix"}
        >
          <Card>
            <CardBody>
              <div className="bg-primary mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">
                  Partner Resend Cases(Monthly)-(Ombudsman Pending){" "}
                </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "OMBUDSMAN_RESEND_CASES_PARTNER",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        selectedStatus: ombObj.selectedStatus,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading1"} className="bg-primary text-center">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Policy Number</th>
                        <th>Claim Amount</th>
                        <th>Count </th>
                        <th>Latest Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.resendPartnerCases ? (
                        Object.entries(data.resendPartnerCases)?.map(
                          (res, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{res[1]?.name}</td>
                                <td>{res[1]?.policyNumber}</td>
                                <td>{res[1]?.claimAmount}</td>
                                <td>{res[1]?.statusCount}</td>
                                <td>{res[1]?.latestDate}</td>
                              </tr>
                            );
                          }
                        )
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>

      {/* ------------------------------------------------> Legal Section End */}

      {/* ------------------------------------------------> LEGAL Section Starts */}

      <div>
        <Collapse isOpen={collapse === "mailing"}>
          <Card>
            <CardBody>
              <h1>Mailing Section</h1>
              <hr />
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      mailingHandler("mailingOne");
                      dispatch({
                        type: "B2C_MAILING_COUNT",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    B2C Mailing Count(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      mailingHandler("mailingTwo");
                      dispatch({
                        type: "PARTNER_MAILING_COUNT",
                        state: { ...filterObj, dateWise, ...isDateSelected },
                      });
                    }}
                  >
                    Partner Mailing Count(Monthly)
                  </button>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Legal Partner Dashbord */}

        <Collapse isOpen={collapse === "mailing" && mailingSec == "mailingOne"}>
          <Card>
            <CardBody>
              <div className=" mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">B2C Mailing Dashboard(Monthly) </h1>

                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "B2C_MAILING_COUNT",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading1"} className="bg-primary text-center">
                        <th colSpan={4}>Life Insurance</th>
                        <th colSpan={3}>General Insurance</th>
                        <th colSpan={3}>Health Insurance</th>
                        <th colSpan={3}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={"heading2"}
                        style={{ backgroundColor: "#DAEEF3" }}
                      >
                        <th>Status</th>
                        <th>Cases</th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                      </tr>
                      {data?.b2cMailingCount ? (
                        data?.b2cMailingCount?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <th style={{ backgroundColor: "#DAEEF3" }}>
                                {res.status}
                              </th>
                              <td>{res.count?.caseLi}</td>
                              <td>{res.count?.claimCaseLi}</td>
                              <td>{res.count?.allCustomerMonthLi}</td>
                              <td>{res.count?.caseHi}</td>
                              <td>{res.count?.claimCaseHi}</td>
                              <td>{res.count?.allCustomerMonthHi}</td>
                              <td>{res.count?.caseGi}</td>
                              <td>{res.count?.claimCaseGi}</td>
                              <td>{res.count?.allCustomerMonthGi}</td>
                              <td>{res.count?.case}</td>
                              <td>{res.count?.claimCase}</td>
                              <td>{res.count?.allCustomerMonth}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
        <Collapse isOpen={collapse === "mailing" && mailingSec == "mailingTwo"}>
          <Card>
            <CardBody>
              <div className=" mb-3 p-1 d-flex justify-content-between">
                <h1 className="m-o p-0">Partner Mailing Dashboard(Monthly) </h1>
                <button
                  className="btn btn-warning py-1 h-50 mt-auto mb-auto"
                  onClick={() => {
                    dispatch({
                      type: "PARTNER_MAILING_COUNT",
                      state: {
                        ...filterObj,
                        dateWise,
                        ...isDateSelected,
                        KeyRefresh: true,
                      },
                    });
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="container">
                <div className="row">
                  <table className="table table-borderless">
                    <thead className="bg-primary">
                      <tr key={"heading1"} className="bg-primary text-center">
                        <th colSpan={4}>Life Insurance</th>
                        <th colSpan={3}>General Insurance</th>
                        <th colSpan={3}>Health Insurance</th>
                        <th colSpan={3}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        key={"heading2"}
                        style={{ backgroundColor: "#DAEEF3" }}
                      >
                        <th>Status</th>
                        <th>Cases</th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                        <th>Cases </th>
                        <th>Claim Amount</th>
                        <th>Customers</th>
                      </tr>
                      {data?.partnerMailingCount ? (
                        data?.partnerMailingCount?.map((res, i) => {
                          return (
                            <tr key={i}>
                              <th style={{ backgroundColor: "#DAEEF3" }}>
                                {res.status}
                              </th>
                              <td>{res.count?.caseLi}</td>
                              <td>{res.count?.claimCaseLi}</td>
                              <td>{res.count?.allCustomerMonthLi}</td>
                              <td>{res.count?.caseHi}</td>
                              <td>{res.count?.claimCaseHi}</td>
                              <td>{res.count?.allCustomerMonthHi}</td>
                              <td>{res.count?.caseGi}</td>
                              <td>{res.count?.claimCaseGi}</td>
                              <td>{res.count?.allCustomerMonthGi}</td>
                              <td>{res.count?.case}</td>
                              <td>{res.count?.claimCase}</td>
                              <td>{res.count?.allCustomerMonth}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={"noData"} className="text-center">
                          No Data
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>

      {/* ------------------------------------------------> Legal Section End */}
    </>
  );
};
export default injectIntl(DefaultDashboard);
