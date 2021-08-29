import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getDataSeries } from '../helpers/dataAnalysis';

function LineChart({ timeSeries }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dataSeries, setDataSeries] = useState();

  useEffect(() => {
    async function triggerGetDataSeries() {
      const value = await getDataSeries(timeSeries);

      setDataSeries(value);
      setIsProcessing(false);
    }

    if(timeSeries) {
      setIsProcessing(true);
      triggerGetDataSeries();
    }
  }, [timeSeries]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
      {isProcessing && <CircularProgress />}
      {!isProcessing && dataSeries && (
        <Chart
          chartType="Line"
          data={[["Date", "Open", "High", "Low", "Close"], ...dataSeries]}
          width="100%"
          height="400px"
          loader={<CircularProgress />}
          legendToggle
          options={{
            hAxis: {
              title: 'Date',
            },
            vAxis: {
              title: 'Price',
            },
          }}
          formatters={[
            {
              type: 'NumberFormat',
              column: 1,
              options: {
                prefix: '$',
              },
            },
            {
              type: 'NumberFormat',
              column: 2,
              options: {
                prefix: '$',
              },
            },
            {
              type: 'NumberFormat',
              column: 3,
              options: {
                prefix: '$',
              },
            },
            {
              type: 'NumberFormat',
              column: 4,
              options: {
                prefix: '$',
              },
            },
          ]}
        />
      )}
    </Box>
  );
}

export default LineChart;