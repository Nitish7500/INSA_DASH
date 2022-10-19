//complaint details nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { claimRejectionTypes, education, gender, movementOfCase, occupation, policyTypes, realtionships } from 'constants/formValues';
import { assignLegalExpert, assignOmbudsman, assignOMD, getAllInsa, getAllStates, getComplaintTypesByPolicyTypeId, getFirstDraftData, getInsuranceCompanyNamesByPolicyTypeId, getLegalUserData, getPolicyTypes, getUserBasedData } from 'services/complaints.services';

// const options = [
//     { value: '', label: 'Select an Option' },
//     { value: 'Something', label: 'Something' },
//     { value: 'Anything', label: 'Anything' }
// ];


export default function DetailsForm({ heading, details }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [states, setStates] = useState([]);
    const [policyTypes, setPolicyTypes] = useState([]);
    const [complaintTypes, setComplaintTypes] = useState([]);
    const [insuranceCompanies, setInsuranceCompanies] = useState([]);
    const [firstDraft, setFirstDraft] = useState([]);
    const [userBasedData, setUserBasedData] = useState([]);
    const [allExecutives, setAllExecutives] = useState([]);
    const [allExperts, setAllExperts] = useState([]);
    const [allCompanies, setAllCompanies] = useState([]);
    const [allOmbudsman, setAllOmbudsman] = useState([]);
    const [allLegalExecutives, setAllLegalExecutives] = useState([]);

    // objects nested in api response
    let complaint = details?.complaintTypeId;
    let user = details?.userId;
    let lead = details?.leadId;
    let wholeAddress = details?.wholeAddress;
    let insuranceCompany = details?.insuranceCompanyId;
    let policyType = details?.policyTypeId;
    let complaintType = details.complaintTypeId;
    
    // IDs of all important objects
    let policyTypeId = policyType ? policyType._id : '';
    let complaintTypeId = complaint ? complaint._id : '';
    let insuranceCompanyId = insuranceCompany ? insuranceCompany._id : '';
    let leadId = lead ? lead._id : '';
    let userId = user ? user._id : '';

    // console.log(details);
    
    let date = new Date(parseInt(user?.dob.substr(6)));

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
        
        //getting all policy types from api ::-- to be noted that policy type here is being referred to Insurance Type i.e. LI, GI, HI etc --::
        const fetchPolicyType = async () => {
            try {
                const {data} = await getPolicyTypes();
                setPolicyTypes(data);
            } catch (error) {
                console.log("Policy Types ",error)
            }
            setIsLoaded(true);
        }
        fetchPolicyType();

        // getting all complaint types and  Insurance companies details on the basis of policy type selected
        handleSelectInsurancetype(policyTypeId);

        // getting complaint type if coming from api response
        getComplaintTypes(complaintTypeId);

        // getting insurance company type
        getInsuranceCompanies(insuranceCompanyId);

        // get user based data method with payload
        const fetchUserBaseddata = async () => {
            try {
                const {data} = await getUserBasedData();
                setUserBasedData(data);
            } catch (error) {
                console.log("Policy Types ",error)
            }
            setIsLoaded(true);
        }
        fetchUserBaseddata();

        //getting all Executives list
        const fetchAllExecutives = async () => {
            try {
                const {data} = await getAllInsa();
                setAllExecutives(data);
            } catch (error) {
                console.log('All INSA Executives ', error);
            }
            setIsLoaded(true);
            console.log(allExecutives);
        }
        fetchAllExecutives();

        //getting all Legal Experts
        const fetchLegalExperts = async () => {
            try {
                const {data} = await assignLegalExpert();
                setAllLegalExecutives(data);
            } catch (error) {
                console.log('All Legal Experts ', error);
            }
            setIsLoaded(true);
            console.log(allLegalExecutives);
        }
        fetchLegalExperts();
        
        //getting all Ombudsman
        const fetchAllOmbudsman = async () => {
            try {
                const {data} = await assignOmbudsman();
                setAllOmbudsman(data);
            } catch (error) {
                console.log('All Ombudsman ', error);
            }
            setIsLoaded(true);
            console.log(allOmbudsman);
        }
        fetchAllOmbudsman();




        // const getFirstDraft = async () => {
        //     try {
        //         const {data} = await getFirstDraftData();
        //         setFirstDraft(data);
        //     } catch (error) {
        //         console.log('First draft data ', error)
        //     }
        //     setIsLoaded(true);
        // }
        // getFirstDraft();
    
        
    }, []);
    
    //getting all complaint types on the basis of policy type selected
    const getComplaintTypes = async (id) => {
        let policyTypeId = id;
        try {
            const {data} = await getComplaintTypesByPolicyTypeId(policyTypeId);
            setComplaintTypes(data);
            // console.log(complaintTypes);
        } catch (error) {
            console.log("States",error)
        }
        setIsLoaded(true);
    }
    
    //getting all Insurance companies details on selecting insurance type
    const getInsuranceCompanies = async (id) => {
        let policyTypeId = id;
        try {
            const {data} = await getInsuranceCompanyNamesByPolicyTypeId(policyTypeId);
            setInsuranceCompanies(data);
            // console.log(insuranceCompanies);
        } catch (error) {
            console.log("States",error)
        }
        setIsLoaded(true);
    }
    
    // function handling policytype id :: insurance type id
    const handleSelectInsurancetype = (insuranceTypeId) => {
        let policyTypeId = insuranceTypeId;
        console.log('Policy Type ID ', policyTypeId);
        getComplaintTypes(policyTypeId);
        getInsuranceCompanies(policyTypeId);
    }

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

    return !isLoaded ? (
        <div className="loading" />
      ) : (
        <Card>
            <CardBody>
                <h2 className="mb-5">{heading}</h2>
                <Formik initialValues={{
                    name : user ? user.name : '--',
                    email : details ? details.email : '--',
                    phone : details ? details.phone : '--',
                    alternate : user ? user.alternatePhone : '--',
                    income : user ? user.income : '--',
                    occupation : details ? details.occupation : '--',
                    pincode : user ? user.pinCode :  '--',
                    dob : date ? date : '--',
                    state : user ? user.state :  '--',
                    district: user ? user.district :  '--',
                    nominee : details ? details.nominee : '--',
                    deceased : details ? details.deceasedPerson : '--',
                    gender : details ? details.gender : '--',
                    pancard : details ? details.panNumber : '--',
                    education : details ? details.education : '--',
                    policyNumber : details ? details.policyNumber : '--',
                    claimAmt : details.claimAmount ? details.claimAmount : '--',
                    address : user ? user.address : '--',
                    insuranceType : insuranceCompany ? insuranceCompany._id : '--',
                    rejectionType : details ? details.claimRejectionType : '--',
                    complaintType : complaintTypeId ? complaintTypeId : '--',
                    relationship : details ? details.nomineeRelation : '--',
                    policyType : details ? details.policyType : '--',
                    insuranceCompanyType : insuranceCompanyId ? insuranceCompanyId : '--',
                    caseMovement : details ? details.movementOfCase : '--',
                    executiveName : details ? details.executiveName : '--',
                    legalExecutiveAssigned : details ? details.assign_to_legalExpert : '--',
                    expertAssigned : details ? details.assign_to_expert : '--',
                    leadNumber : lead ? lead.leadId : '--',
                    companyAssigned : details ? details.assignToCompanyIGMS : '--',
                    status : details ? details.status : '--',
                    ombudsmanAssigned : details ? details.assignToOmbudsman : '--',
                    houseNumber : wholeAddress ? wholeAddress["DoorNo/Bldg/Name/Floor"] : '--',
                    street : wholeAddress ? wholeAddress["Street/Area"] : '--',
                    cityName : wholeAddress ? wholeAddress["City/Town/Panchayath/Village"] : '--',
                    tehsil : wholeAddress ? wholeAddress["Taluk/Tehsil"] : '--',
                    isACovidComplaint : details ? details.covidCheck : '--',
                    isAServiceComplaint : details ? details.asAServiceCheck : '--',
                    internalLegalExecutiveAssigned : details ? details.assigned_internal_legal_executive : '--',
                    complaintStatement : details ? details.complaintStatement : '--',
                    custCreatedEmail : details ? details.executive_created_email : '--',
                    custCreatedPassword : details ? details.password : '--',
                    approvedClaimAmt : details ? details.actualRefundAmount : '--',
                    companyResponseDoc : '--',
                    igmsDoc : '--',
                    awardRejectedDoc : '--',
                    ombudsmanDoc : '--',
                    complaintCourierReceiptDoc : '--',
                    form6aCourierReceiptDoc : '--',
                    generatedAddress : wholeAddress ? wholeAddress.address : '',

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
                                                    onChange = {handleChange}
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
                                                    onChange = { (e) => handleSelectInsurancetype(e.target.value) }
                                                    onBlur={handleBlur}
                                                >
                                                {policyTypes.map((policyType) => (
                                                    <option value={policyType._id}>{policyType.name}</option>
                                                ))}
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
                                                {claimRejectionTypes.map((type) => (
                                                    <option value={type.value}>{type.label}</option>
                                                ))}
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
                                                {complaintTypes.map((type) => (
                                                    <option value={type._id}>{type.name}</option>
                                                ))}
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
                                                {insuranceCompanies.map((insuranceCompany) => (
                                                    <option value={insuranceCompany._id}>{insuranceCompany.name}</option>
                                                ))}
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
                                                {movementOfCase.map((movement) => (
                                                    <option value={movement.value}>{movement.label}</option>
                                                ))}
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
                                                {policyTypes?.map((key) => (
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
                                                {allExecutives?.map((executive) => (
                                                    <option value={executive.user_id}>{executive.user_id}</option>
                                                ))}
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
                                                {allLegalExecutives?.map((executive) => (
                                                    <option value={executive.user_id}>{executive.user_id}</option>
                                                ))}
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
                                                {allExecutives?.map((executive) => (
                                                    <option value={executive.user_id}>{executive.user_id}</option>
                                                ))}
                                            </select>
                                        </FormGroup>

                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Lead Number</Label>
                                            <Field className="form-control" name="leadNumber" disabled />
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
                                               {allCompanies?.map((company) => (
                                                    <option value={company.user_id}>{company.user_id}</option>
                                                ))}
                                            </select>
                                        </FormGroup>
                                        
                                        <FormGroup className="error-l-100 pt-1">
                                            <Label>Status</Label>
                                            <Field className="form-control" name="status" disabled />
                                            {/* <select name="status"
                                                    className="form-control"
                                                    value={values.status}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                >
                                                <option value="">Select Status</option>
                                                <option value="1">Bihar</option>
                                                <option value="2">2</option>
                                            </select> */}
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
                                                {allOmbudsman?.map((ombudsman) => (
                                                    <option value={ombudsman.user_id}>{ombudsman.user_id}</option>
                                                ))}
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
                                                {allLegalExecutives?.map((executives) => (
                                                    <option value={executives.user_id}>{executives.user_id}</option>
                                                ))}
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
                                                    <Input type="textarea" rows="5" name="complaintStatement" id="statement" />
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
    );
}
