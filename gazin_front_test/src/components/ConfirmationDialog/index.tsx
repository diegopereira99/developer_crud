import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


export interface ConfirmationDialogProps {
  open: boolean,
  title?: string,
  message?: string,
  onConfirm: Function,
  onDismiss: Function
}

export default function ConfirmationDialog({open, title, message, onConfirm, onDismiss} : ConfirmationDialogProps) {
  if(!open) {
    return <></>
  }
  
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={()=>onDismiss()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>onDismiss()} color="primary">
            Não
          </Button>
          <Button onClick={()=>onConfirm()} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
