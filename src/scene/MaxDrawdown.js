import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { getMaximumDrawdown } from '../helpers/dataAnalysis';

const useStyles = makeStyles(({ palette }) => ({
  value: {
    color: (earn) => (earn < 0 && palette.error.main)
      || (earn > 0 && palette.success.main)
      || palette.text.primary,
    marginBottom: 0,
  },
}));

function MaxDrawdown({ timeSeries }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [maxDrawdown, setMaxDrawdown] = useState();
  const classes = useStyles(maxDrawdown);

  useEffect(() => {
    async function triggerGetMaximumDrawdown() {
      const value = await getMaximumDrawdown(timeSeries);
      setMaxDrawdown(value);
      setIsProcessing(false);
    }

    if(timeSeries) {
      setIsProcessing(true);
      triggerGetMaximumDrawdown();
    }
  }, [timeSeries]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Maximum Drawdown
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" height="70px">
        {isProcessing && (<CircularProgress />)}
        {!isProcessing && maxDrawdown && (
          <Typography className={classes.value} variant="h3" gutterBottom earn={maxDrawdown}>
            {maxDrawdown}{' '}%
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default MaxDrawdown;
