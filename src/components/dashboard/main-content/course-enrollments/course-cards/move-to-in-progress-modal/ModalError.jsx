// TODO: Need translation
import React, { useContext } from 'react';
import { StatusAlert } from '@edx/paragon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MoveToInProgressModalContext from './MoveToInProgressModalContext';

const ModalError = () => {
  const { courseLink, courseTitle } = useContext(MoveToInProgressModalContext);
  return (
    <StatusAlert
      alertType="danger"
      dialog={(
        <div className="d-flex">
          <div>
            <FontAwesomeIcon className="mr-3" icon={faExclamationTriangle} />
          </div>
          <div>
              Произошла ошибка при разрхивировании
            {' '}
            <a href={courseLink}>{courseTitle}</a>.
            {' '}
              Пожалуйста, попробуйте еще раз.
          </div>
        </div>
      )}
      dismissible={false}
      open
    />
  );
};

export default ModalError;
