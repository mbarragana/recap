import 'dayjs';
import { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({ children, severity, show }) => {
  const [open, setOpen] = useState(show);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default Notification
