/**
 *
 * ProgressCircular
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  dBackgroundPreloader: {
    background: '#fff',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
    opacity: 0.5,
  },
  dPreloader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    '& img': {
      width: '200px',
    },
    marginTop: '-25px',
    marginLeft: '-25px',
    zIndex: 1001,
  },
  circularProgress: {
    display: 'flex',
  },
}));

function ProgressCircular() {
  const classes = useStyles();
  return (
    <>
      <div
        className={classes.dBackgroundPreloader}
        style={{ opacity: '0.5' }}
      />
      <div className={classes.dPreloader}>
        <div className={classes.circularProgress}>
          <CircularProgress variant="indeterminate" />
        </div>
      </div>
    </>
  );
}

export default memo(ProgressCircular);
