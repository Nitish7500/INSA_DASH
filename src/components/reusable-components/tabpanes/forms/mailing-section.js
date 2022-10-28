//mailing section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useRef, useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { complaintDelayReason, firstResponseType, isAcknowledgementReceived, isCustomerIDRegistered, isDraftSentByCustomer, isFirstEscalationSent, isFirstReminderMailSentToCompany, isFirstResponseFromCompany, isRequirementMailRevert, isRequirementMailSent, isSecondReminderMailSentToCompany, isSecondResponseFromCompany, secondResponseType } from 'constants/formValues';
import { Editor } from '@tinymce/tinymce-react';
import { tinyMceApiKey } from 'constants/defaultValues';
import { useQuery } from 'hooks/useQuery';
import { formatDate } from 'helpers/CommonHelper';


export default function MailingSectionForm ({ heading, details, complaintId }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const editorRef = useRef(null);
    const log = (e) => {
        e.preventDefault()
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    console.log(details);
    
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
                
    // destructuring the required keys from API response
    const {complaint_date, response_date, complaint_escalation_date, requirementRaisedDate, requirementRevertedDate, requirementSentDate, response_date_company, draftSharedDate, reminderSentDate } = details;
    
    const complaintDate = new Date(formatDate(complaint_date));
    const firstResponseDateFromCompany = new Date(formatDate(response_date));
    const escalationDateSentToCompany = new Date(formatDate(complaint_escalation_date));
    const reqRaisedDate = new Date(formatDate(requirementRaisedDate));
    const reqRevertedDate = new Date(formatDate(requirementRevertedDate));
    const firstReminderSentDate = new Date(requirementSentDate);
    const customerDraftSharedDate = new Date(draftSharedDate);
    const secondResponseDateFromCompany = new Date(response_date_company);
    const secondReminderSentDate = new Date(reminderSentDate);

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <Formik initialValues={{
                    isCustomerIdRegistered: '',
                    complaintNumber: details.complaint_number ? details.complaint_number : '',
                    // complaintDate: complaintDate,
                    // firstResponseDateFromCompany: firstResponseDateFromCompany,
                    // escalationDateSentToCompany: escalationDateSentToCompany,
                    // reqRaisedDate: reqRaisedDate,
                    // reqRevertedDate: reqRevertedDate,
                    // firstReminderSentDate: firstReminderSentDate,
                    // secondResponseDateFromCompany: secondResponseDateFromCompany,
                    isDraftSentByCustomer: details ? details.is_draft_mail_send : '',
                    isDraftShared: details ? details.is_draft_mail_send : '',
                    // customerDraftSharedDate: customerDraftSharedDate,
                    isAcknowledgementReceived: details ? details.is_acknowledgement : '',
                    isRequirementMailSent: details ? details.isRequirement : '',
                    // isRequirementMailRevert: details ? details.isRequirementReverted : '',
                    isFirstResponseFromCompany: details ? details.response_company : '',
                    isFirstReminderMailSentToCompany: details ? details.reminder_first : '',
                    firstResponseType: details ? details.firstResponseType : '',
                    complaintDelayReason: details ? details.complaintDelayReason : '',
                    isFirstEscalationSent: '',
                    isEscalationShared: '',
                    // firstCustomerDraftSharedDate: '',
                    isSecondResponseFromCompany: details ? details.response_company2 : '',
                    isSecondReminderMailSentToCompany: details ? details.reminder_second : '',
                    // secondReminderSentDate: secondReminderSentDate,
                    secondResponseType: details ? details.secondResponseType : '',
                }}
                    // validationSchema={SignupSchema}
                    // onSubmit={onSubmit}
                >
                {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    values
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                        <Row className="mb-4">
                            <Colxx xxs="12" lg="12" className="mb-5">

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label>Customer ID is Register</Label><br />
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isCustomerIdRegistered"
                                                id="isCustomerIdRegistered"
                                                label="Which of these?"
                                                value={values.isCustomerIdRegistered}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isCustomerIDRegistered}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label>Complaint Number</Label>
                                            <Field className="form-control" name="complaintNumber" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Date</Label>
                                            <FormikDatePicker
                                                name="complaintDate"
                                                value={values.complaintDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">First Response Date from Company </Label>
                                            <FormikDatePicker
                                                name="firstResponseDateFromCompany"
                                                value={values.firstResponseDateFromCompany}
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
                                            <Label className="d-block">Escalation Date Sent to Company</Label>
                                            <FormikDatePicker
                                                name="escalationDateSentToCompany"
                                                value={values.escalationDateSentToCompany}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Requirement Raised Date</Label>
                                            <FormikDatePicker
                                                name="reqRaisedDate"
                                                value={values.reqRaisedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Requirement Reverted Date</Label>
                                            <FormikDatePicker
                                                name="reqRevertedDate"
                                                value={values.reqRevertedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Reminder Sent Date</Label>
                                            <FormikDatePicker
                                                name="firstReminderSentDate"
                                                value={values.firstReminderSentDate}
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
                                            <Label className="d-block">Second Response Date from Company</Label>
                                            <FormikDatePicker
                                                name="secondResponseDateFromCompany"
                                                value={values.secondResponseDateFromCompany}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Draft Mail Sent by customer or Not</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isDraftSentByCustomer"
                                                id="isDraftSentByCustomer"
                                                label="Which of these?"
                                                value={values.isDraftSentByCustomer}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isDraftSentByCustomer}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Is draft shared ?</Label>
                                            <FormikCheckbox
                                                name="isDraftShared"
                                                value={values.isDraftShared}
                                                label="Draft shared with the customer"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Draft shared with the customer Date</Label>
                                            <FormikDatePicker
                                                name="customerDraftSharedDate"
                                                value={values.customerDraftSharedDate}
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
                                            <Label className="d-block">Acknowledgement Received or Not</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isAcknowledgementReceived"
                                                id="isAcknowledgementReceived"
                                                label="Which of these?"
                                                value={values.isAcknowledgementReceived}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isAcknowledgementReceived}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Requirement Mail Sent By Company</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isRequirementMailSent"
                                                id="isRequirementMailSent"
                                                label="Which of these?"
                                                value={values.isRequirementMailSent}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isRequirementMailSent}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Requirement Mail Revert Sent By Customer</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isRequirementMailRevert"
                                                id="isRequirementMailRevert"
                                                label="Which of these?"
                                                value={values.isRequirementMailRevert}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isRequirementMailRevert}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                            
                                <h5>First Response Data</h5><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">First Response from Company</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isFirstResponseFromCompany"
                                                id="isFirstResponseFromCompany"
                                                label="Which of these?"
                                                value={values.isFirstResponseFromCompany}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isFirstResponseFromCompany}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Reminder Mail Sent to Company</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isFirstReminderMailSentToCompany"
                                                id="isFirstReminderMailSentToCompany"
                                                label="Which of these?"
                                                value={values.isFirstReminderMailSentToCompany}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isFirstReminderMailSentToCompany}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">First Response Type</Label>
                                            <select name="firstResponseType"
                                                    className="form-control"
                                                    value={values.firstResponseType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {firstResponseType.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint delay reason</Label>
                                            <select name="complaintDelayReason"
                                                    className="form-control"
                                                    value={values.complaintDelayReason}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {complaintDelayReason.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form Row */}
                                <Row className='mb-3'>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label>First Escalation Sent or Not</Label><br />
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isFirstEscalationSent"
                                                id="isFirstEscalationSent"
                                                label="Which of these?"
                                                value={values.isFirstEscalationSent}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isFirstEscalationSent}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Escalation shared with the customer</Label>
                                            <FormikCheckbox
                                                name="isEscalationShared"
                                                value={values.isEscalationShared}
                                                label="Draft shared with the customer"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Draft shared with the customer Date</Label>
                                            <FormikDatePicker
                                                name="firstCustomerDraftSharedDate"
                                                value={values.firstCustomerDraftSharedDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <h5>Second Response Data</h5><hr />
                                {/* Form Row */}
                                <Row className='mb-3'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Second Response from Company</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isSecondResponseFromCompany"
                                                id="isSecondResponseFromCompany"
                                                label="Which of these?"
                                                value={values.isSecondResponseFromCompany}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isSecondResponseFromCompany}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Reminder Mail Sent to Company</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="isSecondReminderMailSentToCompany"
                                                id="isSecondReminderMailSentToCompany"
                                                label="Which of these?"
                                                value={values.isSecondReminderMailSentToCompany}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={isSecondReminderMailSentToCompany}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Reminder Sent Date</Label>
                                            <FormikDatePicker
                                                name="secondReminderSentDate"
                                                value={values.secondReminderSentDate}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Second Response Type</Label>
                                            <select name="secondResponseType"
                                                    className="form-control"
                                                    value={values.secondResponseType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {secondResponseType.map((item) => (
                                                    <option value={item.value}>{item.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Texr=tarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Escalation Mail Points</Label>
                                            <Editor
                                                apiKey={tinyMceApiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue = {values.escalationMailPoints}
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

                                {/* Texr=tarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Earlier Mail Editors</Label>
                                            <Editor
                                                apiKey={tinyMceApiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue = {values.earlierMailEditors}
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
                                <Button color="primary" type="button">
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

