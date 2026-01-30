import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Document, Page , pdfjs} from 'react-pdf';
import { useState, useCallback , useEffect} from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import forwardArrow from "../../../assets/allstudents/forwardArrow.svg";
import backwardArrow from "../../../assets/allstudents/backwardArrow.svg";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PdfViewer = ({ open, handleClose, handleDowload, item }) => {
  useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const changePage = useCallback(
    (offset) => setPageNumber((prevPageNumber) => (prevPageNumber || 1) + offset),
    [],
  );
  const previousPage = useCallback(() => changePage(-1), [changePage]);

  const nextPage = useCallback(() => changePage(1), [changePage]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        className='mui-dialog-close'
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <p className="font-audiowide"> {item.name}</p>
        </BootstrapDialogTitle>
        <DialogContent dividers className='min-w-4xl	'>
          <Document file={item.url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
          </Document>
         
        </DialogContent>
        {
          numPages> 1 && (
            <DialogContent dividers className='min-w-4xl pdf-actions	'>
            <div className="Test__container__content__controls">
              <img src={backwardArrow} onClick={previousPage} className={`${pageNumber <= 1 ? 'cursor-not-allowed':'cursor-pointer'}`} />
                <span className='text-xs md:text-sm'>{`Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`}</span>
                <img src={forwardArrow} onClick={nextPage} className={`${pageNumber >= numPages ? 'cursor-not-allowed':'cursor-pointer'}`} />
    
              </div>
            </DialogContent>
          )
        }
       

        <DialogActions>
          <Button autoFocus onClick={handleDowload}>
          <p className="font-audiowide">Download</p>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default PdfViewer