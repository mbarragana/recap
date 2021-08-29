import dayjs from 'dayjs';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

import DatePicker from '../components/DatePicker';
import Notification from '../components/Notification';
import LineChart from '../scene/LineChart';
import DataAnalysis from '../scene/DataAnalysis';

import stockSymbols from '../data/stock_symbols.json';
import { getMaximumDrawdown, getSimpleReturn } from '../helpers/dataAnalysis';

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
  lineProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }
}));

function DataView({
  isLoadingTS,
  handleTickerChange,
  handleDateRangeChange,
  query,
  maxDate,
  showNotification,
  setShowNotification,
  minDate,
  data,
}) {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="main" maxWidth="lg">
      { isLoadingTS && <LinearProgress className={classes.lineProgress} />}
      <form className={classes.container} noValidate>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Autocomplete
              id="ticker"
              fullWidth
              options={stockSymbols}
              getOptionLabel={(option) => option}
              renderInput={(props) => <TextField {...props} label="Ticker" />}
              onChange={({ target }) => handleTickerChange(target.textContent)}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              fullWidth
              label="Start Date"
              value={query.startDate}
              onChange={value => handleDateRangeChange('startDate', value.format())}
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
              value={query.endDate}
              onChange={value => handleDateRangeChange('endDate', value.format())}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!query.startDate}
              minDate={query.startDate}
              maxDate={maxDate}
              format="DD/MM/YYYY"
            />
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DataAnalysis
                timeSeries={data}
                getDataAnalysisValue={getSimpleReturn}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DataAnalysis
                timeSeries={data}
                getDataAnalysisValue={getMaximumDrawdown}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <LineChart timeSeries={data} />
            </Paper>
          </Grid>
        </Grid>
      </form>
      <Notification
        severity="warning"
        show={showNotification}
        onClose={() => setShowNotification(false)}
      >
        The oldest available date for this stock is {dayjs(minDate).format('MMMM D, YYYY')}.
      </Notification>
    </Container>  
  );
}

export default DataView;
