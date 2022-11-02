//igms section nested form

import { Colxx } from 'components/common/CustomBootstrap'
import { FormikCheckbox, FormikCustomCheckboxGroup, FormikCustomRadioGroup, FormikDatePicker } from 'containers/form-validations/FormikFields'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { faAdd, faArrowRight, faCancel, faCheck, faUser, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectReminderType } from 'constants/formValues';
import SetStatus from '../modals/setStatus';
import CancelRequest from '../modals/cancelRequest';
import AddComplaint from '../modals/addComplaints';
import { getComplaintDetailsById } from 'services/complaints.services';
import AssignCompany from '../modals/assignToCompany';


export default function OtherActions ({ heading, complaintId }) {

    const [isSetStatusModal, setIsSetStatusModal] = useState(false);
    const [isCancelReqModal, setIsCancelReqModal] = useState(false);
    const [addComplaintModal, setAddComplaintModal] = useState(false);
    const [documentUploadModal, setDocumentUploadModal] = useState(false);
    const [assignCompanyModal, setAssignCompanyModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const onCloseStatusHistoryModal = () => {
        setIsSetStatusModal(!isSetStatusModal);
    }

    const onCloseCancelRequestModal = () => {
        setIsCancelReqModal(!isCancelReqModal);
    }

    const onCloseAddComplaintModal = () => {
        setAddComplaintModal(!addComplaintModal);
    }

    const onCloseAssignCompanyModal = () => {
        setAssignCompanyModal(!assignCompanyModal);
    }

    //getting Complaint by Id through complaints.services
    useEffect(() => {
        const fetchData = async () => {
        try {
            const {data} = await getComplaintDetailsById(complaintId);
            setItems(data);
        } catch (error) {
            console.log("ComplaintDetails",error)
        }
        setIsLoaded(true);
        }
        fetchData();
    }, []);

    const leadId = items ? (items.leadId ? items.leadId._id : '') : '';
    const userId = items ? (items.userId ? items.userId._id : '') : '';

    return (
        <Card>
            <CardBody>
                <h2 className="mb-4">{heading}</h2>
                <Row className="mb-4">
                    <Colxx xxs="12" lg="12" className="mb-5">

                        <Row>
                            <Colxx xxs="12" lg="12">
                                <div className="flex">
                                    <h5>Lead ID - </h5>
                                    <h5 className='text-warning ml-2'>{complaintId}</h5>
                                </div>
                            </Colxx>
                        </Row>
                        <div className="my-3">
                            <h3>Request Actions</h3>

                            <div className="actions flex my-4">
                                <div className="flex-cc">
                                    <Button color='primary' size='md' className="top-right-button mr-3" onClick={() => setAddComplaintModal(!addComplaintModal)}>
                                        <FontAwesomeIcon icon={faAdd} />
                                        <span className='text-center mt-2 ml-3'>Add More Complaint</span>
                                    </Button>
                                </div>
                                <div className="flex-cc mr-3">
                                    <Button color='warning' className='text-center' onClick={() => setIsSetStatusModal(!isSetStatusModal)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <span className='text-center mt-2 ml-3'>Status Change</span>
                                    </Button>
                                </div>
                                <div className="flex-cc">
                                    <Button color='success' className='text-center'>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                        <span className='text-center mt-2 ml-3'>Request From Customer</span>
                                    </Button>
                                </div>
                                <div className="flex-cc ml-3">
                                    <Button color='danger' className='text-center' onClick={() => setIsCancelReqModal(!isCancelReqModal)}>
                                        <FontAwesomeIcon icon={faCancel} />
                                        <span className='text-center mt-2 ml-3'>Cancel Request</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <h3>Assign Complaint</h3>
                            <div className="actions flex my-3">
                                <div className="flex-cc mr-3">
                                    <Button color='primary' className='text-center' onClick={() => setAssignCompanyModal(!assignCompanyModal)}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className='text-center mt-2 ml-3'>Assign To Company / IGMS </span>
                                    </Button>
                                </div>
                                <div className="flex-cc">
                                    <Button color='success' className='text-center'>
                                        <FontAwesomeIcon icon={faUserTag} />
                                        <span className='text-center mt-2 ml-3'>Assign to Ombudsman</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <h3>Generate Single OR multiple Reminder Mail</h3>
                            <div className="actions flex my-3 row">
                                <div className="flex-cc mr-3 col-12 col-md-6">
                                    <select name="education" className="form-control">
                                        {selectReminderType.map((level) => (
                                            <option value={level.value}>{level.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-cc mr-3">
                                    <Button color='warning' className='text-center'>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className='text-center mt-2 ml-3'>Assign To Company/IGMS:</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <h3 className='mb-3'>IGMS / Ombudsman Award and Ombudsman requirement Documents Upload</h3>
                            <Button color="warning" onClick={() => setDocumentUploadModal(true)} >Upload Documents</Button>
                            <FormGroup>
                                {/* Document Upload Modal */}
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
                        </div>

                    </Colxx>
                </Row>
            </CardBody>

            <SetStatus 
                isOpen = {isSetStatusModal}
                onClose = {onCloseStatusHistoryModal}
                insuranceId = {complaintId}
            />

            <CancelRequest 
                isOpen = {isCancelReqModal}
                onClose = {onCloseCancelRequestModal}
            />

            <AddComplaint 
                isOpen = {addComplaintModal}
                onClose = {onCloseAddComplaintModal}
                userId = {userId}
                leadId = {leadId}
            />

            <AssignCompany 
                isOpen = {assignCompanyModal}
                onClose = {onCloseAssignCompanyModal}
            />


        </Card>
    )
}

