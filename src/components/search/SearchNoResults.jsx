// TODO: Need translation
import React, { useCallback } from 'react';
import { StatusAlert } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';

import { PopularCourses } from './popular-courses';

const SearchNoResults = () => {
  const renderDialog = useCallback(
    () => (
      <div className="lead d-flex align-items-center py-3">
        <div className="mr-3">
          <FontAwesomeIcon icon={faSearchMinus} size="2x" />
        </div>
        <div>
            Не найдено курсов, соответствующих результатам вашего поиска.
          <br />
            Ознакомьтесь с некоторыми популярными курсами ниже.
        </div>
      </div>
    ),
    [],
  );

  return (
    <>
      <StatusAlert
        className="mb-5"
        alertType="info"
        dialog={renderDialog()}
        dismissible={false}
        open
      />
      <PopularCourses />
    </>
  );
};

export default SearchNoResults;
