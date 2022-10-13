//mailing section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { choices, complaintDelayReason, draftSentByCustomer, firstResponseType, firstResponseTypes, gender, isAcknowledgementReceived, isCustomerIDRegistered, isFirstEscalationSent, isFirstReminderMailSentToCompany, isFirstResponseFromCompany, isfirstResponseFromCompany, isReminderMailSentToCompany, isRequirementMailRevert, isRequirementMailSent, isSecondReminderMailSentToCompany, isSecondResponseFromCompany, options, secondResponseType } from 'constants/formValues';


export default function MailingSectionForm ({ heading }) {

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

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <Formik initialValues={{
                    name: 'Yash',
                    email: 'test@test.com',
                    phone: '9453578234',
                    choice: 'Yes'
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
                                            <Field className="form-control" name="name" />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Complaint Date</Label>
                                            <FormikDatePicker
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="draftSentByCustomer"
                                                id="draftSentByCustomer"
                                                label="Which of these?"
                                                value={values.draftSentByCustomer}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={draftSentByCustomer}
                                            />
                                        </FormGroup>
                                    </Colxx>
                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Is draft shared ?</Label>
                                            <FormikCheckbox
                                                name="draftShared"
                                                value={values.draftShared}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                                name="date"
                                                value={values.date}
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
                                            <Input type="textarea" rows="5" name="escalationpoints" id="escalationpoints" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Texr=tarea */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="12">
                                        <FormGroup className="error-l-100">
                                            <Label>Earlier Mail Editors</Label>
                                            <Input type="textarea" rows="5" name="earliermails" id="earliermails" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                            
                            </Colxx>
                            {/* Wrapping Column ends */}
                            <Colxx xxs="12" lg="12" className="text-center">
                                <Button color="primary" type="submit">
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
