/**
 *
 * ClosableDialogTitle
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MuiDialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function ClosableDialogTitle({ children, classes, onClose }) {
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h4">{children}</Typography>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
}

ClosableDialogTitle.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.object,
  children: PropTypes.node,
};

export default memo(ClosableDialogTitle);

