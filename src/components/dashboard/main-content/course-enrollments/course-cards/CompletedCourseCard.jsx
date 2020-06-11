import React from 'react';
import PropTypes from 'prop-types';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import BaseCourseCard from './BaseCourseCard';

import CertificateImg from './images/edx-verified-mini-cert.png';

const getDropdownMenuItems = ({ markedDone }) => {
  // Only courses that are manually archived (markedDone)
  // should show a unarchive option.
  if (!markedDone) { return []; }
  return ([
    {
      key: 'unarchive-course',
      type: 'button',
      onClick: () => {
        /* setIsMarkCompleteModalOpen(true);
        sendTrackEvent('edx.learner_portal.course.mark_complete.modal.opened', {
          course_run_id: courseRunId,
        }); */
      },
      children: (
        <div role="menuitem">
          Un-Archive course
          <span className="sr-only">for test title</span>
        </div>
      ),
    },
  ]);
};

const CompletedCourseCard = (props) => {
  const user = getAuthenticatedUser();
  const { username } = user;
  const { markedDone } = props;
  return (
    <BaseCourseCard
      dropdownMenuItems={getDropdownMenuItems({ markedDone })}
      type="completed"
      hasViewCertificateLink={false}
      {...props}
    >
      {props.linkToCertificate ? (
        <div className="d-flex mb-3">
          <div className="mr-3">
            <img src={CertificateImg} alt="verified certificate preview" />
          </div>
          <div className="d-flex align-items-center">
            <p className="lead mb-0 font-weight-normal">
              View your certificate on{' '}
              <a
                className="text-underline"
                href={`${process.env.LMS_BASE_URL}/u/${username}`}
              >
                your profile →
              </a>
            </p>
          </div>
        </div>
      ) : (
        <p className="lead mb-3 font-weight-normal">
          To earn a certificate,{' '}
          <a className="text-underline" href={props.linkToCourse}>
            retake this course →
          </a>
        </p>
      )}
    </BaseCourseCard>
  );
};

CompletedCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  courseRunId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  linkToCertificate: PropTypes.string,
  markedDone: PropTypes.bool.isRequired,
};

CompletedCourseCard.defaultProps = {
  linkToCertificate: null,
};

export default CompletedCourseCard;
