'use client';
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


export default function SwitchStatus({ loan, status }){
    console.log({ status, loan });

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [size, setSize] = React.useState('md')

    const handleOpen = () => {
        setSize('md')
        onOpen();
      }
    
    function handleStatus(){
        if (status !== 'approved') {
            fetchChangeStatus(loan)
        } else {
            handleOpen()
        }
    }

    const fetchChangeStatus = async (loan) => {
        try {
            const response = await fetch("/api/loans", {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    loan
                })
            });

            if(!response.ok){
                console.log("Error al actualizar el prestamo");
            } else{
               window.location.reload();
            }
        } catch(err){
            console.log(`Error: ${err}`);
        }
        };

    return  <>
        <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Prestamo</ModalHeader>
              <ModalBody>
                <p> 
                  Este prestamo ya ha sido aprobado, y no es necesario hacer algo adicional.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button color="success" text="white" onClick={handleStatus}>Aprobar</Button>  
    </>
}