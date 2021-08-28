import { getMaximumDrawdownData } from "./dataAnalysis"
import { getMaximumDrawdown } from "./dataAnalysis"

import { dataSeries_2, dataSeries_3 } from '../__mockData__/dataSeries';

describe('dataAnalysis', () => {
  test('getMaximumDrawdownData 2', () => {
    expect(getMaximumDrawdownData(dataSeries_2)).toEqual({
      peak: 185.61,
      mdd: -12.32
    });
  });

  test('getMaximumDrawdownData 3', () => {
    expect(getMaximumDrawdownData(dataSeries_3)).toEqual({
      peak: 186.01,
      mdd: -14.69
    });
  })

  test('getMaximumDrawdown 2', () => {
    expect(getMaximumDrawdown(dataSeries_2)).toEqual(-6.64);
  });

  test('getMaximumDrawdown 3', () => {
    expect(getMaximumDrawdown(dataSeries_3)).toEqual(-7.9);
  })
})

