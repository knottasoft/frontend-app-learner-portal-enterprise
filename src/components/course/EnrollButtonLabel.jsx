// TODO: Need translation
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  COURSE_AVAILABILITY_MAP,
  ENROLL_BUTTON_LABEL_COMING_SOON,
  ENROLL_BUTTON_LABEL_NOT_AVAILABLE,
} from './data/constants';
import {
  isUserEntitledForCourse,
  isCourseSelfPaced,
  hasTimeToComplete,
  isArchived,
} from './data/utils';

const EnrollButtonLabel = ({
  activeCourseRun,
  availability,
  courseUuid,
  isCourseStarted,
  isEnrollable,
  isUserEnrolled,
  pacingType,
  start,
  userEntitlements,
}) => {
  // See https://openedx.atlassian.net/wiki/spaces/WS/pages/1045200922/Enroll+button+and+Course+Run+Selector+Logic
  // for more detailed documentation on the enroll button labeling based off course run states.
  const DATE_FORMAT = 'DD.MM.YYYY';
  if (!isEnrollable) {
    const availabilityStates = [
      COURSE_AVAILABILITY_MAP.UPCOMING,
      COURSE_AVAILABILITY_MAP.STARTING_SOON,
    ];
    return availabilityStates.includes(availability)
      ? ENROLL_BUTTON_LABEL_COMING_SOON
      : ENROLL_BUTTON_LABEL_NOT_AVAILABLE;
  }
  if (!isUserEnrolled) {
    if (isUserEntitledForCourse({ userEntitlements, courseUuid })) {
      return <span className="enroll-btn-label">Просмотр на панели управления</span>;
    }
    if (isCourseSelfPaced(pacingType)) {
      if (isCourseStarted && hasTimeToComplete(activeCourseRun) && !isArchived(activeCourseRun)) {
        return (
          <>
            <span className="enroll-btn-label">Записаться</span>
            <div><small>Начинается {moment().format(DATE_FORMAT)}</small></div>
          </>
        );
      }
      return <span className="enroll-btn-label">Записаться</span>;
    }
    return (
      <>
        <span className="enroll-btn-label">Записаться</span>
        <div>
          <small>
            {isCourseStarted ? 'Запущено' : 'Начинается'}
            {' '}
            {moment(start).format(DATE_FORMAT)}
          </small>
        </div>
      </>
    );
  }
  if (isUserEnrolled && !isCourseStarted) {
    return <span className="enroll-btn-label">Вы зачислены</span>;
  }
  return <span className="enroll-btn-label">Просмотреть курс</span>;
};

EnrollButtonLabel.propTypes = {
  isEnrollable: PropTypes.bool.isRequired,
  courseUuid: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  isCourseStarted: PropTypes.bool.isRequired,
  userEntitlements: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCourseRun: PropTypes.shape().isRequired,
  isUserEnrolled: PropTypes.bool.isRequired,
  pacingType: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};

export default EnrollButtonLabel;
