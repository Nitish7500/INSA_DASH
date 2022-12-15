//igms section nested form

import { Colxx } from "components/common/CustomBootstrap";
import {
  FormikCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikDatePicker,
  FormikReactSelect,
} from "containers/form-validations/FormikFields";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import {
  emailType,
  isRequirementReceived,
  movementOfCase,
  resolutionType,
  selectMultipleItems,
} from "constants/formValues";
import { faDownload, faDownLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tinymce/tinymce-react";
import { currentUser, tinyMceApiKey } from "constants/defaultValues";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchLead,
  getAllInsa,
  getFirstDraftData,
} from "services/complaints.services";

export default function SavedEmail({ heading, details }) {
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [firstDtaftData, setfirstDtaftData] = useState([]);
  const [leadDocs, setleadDocs] = useState([]);
  const [allInsa, setallInsa] = useState([]);
  let movementCasesData = [
    { value: "", label: "Select Movement Case" },
    { label: "Ombudsman", value: "Ombudsman" },
    { label: "Legal", value: "Legal" },
    { label: "Others", value: "Others" },
  ];
  let emailTypeData = [
    { label: "First Draft Mail", value: "First Draft Mail" },
    { label: "IGMS first entry", value: "IGMS first entry" },
    { label: "Escalation draft mail", value: "Response draft mail" },
    { label: "IGMS escalation entry", value: "IGMS escalation entry" },
    { label: "Others", value: "Others" },
  ];
  const [formData, setformData] = useState({
    case_id: details._id ? details._id : "",
    contentType: "SaveEmail",
    drafted_by: "",
    emailType: "",
    email_to: "",
    emaildata: "",
    expert: "",
    healthOrnot: "",
    leadFormDocumentsForEmail: [],
    legalExpert: "",
    movementOfCase: "",
    policy_number: "",
    subject: "",
    type: "insurance",
    uniqueIds: [],
    userAdminId: currentUser.data?.userType,
    user_id: details.userId?._id,
  });

  const state = useSelector((state) => state.complaint);
  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const getDraftMail = async () => {
    const { data } = await getFirstDraftData(details);
    let temp = data?.map((res) => {
      return {
        value: res._id,
        label: `${res.policyNumber} - ${res.name} - ${
          res.insuranceCompanyId && res.insuranceCompanyId["name"]
        }`,
      };
    });
    setfirstDtaftData(temp);
  };

  const fetchLeadId = async () => {
    const { data } = await fetchLead(details.leadId?._id);
    let temp = data[0]?.doc?.map((res) => {
      return { label: res, value: res };
    });
    setleadDocs(temp);
  };

  const getAllInsaFunc = async () => {
    const { data } = await getAllInsa();
    let temp = data?.map((res) => {
      return { label: res.name, value: res.user_id };
    });
    setallInsa(temp);
  };

  useEffect(() => {
    getDraftMail();
    fetchLeadId();
    getAllInsaFunc();
  }, []);

  // const onSubmit = (values, { setSubmitting }) => {
  //     const payload = {
  //       ...values,
  //       reactSelect: values.reactSelect.map((t) => t.value),
  //     };
  //     setTimeout(() => {
  //       console.log(JSON.stringify(payload, null, 2));
  //       setSubmitting(false);
  //     }, 1000);
  // };

  const handleChange = (e, name) => {
    if (name === "uniqueIds") {
      let temp = e?.map((x) => x.value);
      let pNum = e?.map((x) => {
        return x.label?.split(" - ")[1];
      });
      setformData({
        ...formData,
        uniqueIds: temp,
        policy_number: pNum?.join(","),
      });
    } else if (name === "leadFormDocumentsForEmail") {
      let temp = e?.map((res) => res.value);
      setformData({ ...formData, leadFormDocumentsForEmail: temp });
    } else if (name === "drafted_by") {
      setformData({ ...formData, drafted_by: e.value });
    } else {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    console.log(
      { ...formData, emaildata: editorRef.current.getContent() },
      details
    );
  };

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4">{heading}</h2>
        <div className="container mt-4">
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Select Multiple Complaints</label>
              <Select
                isMulti
                options={firstDtaftData}
                onChange={(e) => handleChange(e, "uniqueIds")}
              ></Select>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Select Multiple Documents</label>
              <Select
                isMulti
                options={leadDocs}
                onChange={(e) => {
                  handleChange(e, "leadFormDocumentsForEmail");
                }}
              ></Select>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Draft Mail Done By</label>
              <Select
                options={allInsa}
                onChange={(e) => handleChange(e, "drafted_by")}
              ></Select>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Movement Of Case</label>
              <Select
                options={movementCasesData}
                onChange={(e) => {
                  setformData({ ...formData, movementOfCase: e.value });
                }}
              ></Select>
              {/* <select
                        class="form-control form-control-sm"
                        name="movementOfCase"
                            // ="movementOfCase"
                      >
                        <option value="Ombudsman">
                          Ombudsman
                        </option>
                        <option value="Legal">
                          Legal
                        </option>
                        <option value="Others">Others</option>
                      </select> */}
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Email To</label>
              <input
                className="form-control border-bold"
                type={"email"}
                name="email_to"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Email CC</label>
              <input
                name="email_cc"
                className="form-control border-bold"
                type={"email"}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Email type</label>
              <Select
                options={emailTypeData}
                onChange={(e) => {
                  setformData({ ...formData, emailType: e.value });
                }}
              ></Select>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Subject</label>
              <input
                name="subject"
                className="form-control border-bold"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-sm-10">
              <label>Email Message</label>
              <Editor
                apiKey={tinyMceApiKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={formData.emaildata}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Work Sans,Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
