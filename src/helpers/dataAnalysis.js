import { dataToObject } from "./dataToObject";

export function getMaximumDrawdown(dataSeries) {
  let peak = Number.NEGATIVE_INFINITY;
  let max = 0;
  const through = dataSeries.reduce((res, data) => {
    let { open, close } = dataToObject(data);
    let diff = 0;
    if ((close - open) > 0) {
      console.log('>>>.1 prev peak:', peak);
      diff = (open - Math.max(peak, open));
    } else {
      console.log('>>>.2 prev peak:', peak);
      diff = (close - Math.max(peak, open));
    }

    peak = Math.max(peak, open, close);
    const mdd = Math.min(res, diff);

    if (mdd < res) max = peak;

    console.log(
      '>> open: %s, close: %s, peak: %s, diff: %s, mdd: %s',
      open, close, peak, diff, mdd,
    );
    return mdd;
  }, 0);

  return {
    peak: max,
    diff: Number(through.toFixed(2)),
  };
}

export function getSimpleReturn(dataSeries) {
  const { open } = dataToObject(dataSeries[0]);
  const { close } = dataToObject(dataSeries[dataSeries.length - 1]);
  return (close - open) / open;
}