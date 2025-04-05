import { notification } from 'antd';

export function useErrorHandler() {
  const handleError = (error, customMessage) => {
    if (!error) {
      // Suppress warning if no error is provided and no custom message exists
      if (!customMessage) return;
      console.warn('[Warning]: No error provided to handleError.');
      showError('Error', customMessage || 'An unknown error occurred.');
      return;
    }

    console.error('[Error Object]:', error);

    // Extract error message
    const errorMessage =
      error?.response?.data?.message || // For HTTP errors with a response body
      error?.message || // For standard JS or Firebase errors
      error?.statusText || // For HTTP errors without a message
      customMessage || // Fallback to custom message
      'An unknown error occurred.'; // Final fallback message

    // Prevent duplicate notifications by checking if the error has already been handled
    if (error._handled) return;
    error._handled = true;

    // HTTP error handling
    if (error?.status && typeof error.status === 'number') {
      const status = error.status;

      switch (status) {
        case 400:
          showError('Bad Request', errorMessage);
          break;
        case 401:
          showError('Unauthorized', 'Please log in.');
          break;
        case 403:
          showError('Forbidden', 'You do not have access to this resource.');
          break;
        case 404:
          showError('Not Found', 'The requested resource does not exist.');
          break;
        case 500:
          showError('Server Error', 'Please try again later.');
          break;
        default:
          showError('HTTP Error', errorMessage);
      }
    }

    // Firebase error handling
    else if (error?.code && error?.message) {
      showError('Firebase Error', errorMessage);
    }

    // Generic error handling
    else {
      showError('Error', errorMessage);
    }
  };

  const showError = (title, description) => {
    console.log('[Notification Triggered]:', { title, description }); // Debug log
    notification.error({
      message: title,
      description: description || 'An error occurred.',
      duration: 5,
      placement: 'topRight',
    });
  };

  return { handleError };
}
