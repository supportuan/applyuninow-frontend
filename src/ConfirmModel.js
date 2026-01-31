import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmModel = ({open, handleClose, onConfirm, loading }) => {
  const handleOKClick = (e) => {
    e.preventDefault();
    onConfirm(true);
  };

  return (
    <div id="deleteModel">
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm this Univeristy Offer?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='dialog-content'>
           Are you sure you confirm the OFFER LETTER.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button  variant="outlined" disabled={loading} onClick={handleOKClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModel;
