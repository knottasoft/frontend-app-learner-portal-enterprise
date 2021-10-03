// TODO: Need translation
import React, { useContext } from 'react';

import ModalError from './ModalError';
import MarkCompleteModalContext from './MarkCompleteModalContext';

const ModalBody = () => {
  const {
    confirmError,
    courseLink,
    courseTitle,
  } = useContext(MarkCompleteModalContext);
  return (
    <>
      {confirmError && <ModalError />}
      <p className="m-0">
          Вы уверены, что хотите сохранить
        {' '}
        <a href={courseLink}>{courseTitle}</a>
        {' '}
          на будущее? Вы останетесь зачисленным, но курс
          больше не будет отображаться как &quot;В процессе&quot;
      </p>
      <p className="mt-2">
          Пока ваша лицензия действительна, вы можете возобновить курс, нажав кнопку
          &quot;Переместить курс в "В работе&quot; в списке курсов, сохраненных на будущее.
      </p>
    </>
  );
};

export default ModalBody;
