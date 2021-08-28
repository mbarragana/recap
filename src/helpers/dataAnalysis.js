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
  const { peak, mdd } = getMaximumDrawdownData(dataSeries);
  return Number((mdd / peak * 100).toFixed(2))
}

export function getSimpleReturn(dataSeries) {
  const { open } = dataToObject(dataSeries[0]);
  const { close } = dataToObject(dataSeries[dataSeries.length - 1]);
  return (close - open) / open;
}