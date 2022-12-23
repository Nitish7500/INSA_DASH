//igms section nested form

import { Colxx } from "components/common/CustomBootstrap";
import {
  FormikCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikDatePicker,
} from "containers/form-validations/FormikFields";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  faAdd,
  faArrowRight,
  faCancel,
  faCheck,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectReminderType } from "constants/formValues";
import SetStatus from "../modals/setStatus";
import CancelRequest from "../modals/cancelRequest";
import AddComplaint from "../modals/addComplaints";
import {
  generateMulMail,
  getComplaintDetailsById,
  getMultiMailTemplate,
  getTemplateFunc,
  getTempMail,
  getUserBasedData,
  selectedDoc,
} from "services/complaints.services";
import AssignCompany from "../modals/assignToCompany";
import RequestFromCustomer from "../modals/reqFromCustomer";
import AssignToOmb from "../modals/assignToOmb";
import { Editor } from "@tinymce/tinymce-react";
import { tinyMceApiKey } from "constants/defaultValues";
import { useRef } from "react";
import ReminderMail from "../modals/reminderMail";
import { NotificationManager } from "components/common/react-notifications";
import Select from "react-select";
import ReminderTrackCom from "../modals/reminderTrack";

export default function OtherActions({ heading, complaintId }) {
  const [isSetStatusModal, setIsSetStatusModal] = useState(false);
  const [isCancelReqModal, setIsCancelReqModal] = useState(false);
  const [addComplaintModal, setAddComplaintModal] = useState(false);
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [assignCompanyModal, setAssignCompanyModal] = useState(false);
  const [reqFromCustomer, setreqFromCustomer] = useState(false);
  const [assignToOMB, setassignToOMB] = useState(false);
  const [reminderMailForm, setreminderMailForm] = useState({
    mailingTemplateSelect: "mailing_reminder",
  });
  const [mulMailRemOpen, setmulMailRemOpen] = useState({
    open: false,
    mailingTemplateSelect: "",
  });
  const [selectedDocArr, setselectedDocArr] = useState([]);
  const [ReminderTrack, setReminderTrack] = useState(false);
  const [userBasedData, setuserBasedData] = useState([]);
  const [getMailTemplateForm, setgetMailTemplateForm] = useState({});
  const [openMailTemplateModal, setopenMailTemplateModal] = useState(false);
  const [mailData, setmailData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const onCloseStatusHistoryModal = () => {
    setIsSetStatusModal(!isSetStatusModal);
  };

  const onCloseCancelRequestModal = () => {
    setIsCancelReqModal(!isCancelReqModal);
  };

  const onCloseAddComplaintModal = () => {
    setAddComplaintModal(!addComplaintModal);
  };

  const onCloseAssignCompanyModal = () => {
    setAssignCompanyModal(!assignCompanyModal);
  };

  const onCloseReqFromCustomer = () => {
    setreqFromCustomer(!reqFromCustomer);
  };

  const oncloseAssignToOmb = () => {
    setassignToOMB(false);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  //getting Complaint by Id through complaints.services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getComplaintDetailsById(complaintId);
        setItems(data);
      } catch (error) {
        console.log("ComplaintDetails", error);
      }
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (reminderMailForm.frequency === "Multiple") {
      getUserBasedData(items).then((res) => {
        let temp = res.data?.map((res) => {
          return {
            label: `${res.policyNumber} - ${res.name} - ${res.insuranceCompanyId?.name}`,
            value: res._id,
          };
        });
        setuserBasedData(temp);
        console.log(temp);
      });
    }
  }, [reminderMailForm.frequency]);

  const leadId = items ? (items.leadId ? items.leadId._id : "") : "";
  const userId = items ? (items.userId ? items.userId._id : "") : "";

  const mailRef = useRef(null);

  const handleSMReminderMail = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(e.target.name, e.target.value);
    setreminderMailForm({ ...reminderMailForm, [name]: value });
  };

  const handleGetTemplateClick = (type) => {
    setopenMailTemplateModal(true);
    // console.log({
    //   id: items ? items._id : "",
    //   policyNumber: items ? items.policyNumber : "",
    //   reminderType: type,
    //   templateSelect: reminderMailForm.mailingTemplateSelect,
    // });
    if (reminderMailForm.frequency === "Multiple") {
      let payload = {
        userId: items.userId?._id,
        complaintId: items._id,
        reminderType: type,
        status: "EXPERT APPROVED DRAFT MAIL",
        updatedBy: "Admin",
      };

      console.log(payload);
      getMultiMailTemplate(items.userId?._id, {
        complaintId: items._id,
        reminderType: type,
        status: "EXPERT APPROVED DRAFT MAIL",
        updatedBy: "Admin",
      }).then((res) => {
        console.log(res);
      });
      return;
    } else if (reminderMailForm.frequency === "Single") {
      let payload = {
        id: items ? items._id : "",
        policyNumber: items ? items.policyNumber : "",
        reminderType: type,
        templateSelect: reminderMailForm.mailingTemplateSelect,
      };
      getTemplateFunc(items._id, payload).then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data) {
            setmailData(res.data?.outOfReachTemplate);
            NotificationManager.success(
              res.msg,
              "Mail Template Generated !",
              3000,
              null,
              null,
              "filled"
            );
          } else {
            setmailData("");
            NotificationManager.error(
              "Something went wrong !",
              res.msg,
              3000,
              null,
              null,
              "filled"
            );
          }
        }
      });
    }
  };

  const openRemMailModal = (type, heading) => {
    setgetMailTemplateForm({
      ...getMailTemplateForm,
      type: type,
      heading: heading,
      formType: reminderMailForm.frequency,
    });
    setopenMailTemplateModal(true);
    handleGetTemplateClick(type);
  };

  const handlemulMailRemClick = () => {
    getTempMail({
      complaintId: items._id,
      mailingTemplate: "",
      policyNumber: items.policyNumber,
      reminderType: "mailingReminder",
      typeOfCase: "B2C",
      updatedBy: "Admin",
    }).then((res) => {
      if (res.status === 200) {
        NotificationManager.success(
          "Mail has been sent !",
          res.msg,
          3000,
          null,
          null,
          "filled"
        );
      } else {
        NotificationManager.error(
          "Something went wrong !",
          res.msg,
          3000,
          null,
          null,
          "filled"
        );
      }
    });
    setmulMailRemOpen({ ...mulMailRemOpen, open: true });
  };

  const generateMailRemFunc = () => {
    const {
      idArr,
      mailingTemplateSelect: templateSelect = "mailing_reminder",
    } = mulMailRemOpen;
    if (idArr.length) {
      generateMulMail({
        idArr,
        mailingTemplate: "",
        templateSelect,
        complaintId: items._id,
        policyNumber: items.policyNumber,
        reminderType: "mailingReminder",
        typeOfCase: "B2C",
        updatedBy: "Admin",
      }).then((res) => {
        if (res.status === 200) {
          NotificationManager.success("", res.msg, 3000, null, null, "filled");
        } else {
          NotificationManager.error(
            "Something went wrong !",
            res.msg,
            3000,
            null,
            null,
            "filled"
          );
        }
        setmulMailRemOpen({
          ...mulMailRemOpen,
          open: false,
          mailingTemplateSelect: "",
        });
      });
    }
  };

  const selectedDocFunc = () => {
    selectedDoc({ id: items._id }).then((res) => {
      console.log(res);
      if (res.success) {
        setselectedDocArr(res.data?.data);
        NotificationManager.success(
          "All Uploaded Docs !",
          res.message,
          3000,
          null,
          null,
          "filled"
        );
      } else {
        NotificationManager.error(
          "Something went wrong !",
          res.msg,
          3000,
          null,
          null,
          "filled"
        );
      }
    });
  };

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4">{heading}</h2>
        <Row className="mb-4">
          <Colxx xxs="12" lg="12" className="mb-5">
            <Row>
              <Colxx xxs="12" lg="12">
                <div className="flex">
                  <h5>Lead ID - </h5>
                  <h5 className="text-warning ml-2">{complaintId}</h5>
                </div>
              </Colxx>
            </Row>
            <div className="my-3">
              <h3>Request Actions</h3>

              <div className="actions flex my-4">
                <div className="flex-cc">
                  <Button
                    id="btnAddComp"
                    color="primary"
                    size="md"
                    className="top-right-button mr-3"
                    onClick={() => setAddComplaintModal(!addComplaintModal)}
                  >
                    <FontAwesomeIcon icon={faAdd} />
                    <span className="text-center mt-2 ml-3">
                      Add More Complaint
                    </span>
                  </Button>
                </div>
                <div className="flex-cc mr-3">
                  <Button
                    id="btnSetStsM"
                    color="warning"
                    className="text-center"
                    onClick={() => setIsSetStatusModal(!isSetStatusModal)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="text-center mt-2 ml-3">Status Change</span>
                  </Button>
                </div>
                <div className="flex-cc">
                  <Button
                    id="btnReqCus"
                    color="success"
                    className="text-center"
                    onClick={() => setreqFromCustomer(true)}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span className="text-center mt-2 ml-3">
                      Request From Customer
                    </span>
                  </Button>
                </div>
                <div className="flex-cc ml-3">
                  <Button
                    id="btnCncReqMod"
                    color="danger"
                    className="text-center"
                    onClick={() => setIsCancelReqModal(!isCancelReqModal)}
                  >
                    <FontAwesomeIcon icon={faCancel} />
                    <span className="text-center mt-2 ml-3">
                      Cancel Request
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-4">
              <h3>Assign Complaint</h3>
              <div className="actions flex my-3">
                <div className="flex-cc mr-3">
                  <Button
                    id="btnAssComMod"
                    color="primary"
                    className="text-center"
                    onClick={() => setAssignCompanyModal(!assignCompanyModal)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="text-center mt-2 ml-3">
                      Assign To Company / IGMS{" "}
                    </span>
                  </Button>
                </div>
                <div className="flex-cc">
                  <Button
                    id="btnAssToOmb"
                    color="success"
                    className="text-center"
                    onClick={() => {
                      setassignToOMB(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faUserTag} />
                    <span className="text-center mt-2 ml-3">
                      Assign to Ombudsman
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-4">
              <h3>Generate Single OR multiple Reminder Mail</h3>
              <div className="actions flex my-3 row">
                <div className="flex-cc mr-3 col-12 col-md-6">
                  <select
                    id="othAcRemMail"
                    name="frequency"
                    className="form-control"
                    onChange={handleSMReminderMail}
                  >
                    {selectReminderType.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-cc mr-3">
                  <Button
                    id="btnREmTrc"
                    color="warning"
                    className="text-center"
                    onClick={() => {
                      setReminderTrack(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="text-center mt-2 ml-3">
                      Reminder Tracks
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            {reminderMailForm.frequency === "Single" ? (
              <div className="container mt-5 shadow pt-3 pl-5 pb-5">
                <h4>Generate Single Reminder Mail</h4>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label>Select Template:-</label>
                    <select
                      id="othActRemMailF"
                      className="form-control"
                      name="mailingTemplateSelect"
                      value={reminderMailForm.mailingTemplateSelect}
                      onChange={handleSMReminderMail}
                    >
                      <option key={"temp1"} value="mailing_reminder">Template-1</option>
                      <option key={"temp2"} value="mailing_reminder2">Template-2</option>
                      <option key={"temp3"} value="mailing_reminder3">Template-3</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">Mailing Reminder</label>
                    <button
                      id="othActBtnUpdate"
                      className="btn btn-primary px-5"
                      onClick={() => {
                        openRemMailModal("mailingReminder", "Mailing Reminder");
                      }}
                    >
                      UPDATE
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">Form 6A Reminder Mail</label>
                    <button
                      id="othActUpSndBtn"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal("form6A", "Form 6A Reminder Mail");
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "form6A",
                        //   heading: "Form 6A Reminder Mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("form6A");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">
                      Hearing date Reminder Mail
                    </label>
                    <button
                      id="othActHeaDateUpSnd"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "hearingDate",
                          "Hearing date Reminder Mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "hearingDate",
                        //   heading: "Hearing date Reminder Mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("hearingDate");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">
                      Reward date and type Reminder mail:-
                    </label>
                    <button
                      id="othActRewBtn"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "rewardDate",
                          "Reward date and type Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "rewardDate",
                        //   heading: "Reward date and type Reminder mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("rewardDate");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">
                      Award Acceptance Reminder mail:-
                    </label>
                    <button
                      id="othActAwdAccRemBtn"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "awardAcceptance",
                          "Award Acceptance Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "awardAcceptance",
                        //   heading: "Award Acceptance Reminder mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("awardAcceptance");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">
                      Award Non Compliance Reminder mail:-
                    </label>
                    <button
                      id="othActAwdNonComREm"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "awardNonCompliance",
                          "Award Non Compliance Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "awardNonCompliance",
                        //   heading: "Award Non Compliance Reminder mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("awardNonCompliance");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">
                      Non-Responsive Reminder mail:-
                    </label>
                    <button
                      id="othActNonResRemM"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "nonResponsive",
                          "Non-Responsive Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "nonResponsive",
                        //   heading: "Non-Responsive Reminder mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("nonResponsive");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">
                      Out of Reach Reminder mail:-
                    </label>
                    <button
                      id="othActRemMailMod"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "outOfReach",
                          "Out of Reach Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "outOfReach",
                        //   heading: "Out of Reach Reminder mail",
                        //   formType:"Single"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("outOfReach");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {reminderMailForm.frequency === "Multiple" ? (
              <div className="container mt-5 shadow pt-4 pl-5 pb-5">
                <h4>Generate Multiple Reminder Mail</h4>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">
                      Multiple Mailing Reminder:-
                    </label>
                    <button
                      id="othActMulMailRem"
                      className="btn btn-primary"
                      onClick={handlemulMailRemClick}
                    >
                      UPDATE
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">
                      Form 6a Multiple Reminder mail:-
                    </label>
                    <button
                      id="othAct6AMulBtn"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "form6A",
                          "Form 6A Multiple Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "form6A",
                        //   heading: "Form 6A Multiple Reminder mail",
                        //   formType:"Multi"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("form6A");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">
                      Hearing Date Multiple Reminder mail:-
                    </label>
                    <button
                      id="othActHeaDt"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "hearingDate",
                          "Hearing Date Multiple Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "hearingDate",
                        //   heading: "Hearing Date Multiple Reminder mail",
                        //   formType:"Multi"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("hearingDate");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">
                      Reward date and type Multiple Reminder mail:-{" "}
                    </label>
                    <button
                      id="othActReqDt"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "rewardDate",
                          "Reward date and type Multiple Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "rewardDate",
                        //   heading:
                        //     "Reward date and type Multiple Reminder mail",
                        //     formType:"Multi"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("rewardDate");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-sm-6">
                    <label className="d-block">
                      Non Responsive Multiple Reminder mail:-
                    </label>
                    <button
                      id="othActNonRemMul"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "nonResponsive",
                          "Non Responsive Multiple Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "nonResponsive",
                        //   heading: "Non Responsive Multiple Reminder mail",
                        //   formType:"Multi"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("nonResponsive");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <label className="d-block">
                      Out Of Reach Multiple Reminder mail:-
                    </label>
                    <button
                      id="othActBtnOutMul"
                      className="btn btn-primary"
                      onClick={() => {
                        openRemMailModal(
                          "outOfReach",
                          "Out of Reach Multiple Reminder mail"
                        );
                        // setgetMailTemplateForm({
                        //   ...getMailTemplateForm,
                        //   type: "outOfReach",
                        //   heading: "Out of Reach Multiple Reminder mail",
                        //   formType:"Multi"
                        // });
                        // setopenMailTemplateModal(true);
                        // handleGetTemplateClick("outOfReach");
                      }}
                    >
                      UPDATE AND SEND
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="my-4">
              <h3 className="mb-3">
                IGMS / Ombudsman Award and Ombudsman requirement Documents
                Upload
              </h3>
              <Button
                id="othActUploadBtn"
                color="warning"
                onClick={() => {
                  setDocumentUploadModal(true);
                  selectedDocFunc();
                }}
              >
                Upload Documents
              </Button>
              <FormGroup>
                {/* Document Upload Modal */}
                <Modal
                  isOpen={documentUploadModal}
                  toggle={() => setDocumentUploadModal(!documentUploadModal)}
                >
                  <div className="d-flex w-100 justify-content-between p-4 border-bottom">
                    <h2 className="mb-0 ml-3">Document Uploads</h2>
                    <div
                      onClick={() => setDocumentUploadModal(false)}
                      style={{ fontSize: "22px", marginRight: "20px" }}
                    >
                      <i className="simple-icon-close" />
                    </div>
                  </div>
                  <ModalBody>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-10">
                          {selectedDocArr.length ? (
                            selectedDocArr?.map((res, i) => {
                              return (
                                <h4>
                                  {i}.{" "}
                                  <a
                                    id={`othActDoc${i}`}
                                    href={`https://staging-insa.s3.ap-south-1.amazonaws.com/upload/lead_docs/${items._id}/${res}`}
                                    target="_blank"
                                  ></a>
                                </h4>
                              );
                            })
                          ) : (
                            <h4>No Uploaded Doc</h4>
                          )}
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  {/* <ModalBody>
                    <h3 className="text-muted text-thin">Lead ID : </h3>
                    <FormGroup className="my-3">
                      <Label for="companyresponse">
                        Company Response Documents :
                      </Label>
                      <Input
                        id="companyresponse"
                        name="companyResponseDoc"
                        type="file"
                      />
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="igms">IGMS Documents :</Label>
                      <Input id="igms" name="igmsDoc" type="file" />
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="awardrejected">
                        Award Rejected Documents :
                      </Label>
                      <Input
                        id="awardrejected"
                        name="awardRejectedDoc"
                        type="file"
                      />
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="ombudsman">
                        Ombudsman Requirement Documents :
                      </Label>
                      <Input id="ombudsman" name="ombudsmanDoc" type="file" />
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="courier">
                        Complaint form Courier Receipt :
                      </Label>
                      <Input
                        id="courier"
                        name="complaintCourierReceiptDoc"
                        type="file"
                      />
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="form6a">Form 6A Courier Receipt :</Label>
                      <Input
                        id="form6a"
                        name="form6aCourierReceiptDoc"
                        type="file"
                      />
                    </FormGroup>
                  </ModalBody> */}
                </Modal>
              </FormGroup>
            </div>
          </Colxx>
        </Row>
      </CardBody>

      <SetStatus
        isOpen={isSetStatusModal}
        onClose={onCloseStatusHistoryModal}
        insuranceId={complaintId}
      />

      <CancelRequest
        userId={userId}
        isOpen={isCancelReqModal}
        onClose={onCloseCancelRequestModal}
      />

      <AddComplaint
        isOpen={addComplaintModal}
        onClose={onCloseAddComplaintModal}
        userId={userId}
        leadId={leadId}
        details={items}
      />

      <AssignCompany
        isOpen={assignCompanyModal}
        onClose={onCloseAssignCompanyModal}
      />

      <RequestFromCustomer
        isOpen={reqFromCustomer}
        onClose={onCloseReqFromCustomer}
        details={items}
      />

      <AssignToOmb
        isOpen={assignToOMB}
        onClose={oncloseAssignToOmb}
        details={items}
      />

      <ReminderMail
        isOpen={openMailTemplateModal}
        getMailTemplateForm={getMailTemplateForm}
        onClose={() => setopenMailTemplateModal(!openMailTemplateModal)}
        mailData={mailData}
        details={items}
      />

      <ReminderTrackCom
        isOpen={ReminderTrack}
        onClose={() => {
          setReminderTrack(false);
        }}
        details={items}
      />

      <Modal
        isOpen={mulMailRemOpen.open}
        toggle={() => {
          setmulMailRemOpen({ ...mulMailRemOpen, open: false });
        }}
      >
        <ModalHeader>Mailing Reminder mail</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <label>Select Multiple Policies</label>
                <Select
                  id="othActMulPol"
                  isMulti
                  options={userBasedData}
                  onChange={(e) => {
                    setmulMailRemOpen({
                      ...mulMailRemOpen,
                      idArr: e.length ? e?.map((res) => res.value) : [],
                    });
                  }}
                ></Select>
              </div>
              <div className="col-sm-12 mt-4">
                <label>Select Template </label>
                <select
                  id="othActTemp"
                  className="form-control border-bold"
                  name="mailingTemplateSelect"
                  value={mulMailRemOpen.mailingTemplateSelect}
                  onChange={(e) => {
                    setmulMailRemOpen({
                      ...mulMailRemOpen,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option key={"temp1"} value="mailing_reminder">Template-1</option>
                  <option key={"temp2"} value="mailing_reminder2">Template-2</option>
                  <option key={"temp3"} value="mailing_reminder3">Template-3</option>
                </select>
              </div>
            </div>
            <div className="d-flex mt-4 justify-content-center">
              <button
                id="othActGenrBtn"
                className="btn btn-primary rounded px-4"
                onClick={generateMailRemFunc}
              >
                Generate
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Card>
  );
}
