import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationManager } from 'components/common/react-notifications';
import React from 'react';
import { useState } from 'react';
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
import { addComUser, uploadComCSV } from 'services/complaints.services';

export default function AddComplaint({isOpen, onClose, leadId, userId, details }) {
    let [uploadUserCSV, setuploadUserCSV] = useState(false)

    const handleChange = (e) => {
        console.log(e.target.name)
        let name = e.target.name
        if(name === "userCSV"){
            const form = new FormData()
            form.set("user", e.target.files[0])
            uploadComCSV(form).then(res => {
                if (res.Status === 200) {
                    setuploadUserCSV(true)
                }
            })
        }else if(name === "complaint"){
            const form = new FormData()
            form.set("complaint", e.target.files[0])
            uploadComCSV(form).then(res => {
                if (res.Status === 200) {
                    setuploadUserCSV(true)
                }
            })
        }
    }

    const handleUploadUserFile = (type) => {
        if(uploadUserCSV){
            addComUser({complaint:details, type:type}).then(res => {
                console.log(res)
                if (res.status === 200) {
                    NotificationManager.success(
                        "File Uploaded !",
                        res.msg,
                        3000,
                        null,
                        null,
                        "filled"
                    )
                }else{
                    NotificationManager.error(
                        "Something went wrong !",
                        res.msg,
                        3000,
                        null,
                        null,
                        "filled"
                    )
                }

            })
        }
    }
        
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
                            <Input id="companyresponse" type="file" name="userCSV" onChange={handleChange} />
                        </FormGroup>
                        <Button color='secondary' onClick={() => {handleUploadUserFile("User")}}>
                            <FontAwesomeIcon icon={faFileUpload} />
                        </Button>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="flex-sb">
                        <FormGroup className='my-3'>
                            <Label for="companyresponse">Complaint CSV File :</Label>
                            <Input id="companyresponse" name="complaint" type="file" onChange={handleChange} />
                        </FormGroup>
                        <Button color='secondary' onClick={() => {handleUploadUserFile("Complaint")}}>
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
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-danger rounded' onClick={onClose}>CLOSE</button>
                </div>
            </ModalBody>
        </Modal>
    )
}
