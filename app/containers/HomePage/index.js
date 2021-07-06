/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  selectLoading,
  selectData,
  selectDataError,
  selectCorsError,
} from './selectors';
import { getData, closeSnackbar } from './actions';
import reducer from './reducer';
import saga from './saga';
import { PARAMS, SEARCH_BY_COORDS, ICON_OBJECTS } from './constants';
import getIconObject from './utils';

import Head from './Head';
import Content from './Content';
import DialogMessage from '../../components/DialogMessage';
import ProgressCircular from '../../components/ProgressCircular';
import Snackbars from '../../components/Snackbars';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    background: '#498CEC',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  linkCors: {
    padding: 10,
  },
}));

export function HomePage({
  loading,
  data,
  dataError,
  corsError,
  handleGetWeather,
  handleCloseSnackbar,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [params, setParams] = useState(PARAMS);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setParams({
        ...params,
        searchBy: SEARCH_BY_COORDS,
        coords: [position.coords.latitude, position.coords.longitude],
      });
    });
  }, []);
  useEffect(() => {
    if (params.coords.length > 0) {
      handleGetWeather(params);
    }
  }, [params.coords]);

  const weatherId = _.get(data, 'weather[0].id');
  const iconObject = weatherId ? getIconObject(weatherId) : null;
  const styleBg = iconObject
    ? { background: ICON_OBJECTS[iconObject].backgroundColor }
    : {};
  const urlIcon = iconObject ? ICON_OBJECTS[iconObject].url : '';

  const [openDialog, setOpenDialog] = useState();
  useEffect(() => {
    setOpenDialog(corsError);
  }, [corsError]);

  const classes = useStyles();

  return (
    <div className={classes.root} style={styleBg}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {loading && <ProgressCircular />}
      <Container maxWidth="md">
        <Head
          params={params}
          cityName={data.name}
          handleSetParams={setParams}
          handleGetWeather={handleGetWeather}
        />
        <Content data={data} params={params} urlIcon={urlIcon} />
      </Container>
      {dataError.message && (
        <Snackbars
          open={!!dataError}
          title={dataError.message}
          handleClose={handleCloseSnackbar}
        />
      )}
      {openDialog && (
        <DialogMessage
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          title="CORS Error"
          message={
            <>
              Перейдите по ссылке
              <a
                className={classes.linkCors}
                target="_blank"
                href="https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather"
              >
                CORS-ANYWHERE
              </a>
              и подтвердите использование.
            </>
          }
        />
      )}
    </div>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  dataError: PropTypes.object.isRequired,
  corsError: PropTypes.bool.isRequired,
  handleGetWeather: PropTypes.func.isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  data: selectData(),
  dataError: selectDataError(),
  corsError: selectCorsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetWeather: params => dispatch(getData(params)),
    handleCloseSnackbar: () => dispatch(closeSnackbar()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
