//get email data

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Badge, Button, Card, CardBody, CardHeader, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faCalendarDays, faDownload, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertsUi from 'views/app/ui/components/alerts';
import { searchEmailPolicy } from 'services/complaints.services';
import axios from 'axios';
import { getCurrentUser } from 'helpers/Utils';
import { apisURLs } from 'services/apisURLs.services';
import { formatDate } from 'helpers/CommonHelper';
import { Editor } from '@tinymce/tinymce-react';
import { tinyMceApiKey } from 'constants/defaultValues';


export default function GetEmailData ({ heading, details, complaintId  }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [emails, setEmails] = useState([]);
    const editorRef = useRef(null);

    const { policyNumber } = details;
    
    useEffect(() => {
        async function fetchData() {
            try {
                axios
                .post(
                    apisURLs.searchEmailPolicy,
                    {
                        id: complaintId, 
                        policy_number: policyNumber
                    }
                    )
                    .then((res) => {
                        // console.log(res.data)
                        return res.data;
                    })
                    .then((data) => {
                        setEmails(data.data);
                    });
                } catch (error) {
                    console.log('Emails ', error)
                }
                setIsLoaded(true);
            }
            fetchData();
        }, [complaintId, policyNumber]);
        
        // console.log(emails);

    return (
        // <Card>
            <CardBody>
                {/* <h2 className="mb-4">{heading}</h2> */}
                <Formik initialValues={{
                    //formvalues fetched from api will be stored here
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
                    email
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                        <Row className="mb-4">
                            <Colxx xxs="12" lg="12">

                                <Row className="mb-3">
                                    <Colxx xxs="12" lg="12" className="mb-5">
                                        <FormGroup className="error-l-100">
                                            <Label className="d-block">Search Email Data</Label>
                                            <div className="flex">
                                                <Field className="form-control" name="emailSearchParams" />
                                                <Button color="primary" className='ml-3' onClick={(e)=>e.preventDefault()}>
                                                    Search
                                                </Button>
                                            </div>
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                {emails.map((email) => {
                                    return (
                                    // Single Email Card
                                    <Card key={email._id} className="mb-5">
                                        <CardBody>
                                            {/* Field */}
                                            <div className="flex mb-1">
                                                <h3>{email.subject}</h3>
                                            </div>
                                            {/* Field */}
                                            <div className="flex mb-3 ccfield">
                                                <p>
                                                    <span>CC : </span>
                                                    <span className="email-tab">{email.email_cc}</span>
                                                </p>
                                            </div>
                                            {/* Field */}
                                            <div className="flex-sb mb-3">
                                                <div className="mailtype">
                                                    <Badge color='primary'>{email.emailType}</Badge>
                                                </div>
                                                <p className="date">
                                                    <span className='mr-2'>Sent Date - </span>
                                                    <Badge>
                                                        <FontAwesomeIcon icon={faCalendarDays} /> 
                                                        <span className='pl-2'>{email.created_date}</span>
                                                    </Badge>
                                                </p>
                                            </div>
                                            {/* Field */}
                                            <div className="mb-3">
                                            <Editor
                                                apiKey={tinyMceApiKey}
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue = {email.emaildata}
                                                init={{
                                                height: 300,
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
                                            </div>
                                            {/* Field */}
                                            <div className="flex mt-4 mb-4">
                                                <h6 className='mr-2 mb-0'>Update Draft : </h6>
                                                <div className="mailtype">
                                                    <Badge className='ml-2' color='success'>{email.drafted_by}</Badge>
                                                </div>
                                            </div>
                                            {/* Field */}
                                            <div className="flex-sb">
                                                <div className="flex-sb">
                                                    <Button color='danger' onClick={(e) => {
                                                        e.preventDefault();
                                                    }}>Delete Mail from All Complaints</Button>
                                                    <Button color='warning' className='ml-4' onClick={(e) => {
                                                        e.preventDefault();
                                                    }}>Delete Mail from Single Complaint</Button>
                                                </div>
                                                <Button color='primary' onClick={(e) => {
                                                    e.preventDefault();
                                                }}>Send Email To Customer</Button>
                                            </div>
                                            {/* Field */}
                                        </CardBody>
                                    </Card>
                                    )
                                })}

                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        // </Card>
    )
}