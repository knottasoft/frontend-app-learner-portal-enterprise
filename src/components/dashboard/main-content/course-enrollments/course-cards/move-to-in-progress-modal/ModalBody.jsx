// TODO: Need translation
import React, { useContext } from 'react';

import ModalError from './ModalError';
import MoveToInProgressModalContext from './MoveToInProgressModalContext';

const ModalBody = () => {
  const {
    confirmError,
    courseLink,
    courseTitle,
  } = useContext(MoveToInProgressModalContext);
  return (
    <>
      {confirmError && <ModalError />}
      <p className="m-0">
          Вы уверены, что хотите изменить статус
        {' '}
        <a href={courseLink}>{courseTitle}</a>
        {' '}
        на &quot;В процессе&quot;? Курс появится в вашем разделе &quot;В процессе&quot;.
      </p>
      <p className="mt-2">
          Пока ваша лицензия действительна, вы можете возобновить курс, нажав &quot;В процессе&quot;.
      </p>
    </>
  );
};

export default ModalBody;
