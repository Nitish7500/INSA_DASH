import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import { tinyMceApiKey } from "constants/defaultValues";

function UpdateData({ updateData, setupdateData, complaint }) {
  const state = useSelector((state) => state.complaint);
  const dispatch = useDispatch();
  // console.log(state, complaint);

  const [sectionType, setsectionType] = useState("");
  const [idArray, setidArray] = useState([]);
  const customerCourtLoc = ["Mumbai", "Pune", "Chennai", "Delhi", "Banglore"];

  //   useEffect(() => {
  //     dispatch({type:"COMPLAINT_STATES"})
  //   },[complaint])

  const handleOptionBased = (e) => {
    dispatch({
      type: "COMPLAINANT_USER_DETAIL_HANDLE_COMPLAINT",
      state: {
        optionBasedData: e.target.value,
        id: complaint._id,
        status: complaint.status,
        userBasedId: complaint?.userId?._id,
      },
    });
  };

  const handleChangeSectionType = (e) => {
    let value = e.target.value;
    setsectionType(value);
    if (value === "statusSection") {
      dispatch({ type: "COMPLAINANT_GET_STATUS_BUCKET" });
    }
    if (value === "bulkAssignment") {
      dispatch({ type: "COMPLAINT_GET_ALL_INSA" });
    }
    if (value === "mailingSection") {
      dispatch({
        type: "COMPLAINANT_GET_POLICY_FOR_ESCALATION",
        state: { userId: complaint.userId?._id },
      });
    }
  };

  //---------------------> Status Section

  const [statusForm, setstatusForm] = useState({
    status: "",
    typeSection: sectionType,
    userEntryId: "",
    userId: complaint.userId?._id,
  });

  //--------------------------------> MAILING SECTION

  const isReqEditorRef = useRef(null);
  const isReqRevEditorRef = useRef(null);
  const isDraftEditorRef = useRef(null);
  const isAckEditorRef = useRef(null);
  const isResComEditorRef = useRef(null);
  const isRemEditorRef = useRef(null);
  const isEscEditorRef = useRef(null);
  const isResCom2EditorRef = useRef(null);
  const isRemSecEditorRef = useRef(null);
  const mailPointeditorRef = useRef(null);
  const mailEditoreditorRef = useRef(null);
  const [mailingSecObj, setmailingSecObj] = useState({});

  const handleMailingSecObj = (e, name) => {
    if (name === "escalationPolicyBucket") {
      let temp = e?.map((res) => {
        return res.value;
      });
      setmailingSecObj({ ...mailingSecObj, [name]: temp });
      return;
    }

    if (e.target.name === "escalationSharedBool") {
      setmailingSecObj({ ...mailingSecObj, [e.target.name]: e.target.checked });
      return;
    } else if (e.target.name === "draftSharedBool") {
      setmailingSecObj({ ...mailingSecObj, [e.target.name]: e.target.checked });
      return;
    } else {
      setmailingSecObj({ ...mailingSecObj, [e.target.name]: e.target.value });
    }
  };

  //------------------------------------> Doc Section Change

  const handleDocUploadSec = (e) => {
    const formData = new FormData();
    formData.set(e.target.name, e.target.files[0]);
    
    idArray?.map(res => {
        dispatch({
            type: "COMPLAINT_DOC_UPLOAD_GET_API",
            state: {
              id: res,
              file:formData,
            },
          });
    })

  };

  //--------------------------------> IGMS Section

  const [igmsObj, setigmsObj] = useState({
    IGMSLoginDOB: "",
    IGMS_Done: "",
    IGMS_Token: "",
    IGMS_date: "",
    escalation_date: "",
    igms_content: "",
    response_data2_igms: "",
    response_date_igms: "",
    response_date_igms1: "",
  });

  const handleChangeIGMS = (e) => {
    setigmsObj({ ...igmsObj, [e.target.name]: e.target.value });
  };

  //------------------------------------> Ombudsman Section

  const [ombudsmanObj, setombudsmanObj] = useState({});

  const handleombudsmanObjChange = (e) => {
    setombudsmanObj({ ...ombudsmanObj, [e.target.name]: e.target.value });
  };

  //------------------------------------> LEGAL SECTION

  const [legalSecObj, setlegalSecObj] = useState({});

  const handlelegalSecChange = (e) => {
    setlegalSecObj({
      ...legalSecObj,
      [`legalSection.${e.target.name}`]: e.target.value,
    });
  };

  const editorRef = useRef(null);

  //----------------------------------> Resolution Section

  const [resolutionSecObj, setresolutionSecObj] = useState({});

  const handleresolutionSecChange = (e) => {
    if (e.target.name === "avatar") {
      setresolutionSecObj({ ...resolutionSecObj, avatar: e.target.files[0] });
      return;
    } else {
      setresolutionSecObj({
        ...resolutionSecObj,
        [e.target.name]: e.target.value,
      });
    }
  };

  //-------------------------------------> Ombudsman Follow

  const [ombudsmanFollowObj, setombudsmanFollowObj] = useState({});

  //-------------------------------------> MAILING FOLLOW
  const [mailingFollowObj, setmailingFollowObj] = useState({});

  //--------------------------------------> BULK Assigment
  const [bulkAssignObj, setbulkAssignObj] = useState({});

  const handleSubmit = () => {
    // console.log({ ...statusForm, typeSection: sectionType });
    switch (sectionType) {
      case "statusSection":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: { ...statusForm, typeSection: sectionType, idArray },
        });
        break;

      case "mailingSection":
        const {
          escalationPolicyBucket: escalationPolicyBucket,
          escalation_first: escalation_first,
          ...rest
        } = mailingSecObj;
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            obj: {
              ...rest,
              draft_mail_send: isDraftEditorRef.current?.getContent(),
              acknowledgement_data: isAckEditorRef.current?.getContent(),
              escalationPoints: mailPointeditorRef.current?.getContent(),
              reminder_data1: isRemEditorRef.current?.getContent(),
              reminder_data2: isRemSecEditorRef.current?.getContent(),
              requirementData: isReqEditorRef.current?.getContent(),
              response_data1: isResComEditorRef.current?.getContent(),
              response_data2: isResCom2EditorRef.current?.getContent(),
              earlierMails: mailEditoreditorRef.current?.getContent(),
              requirementRevertedData: isReqRevEditorRef.current?.getContent(),
            },
            escalationData: {
              escalationPolicyBucket: escalationPolicyBucket
                ? escalationPolicyBucket
                : [],
              escalation_data: isEscEditorRef.current?.getContent(),
              escalation_first: escalation_first,
            },
            idArray,
            typeSection: sectionType,
            userId: complaint.userId?._id,
          },
        });
        break;

      case "docUploadSection":
        dispatch({type:"COMPLAINT_UPLOAD_MUL_USER_DATA",state:{
            idArray,
            typeSection:sectionType,
            userId:complaint.userId?._id
        }})
        break;

      case "igmsSection":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            insaUser: "",
            obj: igmsObj,
            typeSection: sectionType,
            idArray,
            userEntryId: "",
            userId: complaint?.userId?._id,
          },
        });
        break;

      case "ombudsmanSection":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            insaUser: "",
            obj: ombudsmanObj,
            typeSection: "ombudsmanSection",
            idArray,
            userEntryId: "",
            userId: complaint?.userId?._id,
          },
        });
        break;

      case "legalSection":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            idArray,
            legalData: {
              "legalSection.consumerCourtDate":
                legalSecObj["legalSection.consumerCourtDate"],
            },
            obj: {
              ...legalSecObj,
              "legalSection.legalCommentSection":
                editorRef.current?.getContent(),
            },
            typeSection: sectionType,
            userEntryId: "",
            userId: complaint.userId?._id,
          },
        });
        break;

      case "resolutionSection":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            idArray,
            insaUser: "",
            obj: resolutionSecObj,
            typeSection: sectionType,
            userEntryId: "",
            userId: complaint.userId._id,
          },
        });
        break;

      case "ombudsmanFollow":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            idArray,
            insaUser: "",
            omdDetails: {
              createdDate: moment().toISOString(),
              omdFollow: ombudsmanFollowObj,
              type: "Complaint-Omd-Follow",
              updatedOn: moment().toISOString(),
            },
            typeSection: sectionType,
            userEntryId: "",
            userId: complaint.userId._id,
          },
        });
        break;

      case "mailingFollow":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            idArray,
            mailingFollowDetails: {
              mailingFollow: mailingFollowObj,
              type: "Complaint-Mailing-Follow",
            },
            typeSection: sectionType,
            userEntryId: "",
            userId: complaint.userId._id,
            insaUser: "",
          },
        });
        break;

      case "bulkAssignment":
        dispatch({
          type: "COMPLAINANT_UPDATE_INFORMATION",
          state: {
            idArray,
            obj: { assignmentKey: bulkAssignObj.assignmentKey },
            insaUser: bulkAssignObj.insaUser,
            typeSection: sectionType,
          },
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Modal
        id="complaintUpdateDataModal"
        isOpen={updateData}
        toggle={() => {
          setupdateData(!updateData);
        }}
        size="xl"
      >
        <ModalHeader>Update Information</ModalHeader>
        <ModalBody>
          <div className="container">
            <div>
              <label>Select Format</label>
              <select
                name="optionBasedData"
                className="form-control border-bold"
                id="UpdateDetail1"
                onChange={handleOptionBased}
              >
                <option value={""}>Select Section</option>
                <option value="userWise">Policy Wise</option>
                <option value="nameWise">Name Wise</option>
                <option value="statusWise">Status Wise</option>
                <option value="companyWise">Company Wise</option>
                <option value="nameCompanyWise">Name And Company Wise</option>
              </select>
            </div>
            <div className="mt-3">
              <label>User Details Handle</label>
              <Select
                id="updateModal2"
                isMulti
                onChange={(e) => {
                  let x = e?.map((res) => {
                    return res.value;
                  });
                  setidArray(x);
                }}
                options={state.optionBasedData?.map((res) => {
                  return {
                    label: `${res.policyNumber} - ${res.userId?.name} - ${res.insuranceCompanyId?.name}`,
                    value: res._id,
                  };
                })}
              ></Select>
            </div>
            <div className="mt-4">
              <label>Select the Section</label>
              <select
                id="updateModal3"
                className="form-control border-bold"
                name="sectionType"
                onChange={handleChangeSectionType}
              >
                <option value={""}>Select Section</option>
                <option value="statusSection">Status Section</option>
                <option value="docUploadSection">
                  Document Upload Section
                </option>
                <option value="mailingSection">Mailing Section</option>
                <option value="igmsSection">IGMS Section</option>
                <option value="ombudsmanSection">Ombudsman Section</option>
                <option value="legalSection">Legal Section</option>
                <option value="resolutionSection">Resolution Section</option>
                <option value="ombudsmanFollow">Ombudsman Follow</option>
                <option value="mailingFollow">Mailing Follow</option>
                <option value={"bulkAssignment"}>Bulk Assignment</option>
              </select>
            </div>
            {sectionType ? (
              <>
                {sectionType === "statusSection" ? (
                  <div className="my-5 shadow p-5">
                    <h1>Status Section</h1>
                    <div>
                      <label>Select the Status</label>
                      <select
                        className="form-control border-bold"
                        name="status"
                        onChange={(e) => {
                          setstatusForm({
                            ...statusForm,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <option value={""}>Select Status</option>
                        {state.statusBucket?.map((res) => {
                          return <option value={res}>{res}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                ) : null}
                {sectionType === "docUploadSection" ? (
                  <div className="mt-4">
                    <h1>Doc Upload Section</h1>
                    <div className="container">
                      <div>
                        <label className="font-weight-bold">
                          Company Response Document
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile01"
                              name="CompanyResponse"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          IGMS Documents
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile02"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          Award Rejected Documents:
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile03"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          Ombudsman Requirement Documents
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile04"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          Complaint form Courier Receipt:
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile05"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          Form 6A Courier Receipt:
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile06"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          Ombudsman Requiremnt Document:
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile07"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="mt-3">
                        <label className="font-weight-bold">
                          Form 6A Document:
                        </label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              onChange={handleDocUploadSec}
                              class="custom-file-input"
                              id="inputGroupFile08"
                              name="IGMSdoc"
                              aria-describedby="inputGroupFileAddon01"
                            />
                            <label
                              class="custom-file-label"
                              for="inputGroupFile01"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "mailingSection" ? (
                  <div className="shadow mt-3 pt-4 px-2">
                    {/* <h1>MAILING SECTION</h1> */}
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4">
                          <label>Customer ID is Register</label>
                          <select
                            name="service_id"
                            className="form-control border-bold"
                            id="mailingSection01"
                            onChange={handleMailingSecObj}
                          >
                            <option value={""}>Select </option>
                            <option value={"Yes"}>Yes</option>
                            <option value={"No"}>No</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <label>Complaint Number</label>
                          <input
                            name="complaint_number"
                            className="form-control border-bold"
                            id="mailingSection02"
                            type={"text"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Complaint Date</label>
                          <input
                            name="complaint_date"
                            id="mailingSection03"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>First Response Date from Company</label>
                          <input
                            id="mailingSection0"
                            name="response_date"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Escalation Date Sent to Company</label>
                          <input
                            name="complaint_escalation_date"
                            id="mailingSection05"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Second Response Date from Company</label>
                          <input
                            name="response_date_company"
                            id="mailingSection06"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Requirement Reverted Date</label>
                          <input
                            name="requirementRevertedDate"
                            id="mailingSection7"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Reminder Sent Date</label>
                          <input
                            name="requirementSentDate"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>First Response Type</label>

                          <select
                            name="firstResponseType"
                            className="form-control border-bold"
                            id="mailingSection8"
                            onChange={handleMailingSecObj}
                          >
                            <option value="Rejection">Rejection</option>
                            <option value="Requirement">Requirement</option>
                            <option value="No Response">No Response</option>
                            <option value="Resolution">Resolution</option>
                            <option value="Mail Id To Be Registered">
                              Mail Id To Be Registered
                            </option>
                          </select>
                        </div>

                        <div className="col-sm-4 mt-4">
                          <label>Requirement Raised Date</label>
                          <input
                            name="requirementRaisedDate"
                            id="mailingSection9"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Draft shared with the customer</label>
                          <input
                            name="draftSharedBool"
                            id="mailingSection10"
                            className="form-control border-bold"
                            type={"checkbox"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Escalation shared with the customer</label>
                          <input
                            name="escalationSharedBool"
                            id="mailingSection11"
                            className="form-control border-bold"
                            type={"checkbox"}
                            onChange={handleMailingSecObj}
                          />
                        </div>

                        <div className="col-sm-4 mt-4">
                          <label>Reminder Sent Date</label>
                          <input
                            name="reminderSentDate"
                            id="mailingSection12"
                            className="form-control border-bold"
                            type={"date"}
                            onChange={handleMailingSecObj}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Second Response Type</label>
                          <select
                            name="secondResponseType"
                            className="form-control border-bold"
                            id="mailingSection13"
                            onChange={handleMailingSecObj}
                          >
                            <option value="Rejection">Rejection</option>
                            <option value="Requirement">Requirement</option>
                            <option value="No Response">No Response</option>
                            <option value="Resolution">Resolution</option>
                            <option value="Mail Id To Be Registered">
                              Mail Id To Be Registered
                            </option>
                          </select>
                        </div>
                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>Requirement Mail Sent By Company</label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection14"
                                name="isRequirement"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.isRequirement === "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isReqEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>
                                Requirement Mail Revert Sent By Customer
                              </label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection15"
                                name="isRequirementReverted"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.isRequirementReverted == "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isReqRevEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>Draft Mail Sent by customer or Not</label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection16"
                                name="is_draft_mail_send"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.is_draft_mail_send === "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isDraftEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>Acknowledgement Received or Not</label>
                              <select
                                name="is_acknowledgement"
                                className="form-control border-bold"
                                id="mailingSection17"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.is_acknowledgement === "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isAckEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>First Response from Company</label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection18"
                                name="response_company"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.response_company === "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isResComEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>Reminder Mail Sent to Company</label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection19"
                                name="reminder_first"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.reminder_first ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isRemEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>First Escalation Sent or Not</label>
                              <select
                                name="escalation_first"
                                className="form-control border-bold"
                                id="mailingSection20"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.escalation_first === "Yes" ? (
                              <>
                                <div className="col-sm-4">
                                  <label>Select Policy For Escalation</label>
                                  <Select
                                    options={state.forEscalation}
                                    isMulti
                                    name="escalationPolicyBucket"
                                    onChange={(e) =>
                                      handleMailingSecObj(
                                        e,
                                        "escalationPolicyBucket"
                                      )
                                    }
                                    id="mailingsecForEscalation"
                                  ></Select>
                                </div>
                                <div className="col-sm-4">
                                  <Editor
                                    apiKey={tinyMceApiKey}
                                    onInit={(evt, editor) =>
                                      (isEscEditorRef.current = editor)
                                    }
                                    initialValue="<p></p>"
                                    init={{
                                      height: 500,
                                      menubar: false,
                                      plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                      ],
                                      toolbar:
                                        "undo redo | blocks | " +
                                        "bold italic forecolor | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | help",
                                      content_style:
                                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    }}
                                  />
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>Second Response from Company</label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection21"
                                name="response_company2"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.response_company2 === "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isResCom2EditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-sm-12 mt-4">
                          <div className="row">
                            <div className="col-sm-4">
                              <label>Reminder Mail Sent to Company</label>
                              <select
                                className="form-control border-bold"
                                id="mailingSection22"
                                name="reminder_second"
                                onChange={handleMailingSecObj}
                              >
                                <option value={""}>Select </option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                              </select>
                            </div>
                            {mailingSecObj.reminder_second === "Yes" ? (
                              <div className="col-sm-6">
                                <Editor
                                  apiKey={tinyMceApiKey}
                                  onInit={(evt, editor) =>
                                    (isRemSecEditorRef.current = editor)
                                  }
                                  initialValue="<p></p>"
                                  init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                          <div className="mt-4 col-sm-6">
                            <label>Earlier Mails Editor</label>
                            <Editor
                              apiKey={tinyMceApiKey}
                              onInit={(evt, editor) =>
                                (mailEditoreditorRef.current = editor)
                              }
                              initialValue="<p>This is the initial content of the editor.</p>"
                              init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                  "advlist",
                                  "autolink",
                                  "lists",
                                  "link",
                                  "image",
                                  "charmap",
                                  "preview",
                                  "anchor",
                                  "searchreplace",
                                  "visualblocks",
                                  "code",
                                  "fullscreen",
                                  "insertdatetime",
                                  "media",
                                  "table",
                                  "code",
                                  "help",
                                  "wordcount",
                                ],
                                toolbar:
                                  "undo redo | blocks | " +
                                  "bold italic forecolor | alignleft aligncenter " +
                                  "alignright alignjustify | bullist numlist outdent indent | " +
                                  "removeformat | help",
                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                              }}
                            />
                          </div>
                          <div className="mt-4 col-sm-6">
                            <label>Escalation Mail Points</label>
                            <Editor
                              apiKey={tinyMceApiKey}
                              onInit={(evt, editor) =>
                                (mailPointeditorRef.current = editor)
                              }
                              initialValue="<p>This is the initial content of the editor.</p>"
                              init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                  "advlist",
                                  "autolink",
                                  "lists",
                                  "link",
                                  "image",
                                  "charmap",
                                  "preview",
                                  "anchor",
                                  "searchreplace",
                                  "visualblocks",
                                  "code",
                                  "fullscreen",
                                  "insertdatetime",
                                  "media",
                                  "table",
                                  "code",
                                  "help",
                                  "wordcount",
                                ],
                                toolbar:
                                  "undo redo | blocks | " +
                                  "bold italic forecolor | alignleft aligncenter " +
                                  "alignright alignjustify | bullist numlist outdent indent | " +
                                  "removeformat | help",
                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "igmsSection" ? (
                  <div>
                    <h1>IGMS Section</h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4 mt-4">
                          <label>IGMS Token Number</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            type={"text"}
                            name="IGMS_Token"
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>IGMS Date</label>
                          <input
                            onChange={handleChangeIGMS}
                            id="mailingSection7"
                            className="form-control border-bold"
                            name="IGMS_date"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>IGMS Escalation Date</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            name="escalation_date"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>IGMS Login DOB</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            name="IGMSLoginDOB"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>First Response date from IGMS</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            name="response_date_igms"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4 mt-4">
                          <label>Second Response date from IGMS</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            name="response_date_igms1"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>IGMS Done By:</label>
                          <select
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            name="IGMS_Done"
                          >
                            <option value="">--Select--</option>
                            <option value="PAN-No">Pan No.</option>
                            <option value="Mobile-No">Mobile No.</option>
                            <option value="LandLine-No">Landline No.</option>
                            <option value="Voter-ID-No">
                              Voter ID card number
                            </option>
                            <option value="Ration-Card-No">
                              Ration Card No.
                            </option>
                            <option value="Passport-No">Passport No.</option>
                            <option value="DOB">Date of Birth</option>
                          </select>
                        </div>
                        {igmsObj.IGMS_Done ? (
                          <div className="col-sm-4">
                            <label>{igmsObj.IGMS_Done}</label>
                            <input
                              className="form-control border-bold"
                              placeholder={igmsObj.IGMS_Done}
                              name="IGMS_No"
                              onChange={handleChangeIGMS}
                            />
                          </div>
                        ) : null}
                        <div className="col-sm-12 mt-4">
                          <label>IGMS Content</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            type={"text"}
                            name="igms_content"
                          />
                        </div>
                        <div className="col-sm-12 mt-4">
                          <label>Response Data From IGMS</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            type={"text"}
                            name="response_date_igms"
                          />
                        </div>
                        <div className="col-sm-12 mt-4">
                          <label>Second Response Data From IGMS</label>
                          <input
                            onChange={handleChangeIGMS}
                            className="form-control border-bold"
                            type={"text"}
                            name="response_data2_igms"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "ombudsmanSection" ? (
                  <div>
                    <h1>OMBUDSMAN Section</h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4">
                          <label>Ombudsman Complaint Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            placeholder="Ombudsman Complaint Date..."
                            name="ombudsman_c_date"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Complaint Courier Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="ombudsman_doc_date"
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Complaint Courier Number</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="courier_number_doc"
                            type={"text"}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Called Customer or Not</label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="call_form6A"
                          >
                            <option value={""}>Select</option>
                            <option value={"Yes"}>YES</option>
                            <option value={"No"}>NO</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <label>Form 6A Received or Not</label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="form6A_receive"
                          >
                            <option value={""}>Select</option>
                            <option value={"Yes"}>YES</option>
                            <option value={"No"}>NO</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <label>Form 6A Received Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="VIAFormUploadedDate"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Ombudsman Complaint Number</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="oc_number"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Form 6A submission date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="ombudsman_submit_date"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Form 6A Courier Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="courier_date"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Form 6A Courier Number</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="courier_number"
                          />
                        </div>

                        <div className="col-sm-4">
                          <label>Form 6A Received or Not</label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="stateName"
                          >
                            <option value={""}>Select State</option>
                            {state.states?.map((res) => {
                              return (
                                <option value={res.name}>{res.name}</option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="col-sm-4">
                          <label>Ombudsman Requirement sent date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="ombudsmanRequirementSentDate"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Called Customer or Not for Hearing date</label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="call_Hearing"
                          >
                            <option value={""}>Select</option>
                            <option value={"Yes"}>YES</option>
                            <option value={"No"}>NO</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <label>Hearing Date Received or Not</label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="hearing_receive"
                          >
                            <option value={""}>Select</option>
                            <option value={"Yes"}>YES</option>
                            <option value={"No"}>NO</option>
                          </select>
                        </div>
                        <div className="col-sm-4">
                          <label>Ombudsman Courier Number</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="ombudsmanCourierNumber"
                          />
                        </div>
                        <div className="col-sm-12 mt-3">
                          <span className="text-primary h6">
                            {" "}
                            Ombudsman hearing date and time{" "}
                          </span>
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>Date 1st</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="omb_first_date"
                          />
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>Date 2nd</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="omb_sec_date"
                          />
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>Complaint Form Pushed Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="complainFormSendDate"
                          />
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>Call between Expert and Customer Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="expert_customer_date"
                          />
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>
                            Called Customer or Not to Check Reward Status
                          </label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="check_status"
                          >
                            <option value={""}>Select</option>
                            <option value={"Yes"}>YES</option>
                            <option value={"No"}>NO</option>
                          </select>
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>Ombudsman Reward Date</label>
                          <input
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="omd_reward_date"
                          />
                        </div>

                        <div className="col-sm-4 mt-3">
                          <label>
                            Called Customer or Not to Check Reward Status
                          </label>
                          <select
                            onChange={handleombudsmanObjChange}
                            className="form-control border-bold"
                            name="rewardType"
                          >
                            <option value="">Select Type</option>
                            <option value="RefundAccepted">
                              Refund Accepted
                            </option>
                            <option value="SinglePayAccepted">
                              Single Pay Accepted
                            </option>
                            <option value="SinglePayAdditionalPayment">
                              Single Pay with additional Payment
                            </option>
                            <option value="SinglePaySomeRefund">
                              Single Pay with Some Refund
                            </option>
                            <option value="ClaimPayable">Claim Payable</option>
                            <option value="ClaimPayableInterest">
                              Claim Payable with Interest
                            </option>
                            <option value="ClaimRejected">
                              Claim is rejected
                            </option>
                            <option value="RefundRejected">
                              Refund is Rejected
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "legalSection" ? (
                  <div>
                    <h1>LEGAL Section</h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4 mt-3">
                          <label>Legal Notice</label>
                          <select
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            name="legal_notice"
                          >
                            <option value={""}>Select</option>
                            <option value={"Yes"}>YES</option>
                            <option value={"No"}>NO</option>
                          </select>
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Legal Notice Date</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="legal_notice_date"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Approx Fees</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="approxFees"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Courier Number of the Legal Notice</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="legal_notice_courier_number"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Legal Notice response received and date</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="legal_res_notice_date"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Consumer courts subsequent filing dates</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="C_court_filing_date"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Call to the customer(Date 1)</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="callCust1"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Call to the customer(Date 2)</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="callCust2"
                          />
                        </div>
                        <div className="col-sm-12 mt-3">
                          <span className="text-primary h5">
                            Consumer Court Hearing Date
                          </span>
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Court Date</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="consumerCourtDate"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Customer Court Location</label>
                          <select
                            className="form-control border-bold"
                            name="consumerCourtLocation"
                            onChange={handlelegalSecChange}
                          >
                            <option value={""}>Select Location</option>
                            {customerCourtLoc?.map((res) => {
                              return <option value={res}>{res}</option>;
                            })}
                          </select>
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Lawyer/ Law Firm Name</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="LawyerFirmName"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Lawyer/ Law Firm Number</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="LawyerFirmNumber"
                          />
                        </div>
                        <div className="col-sm-4 mt-3">
                          <label>Lawyer/ Law Firm Address</label>
                          <input
                            onChange={handlelegalSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="LawyerFirmAddress"
                          />
                        </div>
                        <div className="mt-4 col-sm-12">
                          <Editor
                            apiKey={tinyMceApiKey}
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                              height: 500,
                              menubar: false,
                              plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                              ],
                              toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "resolutionSection" ? (
                  <div className="shadow mt-3 py-3">
                    <h1 className="mt-3 ml-3">Resolution Section</h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-4">
                          <label>Resolution Date</label>
                          <input
                            onChange={handleresolutionSecChange}
                            className="form-control border-bold"
                            type={"date"}
                            name="resolutionDate"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Resolved Amount</label>
                          <input
                            onChange={handleresolutionSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="actualRefundAmount"
                          />
                        </div>
                        <div className="col-sm-4">
                          <label>Resolution Proof Type</label>
                          <input
                            onChange={handleresolutionSecChange}
                            className="form-control border-bold"
                            type={"text"}
                            name="resolutionProofType"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 mt-3">
                          <label>Resolution Proof</label>
                          <input
                            className="form-control border-bold"
                            type={"file"}
                            name="avatar"
                            onChange={handleresolutionSecChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 mt-3">
                          <label>Reward Type</label>
                          <select
                            className="form-control border-bold"
                            onChange={handleresolutionSecChange}
                            name="rewardType"
                          >
                            <option value="">Select Type</option>
                            <option value="RefundAccepted">
                              Refund Accepted
                            </option>
                            <option value="SinglePayAccepted">
                              Single Pay Accepted
                            </option>
                            <option value="SinglePayAdditionalPayment">
                              Single Pay with additional Payment
                            </option>
                            <option value="SinglePaySomeRefund">
                              Single Pay with Some Refund
                            </option>
                            <option value="ClaimPayable">Claim Payable</option>
                            <option value="ClaimPayableInterest">
                              Claim Payable with Interest
                            </option>
                            <option value="ClaimRejected">
                              Claim is rejected
                            </option>
                            <option value="RefundRejected">
                              Refund is Rejected
                            </option>
                          </select>
                        </div>
                        {resolutionSecObj.rewardType === "RefundAccepted" ? (
                          <div className="col-sm-4 mt-3">
                            <label>Refund</label>
                            <input
                              className="form-control border-bold"
                              type={"text"}
                              name="refundSingleClaim"
                              onChange={handleresolutionSecChange}
                            />
                          </div>
                        ) : null}
                        {!["ClaimRejected", "", "RefundRejected"].includes(
                          resolutionSecObj?.rewardType
                        ) ? (
                          <>
                            <div className="col-sm-4 mt-3">
                              <label>
                                {resolutionSecObj.rewardType ===
                                "RefundAccepted"
                                  ? "Refund"
                                  : null}
                                {resolutionSecObj.rewardType ===
                                "SinglePayAccepted"
                                  ? "Single Pay"
                                  : null}
                                {resolutionSecObj.rewardType ===
                                "ClaimPayableInterest"
                                  ? "Claim"
                                  : null}
                                {resolutionSecObj.rewardType === "ClaimPayable"
                                  ? "Claim"
                                  : null}
                                {resolutionSecObj.rewardType ===
                                "SinglePayAdditionalPayment"
                                  ? "Single Pay"
                                  : null}
                                {resolutionSecObj.rewardType ===
                                "SinglePaySomeRefund"
                                  ? "Single Pay"
                                  : null}
                              </label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="refundSingleClaim"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                            {[
                              "SinglePayAdditionalPayment",
                              "SinglePaySomeRefund",
                              "ClaimPayableInterest",
                            ].includes(resolutionSecObj.rewardType) ? (
                              <div className="col-sm-4 mt-3">
                                <label>
                                  {resolutionSecObj.rewardType ===
                                  "SinglePayAdditionalPayment"
                                    ? "Additional Payment  "
                                    : null}
                                  {resolutionSecObj.rewardType ===
                                  "SinglePaySomeRefund"
                                    ? "Refund  "
                                    : null}
                                  {resolutionSecObj.rewardType ===
                                  "ClaimPayableInterest"
                                    ? "Interest  "
                                    : null}
                                </label>

                                <input
                                  className="form-control border-bold"
                                  type={"text"}
                                  name="paymentRefundInt"
                                  onChange={handleresolutionSecChange}
                                />
                              </div>
                            ) : null}
                          </>
                        ) : null}
                        {/* {resolutionSecObj.rewardType ===
                        "SinglePayAdditionalPayment" ? (
                          <>
                            <div className="col-sm-4 mt-3">
                              <label>Single Pay</label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="refundSingleClaim"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                            <div className="col-sm-4 mt-3">
                              <label>Additional Payment</label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="paymentRefundInt"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                          </>
                        ) : null}
                        {resolutionSecObj.rewardType ===
                        "SinglePaySomeRefund" ? (
                          <>
                            <div className="col-sm-4 mt-3">
                              <label>Single Pay</label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="refundSingleClaim"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                            <div className="col-sm-4 mt-3">
                              <label>Refund</label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="paymentRefundInt"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                          </>
                        ) : null}
                        {resolutionSecObj.rewardType === "ClaimPayable" ? (
                          <div className="col-sm-4 mt-3">
                            <label>Claim</label>
                            <input
                              className="form-control border-bold"
                              type={"text"}
                              name="refundSingleClaim"
                              onChange={handleresolutionSecChange}
                            />
                          </div>
                        ) : null}
                        {resolutionSecObj.rewardType ===
                        "ClaimPayableInterest" ? (
                          <>
                            <div className="col-sm-4 mt-3">
                              <label>Claim</label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="refundSingleClaim"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                            <div className="col-sm-4 mt-3">
                              <label>Interest</label>
                              <input
                                className="form-control border-bold"
                                type={"text"}
                                name="paymentRefundInt"
                                onChange={handleresolutionSecChange}
                              />
                            </div>
                          </>
                        ) : null} */}
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "ombudsmanFollow" ? (
                  <div>
                    <h1>OMBUDSMAN Follow Section</h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6 mt-3">
                          <label>Follow Date</label>
                          <input
                            type={"date"}
                            name="omdFollowDate"
                            className="form-control border-bold"
                            min={moment().format("YYYY-MM-DD")}
                            onChange={(e) => {
                              setombudsmanFollowObj({
                                ...ombudsmanFollowObj,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="col-sm-6 mt-3">
                          <label>Follow Date</label>
                          <textarea
                            rows={2}
                            type={"text"}
                            name="omdFollowComment"
                            className="form-control border-bold"
                            onChange={(e) => {
                              setombudsmanFollowObj({
                                ...ombudsmanFollowObj,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "mailingFollow" ? (
                  <div>
                    <h1>MAILING Follow Section</h1>
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6 mt-3">
                          <label>Last Follow Date</label>
                          <input
                            name="mailingLastDate"
                            className="form-control border-bold"
                            onChange={(e) => {
                              setmailingFollowObj({
                                ...mailingFollowObj,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-6 mt-3">
                          <label>Next Follow Date</label>
                          <input
                            name="mailingNextDate"
                            className="form-control border-bold"
                            onChange={(e) => {
                              setmailingFollowObj({
                                ...mailingFollowObj,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            type={"date"}
                          />
                        </div>
                        <div className="col-sm-6 mt-3">
                          <label>Last Follow Date</label>
                          <textarea
                            name="mailingComment"
                            className="form-control border-bold"
                            onChange={(e) => {
                              setmailingFollowObj({
                                ...mailingFollowObj,
                                [e.target.name]: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {sectionType === "bulkAssignment" ? (
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-6 mt-3">
                        <label>Select The User</label>
                        <select
                          className="form-control border-bold"
                          name="insaUser"
                          onChange={(e) => {
                            setbulkAssignObj({
                              ...bulkAssignObj,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        >
                          <option value={""}>Select the User</option>
                          {state.allInsa?.map((res) => {
                            return (
                              <option value={res.user_id}>{res.name}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-sm-6 mt-3">
                        <label>Assignment To</label>
                        <select
                          className="form-control border-bold"
                          name="assignmentKey"
                          onChange={(e) => {
                            setbulkAssignObj({
                              ...bulkAssignObj,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        >
                          <option value={""}>Select Assignment</option>
                          <option value="assign_to">Assign To</option>
                          <option value="assignToCompanyIGMS">
                            Assign To Mailing Executive
                          </option>
                          <option value="assignToIGMS">Assign To IGMS</option>
                          <option value="assignToOmbudsman">
                            Assign To Ombudsman
                          </option>
                          <option value="assignToOmbudsmanHead">
                            Assign To Ombudsman Head
                          </option>
                          <option value="assign_to_legalExpert">
                            Assign To Legal Expert
                          </option>
                          <option value="assign_to_expert">
                            Assign To Expert
                          </option>
                          <option value="assignToLegalExecutive">
                            Assign To Legal Executive
                          </option>
                          <option value="assigned_internal_legal_executive">
                            Assign To Internal Legal Advocate
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            ) : null}
            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-danger rounded py-2 px-5 mr-2"
                onClick={() => setupdateData(false)}
              >
                CLOSE
              </button>
              <button
                className="btn btn-primary rounded py-2 px-5"
                onClick={handleSubmit}
              >
                UPDATE
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UpdateData;
