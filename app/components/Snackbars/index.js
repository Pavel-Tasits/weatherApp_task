/**
 *
 * Snackbars
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.spacing(2),
    lineHeight: '20px',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Snackbars({
  open,
  autoHideDuration = 3000,
  severity = 'error',
  title,
  handleClose,
}) {
  const classes = useStyles();
  const anchorOrigin = { vertical: 'top', horizontal: 'center' };
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={handleClose} severity={severity} className={classes.root}>
        {title}
      </Alert>
    </Snackbar>
  );
}

Snackbars.propTypes = {
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  severity: PropTypes.string,
  title: PropTypes.string,
  handleClose: PropTypes.func,
};

export default memo(Snackbars);
