//mailing section nested form

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
  complaintDelayReason,
  firstResponseType,
  isAcknowledgementReceived,
  isCustomerIDRegistered,
  isDraftSentByCustomer,
  isFirstEscalationSent,
  isFirstReminderMailSentToCompany,
  isFirstResponseFromCompany,
  isRequirementMailRevert,
  isRequirementMailSent,
  isSecondReminderMailSentToCompany,
  isSecondResponseFromCompany,
  secondResponseType,
} from "constants/formValues";
import { Editor } from "@tinymce/tinymce-react";
import { tinyMceApiKey } from "constants/defaultValues";
import { useQuery } from "hooks/useQuery";
import { formatDate } from "helpers/CommonHelper";
import moment from "moment";

export default function MailingSectionForm({
  earlierMailsRef,
  escalationPointsRef,
  heading,
  details,
  complaintId,
  handleFormChange,
}) {
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // console.log(details);

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    values.preventDefault();
    const payload = {
      ...values,
      reactSelect: values.reactSelect.map((t) => t.value),
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  // destructuring the required keys from API response draftSharedBool
  const {
    complaint_date,
    response_date,
    complaint_escalation_date,
    requirementRaisedDate,
    requirementRevertedDate,
    requirementSentDate,
    response_date_company,
    draftSharedDate,
    reminderSentDate,
  } = details;
  console.log(
    "===============================>",
    moment(complaint_escalation_date).toISOString()
  );
  const complaintDate =
    complaint_date != undefined ? formatDate(complaint_date) : null;
  const firstResponseDateFromCompany =
    response_date != undefined ? formatDate(response_date) : null;
  const escalationDateSentToCompany =
    complaint_escalation_date != undefined
      ? new Date(complaint_escalation_date)
      : null;
  const reqRaisedDate =
    requirementRaisedDate != undefined
      ? formatDate(requirementRaisedDate)
      : null;
  const reqRevertedDate =
    requirementRevertedDate != undefined
      ? formatDate(requirementRevertedDate)
      : null;
  const firstReminderSentDate =
    firstReminderSentDate != undefined ? new Date(requirementSentDate) : null;
  const customerDraftSharedDate =
    customerDraftSharedDate != undefined ? new Date(draftSharedDate) : null;
  const secondResponseDateFromCompany =
    secondResponseDateFromCompany != undefined
      ? new Date(response_date_company)
      : null;
  const secondReminderSentDate =
    secondReminderSentDate != undefined ? new Date(reminderSentDate) : null;

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4">{heading}</h2>
        {console.log(details)}
        <div className="container mb-5 pb-5">
          <div className="row">
            <div className="col-sm-3">
              <label>Customer ID is Register</label>
              <select
                id="mailingCusReg"
                className="form-control"
                value={details.service_id}
                name="service_id"
                formControlName="service_id"
                onChange={handleFormChange}
              >
                <option value={""}> Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Complaint Number</label>
              <div className="input-group">
                <input
                  id="mailingComNo"
                  type="text"
                  className="form-control"
                  value={details.complaint_number}
                  name="complaint_number"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Choose Date Type -</label>
              <div className="input-group">
                <select
                  id="mailingdtType"
                  className="form-control"
                  value={details.selectDate}
                  name="selectDate"
                  formControlName="sample"
                >
                  <option value={""}>Select Type</option>
                  <option value="compDate">Complaint Date</option>
                  <option value="respDate">
                    First Response Date from Company
                  </option>
                  <option value="secRespDate">
                    Second Response Date from Company
                  </option>
                  <option value="compEsclDate">
                    Escalation Date Sent to Company
                  </option>
                  <option value="reqRaisedDate">Requirement Raised Date</option>
                  <option value="reqRevertDate">
                    Requirement Reverted Date
                  </option>
                  <option value="firstRemSentDate">
                    First Reminder Sent Date
                  </option>
                  <option value="secRemSentDate">
                    Second Reminder Sent Date
                  </option>
                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <label>First Response Date from Company</label>
              <div className="input-group">
                <input
                  id="mailingResDtCom"
                  type="date"
                  className="form-control"
                  value="caseone.response_date_company"
                  name="response_date_company"
                  onChange={handleFormChange}
                  placeholder="Response Date..."
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Escalation Date Sent to Company</label>
              <input
                id="mailingREsEscDt"
                type="date"
                className="form-control"
                value={details.complaint_escalation_date}
                name="complaint_escalation_date"
                onChange={handleFormChange}
                placeholder="Response Date..."
              />
            </div>
            <div className="col-sm-3">
              <label>Requirement Raised Date</label>
              <input
                id="mailingReqDate"
                type="date"
                className="form-control"
                value={details.requirementRaisedDate}
                name="requirementRaisedDate"
                onChange={handleFormChange}
                placeholder="Requirement Date..."
              />
            </div>
            <div className="col-sm-3">
              <label>Requirement Reverted Date</label>
              <input
                id="mailingReqRevDate"
                type="date"
                className="form-control"
                value={details.requirementRevertedDate}
                name="requirementRevertedDate"
                onChange={handleFormChange}
                placeholder="Requirement Date..."
              />
            </div>
            <div className="col-sm-3">
              <label>First Reminder Sent Date</label>
              <input
                id="mailingReqSentDt"
                type="date"
                className="form-control"
                value={details.requirementSentDate}
                name="requirementSentDate"
                onChange={handleFormChange}
                placeholder="Response Date..."
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Second Response Date from Company</label>
              <input
                id="mailingRemSentDate"
                type="date"
                className="form-control"
                value={details?.reminderSentDate}
                name="reminderSentDate"
                onChange={handleFormChange}
                placeholder="Requirement Date..."
              />
            </div>
            <div className="col-sm-3">
              <label>Draft Mail Sent by customer or Not</label>
              <select
                id="mailingDetailDraftSend"
                className="form-control"
                value={details.is_draft_mail_send}
                onChange={handleFormChange}
                name="is_draft_mail_send"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Draft shared with the customer</label>
              <div className="input-group">
                <input
                  id="mailingdraftShareBool"
                  type="checkbox"
                  name="draftSharedBool"
                  className="form-control"
                  onChange={handleFormChange}
                  value={details?.draftSharedBool}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Draft shared with the customer Date</label>
              <input
                id="mailingdftSharedDt"
                type="date"
                className="form-control"
                value={details?.draftSharedDate}
                name="draftSharedDate"
                //   onChange={handleFormChange}
                placeholder="Requirement Date..."
                disabled
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Requirement Mail Sent By Company</label>
              <select
                id="mailingisReq"
                className="form-control"
                value={details.isRequirement}
                name="isRequirement"
                onChange={handleFormChange}
              >
                <optio value={""}></optio>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Requirement Mail Revert Sent By Customer</label>
              <select
                id="mailingisReqRecv"
                className="form-control"
                value={details.isRequirementReverted}
                name="isRequirementReverted"
                onChange={handleFormChange}
              >
                <optio value={""}></optio>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <h4>First Response Data</h4>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <label>First Response from Company</label>
              <select
                id="mailingResComp"
                className="form-control"
                value={details.response_company}
                name="response_company"
                onChange={handleFormChange}
                disabled
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm3">
              <label>Reminder Mail Sent to Company</label>
              <select
                id="mailingremFst"
                className="form-control"
                value={details.reminder_first}
                name="reminder_first"
                onChange={handleFormChange}
              >
                <option value={""}></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Complaint delay reason</label>
              <select
                id="mailingComDelReason"
                className="form-control"
                value={details.complaintDelayReason}
                name="complaintDelayReason"
                onChange={handleFormChange}
              >
                <option value={""}>Select Delay Reason</option>
                <option value="Customer not responding">
                  Customer not responding
                </option>
                <option value="Customer responding but not doing the mail">
                  Customer responding but not doing the mail
                </option>
                <option value="Customer is not fulfilling the requirements raised by the company">
                  Customer is not fulfilling the requirements raised by the
                  company
                </option>
                <option value="Company/Hospital is not fulfilling the requirements.">
                  Company/Hospital is not fulfilling the requirements.
                </option>
                <option value="Customer is not fulfilling the requirements raised by the executive">
                  Customer is not fulfilling the requirements raised by the
                  executive
                </option>
                <option value="Not getting the approval from expert end">
                  Not getting the approval from expert end
                </option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>First Escalation Sent or Not</label>
              <select
                id="mailingEscFst"
                className="form-control"
                value={details.escalation_first}
                name="escalation_first"
                onChange={handleFormChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Escalation shared with the customer</label>
              <input
                id="mailingEscShrB"
                type="checkbox"
                name="escalationSharedBool"
                className="form-control"
                formControlName="escalationSharedBool"
                value={details.escalationSharedBool}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Requirement Mail Revert Sent By Customer</label>
              <select
                id="mailingisReqRev"
                className="form-control"
                value={details.isRequirementReverted}
                name="isRequirementReverted"
                onChange={handleFormChange}
              >
                <option value={""}></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <h4>Second Response Data</h4>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <label>Second Response from Company</label>
              <select
                id="mailingResComp2"
                className="form-control"
                value={details.response_company2}
                name="response_company2"
                onChange={handleFormChange}
                disabled
              >
                <option value={""}></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Reminder Mail Sent to Company</label>
              <select
                id="mailingRemSec"
                className="form-control"
                value={details.reminder_second}
                name="reminder_second"
                onChange={handleFormChange}
              >
                <option value={""}></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Reminder Sent Date</label>
              <input
                id="mailingRemSndDt"
                type="date"
                className="form-control"
                value={details.reminderSentDate}
                name="reminderSentDate"
                onChange={handleFormChange}
                placeholder="Requirement Date..."
              />
            </div>
            <div className="col-sm-12">
              <label>Escalation Mail Points</label>
              <Editor
                id="Editor01"
                apiKey={tinyMceApiKey}
                onInit={(evt, editor) => (escalationPointsRef.current = editor)}
                initialValue={details.escalationPoints}
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
            <div className="col-sm-12">
              <label>Escalation Mail Points</label>
              <Editor
                id="Editor02"
                apiKey={tinyMceApiKey}
                onInit={(evt, editor) => (earlierMailsRef.current = editor)}
                initialValue={details.earlierMails}
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
      </CardBody>
    </Card>
  );
}
