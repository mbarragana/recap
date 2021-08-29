import 'dayjs';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

import stockSymbols from './data/stock_symbols.json';

import DatePicker from './components/DatePicker';
import { getStockTimeSeries } from './api';
import Notification from './components/Notification';
import LineChart from './scene/LineChart';
import DataAnalysis from './scene/DataAnalysis';

import { getMaximumDrawdown, getSimpleReturn } from './helpers/dataAnalysis';
import { toObjectQuery } from './helpers/dataToObject';


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

const maxDate = dayjs(new Date('2018-03-27T00:00:00'));
const initialQuery = {
  startDate: maxDate.subtract(1, 'month').format(),
  endDate: maxDate.format(),
};

const App = () => {
  const classes = useStyles();
  const [ticker, setTicker] = useState();
  const [query, setQuery] = useState(initialQuery);
  const [timeSeries, setTimeSeries] = useState({});
  const [isLoadingTS, setIsLoadingTS] = useState(false);
  const [minDate, setMinDate] = useState();
  const [showNotification, setShowNotification] = useState(false);

  function handleDateRangeChange(attr, value) {
    const newQuery = { ...query, [attr]: value };

    if (dayjs(newQuery.startDate).isAfter(dayjs(newQuery.endDate))) {
      newQuery.endDate = newQuery.startDate
    }
    
    setQuery(newQuery);
  }

  function handleTickerChange(value) {
    setTicker(value);
    setMinDate();
  }

  useEffect(() => {
    async function triggerGetStockTimeSeries() {
      const tm = await getStockTimeSeries(ticker, toObjectQuery(query));
      setTimeSeries(tm);
      setIsLoadingTS(false);
    };


    if(!showNotification && ticker && query.startDate && query.endDate) {
      setIsLoadingTS(true);
      triggerGetStockTimeSeries();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker, query]);

  useEffect(() => {
    const { minDate } = timeSeries;
    const { startDate, endDate } = query;

    if (minDate && dayjs(startDate).isBefore(dayjs(minDate))) {
      const dMinDate = dayjs(minDate);
      const formatted = dMinDate.format();

      setMinDate(formatted);
      setQuery({ startDate: formatted, endDate });
      setShowNotification(true);
    }
  }, [timeSeries, query])

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
                timeSeries={timeSeries.data}
                getDataAnalysisValue={getSimpleReturn}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DataAnalysis
                timeSeries={timeSeries.data}
                getDataAnalysisValue={getMaximumDrawdown}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <LineChart timeSeries={timeSeries.data} />
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

export default App
