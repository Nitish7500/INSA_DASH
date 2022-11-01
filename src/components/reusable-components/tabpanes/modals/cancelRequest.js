import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import getStatusBuckets from 'data/getStatusBuckets';
import { capitalizeEachWordInString } from 'helpers/CommonHelper';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
} from 'reactstrap';
import { apisURLs } from 'services/apisURLs.services';

export default function CancelRequest({isOpen, onClose }) {

    // const [selectedStatus, setSelectedStatus] = useState();
    // console.log(insuranceId)

    // async function cancelRequest() {
    //     try {
    //         axios
    //         .post(
    //             apisURLs.setStatus,
    //             {
    //                 expert: '', 
    //                 id: insuranceId,
    //                 legalExpert: '',
    //                 status: selectedStatus,
    //                 userEntryId: '',
    //                 user_id: ''
    //             })
    //             .then((res) => {
    //                 NotificationManager.success(
    //                     res.data.message,
    //                     'Successfully Changed Status !',
    //                     3000,
    //                     null,
    //                     null,
    //                     'filled'
    //                 );
    //                 onClose();
    //             })
    //         } catch (error) {
    //             console.log('Emails ', error);
    //             NotificationManager.error(
    //                 error.message,
    //                 'Failed to download Reports',
    //                 3000,
    //                 null,
    //                 null,
    //                 'filled'
    //             );
    //             onClose();
    //         }
    // };
        
    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Cancel Request</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <label>Request sent to Customer</label>
                <select name="resolutionType" className="form-control" onChange={(e)=>setSelectedStatus(e.target.value)}>
                    {/* {getStatusBuckets.map((item) => {
                        return (
                            <option value={item}>{item}</option>
                        )
                    })} */}
                </select>
                <div className="text-center mt-4 mb-3">
                    <Button color='danger' className='text-center'
                    //  onClick={updateStatus}
                    >
                        <span className='text-center'>Cancel Request</span>
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}
