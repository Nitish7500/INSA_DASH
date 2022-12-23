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
  calledCustForRewardStatus,
  hearingCommentValues,
  ombudsmanLocation,
  ombudsmanPendingReasonValues,
  resolutionType,
} from "constants/formValues";
import { Editor } from "@tinymce/tinymce-react";
import { date } from "yup/lib/locale";
import { tinyMceApiKey } from "constants/defaultValues";
import { useEffect } from "react";

export default function OmbudsmanForm({
  heading,
  details,
  complaintId,
  handleFormChange,
  hearing_pointsRef,
  setcomCurNumArr,
  setcomCurDateArr,
}) {
  const [documentUploadModal, setDocumentUploadModal] = useState(false);
  const [comCouCount, setcomCouCount] = useState([1]);
  const [comCurNumForm, setcomCurNumForm] = useState({});
  const [comCurDate, setcomCurDate] = useState([1]);
  const [comCurDateForm, setcomCurDateForm] = useState({});

  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log({ hearing_points: editorRef.current.getContent() });
    }
  };

  useEffect(() => {
    let temp = Object.values(comCurNumForm)?.filter((x) => {
      return x;
    });
    temp = temp.slice(0, comCouCount.length);
    console.log(temp);
    setcomCurNumArr(temp);
  }, [comCurNumForm, comCouCount]);

  useEffect(() => {
    let temp = Object.values(comCurDateForm)?.filter((x) => {
      return x;
    });
    temp = temp.slice(0, comCurDate.length);
    console.log(temp);
    setcomCurDateArr(temp);
  }, [comCurDate]);

  const {
    ombudsman_c_date,
    courier_number_doc,
    omdNonComplianceDate,
    courier_date,
    courierNumberDocArr,
    complainFormSendDate,
    form6ASendDate,
    VIAFormUploadedDate,
    ombudsman_submit_date,
    ombudsman_doc_date,
    courier_number,
    form6AMail,
    stateName,
    omb_first_date,
    omb_sec_date,
    expert_customer_date,
    hearingComment,
    check_status,
    omd_reward_date,
    refundSingleClaim,
    paymentRefundInt,
    rewardType,
    hearing_points,
    ombudsmanPendingReasonListing,
    ombudsmanPendingReason,
    oc_number,
  } = details;

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4">{heading}</h2>
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-4">
                  <label>Ombudsman Complaint Date</label>
                  <input
                    id="OmbFrmComDate"
                    type="date"
                    className="form-control"
                    value={details.ombudsman_c_date}
                    name="ombudsman_c_date"
                    placeholder="Ombudsman Complaint Date..."
                    disabled
                  />
                </div>
                <div className="col-sm-4">
                  <label>Complaint Courier Recent Date</label>
                  <div className="input-group">
                    <input
                      id="OmbFrmComCurRecDate"
                      type="date"
                      className="form-control"
                      value={details.ombudsman_doc_date}
                      name="ombudsman_doc_date"
                      onChange={handleFormChange}
                      placeholder="Ombudsman Doucment Send Date..."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label>Complaint Courier Recent Number</label>
                  <input
                    id="OmbFrmComCurRecNo"
                    type="text"
                    className="form-control"
                    value={details.courier_number_doc}
                    name="courier_number_doc"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="row mt-4 pt-5">
                <div className="col-sm-4">
                  <label>Complaint Form Pushed Date</label>
                  <div className="input-group">
                    <input
                      id="OmbFrmComFormPushedDt"
                      type="date"
                      className="form-control"
                      value={details.complainFormSendDate}
                      name="complainFormSendDate"
                      onChange={handleFormChange}
                      placeholder="Complaint Form Send Date..."
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label>Complaint Courier Numbers</label>
                  <br />
                  {comCouCount?.map((res, i) => {
                    return (
                      <input
                        id={`OmbFrmComCurNoBtn${i}`}
                        className="form-control"
                        name={`courierNumberDocArr${i}`}
                        value={comCurNumForm[`courierNumberDocArr${i}`]}
                        onChange={(e) => {
                          setcomCurNumForm({
                            ...comCurNumForm,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        // onBlur={handleComCurNum}
                      />
                    );
                  })}
                  <button
                    id="OmbFrmComCurNoBtn"
                    type="button"
                    className="btn btn-secondary btn-sm m-2  py-0 px-1"
                    onClick={() => {
                      setcomCouCount([...comCouCount, +comCouCount + 1]);
                    }}
                  >
                    Add
                  </button>
                  <button
                    id="OmbFrmComCurBtnDel"
                    type="button"
                    className="btn btn-danger btn-sm m-2 py-0 px-1"
                    onClick={() => {
                      setcomCouCount(
                        comCouCount.length > 1
                          ? comCouCount?.slice(0, comCouCount.length - 1)
                          : [1]
                      );
                    }}
                  >
                    Del
                  </button>
                </div>
                <div className="col-sm-4">
                  <label>Ombudsman Complaint Number</label>
                  <div className="input-group">
                    <input
                      id="OmbFrmOmbComNo"
                      type="text"
                      className="form-control"
                      value={details.oc_number}
                      name="oc_number"
                      formControlName="oc_number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="row">
                <div className="col-sm-12">
                  <label className="mr-4">
                    Complaint Courier Date / Ombudsman Requirement sent date
                  </label>
                  {comCurDate?.map((res, i) => {
                    return (
                      <input
                        id="OmbFrmCompCurDt"
                        className="form-control"
                        type={"date"}
                        name={`consumerCourtDate${i}`}
                        value={comCurDateForm[`consumerCourtDate${i}`]}
                        onChange={(e) => {
                          setcomCurDateForm({
                            ...comCurDateForm,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    );
                  })}
                  <button
                    id="OmbFrmComCurDateBtn"
                    type="button"
                    className="btn btn-secondary btn-sm m-2 py-0 px-1"
                    onClick={() => {
                      setcomCurDate([...comCurDate, +comCurDate + 1]);
                    }}
                  >
                    Add
                  </button>
                  <button
                    id="OmbFrmComCurDateBtnDel"
                    type="button"
                    className="btn btn-danger btn-sm m-2 py-0 px-1"
                    onClick={() => {
                      setcomCurDate(
                        comCurDate.length > 1
                          ? comCurDate?.slice(0, comCurDate.length - 1)
                          : [1]
                      );
                    }}
                  >
                    Del
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <h4>Form 6A Data</h4>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <label>Form 6A Pushed Date</label>
              <input
                id="OmbFrm6APushedDt"
                type="date"
                className="form-control"
                value={details.form6APushedDate}
                name="form6APushedDate"
                onChange={handleFormChange}
                placeholder="Form 6A Pushed Date..."
              />
            </div>
            <div className="col-sm-3">
              <label>Form 6A Received Date</label>
              <input
                id="OmbFrm6ARecDt"
                type="date"
                className="form-control"
                value={details.VIAFormUploadedDate}
                name="VIAFormUploadedDate"
                onChange={handleFormChange}
                placeholder="Form 6A Received Date..."
              />
            </div>
            <div className="col-sm-3">
              <label>Form 6A submission date</label>
              <input
                id="OmbFrm6ASubbDt"
                type="date"
                className="form-control"
                value={details.ombudsman_submit_date}
                name="ombudsman_submit_date"
                onChange={handleFormChange}
                placeholder="Ombudsman date of submission of the form..."
              />
            </div>
            <div className="col-sm-3">
              <label>Form 6A Courier Date</label>
              <input
                id="OmbFrm6ACurDate"
                type="date"
                className="form-control"
                value={details.courier_date}
                name="courier_date"
                onChange={handleFormChange}
                formControlName="courier_date"
                disabled
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Form 6A Courier Number</label>
              <input
                id="OmbFrm6ACurNo"
                type="text"
                className="form-control"
                value={details.courier_number}
                name="courier_number"
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3 d-flex">
              <label>Form 6A through mail</label>
              <div className="ml-3 mt-1">
                <input
                  id="OmbFrm6AThrMail"
                  type="checkbox"
                  name="form6AMail"
                  className="form-control"
                  onChange={handleFormChange}
                  checked={details.form6AMail}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Ombudsman Location</label>
              <select
                id="OmbFrmObmLoc"
                type="text"
                className="form-control"
                formControlName="stateName"
                value={details.stateName}
              >
                {ombudsmanLocation.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-sm-3">
              <label>Ombudsman Requirement Sent Recent Date</label>
              <input
                id="ombReqSentRecDate"
                type="date"
                className="form-control"
                value={details.ombudsmanRequirementSentDate}
                onChange={handleFormChange}
                name="ombudsmanRequirementSentDate"
              />
            </div>
            {/* <div className="col-sm-3">
              <label className="mr-4">Ombudsman Requirement sent date</label>
              <button
                id="OmbFrmComCurDateBtn"
                type="button"
                className="btn btn-secondary btn-sm m-2 py-0 px-1"
                onClick={() => {
                  setcomCurDate([...comCurDate, +comCurDate + 1]);
                }}
              >
                Add
              </button>
              <button
                id="OmbFrmComCurDateBtnDel"
                type="button"
                className="btn btn-danger btn-sm m-2 py-0 px-1"
                onClick={() => {
                  setcomCurDate(
                    comCurDate.length > 1
                      ? comCurDate?.slice(0, comCurDate.length - 1)
                      : [1]
                  );
                }}
              >
                Del
              </button>
              {comCurDate?.map((res, i) => {
                return (
                  <input
                    id="OmbFrmCompCurDt"
                    className="form-control"
                    type={"date"}
                    name={`consumerCourtDate${i}`}
                    value={comCurDateForm[`consumerCourtDate${i}`]}
                    onChange={(e) => {
                      setcomCurDateForm({
                        ...comCurDateForm,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                );
              })}
            </div> */}
            <div className="col-sm-3">
              <label>Ombudsman Courier Number</label>
              <input
                id="ombudsmanCourierNumber"
                type="text"
                className="form-control"
                value={details.ombudsmanCourierNumber}
                name="ombudsmanCourierNumber"
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Ombudsman Requirement Pushed Date</label>
              <input
                id="requirementPushDate"
                type="date"
                className="form-control"
                value={details.requirementPushDate}
                name="requirementPushDate"
                onChange={handleFormChange}
                placeholder="Ombudsman Requirement Pushed Date..."
              />
            </div>
          </div>
          <h4 className="mt-4">Ombudsman hearing date and time</h4>
          <hr />
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Date 1st</label>
              <div className="input-group">
                <input
                  id="OmbFrmDatefst"
                  type="datetime-local"
                  className="form-control"
                  value={details.omb_first_date}
                  name="omb_first_date"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Date 2nd</label>
              <div className="input-group">
                <input
                  id="OmbFrmDateSec"
                  type="datetime-local"
                  className="form-control"
                  value={details.omb_sec_date}
                  name="omb_sec_date"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Call between Expert and Customer Date</label>
              <input
                id="OmbFromExpCusDt"
                type="date"
                className="form-control"
                value={details.expert_customer_date}
                name="expert_customer_date"
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Hearing Comment</label>
              <select
                id="OmbFromHeaComm"
                className="form-control"
                value={details.hearingComment}
                name="hearingComment"
                onChange={handleFormChange}
              >
                <option key={"select"} value="">Select Type</option>
                <option key={"Refund"} value="RefundAccepted">Refund Accepted</option>
                <option key={"SinglePay"} value="SinglePayAccepted">Single Pay Accepted</option>
                <option key={"SingPayAdd"} value="SinglePayAdditionalPayment">
                  Single Pay with additional Payment
                </option>
                <option key={"SPR"} value="SinglePaySomeRefund">
                  Single Pay with Some Refund
                </option>
                <option key={"claimPay"} value="ClaimPayable">Claim Payable</option>
                <option key={"claimPayInt"} value="ClaimPayableInterest">
                  Claim Payable with Interest
                </option>
                <option key={"claimRej"} value="ClaimRejected">Claim is rejected</option>
                <option key={"refuncdRej"} value="RefundRejected">Refund is Rejected</option>
                <option key={"desPen"} value="DecisionPending">Decision Pending</option>
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Called Customer or Not to Check Reward Status</label>
              <select
                id="OmbFromCheckSts"
                className="form-control"
                value={details.check_status}
                name="check_status"
                onChange={handleFormChange}
              >
                <option key={"yes"} value="Yes">Yes</option>
                <option key={"no"} value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Ombudsman Reward Date</label>
              <div className="input-group">
                <input
                  id="OmbFromOmbRewDt"
                  type="date"
                  className="form-control"
                  value={details.omd_reward_date}
                  name="omd_reward_date"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Ombudsman Award Non Compliance Sent Date</label>
              <div className="input-group">
                <input
                  id="OmbFromOmbNonComDt"
                  type="text"
                  className="form-control"
                  value={details.omdNonComplianceDate}
                  name="omdNonComplianceDate"
                  onChange={handleFormChange}
                  placeholder="Award Non-Compliance Date"
                  disabled
                />
              </div>
            </div>
            <div className="col-sm-3">
              <label>Resolution Type</label>
              <select
                id="OmbFromRewType"
                name="rewardType"
                className="form-control"
                value={details.rewardType}
                onChange={handleFormChange}
              >
                {resolutionType.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
          </div>
          {details.rewardType ? (
            <div className="row mt-4">
              {details.rewardType === "RefundAccepted" ||
              details.rewardType === "SinglePayAccepted" ||
              details.rewardType === "SinglePayAdditionalPayment" ||
              details.rewardType === "ClaimPayable" ||
              details.rewardType === "ClaimPayableInterest" ||
              details.rewardType === "SinglePaySomeRefund" ? (
                <div className="col-sm-3">
                  <label>
                    {details.rewardType === "RefundAccepted" ? "Refund" : null}
                    {details.rewardType === "SinglePayAccepted"
                      ? "Single Pay"
                      : null}
                    {details.rewardType === "SinglePayAdditionalPayment"
                      ? "Single Pay"
                      : null}
                    {details.rewardType === "SinglePaySomeRefund"
                      ? "Single Pay"
                      : null}
                    {details.rewardType === "ClaimPayable" ? "Claim" : null}
                    {details.rewardType === "ClaimPayableInterest"
                      ? "Claim"
                      : null}
                  </label>
                  <input
                    id="OmbFromRefundSingClm"
                    type="text"
                    className="form-control"
                    value={details.refundSingleClaim}
                    name="refundSingleClaim"
                    onChange={handleFormChange}
                  />
                </div>
              ) : null}
              {details.rewardType === "SinglePayAdditionalPayment" ||
              details.rewardType === "SinglePaySomeRefund" ||
              details.rewardType === "ClaimPayableInterest" ? (
                <div className="col-sm-3">
                  <label>
                    {details.rewardType === "SinglePayAdditionalPayment"
                      ? "Additional Payment"
                      : null}
                    {details.rewardType === "SinglePaySomeRefund"
                      ? "Refund"
                      : null}
                    {details.rewardType === "ClaimPayableInterest"
                      ? "Interest"
                      : null}
                  </label>
                  <input
                    id="OmbFromPayRefInt"
                    type="text"
                    className="form-control"
                    value={details.paymentRefundInt}
                    name="paymentRefundInt"
                    onChange={handleFormChange}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            ""
          )}
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Ombudsman Pending Reason</label>
              <select
                id="OmbFromPendReason"
                className="form-control"
                name="ombudsmanPendingReason"
                onChange={handleFormChange}
                value={details.ombudsmanPendingReason}
              >
                <option key={"select"} value="">Select Type</option>
                <option key={"MPCS"} value="mailPendingFromCustomerEnd">
                  Mail Pending from Customer's Side
                </option>
                <option key={"escPen"} value="escalationPending">Escalation Pending</option>
                <option key={"docPen"} value="documentPending">Document Pending</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label>Claim</label>
              <input
                type="text"
                id="OmbFromRefSinClm"
                className="form-control"
                value={details.refundSingleClaim}
                name="refundSingleClaim"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12">
              <label>Ombudsman Pending Reason Listing</label>
              <textarea
                id="OmbFromOmbPenReaLis"
                rows="5"
                type="text"
                name="ombudsmanPendingReasonListing"
                onChange={handleFormChange}
                value={details.ombudsmanPendingReasonListing}
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12">
              <Editor
                id="Editor"
                apiKey={tinyMceApiKey}
                onInit={(evt, editor) => (hearing_pointsRef.current = editor)}
                initialValue={details.hearing_points}
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
