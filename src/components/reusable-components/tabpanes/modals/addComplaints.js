import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Table,
} from 'reactstrap';
import { apisURLs } from 'services/apisURLs.services';

export default function AddComplaint({isOpen, onClose, leadId, userId }) {
        
    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Add More Complaints</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <h4>CSV Upload</h4>
                <div className="my-3">
                    <p className="my-2">
                        <span className="text-bold">User Id :</span>
                        <b><span className='text-warning ml-2'>{userId}</span></b>
                    </p>
                    <p className="my-2">
                        <span className="text-bold">Lead Id :</span>
                        <b><span className='text-warning ml-2'>{leadId}</span></b>
                    </p>
                </div>
                <div className="mt-3">
                    <div className="flex-sb">
                        <FormGroup className='my-3'>
                            <Label for="companyresponse">User CSV File :</Label>
                            <Input id="companyresponse" name="companyResponseDoc" type="file" />
                        </FormGroup>
                        <Button color='secondary'>
                            <FontAwesomeIcon icon={faFileUpload} />
                        </Button>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="flex-sb">
                        <FormGroup className='my-3'>
                            <Label for="companyresponse">Complaint CSV File :</Label>
                            <Input id="companyresponse" name="companyResponseDoc" type="file" />
                        </FormGroup>
                        <Button color='secondary'>
                            <FontAwesomeIcon icon={faFileUpload} />
                        </Button>
                    </div>
                </div>
                <div className="text-center mt-4 mb-3">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{leadId}</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>{userId}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </ModalBody>
        </Modal>
    )
}
