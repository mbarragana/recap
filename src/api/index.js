import qs from 'qs';

export function getStockTimeSeries(ticker, query, baseUrl = process.env.REACT_APP_API_BASE_URL) {
  const apiUrl = `${baseUrl.replace('{{ticker}}', ticker)}&${qs.stringify(query)}`;
  return fetch(apiUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(({ dataset }) => {
      const { data, oldest_available_date: minDate } = dataset;
      return {
        data,
        minDate,
      }
    }).catch(error => {
      console.error(error);
    });
}