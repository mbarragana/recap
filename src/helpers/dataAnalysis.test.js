import { getMaximumDrawdown } from "./dataAnalysis"

import { dataSeries_1, dataSeries_2 } from '../__mockData__/dataSeries';
import { dataToObject } from "./dataToObject";

describe('dataAnalysis', () => {
  test('getMaximumDrawdown', () => {
    expect(getMaximumDrawdown(dataSeries_1)).toBe(33.04);
  })

  test.only('getMaximumDrawdown 2', () => {
    console.log('>>>>>>>', dataSeries_2.map(data => ({ open: data[8], close: data[11] })))
    expect(getMaximumDrawdown(dataSeries_2)).toEqual({
      peak: 185.61,
      through: -12.32
    });
  })
})

