import {useEffect, useState} from 'react';
import {Grid,Table,Button,Loading, useToasts, useModal, Modal} from '@geist-ui/react';

const Payment = (props) =>{
    const { visible, setVisible, bindings } = useModal()
    useEffect(() => {
        setVisible(true)
    },[])
    return (
      <>
        <Button auto onClick={() => setVisible(true)}>שלם</Button>
        <Modal width="1240x" {...bindings}>
          <Modal.Title>תשלום</Modal.Title>
          {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
          <Modal.Content>
            {/* <p>Some content contained within the modal.</p> */}
            <iframe width="1200px" height="625px" src={props.url}/>
          </Modal.Content>
          {/* <Modal.Action passive onClick={() => setVisible(false)}>Cancel</Modal.Action>
          <Modal.Action>Submit</Modal.Action> */}
        </Modal>
      </>
    )
}
export default Payment;