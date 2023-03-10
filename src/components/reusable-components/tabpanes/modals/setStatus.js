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

export default function SetStatus({isOpen, onClose, insuranceId}) {

    const [selectedStatus, setSelectedStatus] = useState();

    async function updateStatus() {
        try {
            axios
            .post(
                apisURLs.setStatusPOST,
                {
                    expert: '', 
                    id: insuranceId,
                    legalExpert: '',
                    status: selectedStatus,
                    userEntryId: '',
                    user_id: ''
                })
                .then((res) => {
                    NotificationManager.success(
                        res.data.message,
                        'Successfully Changed Status !',
                        3000,
                        null,
                        null,
                        'filled'
                    );
                    onClose();
                })
            } catch (error) {
                console.log('Emails ', error);
                NotificationManager.error(
                    error.message,
                    'Failed to download Reports',
                    3000,
                    null,
                    null,
                    'filled'
                );
                onClose();
            }
    };
        
    
    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className='d-flex w-100 justify-content-between p-4 border-bottom'>
                <h2 className='mb-0 ml-3'>Change Status</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <select id='selectStatusBck' name="resolutionType" className="form-control" onChange={(e)=>setSelectedStatus(e.target.value)}>
                    {getStatusBuckets.map((item) => {
                        let index = item[1];
                        return (index.map((option) => {
                            return (
                                <option key={option} value={option}>{capitalizeEachWordInString(option)}</option>
                            )
                        }))
                    })}
                </select>
                <div className="text-center mt-4 mb-3">
                    <Button id='updateStatusBtn' color='success' className='text-center' onClick={updateStatus}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span className='text-center mt-2 ml-3'>Update Status</span>
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}
