import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import ClosableDialogTitle from '../ClosableDialogTitle';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));

function DialogMessage({ open, handleClose, title, message }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <ClosableDialogTitle onClose={handleClose} classes={classes}>
          {title}
        </ClosableDialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          <Typography gutterBottom>{message}</Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default memo(DialogMessage);
