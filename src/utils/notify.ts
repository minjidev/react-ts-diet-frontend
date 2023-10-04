import { toast } from 'react-toastify';

interface ToastMessageProps {
  status: string;
  message: string;
  icon: string;
}

const notify = (toastMessage: ToastMessageProps) => {
  const { status, message } = toastMessage;

  if (status === 'success') {
    toast.success(message, {
      icon: toastMessage.icon,
    });
  } else if (status === 'error') {
    toast.error(message, {
      icon: toastMessage.icon,
    });
  }
};

export default notify;
