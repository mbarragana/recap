import { getMaximumDrawdown } from "./dataAnalysis"

import { dataSeries_2, dataSeries_3 } from '../__mockData__/dataSeries';

describe('dataAnalysis', () => {
  test('getMaximumDrawdown 2', () => {
    expect(getMaximumDrawdown(dataSeries_2)).toEqual({
      peak: 185.61,
      diff: -12.32
    });
  });

  test('getMaximumDrawdown 3', () => {
    expect(getMaximumDrawdown(dataSeries_3)).toEqual({
      peak: 186.01,
      diff: -14.69
    });
  })
})

