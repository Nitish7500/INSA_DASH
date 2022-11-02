import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import getStatusBuckets from 'data/getStatusBuckets';
import { capitalizeEachWordInString } from 'helpers/CommonHelper';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
} from 'reactstrap';
import { apisURLs } from 'services/apisURLs.services';
import { getAllInsa } from 'services/complaints.services';

export default function AssignCompany({isOpen, onClose}) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const {data} = await getAllInsa();
                setAllUsers(data);
            } catch (error) {
                console.log("States",error);
                NotificationManager.error(
                    error.message,
                    'Failed to download Reports',
                    3000,
                    null,
                    null,
                    'filled'
                );
            }
            setIsLoaded(true);
        }
        getAllUsers();
    }, []);

    console.log(selectedUser);

    async function assignUser() {
        try {
            axios
            .post(
                apisURLs.assignCompanyPOST,
                {
                    assignToCompanyIGMS: '', 
                    id: selectedUser,
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
                <h2 className='mb-0 ml-3'>Case Assign To User</h2>
                <div onClick={onClose} style={{fontSize: '22px', marginRight: '20px'}}>
                    <i className="simple-icon-close" />
                </div>
            </div>
            <ModalBody>
                <label>Assign To</label>
                <select name="resolutionType" className="form-control" onChange={(e)=>setSelectedUser(e.target.value)}>
                    {allUsers?.map((users) => {
                        return (
                            <option value={users?._id}>{users ? users.name : ''}</option>
                        )
                    })}
                </select>
                <div className="text-center mt-4 mb-3">
                    <Button color='success' className='text-center' 
                    onClick={assignUser}
                    >
                        <span className='text-center mt-2'>Assign</span>
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}
