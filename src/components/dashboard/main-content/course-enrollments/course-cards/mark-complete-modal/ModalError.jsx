// TODO: Need translation
import React, { useContext } from 'react';
import { StatusAlert } from '@edx/paragon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MarkCompleteModalContext from './MarkCompleteModalContext';

const ModalError = () => {
  const { courseLink, courseTitle } = useContext(MarkCompleteModalContext);
  return (
    <StatusAlert
      alertType="danger"
      dialog={(
        <div className="d-flex">
          <div>
            <FontAwesomeIcon className="mr-3" icon={faExclamationTriangle} />
          </div>
          <div>
              Не удается сохранить
            {' '}
            <a href={courseLink}>{courseTitle}</a>.
            {' '}
            на будущее. Пожалуйста, попробуйте еще раз.
          </div>
        </div>
      )}
      dismissible={false}
      open
    />
  );
};

export default ModalError;
