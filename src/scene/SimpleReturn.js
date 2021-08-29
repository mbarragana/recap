import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { getSimpleReturn } from '../helpers/dataAnalysis';

const useStyles = makeStyles(({ palette }) => ({
  value: {
    color: (earn) => (earn < 0 && palette.error.main)
      || (earn > 0 && palette.success.main)
      || palette.text.primary,
    marginBottom: 0,
  },
}));

const SimpleReturn = ({ timeSeries }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [simpleReturn, setSimpleReturn] = useState();

  useEffect(() => {
    async function triggerGetSimpleReturn() {
      const value = await getSimpleReturn(timeSeries);
      setSimpleReturn(value);
      setIsProcessing(false);
    }

    if(timeSeries) {
      setIsProcessing(true);
      triggerGetSimpleReturn();
    }
  }, [timeSeries]);

  const classes = useStyles(simpleReturn);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Simple Return
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" height="70px">
        {isProcessing && (<CircularProgress />)}
        {!isProcessing && simpleReturn && (
          <Typography
            className={classes.value}
            variant="h3"
            gutterBottom
            earn={simpleReturn}
          >
            {simpleReturn}{' '}%
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default SimpleReturn;
