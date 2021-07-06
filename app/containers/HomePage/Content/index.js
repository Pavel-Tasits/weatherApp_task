import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { UNIT_IMPERIAL, UNIT_METRIC, UNIT_VALUE } from '../constants';

const useStyles = makeStyles(theme => ({
  iconNumberWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '67px auto 0',
  },
  icon: {
    width: 222,
  },
  number: {
    fontSize: 110,
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 150,
  },

  footer__info: {
    color: '#fff',
  },
  footer__info_descr: {
    fontSize: 18,
    textAlign: 'center',
  },
  footer__info_text: {
    fontSize: 25,
    textAlign: 'center',
  },

  [theme.breakpoints.down(801)]: {
    iconNumberWrap: {
      margin: '25px auto 0',
    },
    text: {
      marginBottom: 75,
    },
    footer__info_text: {
      fontSize: 22,
    },
  },

  [theme.breakpoints.down(601)]: {
    iconNumberWrap: {
      marginTop: 50,
    },
    icon: {
      width: 120,
    },
    number: {
      fontSize: 55,
    },
    text: {
      marginBottom: 77,
    },
    footer__info_descr: {
      fontSize: 15,
    },
    footer__info_text: {
      fontSize: 15,
    },
  },

  [theme.breakpoints.down(361)]: {
    footer__info_descr: {
      fontSize: 13,
    },
    footer__info_text: {
      fontSize: 12,
    },
  },
}));

export function Content({ data, params, urlIcon }) {
  const classes = useStyles();

  return (
    <>
      {data.id && (
        <>
          <div className={classes.iconNumberWrap}>
            {urlIcon && (
              <img src={urlIcon} alt="Logo" className={classes.icon} />
            )}
            <div className={classes.number}>
              {`${Math.round(data.main.temp)}`}
              {'\u00b0'}
              {params.unit === UNIT_METRIC
                ? UNIT_VALUE[UNIT_METRIC]
                : UNIT_VALUE[UNIT_IMPERIAL]}
            </div>
          </div>
          <div className={classes.text}>
            {data.weather[0].description.toUpperCase()}
          </div>
          <Grid container spacing={3}>
            <Grid item md={4} xs={4}>
              <div className={classes.footer__info}>
                <div className={classes.footer__info_descr}>Ветер</div>
                <div className={classes.footer__info_text}>
                  {`${data.wind.speed} м/с`}
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={4}>
              <div className={classes.footer__info}>
                <div className={classes.footer__info_descr}>Давление</div>
                <div className={classes.footer__info_text}>
                  {`${Math.round(data.main.pressure / 1.333)} мм рт. ст.`}
                </div>
              </div>
            </Grid>
            <Grid item md={4} xs={4}>
              <div className={classes.footer__info}>
                <div className={classes.footer__info_descr}>Влажность</div>
                <div className={classes.footer__info_text}>
                  {`${data.main.humidity}%`}
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

Content.propTypes = {
  data: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  urlIcon: PropTypes.string,
};

export default Content;
