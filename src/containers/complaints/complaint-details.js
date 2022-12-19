import React, { useEffect, useState } from "react";
import { Row, Nav, NavItem, Button, TabContent, TabPane } from "reactstrap";
import { NavLink, useLocation } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "containers/navs/Breadcrumb";
import { Colxx } from "components/common/CustomBootstrap";
import DetailsForm from "components/reusable-components/tabpanes/forms/details-form";
import MailingSectionForm from "components/reusable-components/tabpanes/forms/mailing-section";
import IGMSForm from "components/reusable-components/tabpanes/forms/igms-form";
import OmbudsmanForm from "components/reusable-components/tabpanes/forms/ombudsman-form";
import ResolutionForm from "components/reusable-components/tabpanes/forms/resolution-form";
import LegalForm from "components/reusable-components/tabpanes/forms/legal-form";
import SavedEmail from "components/reusable-components/tabpanes/forms/save-email";
import GetEmailData from "components/reusable-components/tabpanes/forms/get-email";
import DocumentForm from "components/reusable-components/tabpanes/forms/document-form";
import NonResponsive from "components/reusable-components/tabpanes/forms/non-responsive";
import { getComplaintDetailsById, updateComplaint } from "services/complaints.services";
import { useQuery } from "hooks/useQuery";
import OtherActions from "components/reusable-components/tabpanes/forms/other-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { adminRoot } from "constants/defaultValues";
import { useRef } from "react";
import { NotificationManager } from "components/common/react-notifications";

const ComplaintDetails = ({ match }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [comCurNumArr, setcomCurNumArr] = useState([])
  const [comCurDateArr, setcomCurDateArr] = useState([])
  const { complaintId } = useQuery(["complaintId"]);
  const [formData, setformData] = useState({
    name: "",
    email: "",
  });

  const escalationPointsRef = useRef(null);
  const earlierMailsRef = useRef(null);
  const hearing_pointsRef = useRef(null);
  const legalCommentSectionRef = useRef(null);
  const legalPointsByExpertRef = useRef(null);

  // console.log(complaintId);

  //getting Complaint by Id through complaints.services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getComplaintDetailsById(complaintId);
        setItems(data);
        setformData(data);
      } catch (error) {
        console.log("ComplaintDetails", error);
      }
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  const handleFormChange = (e) => {
    console.log(e.target.type);
    if (e.target.type === "checkbox") {
      if (e.target.name === "sendNoticeReminderOrNot") {
        setItems({
          ...items,
          legalSection: {
            ...items.legalSection,
            [e.target.name]: e.target.checked,
          },
        });
      } else {
        setItems({ ...items, [e.target.name]: e.target.checked });
      }
    } else if (e.target.name === "alternatePhone") {
      setItems({
        ...items,
        userId: { ...items.userId, [e.target.name]: e.target.value },
      });
    } else if (e.target.name === "consumerCourtDate") {
    } else if (
      [
        "sendNoticeReminderOrNot",
        "caseNumber",
        "caseTitle",
        "LawyerFirmName",
        "caseFileNumber",
        "LawyerFirmNumber",
        "consumerCourtLocation",
        "LawyerFirmAddress",
        "callCust1",
        "approxFees",
        "callCust2",
        "legal_res_notice_date",
        "C_court_filing_date",
        "legal_notice",
        "legal_notice_date",
        "legal_notice_courier_number",
      ].includes(e.target.name) ||
      e.target.name === "consumerCourtDate"
    ) {
      setItems({
        ...items,
        legalSection: {
          ...items.legalSection,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === "courierNumberDocArr") {
      setItems({
        ...items,
        courierNumberDocArr: [...items.courierNumberDocArr, e.ta],
      });
    } else {
      setItems({ ...items, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = () => {

    updateComplaint(items._id, {
      ...items,
      escalationPoints: escalationPointsRef.current?.getContent(),
      earlierMails: earlierMailsRef.current?.getContent(),
      hearing_points: hearing_pointsRef.current?.getContent(),
      legalSection: {
        ...items.legalSection,
        consumerCourtDate:comCurDateArr,
        legalCommentSection: legalCommentSectionRef.current?.getContent(),
        legalPointsByExpert: legalPointsByExpertRef.current?.getContent(),
      },
      courierNumberDocArr:comCurNumArr
    }).then(res => {
      console.log(res)
      if (res.success) {
        NotificationManager.success(
          res.message,
          "Complaint Updated Successfully !",
          3000,
          null,
          null,
          "filled"
        )
        window.history.back()
      }
    })

    console.log({
      ...items,
      escalationPoints: escalationPointsRef.current?.getContent(),
      earlierMails: earlierMailsRef.current?.getContent(),
      hearing_points: hearing_pointsRef.current?.getContent(),
      legalSection: {
        ...items.legalSection,
        consumerCourtDate:comCurDateArr,
        legalCommentSection: legalCommentSectionRef.current?.getContent(),
        legalPointsByExpert: legalPointsByExpertRef.current?.getContent(),
      },
      courierNumberDocArr:comCurNumArr
    });
  };


  // const { messages } = intl;
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12" className="my-3">
          <NavLink
            id="navLink1"
            location={{}}
            to={`${adminRoot}/pages/product/data-list`}
            className="mr-3"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </NavLink>
          <h1>Complaint Details</h1>
          <Breadcrumb match={match} />

          {/* <h2 className='mb-4'>Complaint ID : {complaintId}</h2> */}
          <Nav tabs className="separator-tabs ml-0 mt-3 mb-5">
            <NavItem>
              <NavLink
                id="navLink2"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "details",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("details")}
              >
                <span>Complaint Details</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink3"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "mailing",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("mailing")}
              >
                <span>Mailing Section</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink4"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "igms",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("igms")}
              >
                <span>IGMS</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink5"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "ombudsman",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("ombudsman")}
              >
                <span>Ombudsman</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink6"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "resolution",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("resolution")}
              >
                <span>Resolution</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink7"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "legal",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("legal")}
              >
                <span>Legal</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink8"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "saveEmail",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("saveEmail")}
              >
                <span>Save Email</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink9"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "getEmail",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("getEmail")}
              >
                <span>Get Email Data</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink10"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "document",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("document")}
              >
                <span>Document</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink11"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "nonResponsive",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("nonResponsive")}
              >
                <span>Non Responsive</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="navLink12"
                location={{}}
                to={`complaint-details?complaintId=${complaintId}`}
                className={classnames({
                  active: activeTab === "others",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("others")}
              >
                <span>Other Actions</span>
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="details">
              <DetailsForm
                handleFormChange={handleFormChange}
                heading="Complaint Details Form"
                details={items}
              />
            </TabPane>

            <TabPane tabId="mailing">
              <MailingSectionForm
                handleFormChange={handleFormChange}
                heading="Mailing Section"
                details={items}
                complaintId={complaintId}
                escalationPointsRef={escalationPointsRef}
                earlierMailsRef={earlierMailsRef}
              />
            </TabPane>

            <TabPane tabId="igms">
              <IGMSForm
                handleFormChange={handleFormChange}
                heading="IGMS Section"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>

            <TabPane tabId="ombudsman">
              <OmbudsmanForm
                hearing_pointsRef={hearing_pointsRef}
                handleFormChange={handleFormChange}
                heading="Ombudsman Section"
                details={items}
                complaintId={complaintId}
                setcomCurNumArr = {setcomCurNumArr}
                setcomCurDateArr = {setcomCurDateArr}
              />
            </TabPane>

            <TabPane tabId="resolution">
              <ResolutionForm
                handleFormChange={handleFormChange}
                heading="Resolution Section"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>

            <TabPane tabId="legal">
              <LegalForm
                handleFormChange={handleFormChange}
                heading="Legal Section"
                details={items}
                complaintId={complaintId}
                legalPointsByExpertRef={legalPointsByExpertRef}
                legalCommentSectionRef={legalCommentSectionRef}
              />
            </TabPane>

            <TabPane tabId="saveEmail">
              <SavedEmail
                handleFormChange={handleFormChange}
                heading="Send Email Section"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>

            <TabPane tabId="getEmail">
              <GetEmailData
                handleFormChange={handleFormChange}
                heading="Get Email Data"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>

            <TabPane tabId="document">
              <DocumentForm
                handleFormChange={handleFormChange}
                heading="Document Uploads"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>

            <TabPane tabId="nonResponsive">
              <NonResponsive
                handleFormChange={handleFormChange}
                heading="Non Responsive Customer Flow"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>

            <TabPane tabId="others">
              <OtherActions
                handleFormChange={handleFormChange}
                heading="Other Actions"
                details={items}
                complaintId={complaintId}
              />
            </TabPane>
          </TabContent>
        </Colxx>
        <div className="ml-auto mr-auto">
          <button id="comBtn" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Row>
    </>
  );
};
export default ComplaintDetails;
