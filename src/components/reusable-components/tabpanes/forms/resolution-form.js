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
import React, { useState } from "react";
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
import { isRequirementReceived, resolutionType } from "constants/formValues";
import { faDownload, faDownLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { awsUrl } from "constants/defaultValues";

export default function ResolutionForm({
  heading,
  details,
  complaintId,
  handleFormChange,
}) {
  const [documentUploadModal, setDocumentUploadModal] = useState(false);

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

  const {
    resolutionDate,
    update_date,
    actualRefundAmount,
    pendingClaimAmount,
    requirementReceived,
    requirementType,
    requirementDate,
    rewardType,
    refundSingleClaim,
    paymentRefundInt,
    resolutionProofType,
  } = details;

  return (
    <Card>
      <CardBody>
        <h2 className="mb-4">{heading}</h2>
        <div className="container">
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Lavel</label>
              <input
                id="resolutionLev"
                name="resolvedLevel"
                className="form-control"
                disabled
                value={details.resolvedLevel}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Resolution date</label>
              <input
                id="resolutionDate"
                type="date"
                name="resolutionDate"
                className="form-control"
                value={details.resolutionDate}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Resolution Marked Date</label>
              <input
                id="resolutionMarkDate"
                type={"date"}
                name="resolveDate"
                className="form-control"
                value={details.resolveDate}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div className="col-sm-3">
              <label>Resolution Amount</label>
              <input
                id="resolutionAmt"
                type={"number"}
                name="actualRefundAmount"
                className="form-control"
                value={details.actualRefundAmount}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Resolution TAT</label>
              <input
                id="resolutionTat"
                name="resolutionTatPeriod"
                type={"text"}
                className="form-control"
                value={details.resolutionTatPeriod}
                onChange={handleFormChange}
                disabled
              />
            </div>
            <div className="col-sm-3">
              <label>Pending Claim Amount</label>
              <input
                id="resolutionPenAmt"
                name="pendingClaimAmount"
                type={"text"}
                className="form-control"
                value={details.pendingClaimAmount}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Resoloution</label>
              <select
                id="resolutionSelect"
                className="form-control"
                name="requirementReceived"
                onChange={handleFormChange}
                value={details.requirementReceived}
              >
                <option key={"Select"} value="">
                  Select Type
                </option>
                <option key={"yes"} value="Yes">Yes</option>
                <option key={"no"} value="No">No</option>
              </select>
            </div>
            <div className="col-sm-3">
              <label> Requirement type</label>
              <input
                id="resolutionReqType"
                name="requirementType"
                value={details.requirementType}
                onChange={handleFormChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Requirement Submitted On</label>
              <input
                id="resolutionReqSubOn"
                type={"date"}
                className="form-control"
                value={details.requirementDate}
                onChange={handleFormChange}
                name="requirementDate"
              />
            </div>
            <div className="col-sm-3">
              <label>Resolution Type</label>
              <select
                id="resolutionResType"
                className="form-control"
                name="rewardType"
                onChange={handleFormChange}
                value={details.rewardType}
              >
                <option key={"select"} value="">Select Type</option>
                <option key={"RefAcc"} value="RefundAccepted">Refund Accepted</option>
                <option key={"SingPayAcc"} value="SinglePayAccepted">Single Pay Accepted</option>
                <option key={"SinPayAdd"} value="SinglePayAdditionalPayment">
                  Single Pay with additional Payment
                </option>
                <option key={"singlePaySome"} value="SinglePaySomeRefund">
                  Single Pay with Some Refund
                </option>
                <option key={"calimPay"} value="ClaimPayable">Claim Payable</option>
                <option key={"claimPayInt"} value="ClaimPayableInterest">
                  Claim Payable with Interest
                </option>
                <option key={"claimRej"} value="ClaimRejected">Claim is rejected</option>
                <option key={"refRej"} value="RefundRejected">Refund is Rejected</option>
              </select>
            </div>
            {details.rewardType ? (
              <>
                {details.rewardType === "RefundAccepted" ||
                details.rewardType === "SinglePayAccepted" ||
                details.rewardType === "SinglePayAdditionalPayment" ||
                details.rewardType === "ClaimPayable" ||
                details.rewardType === "ClaimPayableInterest" ||
                details.rewardType === "SinglePaySomeRefund" ? (
                  <div className="col-sm-3">
                    <label>
                      {details.rewardType === "RefundAccepted"
                        ? "Refund"
                        : null}
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
                      id="resolutionRefundClaim"
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
                      id="resolutionPayRefAmt"
                      type="text"
                      className="form-control"
                      value={details.paymentRefundInt}
                      name="paymentRefundInt"
                      onChange={handleFormChange}
                    />
                  </div>
                ) : null}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <label>Resolution Proof Type</label>
              <input
                id="resolutionPrfType"
                className="form-control"
                value={details.resolutionProofType}
                name="resolutionProofType"
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Resoloution Proof</label>
              <input
                id="resolutionPrf"
                className=""
                type={"file"}
                name="avatar"
                onChange={handleFormChange}
              />
            </div>
            <div className="col-sm-3">
              <label>Resolution Proof Download</label> <br />
                <a
                  id="resolutionDwn"
                  href={`${awsUrl}upload/IGMS_Award_document/${details.userId?._id}}`}
                  target={"_blank"}
                  className="btn btn-warning success"
                  onClick={(e) => e.preventDefault()}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </a>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
