// TODO: Need translation
import React, { useCallback } from 'react';
import { StatusAlert } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const SearchError = () => {
  const renderDialog = useCallback(
    () => (
      <div className="lead d-flex align-items-center py-3">
        <div className="mr-3">
          <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
        </div>
        <div>
            При поиске курсов, соответствующих вашему запросу, произошла ошибка.
          <br />
            Пожалуйста, повторите попытку позже.
        </div>
      </div>
    ),
    [],
  );

  return (
    <StatusAlert
      alertType="danger"
      dialog={renderDialog()}
      dismissible={false}
      open
    />
  );
};

export default SearchError;
