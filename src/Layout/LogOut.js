import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const styles = {
  border: '1px solid transparent',
  background: `linear-gradient(to right, #151929, #151929), linear-gradient(to right, #07a1c0, #99d592)`,
  backgroundClip: 'padding-box, border-box',
  backgroundOrigin: 'padding-box, border-box',
  padding: '4px 10px',
  '&:hover': {
    border: '1px solid transparent',
    background: `linear-gradient(to right, #151929,#151929), linear-gradient(to right, #07a1c0, #99d592)`,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
  },
};

const LogOutConfirmModel = ({open, handleClose, submit }) => {
  const handleOKClick = (e) => {
    e.preventDefault();
    submit(true);
  };

  return (
    <div id="deleteModel">
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiTypography-root": {
            fontFamily: "'audiowide'  !important",
            fontSize:'14px',
            color:"#fff"
          },
          "& .MuiPaper-root":{
            backgroundColor:"#262938 !important"
          }
        }
      }
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className='dialog-content'>
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>
          <p className="gradient-text font-audiowide">No</p>
          </Button>
          <Button sx={styles}  variant="outlined" onClick={handleOKClick} autoFocus>
          <p className="gradient-text font-audiowide">Yes</p>
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogOutConfirmModel;
