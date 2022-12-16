import { Editor } from "@tinymce/tinymce-react";
import { NotificationManager } from "components/common/react-notifications";
import { tinyMceApiKey } from "constants/defaultValues";
import React from "react";
import { useRef } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { sendTemplateFunc, sendTemplateMulFunc, updateTemplate, updateTemplateMulFunc } from "services/complaints.services";

function ReminderMail({ isOpen, onClose, getMailTemplateForm, mailData, details }) {

    const editorRef = useRef(null)

  const handleUpdateTemplate = () => {
    
    console.log(getMailTemplateForm)
    if (getMailTemplateForm.formType === "Multiple") {
        updateTemplateMulFunc({
            status: "EXPERT APPROVED DRAFT MAIL",
            UpdatedBy: "Admin",
            caseType: "insurance",
            complaintId:details._id,
            id:details.userId?._id,
            template:"",
            type: getMailTemplateForm.type
        }).then(res =>{
            console.log(res)
            NotificationManager.success(
                res.msg,
                "Mail Template Updated !",
                3000,
                null,
                null,
                "filled"
              );
              onClose()
        })
    }else{
        updateTemplate({
            UpdatedBy: "Admin",
            id:details._id,
            template:editorRef.current?.getContent(),
            type: getMailTemplateForm.type
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                NotificationManager.success(
                    res.msg,
                    "Mail Template Updated !",
                    3000,
                    null,
                    null,
                    "filled"
                  );
                onClose()
            }
        })
        console.log({
            UpdatedBy: "Admin",
            id:details._id,
            template:editorRef.current?.getContent(),
            type: getMailTemplateForm.type
        })
    }

  };

  const handleSendTemplate = () => {
    console.log(getMailTemplateForm)
    if (getMailTemplateForm.formType === "Multiple") {
        
        // console.log({
        //     status: "EXPERT APPROVED DRAFT MAIL",
        //     UpdatedBy: "Admin",
        //     caseType: "insurance",
        //     complaintId:details._id,
        //     emailTo: details.email,
        //     id:details.userId?._id,
        //     type: getMailTemplateForm.type
        // })
        let confirmation = window.confirm("Do You Want to send the Reminder Mail ?")
        if (confirmation === true) {
            sendTemplateMulFunc({
                status: "EXPERT APPROVED DRAFT MAIL",
                UpdatedBy: "Admin",
                caseType: "insurance",
                complaintId:details._id,
                emailTo: details.email,
                id:details.userId?._id,
                type: getMailTemplateForm.type
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    NotificationManager.success(
                        "Mail has been sent !",
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
    
    }else{
        // console.log({
        //     UpdatedBy:"Admin",
        //     emailTo:details.email,
        //     id:details._id,
        //     type:getMailTemplateForm.type
        // })
        let confirmation = window.confirm("Do You Want to send the Reminder Mail ?")
        console.log(confirmation)
        if (confirmation === true) {
            sendTemplateFunc({
                UpdatedBy:"Admin",
                emailTo:details.email,
                id:details._id,
                type:getMailTemplateForm.type
            }).then(res => {
                console.log(res)
                onClose()
                if (res.status === 200) {
                    NotificationManager.success(
                        "Mail has been sent !",
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

  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClose} size="xl">
        <ModalHeader>{getMailTemplateForm.heading} </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <div className="container">
                <h4>{getMailTemplateForm.heading}</h4>
                <div className="row mt-4">
                  {/*  */}
                  {console.log(getMailTemplateForm)}
                  <Editor
                    apiKey={tinyMceApiKey}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={mailData}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex justify-content-center mr-auto ml-auto">
            <button
              className="btn btn-primary rounded mr-3"
              onClick={handleUpdateTemplate}
            >
              Update
            </button>
            <button className="btn btn-primary rounded" onClick={handleSendTemplate}>Send</button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ReminderMail;
