//get email data

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Alert, Badge, Button, Card, CardBody, CardHeader, CustomInput, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faCalendarDays, faDownload, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertsUi from 'views/app/ui/components/alerts';


export default function GetEmailData ({ heading }) {

    const [documentUploadModal, setDocumentUploadModal] = useState(false);

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
                    values
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

                                <Card>
                                    <CardBody>
                                        {/* Field */}
                                        <div className="flex mb-1">
                                            <h3>Email Subject will go here and it can take up to 2-3 lines too . . .</h3>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mb-3 ccfield">
                                            <p>
                                                <span>CC : </span>
                                                <span className="email-tab">ravi@insurancesamadhan.com</span>
                                                <span className="email-tab">ravi@insurancesamadhan.com</span>
                                                <span className="email-tab">ravi@insurancesamadhan.com</span>
                                            </p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex-sb mb-3">
                                            <div className="mailtype">
                                                <Badge color='primary'>Escalation Draft Email</Badge>
                                            </div>
                                            <p className="date">
                                                <span className='mr-2'>Sent Date - </span>
                                                <Badge>
                                                    <FontAwesomeIcon icon={faCalendarDays} /> 
                                                    <span className='pl-2'>dd/mm/yyyy</span>
                                                </Badge>
                                            </p>
                                        </div>
                                        {/* Field */}
                                        <div className="mb-3">
                                            <p className='mail-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, exercitationem nihil impedit eligendi doloribus consequuntur magnam quia nisi! Dicta accusantium, fuga officia pariatur nesciunt qui nemo quam minus distinctio sequi.
                                            Nulla alias sapiente mollitia cupiditate porro molestias incidunt. Maiores praesentium quaerat libero fugit impedit sed molestiae reiciendis magnam velit enim! Minus porro omnis, illum reiciendis sint architecto vero iusto quis.
                                            Veniam eos soluta in autem! Minima nisi ex, quos sit nam odio inventore nemo iste voluptates quasi quia a rerum dolorem quo commodi, similique tempore maiores? Ut tenetur vero praesentium. Consequuntur vero aperiam, blanditiis minus voluptates consequatur dicta aliquam autem quidem neque deserunt quibusdam accusamus incidunt provident alias dolor. Quidem accusamus similique quia.</p>
                                            <p className='mail-content'>
                                            Doloribus quaerat quam aut voluptatem, necessitatibus qui?
                                            Odio vero hic illo veniam et, perferendis cumque! Iure quia nostrum autem officiis vero quisquam illo, aspernatur temporibus! Consequatur vero expedita placeat repellendus commodi, culpa praesentium et eveniet distinctio eaque.
                                            Enim soluta blanditiis minima, rem temporibus porro iusto mollitia voluptatum modi reprehenderit cupiditate recusandae iste nostrum, autem voluptatem quam.
                                            Aspernatur hic cumque esse vel suscipit porro a ex quod numquam? </p>
                                            <p className='mail-content'>
                                            Hic possimus, quis perspiciatis assumenda, cupiditate consequatur fugiat deleniti, at enim illo perferendis beatae cumque blanditiis temporibus laboriosam illum quam commodi sapiente.</p>
                                        </div>
                                        {/* Field */}
                                        <div className="flex mt-4 mb-4">
                                            <h6 className='mr-2 mb-0'>Update Draft : </h6>
                                            <div className="mailtype">
                                                <Badge className='ml-2' color='secondary'>Escalation Draft Email</Badge>
                                                <Badge className='ml-2' color='secondary'>First Draft Email</Badge>
                                                <Badge className='ml-2' color='secondary'>IGMS First Entry</Badge>
                                                <Badge className='ml-2' color='secondary'>IGMS Escalation Entry</Badge>
                                            </div>
                                        </div>
                                        {/* Field */}
                                        <div className="flex-sb">
                                            <Button color='warning'>Action</Button>
                                            <Button color='primary'>Send Email To Customer</Button>
                                        </div>
                                        {/* Field */}
                                    </CardBody>
                                </Card>

                            </Colxx>
                        </Row>
                    </Form>
                )}
                </Formik>
            </CardBody>
        // </Card>
    )
}

