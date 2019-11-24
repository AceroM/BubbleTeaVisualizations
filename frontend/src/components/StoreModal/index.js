import React, { useEffect } from 'react';
import './StoreModal.scss';
import Modal from '@material-ui/core/Modal';

const StoreModal = ({ open, handleClose }) => {
  useEffect(() => {
    console.log('modal mounted');
  }, []);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={() => handleClose}
    >
      <div className="modal">
        <p> Modal content here</p>
      </div>
    </Modal>
  );
};

export default StoreModal;
