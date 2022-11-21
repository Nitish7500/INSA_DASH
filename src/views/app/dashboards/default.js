import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "components/common/CustomBootstrap";
import Breadcrumb from "containers/navs/Breadcrumb";
import { getCurrentUser } from "helpers/Utils";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import DashboardCard from "./DashboardCard";
import { useSelector, useDispatch } from "react-redux";

const user = getCurrentUser();

const DefaultDashboard = ({ intl, match }) => {
  const [collapse, setCollapse] = useState("");
  const [leadSection, setleadSection] = useState("");
  const [regSection, setregSection] = useState("");
  const [resolutionSection, setResolutionSection] = useState("");
  const [legalSection, setlegalSection] = useState("");
  const [ombudsmanSec, setombudsmanSec] = useState("");
  const [mailingSec, setmailingSec] = useState("");
  // const [dashboardData, setdashboardData] = useState({
  //   allBucketData:
  // })
  const data = useSelector((state) => state.bucket);
  const dispatch = useDispatch();
  console.log(data);
  const leadCollapse = (e) => {
    console.log(e);
    if (e == collapse) {
      setCollapse("");
      return;
    } else {
      setCollapse(e);
    }
  };

  const leadSectionHandler = (name) => {
    console.log(leadSection);
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

  return (
    <>
      <h1>
        Welcome <span className="text-warning">{user.data?.userType}</span> !
      </h1>
      <p>Work in Progress...</p>
      <div class="container m-2">
        <div class="row align-items-start">
          <div class="col-sm">
            <label className="d-block">Daily/Monthly/Yearly</label>
            <select className="form-control border-0" id="ex1">
              <option>Daily</option>
            </select>
          </div>
          <div class="col-md">
            <label className="d-block">Start Date</label>
            <input
              className="form-control input-lg pt-2 border-0"
              id="ex1"
              type={"date"}
            />
          </div>
          <div class="col-md">
            <label className="d-block">End Date</label>
            <input className="form-control border-0" id="ex1" type={"date"} />
          </div>
          <div class="col-md-6 col-lg-6 col-xl">
            <label className="d-block">Ombudsman Location</label>
            <select className="form-control border-0" id="ex1">
              <option>Daily</option>
            </select>
          </div>
          <div class="col-md-6 col-lg-6 col-xl">
            <label className="d-block">Ombudsman Status</label>
            <select className="form-control border-0" id="ex1">
              <option>Daily</option>
            </select>
          </div>
        </div>
      </div>
      <hr />

      <div>
        <button
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("leadSection")}
          style={{ marginBottom: "1rem" }}
        >
          LEAD
        </button>
        <button
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("registration")}
          style={{ marginBottom: "1rem" }}
        >
          Registration
        </button>
        <button
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("resolution")}
          style={{ marginBottom: "1rem" }}
        >
          Resolution
        </button>
        <button
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("legal")}
          style={{ marginBottom: "1rem" }}
        >
          LEGAL
        </button>
        <button
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("ombudsman")}
          style={{ marginBottom: "1rem" }}
        >
          OMBUDSMAN
        </button>
        <button
          className="btn btn-primary rounded mr-3"
          color="primary"
          onClick={() => leadCollapse("mailing")}
          style={{ marginBottom: "1rem" }}
        >
          MAILING
        </button>

        {/* ------------------------------------------------> All Lead Section Begin */}

        <Collapse isOpen={collapse == "leadSection"} className="bg-info">
          <Card>
            <CardBody>
              {/* <hr/> */}
              <h1>Lead Section</h1>
              <hr />
              {/* <div className="container">
                <div className="row">
                  <div className="col-sm-2 p-0">
                    <Button
                      className="m-0"
                      color="primary"
                      onClick={() => setCollapse(true)}
                    >
                      All Lead Buckets
                    </Button>
                  </div>
                  <div className="col-sm-2">
                    <Button
                      color="primary"
                      onClick={() => setCollapse(true)}
                      style={{ marginBottom: "1rem" }}
                    >
                      Todays Lead Buckets Movement
                    </Button>
                  </div>
                  <div className="col-sm-2">
                    <Button
                      color="primary"
                      onClick={() => setCollapse(true)}
                      style={{ marginBottom: "1rem" }}
                    >
                      Leads Marketing Channel Dashboard(Monthly)
                    </Button>
                  </div>
                  <div className="col-sm-2">
                    <Button
                      color="primary"
                      onClick={() => setCollapse(true)}
                      style={{ marginBottom: "1rem" }}
                    >
                      Leads Experts Dashboard
                    </Button>
                  </div>

                  <div className="col-sm-2">
                    <Button
                      color="primary"
                      onClick={() => setCollapse(true)}
                      style={{ marginBottom: "1rem" }}
                    >
                      Buckets Count
                    </Button>
                  </div>
                </div>
              </div> */}
              <ul className="d-flex list-unstyled flex-xl-row flex-md-row flex-sm-column">
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("allLeadBuckets");
                      dispatch({ type: "ALL_LEAD_BUCKET" });
                    }}
                  >
                    All Lead Buckets
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("todaysLead");
                      dispatch({ type: "TODAY_LEAD_BUCKET" });
                    }}
                  >
                    Todays Lead Buckets Movement
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("leadMarketing");
                      dispatch({ type: "MONTHLY_LEAD_BUCKET" });
                    }}
                  >
                    Leads Marketing Channel Dashboard(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("leadExperts");
                      dispatch({ type: "LEAD_EXPERT_BUCKET" });
                    }}
                  >
                    Leads Experts Dashboard
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => {
                      leadSectionHandler("bucketCount");
                      dispatch({ type: "LEAD_BUCKET_COUNT" });
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
                <div
                  className="mx-auto text-light mb-2"
                  style={{ width: "75%" }}
                >
                  <div className="p-2 bg-primary mb-3 p-2">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      All Lead Buckets
                    </h2>
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
                <div
                  className="mx-auto text-light mb-2"
                  style={{ width: "75%" }}
                >
                  <div className="p-2 bg-primary mb-3 p-2">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Today's Lead Buckets
                    </h2>
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
                <div
                  className="mx-auto text-light mb-2"
                  style={{ width: "75%" }}
                >
                  <div className="p-2 bg-primary mb-3 p-2">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Today's Lead Buckets
                    </h2>
                  </div>

                  <div className="container">
                    <div className="row">
                      <DashboardCard
                        name="IVR"
                        value={data.monthlyLeadBucket?.ivr}
                      />
                      <DashboardCard
                        name="Direct"
                        value={data.monthlyLeadBucket?.direct}
                      />
                      <DashboardCard
                        name="WhatsApp"
                        value={data.monthlyLeadBucket?.whatsapp}
                      />
                      <DashboardCard
                        name="ChatBots"
                        value={data.monthlyLeadBucket?.chatbot}
                      />
                      <DashboardCard
                        name="WhiteGrapes"
                        value={data.monthlyLeadBucket?.whitegrapes}
                      />
                      <DashboardCard
                        name="Organic"
                        value={data.monthlyLeadBucket?.organic}
                      />
                      <DashboardCard
                        name="INSA-Website"
                        value={data?.monthlyLeadBucket?.["insa-website"]}
                      />
                      <DashboardCard
                        name="Total"
                        value={data.monthlyLeadBucket?.total}
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
                <div
                  className="mx-auto text-light mb-2"
                  style={{ width: "75%" }}
                >
                  <div className="p-2 bg-primary mb-3 p-2">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Today's Lead Buckets
                    </h2>
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
                <div
                  className="mx-auto text-light mb-2"
                  style={{ width: "75%" }}
                >
                  <div className="p-2 bg-primary mb-3 p-2">
                    <h2 className="p-0 m-0 font-weight-light pl-2 py-1">
                      Today's Lead Buckets
                    </h2>
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
                      dispatch({ type: "COMPLAINT_DASHBOARD" });
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
                      dispatch({ type: "B2C_REGISTRATION" });
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
                      dispatch({ type: "B2C_REGISTRATION_CASES" });
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
                      dispatch({ type: "PARTNER_REGISTRATION" });
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
              <h1>Complaint Section </h1>

              <div className="container">
                <div className="row">
                  {data.complaintDashboard ? (
                    Object.entries(data.complaintDashboard)?.map((res) => {
                      return <DashboardCard name={res[0]} value={res[1]} />;
                    })
                  ) : (
                    <h2 style={{ margin: "auto" }}>No Data</h2>
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
              <h1>B2C Registration Section </h1>
              <div className="container">
                <div className="row">
                  {data.b2cRegistration ? (
                    <>
                      <DashboardCard
                        name={"Life Insurance"}
                        value={
                          <div className="text-right">
                            <h3>Cases ${data.b2cRegistration?.caseMonthLi}</h3>
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
                            <h3>Cases ${data.b2cRegistration?.caseMonthHi}</h3>
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
                            <h3>Cases ${data.b2cRegistration?.caseMonthGi}</h3>
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
                            <h3>Cases ${data.b2cRegistration?.caseMonth}</h3>
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
                            <tr>
                              <th colSpan={4}>Life Insurance</th>
                              <th colSpan={3}>General Insurance</th>
                              <th colSpan={3}>Health Insurance</th>
                              <th colSpan={3}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ backgroundColor: "#e0ecf4" }}>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                    <h2 style={{ margin: "auto" }}>No Data</h2>
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
              <h1>B2C Registration Cases(Monthly) </h1>

              <div className="container">
                <div className="row">
                  <table className="table table-borderless font-weight-bold">
                    <thead className="bg-primary">
                      <tr>
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
                            <tr>
                              <td>{i + 1}</td>
                              <td>{res.name}</td>
                              <td>{res.policyNumber}</td>
                              <td>{res.paidAt}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>No Data</tr>
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
              <h1>Partner Registration Dashboard(Monthly) </h1>
              <div className="container">
                <div className="row">
                  <DashboardCard
                    name={"Life Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases ${data.partnerRegistration?.caseMonthLi}</h3>
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
                        <h3>Cases ${data.partnerRegistration?.caseMonthHi}</h3>
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
                        <h3>Cases ${data.partnerRegistration?.caseMonthGi}</h3>
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
                        <h3>Cases ${data.partnerRegistration?.caseMonth}</h3>
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
                      dispatch({ type: "B2C_RESOLUTION" });
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
                      dispatch({ type: "PARTNER_RESOLUTION" });
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
                      dispatch({ type: "B2C_SATTLED" });
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
                      dispatch({ type: "PARTNER_SATTLED_CASES" });
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
                      dispatch({ type: "B2C_INVOICE_RAISED" });
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
                      dispatch({ type: "PARTNER_INVOICE" });
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
              <h1>B2C Resolution Dashboard </h1>
              <div className="container">
                <div className="row">
                  <DashboardCard
                    name={"Life Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h6>Cases ${data.b2cResolution?.caseMonthLi}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCaseLi}
                        </h6><h6>
                          Approved Claim Amount : {data.b2cResolution?.claimCaseTotalLi}
                        </h6>
                        <h6>
                          Pending Claim Amount : {data.b2cResolution?.claimCasePendingLi}
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
                        <h6>Cases ${data.b2cResolution?.caseMonthHi}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCaseHi}
                        </h6><h6>
                          Approved Claim Amount : {data.b2cResolution?.claimCaseTotalHi}
                        </h6>
                        <h6>
                          Pending Claim Amount : {data.b2cResolution?.claimCasePendingHi}
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
                        <h6>Cases ${data.b2cResolution?.caseMonthGi}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCaseGi}
                        </h6><h6>
                          Approved Claim Amount : {data.b2cResolution?.claimCaseTotalGi}
                        </h6>
                        <h6>
                          Pending Claim Amount : {data.b2cResolution?.claimCasePendingGi}
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
                        <h6>Cases ${data.b2cResolution?.caseMonth}</h6>
                        <h6>
                          Claim Amount : {data.b2cResolution?.claimCase}
                        </h6><h6>
                          Approved Claim Amount : {data.b2cResolution?.claimCaseTotal}
                        </h6>
                        <h6>
                          Pending Claim Amount : {data.b2cResolution?.claimCasePendingTotal}
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
                            <tr>
                              <th colSpan={4}>Life Insurance</th>
                              <th colSpan={3}>General Insurance</th>
                              <th colSpan={3}>Health Insurance</th>
                              <th colSpan={3}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ backgroundColor: "#e0ecf4" }}>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Resolution Level
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Company Level
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Ombudsman Level
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Legal Level
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
              <h1>Partner Resolution Dashboard </h1>
              <div className="container">
                <div className="row">
                  <DashboardCard
                    name={"Life Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases ${data.partnerResolution?.caseMonthLi}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCaseLi}
                        </h3><h3>
                          Approved Claim Amount : {data.partnerResolution?.claimCaseTotalLi}
                        </h3>
                        <h3>
                          Pending Claim Amount : {data.partnerResolution?.claimCasePendingLi}
                        </h3>
                        <h3>
                          Customers : {data.partnerResolution?.allCustomerMonthLi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Health Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases ${data.partnerResolution?.caseMonthHi}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCaseHi}
                        </h3><h3>
                          Approved Claim Amount : {data.partnerResolution?.claimCaseTotalHi}
                        </h3>
                        <h3>
                          Pending Claim Amount : {data.partnerResolution?.claimCasePendingHi}
                        </h3>
                        <h3>
                          Customers : {data.partnerResolution?.allCustomerMonthHi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"General Insurance"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases ${data.partnerResolution?.caseMonthGi}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCaseGi}
                        </h3><h3>
                          Approved Claim Amount : {data.partnerResolution?.claimCaseTotalGi}
                        </h3>
                        <h3>
                          Pending Claim Amount : {data.partnerResolution?.claimCasePendingGi}
                        </h3>
                        <h3>
                          Customers : {data.partnerResolution?.allCustomerMonthGi}
                        </h3>
                      </div>
                    }
                  />
                  <DashboardCard
                    name={"Total"}
                    value={
                      <div className="text-right w-100">
                        <h3>Cases ${data.partnerResolution?.caseMonth}</h3>
                        <h3>
                          Claim Amount : {data.partnerResolution?.claimCase}
                        </h3><h3>
                          Approved Claim Amount : {data.partnerResolution?.claimCaseTotal}
                        </h3>
                        <h3>
                          Pending Claim Amount : {data.partnerResolution?.claimCasePendingTotal}
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
                            <tr>
                              <th colSpan={4}>Life Insurance</th>
                              <th colSpan={ 3}>General Insurance</th>
                              <th colSpan={3}>Health Insurance</th>
                              <th colSpan={3}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ backgroundColor: "#e0ecf4" }}>
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Company Level
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Ombudsman Level
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
                            <tr>
                              <td style={{ backgroundColor: "#e0ecf4" }}>
                                Legal Level
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
              <h1>B2C Settled Cases(Monthly) </h1>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cSattled?.countData?.lifeCount}</h4><h4> Revenue : {data.b2cSattled?.countData?.lifeAmt}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cSattled?.countData?.healthCount}</h4><h4> Revenue : {data.b2cSattled?.countData?.healthAmt}</h4></div>} name={"Health Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cSattled?.countData?.generalCount}</h4><h4> Revenue : {data.b2cSattled?.countData?.generalAmt}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cSattled?.countData?.sendDataCount}</h4><h4>Total Revenue : {data.b2cSattled?.countData?.totalAmt}</h4></div>} name={"Life Insurance"} />

                    <table className="table table-borderless font-weight-bold">
                      <thead className="bg-primary">
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Policy Number</th>
                          <th>Final Amt to be Paid</th>
                          <th>Invoice Date</th>
                          <th>Fianl Paid At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.b2cSattled?.sendData
                          ?
                          data.b2cSattled?.sendData.map((res,i) => {
                            return <tr>
                                  <td>{i + 1}</td>
                                  <td>{res.name}</td>
                                  <td>{res.policyNumber}</td>
                                  <td>{res.finalAmountToBePaid}</td>
                                  <td>{res.invoiceRaisedDate}</td>
                                  <td>{res.finalPaidAt}</td>
                            </tr>
                          })
                          :
                          <tr>No Data</tr>
                        }
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
              <h1>Partner Sattled Cases(Monthly) </h1>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerSattled?.countData?.lifeCount}</h4><h4> Revenue : {data.partnerSattled?.countData?.lifeAmt}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerSattled?.countData?.healthCount}</h4><h4> Revenue : {data.partnerSattled?.countData?.healthAmt}</h4></div>} name={"Health Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerSattled?.countData?.generalCount}</h4><h4> Revenue : {data.partnerSattled?.countData?.generalAmt}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerSattled?.countData?.sendDataCount}</h4><h4>Total Revenue : {data.partnerSattled?.countData?.totalAmt}</h4></div>} name={"Life Insurance"} />
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
              <h1>B2C Invoice Cases(Monthly)  </h1>
              <div className="container">
                <div className="row font-weight-bold" style={{fontWeight:"900"}}>
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cInvoiceRaised?.countData?.lifeCount}</h4><h4> Final Amt to be Paid : {data.b2cInvoiceRaised?.countData?.lifeAmt}</h4><h4>Final Amt Settled : {data.b2cInvoiceRaised?.countData?.lifeSettleCount}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cInvoiceRaised?.countData?.healthCount}</h4><h4> Final Amt to be Paid : {data.b2cInvoiceRaised?.countData?.healthAmt}</h4><h4>Final Amt Settled : {data.b2cInvoiceRaised?.countData?.healthSettleCount}</h4></div>} name={"Health Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cInvoiceRaised?.countData?.generalCount}</h4><h4> Final Amt to be Paid : {data.b2cInvoiceRaised?.countData?.generalAmt}</h4><h4>Final Amt Settled : {data.b2cInvoiceRaised?.countData?.generalSettleCount}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.b2cInvoiceRaised?.countData?.sendDataCount}</h4><h4>Total Final Amt to be Paid : {data.b2cInvoiceRaised?.countData?.totalAmt}</h4><h4>Final Amt Settled : {data.b2cInvoiceRaised?.countData?.totalSettleCount}</h4></div>} name={"Life Insurance"} />
                  <table className="table table-borderless font-weight-bold">
                      <thead className="bg-primary">
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Policy Number</th>
                          <th>Final Amt to be Paid</th>
                          <th>Invoice Date</th>
                          <th>Fianl Paid At</th>
                        </tr>
                  </thead>
                  <tbody>
                    {
                      data.b2cInvoiceRaised?.sendData ? data.b2cInvoiceRaised?.sendData?.map((res,i) => {
                        return <tr>
                          <td>{i + 1}</td>
                          <td>{res.name}</td>
                          <td>{res.policyNumber}</td>
                          <td>{res.finalAmountToBePaid}</td>
                          <td>{res.invoiceRaisedDate}</td>
                          <td>{res.paidAt}</td>
                        </tr>
                      })
                      :
                      <tr>No Data</tr>
                    }
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
              <h1>Partner Invoice Cases(Monthly) </h1>
              <div className="container">
                <div className="row font-weight-bold">
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerInvoiceCases?.countData?.lifeCount}</h4><h4> Life Insurance : {data.partnerInvoiceCases?.countData?.lifeAmt}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerInvoiceCases?.countData?.healthCount}</h4><h4>Health Insurance  : {data.partnerInvoiceCases?.countData?.healthAmt}</h4></div>} name={"Health Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerInvoiceCases?.countData?.generalCount}</h4><h4> General Insurance : {data.partnerInvoiceCases?.countData?.generalAmt}</h4></div>} name={"Life Insurance"} />
                  <DashboardCard value={<div className="text-right"><h4>Cases : {data.partnerInvoiceCases?.countData?.sendDataCount}</h4><h4>Total  : {data.partnerInvoiceCases?.countData?.totalAmt}</h4></div>} name={"Life Insurance"} />
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
                    onClick={() => handleLegalSection("legalOne")}
                  >
                    Partner Dashboard(All Cases)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => handleLegalSection("legalTwo")}
                  >
                    Expert Dashboard(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => handleLegalSection("legalThree")}
                  >
                    Expert Partner Dashboard(Monthly)
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
              <h1>Complaint Section </h1>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Registration */}

        <Collapse isOpen={collapse === "legal" && legalSection == "legalTwo"}>
          <Card>
            <CardBody>
              <h1>B2C Registration Section </h1>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Cases */}
        <Collapse isOpen={collapse === "legal" && legalSection == "legalThree"}>
          <Card>
            <CardBody>
              <h1>B2C Cases </h1>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration Partner Registration */}
        <Collapse
          isOpen={collapse === "registration" && legalSection == "regPartner"}
        >
          <Card>
            <CardBody>
              <h1>Registration Partner </h1>
            </CardBody>
          </Card>
        </Collapse>
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
                    onClick={() => ombudsmanHandler("ombudsmanOne")}
                  >
                    Resend B2B Cases(Monthly)
                  </button>
                </li>
                <li className="mr-3">
                  <button
                    className="m-0 btn btn-primary rounded"
                    color="primary"
                    onClick={() => ombudsmanHandler("ombudsmanTwo")}
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
              <h1>Complaint Section </h1>
            </CardBody>
          </Card>
        </Collapse>

        {/* -------------------------> Registration B2C Registration */}

        <Collapse
          isOpen={collapse === "ombudsman" && ombudsmanSec == "ombudsmanTwo"}
        >
          <Card>
            <CardBody>
              <h1>B2C Registration Section </h1>
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
                    onClick={() => mailingHandler("mailingOne")}
                  >
                    B2C Mailing Count(Monthly)
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
              <h1>Mailing Section </h1>
            </CardBody>
          </Card>
        </Collapse>
      </div>

      {/* ------------------------------------------------> Legal Section End */}
    </>
  );
};
export default injectIntl(DefaultDashboard);
