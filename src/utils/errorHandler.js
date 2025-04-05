import { notification } from 'antd';

export const handleHttpError = (error, customMessage) => {
  const status = error.status;
  const message = error.message || error.statusText || 'HTTP грешка';

  switch (status) {
    case 400:
      showError('Невалидна заявка', message);
      break;
    case 401:
      showError('Неупълномощен достъп', 'Моля, влез в профила си.');
      break;
    case 403:
      showError('Забранено', 'Нямаш достъп до този ресурс.');
      break;
    case 404:
      showError('Не е намерено', 'Ресурсът не съществува.');
      break;
    case 500:
      showError('Сървърна грешка', 'Опитай по-късно.');
      break;
    default:
      showError('Грешка', customMessage || message || 'Възникна проблем.');
  }
};

export const handleFirebaseError = (error, customMessage) => {
  showError('Firebase грешка', customMessage || error.message || 'Проблем с Firebase.');
};

export const handleGenericError = (error, customMessage) => {
  const message = customMessage || error?.message || 'Неизвестна грешка.';
  showError('Грешка', message);
};

const showError = (title, description) => {
  notification.error({
    message: title,
    description: description || 'Възникна грешка.',
    duration: 5,
    placement: 'topRight',
  });
};
