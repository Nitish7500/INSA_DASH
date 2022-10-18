//complaint details nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { education, gender, occupation, policyTypes, realtionships } from 'constants/formValues';
import { getAllStates } from 'services/complaints.services';

// const options = [
//     { value: '', label: 'Select an Option' },
//     { value: 'Something', label: 'Something' },
//     { value: 'Anything', label: 'Anything' }
// ];


export default function DetailsForm({ heading, details }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [states, setStates] = useState([]);

    let userId = details?.userId;
    let date = new Date(parseInt(userId?.dob.substr(6)))

    //getting all states (ombudsman state locations and districts)
    useEffect(() => {
        const fetchData = async () => {
        try {
            const {data} = await getAllStates();
            setStates(data);
        } catch (error) {
            console.log("States",error)
        }
        setIsLoaded(true);
        }
        fetchData();
    }, []);

    console.log(details);

    //getting all states (ombudsman state locations and districts)
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const {data} = await getAllStates();
    //         setStates(data);
    //     } catch (error) {
    //         console.log("States",error)
    //     }
    //     setIsLoaded(true);
    //     }
    //     fetchData();
    // }, []);

    // console.log(details);

    // const onSubmit = (values, { setSubmitting } ) => {
    //     values.preventDefault()
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
                <h2 className="mb-5">{heading}</h2>
                <Formik initialValues={{
                    name : userId ? userId.name : '',
                    email : userId ? userId.email : '',
                    phone : userId ? userId.phone : '',
                    alternate : userId ? userId.alternatePhone : '',
                    income : userId ? userId.income : '',
                    occupation : userId ? userId.occupation : '',
                    pincode : userId ? userId.pinCode :  '',
                    dob : date ? date : '',
                    state : userId ? userId.state :  '',
                    district: userId ? userId.district :  '',
                    nomineee : '',
                    deceased : '',
                    gender : userId ? userId.gender : '',
                    pancard : userId ? userId.panCard : '',
                    education : userId ? userId.education : '',
                    policyNumber : details ? details.policyNumber : '',
                    claimAmt : details ? details.claimAmount : '',
                    address : userId ? userId.address : '',
                    insuranceType : '',
                    rejectionType : '',
                    complaintType : '',
                    relationship : '',
                    policyType : '',
                    insuranceCompanyType : '',
                    caseMovement : '',
                    legalExecutiveAssigned : '',
                    expertAssigned : '',
                    leadNumber : '',
                    companyAssigned : '',
                    status : '',
                    ombudsmanAssigned : '',
                    houseNumber : '',
                    street : '',
                    city : '',
                    isACovidComplaint : details ? details.covidCheck : '',
                    isAServiceComplaint : details ? details.asAServiceCheck : '',
                    internalLegalExecutiveAssigned : '',
                    statement : '',
                    custCreatedEmail : '',
                    custCreatedPassword : '',
                    approvedClaimAmt : '',
                    companyResponseDoc : '',
                    igmsDoc : '',
                    awardRejectedDoc : '',
                    ombudsmanDoc : '',
                    complaintCourierReceiptDoc : '',
                    form6aCourierReceiptDoc : '',

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
                                            <Field className="form-control" name="name" onChange={handleChange} />
                                        </FormGroup>

                                        <FormGroup className="error-l-100">
                                            <Label>Income Level*(per month)</Label>
                                            <Field className="form-control" name="income" />
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">DOB</Label>
                                            <FormikDatePicker
                                                name="dob"
                                                value={values.dob}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />
                                            {/* <input type="date" name="d" id="" /> */}
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100">
                                            <Label>Occupation</Label>
                                            <select name="occupation"
                                                    className="form-control"
                                                    value={values.occupation}
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
                                            <select name="state"
                                                    className="form-control"
                                                    value={values.state}
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
                                            <select name="education"
                                                    className="form-control"
                                                    value={values.education}
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
                                            <select name="district"
                                                    className="form-control"
                                                    value={values.district}
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
                                            <select name="insuranceType"
                                                    className="form-control"
                                                    value={values.insuranceType}
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
                                            <select name="rejectionType"
                                                    className="form-control"
                                                    value={values.rejectionType}
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
                                            <select name="complaintType"
                                                    className="form-control"
                                                    value={values.complaintType}
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
                                            <select name="relationship"
                                                    className="form-control"
                                                    value={values.relationship}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {realtionships.map((key) => (
                                                    <option value={key.value}>{key.label}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                    </Colxx>

                                    {/* Form Column 3 */}
                                    <Colxx xxs="12" lg="3">
                                        
                                        {/* ::::::::  Select Group  ::::::: */}
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Insurance Company Name</Label>
                                            <select name="insuranceCompanyType"
                                                    className="form-control"
                                                    value={values.insuranceCompanyType}
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
                                            <select name="caseMovement"
                                                    className="form-control"
                                                    value={values.caseMovement}
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
                                            <select name="policyType"
                                                    className="form-control"
                                                    value={values.policyType}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                {policyTypes.map((key) => (
                                                    <option value={key.value}>{key.label}</option>
                                                ))}
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
                                            <select name="executiveName"
                                                    className="form-control"
                                                    value={values.executiveName}
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
                                            <select name="legalExecutiveAssigned"
                                                    className="form-control"
                                                    value={values.legalExecutiveAssigned}
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
                                            <select name="expertAssigned"
                                                    className="form-control"
                                                    value={values.expertAssigned}
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
                                            <select name="companyAssigned"
                                                    className="form-control"
                                                    value={values.companyAssigned}
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
                                            <select name="status"
                                                    className="form-control"
                                                    value={values.status}
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
                                            <select name="ombudsmanAssigned"
                                                className="form-control"
                                                value={values.ombudsmanAssigned}
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
                                            <Field className="form-control" name="houseNumber" />
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
                                                name="isACovidComplaint"
                                                value={values.isACovidComplaint}
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
                                            <Field className="form-control" name="cityName" />
                                        </FormGroup>

                                        <FormGroup className="error-l-150">
                                            <Label className="d-block">Service Complaint Check</Label>
                                            <FormikCheckbox
                                                name="isAServiceComplaint"
                                                value={values.isAServiceComplaint}
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
                                            <Field className="form-control" name="tehsil" />
                                        </FormGroup>

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Assign To Internal Legal Executive</Label>
                                            <select name="internalLegalExecutiveAssigned"
                                                    className="form-control"
                                                    value={values.internalLegalExecutiveAssigned}
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

                                        <h4 className='my-4'>Customer Care Executive Created Email Section</h4>
                                        <Row className='mb-4'>
                                            {/* Form Column 1 */}
                                            <Colxx xxs="12" lg="3">
                                                <FormGroup className="error-l-100">
                                                    <Label>Email ID</Label>
                                                    <Field className="form-control" name="custCreatedEmail" />
                                                </FormGroup>
                                            </Colxx>

                                            {/* Form Column 2 */}
                                            <Colxx xxs="12" lg="2">
                                                <FormGroup className="error-l-100">
                                                    <Label>Password</Label>
                                                    <Field className="form-control" name="custCreatedPassword" />
                                                </FormGroup>
                                            </Colxx>

                                            {/* Form Column 3 */}
                                            <Colxx xxs="12" lg="3">
                                                <FormGroup className="error-l-100">
                                                    <Label>Approved Claim Amount</Label>
                                                    <Field className="form-control" name="approvedClaimAmt" />
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
                                                                <Input id="companyresponse" name="companyResponseDoc" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="igms">IGMS Documents :</Label>
                                                                <Input id="igms" name="igmsDoc" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="awardrejected">Award Rejected Documents :</Label>
                                                                <Input id="awardrejected" name="awardRejectedDoc" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="ombudsman">Ombudsman Requirement Documents :</Label>
                                                                <Input id="ombudsman" name="ombudsmanDoc" type="file" /> 
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="courier">Complaint form Courier Receipt :</Label>
                                                                <Input id="courier" name="complaintCourierReceiptDoc" type="file" />
                                                            </FormGroup>
                                                            <FormGroup className='my-3'>
                                                                <Label for="form6a">Form 6A Courier Receipt :</Label>
                                                                <Input id="form6a" name="form6aCourierReceiptDoc" type="file" />
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
