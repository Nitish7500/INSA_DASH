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
  isLegalNotice,
  isRequirementReceived,
  consumerCourtLocations,
  isLegalNoticeOptions,
} from "constants/formValues";
import { faDownload, faDownLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tinymce/tinymce-react";
import logs from "data/logs";
import { tinyMceApiKey } from "constants/defaultValues";
import { formatDate } from "helpers/CommonHelper";
import { date } from "yup/lib/locale";

export default function LegalForm({
  heading,
  details,
  complaintId,
  handleFormChange,
  legalCommentSectionRef,
  legalPointsByExpertRef,
}) {
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [courtHearingDCount, setcourtHearingDCount] = useState([]);

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

  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const {} = details;
  const {
    legal_notice,
    legal_notice_date,
    approxFees,
    consumerCourtLocation,
    sendNoticeReminderOrNot,
    LawyerFirmNumber,
    legal_notice_courier_number,
    legal_res_notice_date,
    LawyerFirmName,
    callCust1,
    caseTitle,
    C_court_filing_date,
    callCust2,
    LawyerFirmAddress,
    caseFileNumber,
    caseNumber,
  } = details.legalSection;

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4">{heading}</h2>
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-4">
                  <label>Legal Notice</label>
                  <select
                    className="form-control"
                    value={details.legalSection.legal_notice}
                    name="legal_notice"
                    onChange={handleFormChange}
                  >
                    <option key={"yes"} value="Yes">Yes</option>
                    <option key={"no"} value="No">No</option>
                  </select>
                </div>

                <div className="col-sm-4">
                  <label>Courier Number of the Legal Notice</label>
                  <input
                    type="text"
                    className="form-control"
                    value={details.legalSection?.legal_notice_courier_number}
                    name="legal_notice_courier_number"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Consumer courts subsequent filing dates</label>
                  <input
                    type="date"
                    className="form-control"
                    value={details.legalSection.C_court_filing_date}
                    name="C_court_filing_date"
                    onChange={handleFormChange}
                    placeholder="Consumer courts subsequent filing dates..."
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4">
                  <label>Legal Notice Date</label>
                  <input
                    id="legalNoticDt"
                    type={"date"}
                    name="legal_notice_date"
                    className="form-control"
                    value={details.legalSection?.legal_notice_date}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Legal Notice response received and date</label>
                  <input
                    id="legalRecDate"
                    type="date"
                    className="form-control"
                    value={details.legalSection.legal_res_notice_date}
                    name="legal_res_notice_date"
                    onChange={handleFormChange}
                    placeholder="Legal Notice response received and date..."
                  />
                </div>
                <div className="col-sm-4">
                  <label>Call to the customer(Date 2)</label>
                  <input
                    id="legalCallDt2"
                    type="date"
                    className="form-control"
                    value={details.legalSection.callCust2}
                    name="callCust2"
                    onChange={handleFormChange}
                    placeholder="Call to the Customer date 2..."
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4">
                  <label>Approx Fees</label>
                  <input
                    id="legalApproxFee"
                    type="text"
                    className="form-control"
                    value={details.legalSection.approxFees}
                    name="approxFees"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Call to the customer(Date 1)</label>
                  <input
                    id="legalCallDt1"
                    type="date"
                    className="form-control"
                    value={details.legalSection.callCust1}
                    name="callCust1"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Lawyer/ Law Firm Address</label>
                  <input
                    id="legalLawer"
                    type="text"
                    className="form-control"
                    value={details.legalSection.LawyerFirmAddress}
                    name="LawyerFirmAddress"
                    onChange={handleFormChange}
                    placeholder="LawyerFirmAddress"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4">
                  <label className="">Consumer Court Location</label>
                  <select
                    id="legalCusLoc"
                    name="consumerCourtLocation"
                    className="form-control"
                    value={details.legalSection.consumerCourtLocation}
                    onChange={handleFormChange}
                  >
                    {consumerCourtLocations.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-4">
                  <label>Lawyer/ Law Firm Number</label>
                  <input
                    id="legalLawerFNo"
                    type="text"
                    className="form-control"
                    value={details.legalSection.LawyerFirmNumber}
                    name="LawyerFirmNumber"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Case File Number</label>
                  <input
                    id="legalCaseFNo"
                    type="text"
                    className="form-control"
                    value={details.legalSection.caseFileNumber}
                    name="caseFileNumber"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4">
                  <label>Lawyer/ Law Firm Name</label>
                  <input
                    id="legalFName"
                    type="text"
                    className="form-control"
                    value={details.legalSection.LawyerFirmName}
                    name="LawyerFirmName"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Case Title</label>
                  <input
                    id="legalCaseTitle"
                    type="text"
                    className="form-control"
                    value={details.legalSection.caseTitle}
                    name="caseTitle"
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Case Number</label>
                  <input
                    id="legalCaseNo"
                    type="text"
                    className="form-control"
                    value={details.legalSection.caseNumber}
                    name="caseNumber"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4">
                  <label>Notice Reminder</label>
                  <input
                    id="legalNoticNo"
                    type="checkbox"
                    name="sendNoticeReminderOrNot"
                    className="form-control"
                    onChange={handleFormChange}
                    checked={details.legalSection.sendNoticeReminderOrNot}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <label>
                Consumer Court Hearing Date{" "}
                <button
                  id="legalHearingDt"
                  className="btn btn-warning sm p-0 px-1"
                  onClick={() => {
                    setcourtHearingDCount([...courtHearingDCount, 1]);
                  }}
                >
                  Add
                </button>
                <button
                  id="legalDltBtn"
                  className="btn btn-warning sm p-0 px-1"
                  onClick={() => {
                    courtHearingDCount.length > 0 &&
                      setcourtHearingDCount(
                        courtHearingDCount.slice(
                          0,
                          courtHearingDCount.length - 1
                        )
                      );
                  }}
                >
                  Delete
                </button>
              </label>
              {courtHearingDCount?.map((res) => {
                return (
                  <input
                    id="legalCusCourtDt"
                    type="date"
                    className="form-control"
                    name="consumerCourtDate"
                    onChange={handleFormChange}
                  />
                );
              })}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12">
              <label className="d-block">
                Legal Important Points (Comment Section)
              </label>
              <Editor
                id="legalEditor"
                apiKey={tinyMceApiKey}
                onInit={(evt, editor) =>
                  (legalCommentSectionRef.current = editor)
                }
                initialValue={details.legalSection?.legalCommentSection}
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
            <div className="col-sm-12">
              <label className="d-block">Legal Points By Experts</label>
              <Editor
                id="legalMail2"
                apiKey={tinyMceApiKey}
                onInit={(evt, editor) =>
                  (legalPointsByExpertRef.current = editor)
                }
                initialValue={details.legalSection?.legalPointsByExpert}
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
      </CardBody>
    </Card>
  );
}
