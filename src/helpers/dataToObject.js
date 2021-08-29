import dayjs from "dayjs";

import { DATE_FORMAT } from "../contants";

export function dataToObject(data) {
  return {
    open: data?.[8],
    high: data?.[9],
    low: data?.[10],
    close: data?.[11],
  }
}

export function toObjectQuery(query) {
  return {
    start_date: dayjs(query.startDate).format(DATE_FORMAT),
    end_date: dayjs(query.endDate).format(DATE_FORMAT),
  }
}