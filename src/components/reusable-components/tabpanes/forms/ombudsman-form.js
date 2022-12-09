//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useRef, useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { 
        calledCustForRewardStatus,
        hearingCommentValues,
        ombudsmanLocation, 
        ombudsmanPendingReasonValues, 
        resolutionType, 
    } from 'constants/formValues';
import { Editor } from '@tinymce/tinymce-react';
import { date } from 'yup/lib/locale';


export default function OmbudsmanForm ({ heading, details, complaintId }) {

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

    const editorRef = useRef(null);
    const log = (e) => {
        e.preventDefault()
        if (editorRef.current) {
        console.log({ hearing_points :editorRef.current.getContent()});
        }
    };

    const { ombudsman_c_date, courier_number_doc, omdNonComplianceDate, courier_date, courierNumberDocArr, complainFormSendDate, form6ASendDate, VIAFormUploadedDate, ombudsman_submit_date, ombudsman_doc_date, courier_number, form6AMail, stateName, omb_first_date, omb_sec_date, expert_customer_date, hearingComment, check_status, omd_reward_date, refundSingleClaim, paymentRefundInt, rewardType, hearing_points, ombudsmanPendingReasonListing, ombudsmanPendingReason, oc_number } = details;

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <Formik initialValues={{
                    //formvalues fetched from api will be stored here
                    ombudsman_c_date: ombudsman_c_date ? new Date(ombudsman_c_date) : null,
                    ombudsman_doc_date: ombudsman_doc_date ? new Date(ombudsman_doc_date) : null,
                    ccDate: '',
                    courier_number_doc: courier_number_doc ? courier_number_doc : '',
                    complainFormSendDate: complainFormSendDate ? new Date(complainFormSendDate) : null,
                    ccNumbers: courierNumberDocArr ? courierNumberDocArr : '',
                    oc_number : oc_number ? oc_number : '',
                    form6APushedDate: form6ASendDate ? new Date(form6ASendDate) : null,
                    VIAFormUploadedDate: VIAFormUploadedDate ? new Date(VIAFormUploadedDate) : null,
                    ombudsman_submit_date: ombudsman_submit_date ? new Date(ombudsman_submit_date) : null,
                    courier_date: courier_date ? new Date(courier_date) : '',
                    courier_number: courier_number ? courier_number : '',
                    form6AMail: form6AMail ? form6AMail : '',
                    stateName: stateName ? stateName : '',
                    omb_first_date: omb_first_date ? new Date(omb_first_date) : '',
                    expert_customer_date: expert_customer_date ? new Date(expert_customer_date) : null,
                    hearingComment: hearingComment ? hearingComment : '',
                    check_status: check_status ? check_status : '',
                    omd_reward_date: omd_reward_date ? new Date(omd_reward_date) : '',
                    claimAmount : refundSingleClaim ? refundSingleClaim : '',
                    interest : paymentRefundInt ? paymentRefundInt : '',
                    omb_sec_date: omb_sec_date ? new Date(omb_sec_date) : '',
                    rewardType: rewardType ? rewardType : '',
                    hearingPoints : hearing_points ? hearing_points : '',
                    ombudsmanPendingReasonListing : ombudsmanPendingReasonListing ? ombudsmanPendingReasonListing : '',
                    ombudsmanPendingReason: ombudsmanPendingReason ? ombudsmanPendingReason : '',
                    omdNonComplianceDate : omdNonComplianceDate ? omdNonComplianceDate : "",
                }}
                    // validationSchema={SignupSchema}
                    onSubmit={e => {console.log(e)}}
                >
                {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    values
                }) => (
                    <Form className="av-tooltip tooltip-label-right" onSubmit={e => {e.preventDefault();console.log(e.target[0])}}>
                        <Row className="mb-4">
                            <Colxx xxs="12" lg="12" className="mb-5">

                                <h6>Complaint Data</h6><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Complaint Date</Label>
                                            <FormikDatePicker
                                                name="ombudsman_c_date"
                                                value={values.ombudsman_c_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Recent Date</Label>
                                            <FormikDatePicker
                                                name="ombudsman_doc_date"
                                                value={values.ombudsman_doc_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Date</Label>
                                            <FormikDatePicker
                                                name="ccDate"
                                                value={values.ccDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Recent Number</Label>
                                            <Field className="form-control" name="courier_number_doc" onChange={setFieldValue} />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Form Pushed Date</Label>
                                            <FormikDatePicker
                                                name="complainFormSendDate"
                                                value={values.complainFormSendDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Courier Numbers</Label>
                                            <Field className="form-control" name="ccNumbers" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Complaint Number</Label>
                                            <Input
                                                name="oc_number"
                                                value={values.oc_number}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <h6>Form 6A Data</h6><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Pushed Date</Label>
                                            <FormikDatePicker
                                                name="form6APushedDate"
                                                value={values.form6APushedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Received Date</Label>
                                            <FormikDatePicker
                                                name="VIAFormUploadedDate"
                                                value={values.VIAFormUploadedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A submission date</Label>
                                            <FormikDatePicker
                                                name="ombudsman_submit_date"
                                                value={values.ombudsman_submit_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Courier Date</Label>
                                            <FormikDatePicker
                                                name="courier_date"
                                                value={values.courier_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Form 6A Courier Number</Label>
                                            <Field className="form-control" name="courier_number" value={values.courier_number} onChange={setFieldValue} />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <br />
                                            <FormikCheckbox
                                                name="form6AMail"
                                                value={values.form6AMail}
                                                label="Form 6A through Mail"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Location</Label>
                                            <select name="stateName"
                                                    className="form-control"
                                                    value={values.stateName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {ombudsmanLocation.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <h6>Ombudsman hearing date and time</h6><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Date 1st</Label>
                                            <FormikDatePicker
                                                name="omb_first_date"
                                                value={values.omb_first_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Date 2nd</Label>
                                            <FormikDatePicker
                                                name="omb_sec_date"
                                                value={values.omb_sec_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Call between Expert and Customer Date</Label>
                                            <FormikDatePicker
                                                name="expert_customer_date"
                                                value={values.expert_customer_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Hearing Comment</Label>
                                            <select name="hearingComment"
                                                    className="form-control"
                                                    value={values.hearingComment}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {hearingCommentValues.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Called Customer or Not to Check Reward Status</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="check_status"
                                                id="calledCustForRewardStatus"
                                                label="Which of these?"
                                                value={values.check_status}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={calledCustForRewardStatus}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Reward Date</Label>
                                            <FormikDatePicker
                                                name="omd_reward_date"
                                                value={values.omd_reward_date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Award Non Compliance Sent Date</Label>
                                            <FormikDatePicker
                                                name="omdNonComplianceDate"
                                                value={values.omdNonComplianceDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Resolution Type</Label>
                                            <select name="rewardType"
                                                className="form-control"
                                                value={values.rewardType}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {resolutionType.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Ombudsman Pending Reason</Label>
                                            <select name="ombudsmanPendingReason"
                                                className="form-control"
                                                value={values.ombudsmanPendingReason}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                {ombudsmanPendingReasonValues.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Claim</Label>
                                            <Field className="form-control" name="claimAmount" id="claimAmount" value={values.claimAmount} />
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Interest</Label>
                                            <Field className="form-control" name="interest" id="interest" value={values.interest} />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Ombudsman Pending Reason Listing</Label>
                                            <Input type="textarea" rows="2" name="ombudsmanPendingReasonListing" id="ombudsmanPendingReason" value={values.ombudsmanPendingReasonListing} />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Textarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Expert Important Points for Hearing</Label>
                                            <Editor
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue = {values.hearingPoints}
                                                init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Work Sans,Helvetica,Arial,sans-serif; font-size:14px }'
                                                }}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                            
                            </Colxx>
                            {/* Wrapping Column ends */}
                            <Colxx xxs="12" lg="12" className="text-center">
                                <Button color="primary" type="">
                                    Submit
                                </Button>
                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        </Card>
    )
}

