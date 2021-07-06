import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Box from '@material-ui/core/Box';

import {
  UNIT_METRIC,
  UNIT_IMPERIAL,
  SEARCH_BY_COORDS,
  SEARCH_BY_NAME,
  UNIT_VALUE,
} from '../constants';
import location from '../../../images/location.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: 81,
  },
  dCityUnit: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  paper: {
    width: 500,
    padding: '3px 5px',
  },
  formControl: {
    width: '100%',
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1px auto',
    alignItems: 'flex-end',
    '& div': {
      width: '100%',
    },
    '& input': {
      fontSize: 28,
    },
  },
  button: {
    background: 'none',
    fontSize: '20px',
    color: '#1086FF',
  },

  cityName: {
    fontSize: 50,
    lineHeight: '35px',
    color: '#fff',
    marginBottom: 20,
  },

  dGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  group: {
    width: '50px',
    height: '29px',
  },
  btns: {
    border: '1px solid #fff',
    textColor: 'fff',
    '& span': {
      color: '#fff',
    },
    '&:hover': {
      border: '1px solid #fff',
      backgroundColor: '#fffff',
      opacity: '100%',
    },
  },
  btnsActive: {
    border: '1px solid #fff',
    backgroundColor: '#fffff',
    opacity: '100%',
  },

  changeCityWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
  },
  locationWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  changeCityItem: {
    marginTop: 5,
    fontSize: 13,
    color: '#fff',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  [theme.breakpoints.down(601)]: {
    root: {
      paddingTop: 20,
    },
    paper: {
      width: '100%',
    },
    dGroupHide: {
      display: 'none',
    },
    cityName: {
      fontSize: 45,
    },
  },
  [theme.breakpoints.down(481)]: {
    cityName: {
      fontSize: 35,
    },
  },
  [theme.breakpoints.down(376)]: {
    cityName: {
      fontSize: 30,
    },
  },
}));

export function Head({ params, cityName, handleSetParams, handleGetWeather }) {
  const [changeCity, setChangeCity] = useState(
    params.searchBy === SEARCH_BY_NAME,
  );

  const handleChangeUnit = val => {
    if (val && val !== params.unit) {
      const newParams = { ...params, unit: val };
      handleSetParams(newParams);
      if (
        (params.searchBy === SEARCH_BY_NAME && params.cityName) ||
        (params.searchBy === SEARCH_BY_COORDS && params.coords.length > 0)
      ) {
        handleGetWeather(newParams);
      }
    }
  };
  const handleClickByChangeCity = () => {
    setChangeCity(true);
    handleSetParams({ ...params, searchBy: SEARCH_BY_NAME });
  };
  const handleClickByMyLocation = () => {
    setChangeCity(false);
    const newParams = { ...params, searchBy: SEARCH_BY_COORDS };
    handleSetParams(newParams);
    handleGetWeather(newParams);
  };
  const handleSubmit = () => {
    setChangeCity(false);
    handleGetWeather(params);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.dCityUnit}>
        {changeCity ? (
          <Paper elevation={5} className={classes.paper}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                value={params.cityName}
                onChange={e =>
                  handleSetParams({ ...params, cityName: e.target.value })
                }
              />
              <Button
                className={classes.button}
                onClick={params.cityName ? handleSubmit : null}
              >
                OK
              </Button>
            </FormControl>
          </Paper>
        ) : (
          <div className={classes.cityName}>{cityName || '...'}</div>
        )}
        <div className={clsx(classes.dGroup, changeCity && classes.dGroupHide)}>
          <ToggleButtonGroup
            className={classes.group}
            value={params.unit}
            exclusive
            onChange={(e, val) => handleChangeUnit(val)}
          >
            <ToggleButton
              value={UNIT_METRIC}
              className={clsx(
                classes.btns,
                params.unit === UNIT_METRIC && classes.btnsActive,
              )}
            >
              {UNIT_VALUE[UNIT_METRIC]}
            </ToggleButton>
            <ToggleButton
              value={UNIT_IMPERIAL}
              className={clsx(
                classes.btns,
                params.unit === UNIT_IMPERIAL && classes.btnsActive,
              )}
            >
              {UNIT_VALUE[UNIT_IMPERIAL]}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className={classes.changeCityWrap}>
        <Box
          className={classes.changeCityItem}
          onClick={handleClickByChangeCity}
        >
          Сменить город
        </Box>
        {params.coords.length > 0 && (
          <div className={classes.locationWrap}>
            <img src={location} alt="location" />
            <Box
              className={classes.changeCityItem}
              onClick={handleClickByMyLocation}
            >
              Мое местоположение
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}

Head.propTypes = {
  params: PropTypes.object.isRequired,
  cityName: PropTypes.string,
  handleSetParams: PropTypes.func.isRequired,
  handleGetWeather: PropTypes.func.isRequired,
};

export default Head;
