import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  value: {
    color: (earn) => (earn < 0 && palette.error.main)
      || (earn > 0 && palette.success.main)
      || palette.text.primary,
    marginBottom: 0,
  },
}));

function DataAnalysis({ timeSeries, getDataAnalysisValue }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [value, setValue] = useState();
  const classes = useStyles(value);

  useEffect(() => {
    async function triggerGetDataAnalysisValue() {
      const value = await getDataAnalysisValue(timeSeries);
      setValue(value);
      setIsProcessing(false);
    }

    if(timeSeries) {
      setIsProcessing(true);
      triggerGetDataAnalysisValue();
    }
  }, [timeSeries, getDataAnalysisValue]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Maximum Drawdown
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" height="70px">
        {isProcessing && (<CircularProgress />)}
        {!isProcessing && value && (
          <Typography className={classes.value} variant="h3" gutterBottom earn={value}>
            {value}{' '}%
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default DataAnalysis;
