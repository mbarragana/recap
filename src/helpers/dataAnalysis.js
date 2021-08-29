import dayjs from "dayjs";
import { dataToObject } from "./dataToObject";

export function getMaximumDrawdownData(dataSeries) {
  // time series peak
  let tsPeak = Number.NEGATIVE_INFINITY;

  const mddData = dataSeries.reduce(({ mdd: drawdown, peak }, data) => {
    let { open, close } = dataToObject(data);
    let diff = 0;
    if ((close - open) > 0) {
      diff = (open - Math.max(tsPeak, open));
    } else {
      diff = (close - Math.max(tsPeak, open));
    }

    tsPeak = Math.max(tsPeak, open, close);
    const mdd = Math.min(drawdown, diff);

    return {
      mdd,
      peak: (mdd < drawdown) ? tsPeak : peak,
    };
  }, {
    // keep max drawdown (max diff between peak and through)
    mdd: 0,
    // keep peak of max drawdown
    peak: 0,
  });

  return {
    peak: mddData.peak,
    mdd: Number(mddData.mdd.toFixed(2)),
  };
}

export function getMaximumDrawdown(dataSeries) {
  return new Promise((resolve) => {
    const { peak, mdd } = getMaximumDrawdownData(dataSeries);
    resolve(Number((mdd / peak * 100).toFixed(2)));
  });
}

export function getSimpleReturn(dataSeries) {
  return new Promise((resolve) => {
    const { open } = dataToObject(dataSeries[0]);
    const { close } = dataToObject(dataSeries[dataSeries.length - 1]);
    resolve(Number(((close - open) / open).toFixed(2) * 100));
  });
}

export function getDataSeries(timeSeries) {
  return new Promise((resolve) => {
    const dataSeries = timeSeries.map(data => {
      const { open, close, high, low } = dataToObject(data);
      return [dayjs(data[0]).format('DD/MM/YYYY'), open, high, low, close] ;
    });
    resolve(dataSeries);
  });
}