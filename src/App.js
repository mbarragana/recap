import 'dayjs';
import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/core/styles';

import DatePicker from './components/DatePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const maxDate = dayjs().subtract(1,'day');

const initialState = {
  start_date: maxDate.subtract(1, 'month'),
  end_date: maxDate,
};

const App = () => {
  const classes = useStyles();
  const [state, setState] = useState(initialState);

  function handleChange(attr, value) {
    setState({
      ...state,
      [attr]: value,
    })
  }

  function handleStartDateChange(value) {
    const nextState = { ...state };

    const formatted = value.format();
    if (value.isAfter(dayjs(state.end_date))) {
      nextState.end_date = formatted;
    }

    nextState.start_date = formatted;
    setState(nextState);
  }

  return (
    <Container className={classes.root} component="main" maxWidth="lg">
      <form className={classes.container} noValidate>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Autocomplete
              id="ticker"
              fullWidth
              options={['FB', 'APPL']}
              getOptionLabel={(option) => option}
              renderInput={(props) => <TextField {...props} label="Ticker" />}
              value={state.ticker}
              onChange={value => handleChange('ticker', value)}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              fullWidth
              label="Start Date"
              value={state.start_date}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              format="DD/MM/YYYY"
              maxDate={maxDate}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              fullWidth
              label="End Date"
              value={state.end_date}
              onChange={value => handleChange('end_date', value.format())}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!state.start_date}
              minDate={state.start_date}
              maxDate={maxDate}
              format="DD/MM/YYYY"
            />
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </form>
    </Container>  
  );
}

export default App
