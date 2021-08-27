import React from 'react';
import DayjsUtils from '@date-io/dayjs';
import {
  DatePicker as MuiDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function DatePicker({ ...props }) {
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <MuiDatePicker {...props} />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;