export function dataToObject(data) {
  return {
    open: data?.[8],
    high: data?.[9],
    low: data?.[10],
    close: data?.[11],
  }
}