//complaint details nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { education, gender, occupation } from 'constants/formValues';

const options = [
    { value: '', label: 'Select an Option' },
    { value: 'Something', label: 'Something' },
    { value: 'Anything', label: 'Anything' }
];



export default function DetailsForm({ heading }) {

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
                <h6 className="mb-4">{heading}</h6>
                <Formik initialValues={{
                    name: 'Yash',
                    email: 'test@test.com',
                    phone: '9453578234',
                    alternate: '',
                    income: '25000',
                    select: '3',
                    pincode: '201301',
                    dob: '13/01/1970',
                    reactSelect: [{ value: 'reasonml', label: 'ReasonML' }],
                    checkboxGroup: ['kittens'],
                    customCheckGroup: ['unicorns'],
                    checkboxSingle: true,
                    checkboxCustomSingle: false,
                    radioGroup: 'male',
                    gender: 'male',
                    customRadioGroup: 'male',
                    tags: ['cake', 'dessert'],
                    switch: false,
                    date: null,
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
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                        <Row className="mb-4">
                            <Colxx xxs="12" lg="12">

                                {/* Form Row 1 */}
                                <Row>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">

                                        <FormGroup className="error-l-100">
                                            <Label>Name</Label>
                                            <Field className="form-control" name="name" />
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Income Level*(per month)</Label>
                                            <Field className="form-control" name="income" />
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">DOB</Label>
                                            <FormikDatePicker
                                                name="date"
                                                value={values.date}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Occupation</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {occupation.map((key) => (
                                                    <option value={key.value}>{key.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Email</Label>
                                            <Field className="form-control" name="email" />
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Pincode</Label>
                                            <Field className="form-control" name="pincode" />
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Pan Card Number</Label>
                                            <Field className="form-control" name="pancard" />
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Nominee Name</Label>
                                            <Field className="form-control" name="nominee" />
                                        </FormGroup>
                        
                                    </Colxx>

                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Phone</Label>
                                            <Field className="form-control" name="phone" />
                                        </FormGroup>
                                        
                                        {/* :::::::: Radio Group :::::: */}
                                        <FormGroup className="error-l-150 pt-2">
                                            <Label className="d-block">Gender</Label>
                                            <FormikCustomRadioGroup
                                                inline
                                                name="gender"
                                                id="gender"
                                                label="Which of these?"
                                                value={values.gender}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                                options={gender}
                                            />
                                        </FormGroup>
                                        
                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Select State</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select a state..</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Deceased Person</Label>
                                            <Field className="form-control" name="deceased" />
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Alternate Contact Number</Label>
                                            <Field className="form-control" name="alternate" />
                                        </FormGroup>

                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Education*</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {education.map((level) => (
                                                    <option value={level.value}>{level.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Select District</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select District</option>
                                                <option value="1">Araria</option>
                                                <option value="2">Arval</option>
                                            </select>
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Nominee Name</Label>
                                            <Field className="form-control" name="nominee" />
                                        </FormGroup>

                                    </Colxx>
                                </Row>

                                {/* Form Address Row */}
                                <Row className='mb-4'>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label>Policy Number</Label>
                                            <Field className="form-control" name="policyNumber" />
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="12" lg="3">
                                        <FormGroup className="error-l-100">
                                            <Label>Claim Amount</Label>
                                            <Field className="form-control" name="claimAmt" />
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="12" lg="6">
                                        <FormGroup className="error-l-100">
                                            <Label>Address</Label>
                                            <Field className="form-control" name="address" />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {/* Form row 3 */}
                                <Row className='mb-4'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Insurance Type</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Insurance Type</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Rejection Type</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Claim Rejection Type</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                        


                                    </Colxx>

                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Complaint Type</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Complaint Type</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Relationship</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Option</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                    </Colxx>

                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Insurance Company Name</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Company</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Movement of Case</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Movement</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                    
                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Policy Type</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Policy type</option>
                                                <option value="1">Illeterate</option>
                                                <option value="2">Below 10th</option>
                                            </select>
                                        </FormGroup>

                                    </Colxx>
                                </Row>

                                {/* Form row 4 */}
                                <Row className='mb-4'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign To</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Executive Name</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign to Legal Executive</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Legal Executive</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign to Expert</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Expert</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Lead Number</Label>
                                            <Field className="form-control" name="leadNumber" />
                                        </FormGroup>
                        
                                    </Colxx>

                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign To Company/IGMS</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Company</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Status</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Status</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select>
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                    
                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign To Ombudsman</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Policy type</option>
                                                <option value="1">Illeterate</option>
                                                <option value="2">Below 10th</option>
                                            </select>
                                        </FormGroup>

                                    </Colxx>
                                </Row>

                                {/* Form row 5 */}
                                <Row className='mb-4'>
                                    {/* Form Column 1 */}
                                    <Colxx xxs="12" lg="3">

                                        <FormGroup className="error-l-100">
                                            <Label>Door No./ Bldg/Name / Floor</Label>
                                            <Field className="form-control" name="addressNo" />
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Generated address</Label>
                                            <Field className="form-control" name="generatedAddress" />
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 2 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Street / Area</Label>
                                            <Field className="form-control" name="street" />
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-150">
                                            <Label className="d-block">Covid Complaint Check</Label>
                                            <FormikCheckbox
                                                name="checkboxSingle"
                                                value={values.checkboxSingle}
                                                label="Is it a Covid Complaint"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>
                                        
                                    </Colxx>

                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>City / Town / Panchayath / Village</Label>
                                            <Field className="form-control" name="city" />
                                        </FormGroup>

                                        <FormGroup className="error-l-150">
                                            <Label className="d-block">Service Complaint Check</Label>
                                            <FormikCheckbox
                                                name="checkboxSingle"
                                                value={values.checkboxSingle}
                                                label="As a Service Complaint or not"
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                        </FormGroup>

                                    </Colxx>

                                    {/* Form Column 4 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Taluk / Tehsil</Label>
                                            <Field className="form-control" name="street" />
                                        </FormGroup>

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign To Internal Legal Executive</Label>
                                            <select name="select"
                                                    className="form-control"
                                                    value={values.select}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Executive Name</option>
                                                <option value="1">Illeterate</option>
                                                <option value="2">Below 10th</option>
                                            </select>
                                        </FormGroup>

                                    </Colxx>
                                </Row>

                                {/* Form row 6 */}
                                <Row className='mb-4'>

                                    <Colxx xxs="12" lg="12">

                                        <Row className='mb-4'>
                                            <Colxx xxs="12" lg="12">
                                                <FormGroup className="error-l-100">
                                                    <Label>Complaint Statement</Label>
                                                    <Input type="textarea" rows="5" name="text" id="statement" />
                                                </FormGroup>
                                            </Colxx>
                                        </Row>

                                        <Row className='mb-4'>
                                            {/* Form Column 1 */}
                                            <Colxx xxs="12" lg="3">
                                                <FormGroup className="error-l-100">
                                                    <Label>Email ID</Label>
                                                    <Field className="form-control" name="email" />
                                                </FormGroup>
                                            </Colxx>

                                            {/* Form Column 2 */}
                                            <Colxx xxs="12" lg="2">
                                                <FormGroup className="error-l-100">
                                                    <Label>Password</Label>
                                                    <Field className="form-control" name="password" />
                                                </FormGroup>
                                            </Colxx>

                                            {/* Form Column 3 */}
                                            <Colxx xxs="12" lg="3">
                                                <FormGroup className="error-l-100">
                                                    <Label>Approved Claim Amount</Label>
                                                    <Field className="form-control" name="claimAmount" />
                                                </FormGroup>
                                            </Colxx>

                                            {/* Form Column 4 */}
                                            <Colxx xxs="12" lg="4">
                                                <FormGroup row>
                                                    <Label for="documents">IGMS / Ombudsman Award and Ombudsman requirement Documents Upload</Label>
                                                    <Button color="warning" outline onClick={() => setDocumentUploadModal(true)} >Upload Documents</Button>
                                                    
                                                    <Modal isOpen={documentUploadModal} toggle={() => setDocumentUploadModal(!documentUploadModal)}>
                                                        <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                                                            <h2 className='mb-0 ml-3'>Document Uploads</h2>
                                                            <div onClick={() => setDocumentUploadModal(false)} style={{fontSize: '22px', marginRight: '20px'}}>
                                                                <i className="simple-icon-close" />
                                                            </div>
                                                        </div>
                                                        <ModalBody>
                                                            <h3 className="text-muted text-thin">Lead ID : </h3>
                                                            <FormGroup className='my-3'>
                                                                <Label for="companyresponse">Company Response Documents :</Label>
                                                                <Input id="companyresponse" name="file" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="igms">IGMS Documents :</Label>
                                                                <Input id="igms" name="file" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="awardrejected">Award Rejected Documents :</Label>
                                                                <Input id="awardrejected" name="file" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="ombudsman">Ombudsman Requirement Documents :</Label>
                                                                <Input id="ombudsman" name="file" type="file" /> 
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="corier">Complaint form Courier Receipt :</Label>
                                                                <Input id="corier" name="file" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="form6a">Form 6A Courier Receipt :</Label>
                                                                <Input id="form6a" name="file" type="file" />
                                                            </FormGroup>
                                                        </ModalBody>
                                                    </Modal>
                                                </FormGroup>
                                            </Colxx>
                                        </Row>
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
