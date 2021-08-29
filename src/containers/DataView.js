import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';

import DataView from '../scene/DataView';

import { getStockTimeSeries } from '../api';
import { toObjectQuery } from '../helpers/dataToObject';

const maxDate = dayjs(new Date('2018-03-27T00:00:00'));
const initialQuery = {
  startDate: maxDate.subtract(1, 'month').format(),
  endDate: maxDate.format(),
};

const DataViewContainer = () => {
  const [ticker, setTicker] = useState();
  const [query, setQuery] = useState(initialQuery);
  const [timeSeries, setTimeSeries] = useState({});
  const [isLoadingTS, setIsLoadingTS] = useState(false);
  const [minDate, setMinDate] = useState();
  const [showNotification, setShowNotification] = useState(false);

  const handleDateRangeChange = useCallback(
    function handleDateRangeChange(attr, value) {
      const newQuery = { ...query, [attr]: value };

      if (dayjs(newQuery.startDate).isAfter(dayjs(newQuery.endDate))) {
        newQuery.endDate = newQuery.startDate
      }
      
      setQuery(newQuery);
    },
  [query]);

  const handleTickerChange = useCallback(
    function handleTickerChange(value) {
      setTicker(value);
      setMinDate();
    },
  []);

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
    <DataView
      isLoadingTS={isLoadingTS}
      handleTickerChange={handleTickerChange}
      handleDateRangeChange={handleDateRangeChange}
      query={query}
      maxDate={maxDate}
      showNotification={showNotification}
      setShowNotification={setShowNotification}
      minDate={minDate}
      data={timeSeries.data}
    />
  );
}

export default DataViewContainer;