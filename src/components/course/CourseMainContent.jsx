// TODO: Need translation
import React, { useContext } from 'react';
import MediaQuery from 'react-responsive';
import { breakpoints, Hyperlink } from '@edx/paragon';
import { AppContext } from '@edx/frontend-platform/react';

import { PreviewExpand } from '../preview-expand';
import { CourseContext } from './CourseContextProvider';
import CourseSidebar from './CourseSidebar';
import CreatedBy from './CreatedBy';
import VerifiedCertPitch from './VerifiedCertPitch';

function formatSponsorTextList(sponsors) {
  const names = sponsors.map(sponsor => sponsor.name);
  let sponsorTextList;

  if (names.length === 1) {
    [sponsorTextList] = names;
  }

  if (names.length === 2) {
    sponsorTextList = names.join(' и ');
  }

  if (names.length > 2) {
    const lastName = names.pop();
    sponsorTextList = `${names.join(', ')}, и ${lastName}`;
  }

  return sponsorTextList;
}

export default function CourseMainContent() {
  const { config } = useContext(AppContext);
  const { state } = useContext(CourseContext);
  const { course, activeCourseRun } = state;

  return (
    <>
      <MediaQuery minWidth={breakpoints.large.minWidth}>
        {matches => !matches && (
          <div className="mb-5">
            <CourseSidebar />
          </div>
        )}
      </MediaQuery>
      {course.fullDescription && (
        <PreviewExpand
          className="mb-5"
          cta={{
            labelToExpand: 'Подробнее об этом курсе',
            labelToMinimize: 'Свернить подробности об этом курсе',
            id: 'about-this-course',
          }}
          heading={<h3>About this course</h3>}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.fullDescription }} />
        </PreviewExpand>
      )}
      {course.sponsors && course.sponsors.length > 0 && (
        <div className="mb-5">
          <h3>Sponsored by</h3>
          <div className="row no-gutters mt-3">
            {course.sponsors.map((sponsor) => (
              <div className="col-lg-6 mb-3" key={sponsor.name}>
                <div className="mb-2">
                  <a
                    href={`${config.MARKETING_SITE_BASE_URL}/${sponsor.marketingUrl}`}
                    aria-hidden="true"
                    tabIndex="-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={sponsor.logoImageUrl} alt={`${sponsor.name} logo`} />
                  </a>
                </div>
                <Hyperlink
                  destination={`${config.MARKETING_SITE_BASE_URL}/${sponsor.marketingUrl}`}
                  target="_blank"
                >
                  {sponsor.name}
                </Hyperlink>
              </div>
            ))}
          </div>
          <p>
            Создание этого курса было бы невозможным без
            щедрого вклада {formatSponsorTextList(course.sponsors)}.
          </p>
        </div>
      )}
      {course.outcome && (
        <PreviewExpand
          className="mb-5"
          cta={{
            labelToExpand: 'Подробнее о том, что узнаете',
            labelToMinimize: 'Свернуть о том, что узнаете',
            id: 'what-youll-learn',
          }}
          heading={<h3>Чему вы научитесь</h3>}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.outcome }} />
        </PreviewExpand>
      )}
      {course.syllabusRaw && (
        <PreviewExpand
          className="mb-5"
          cta={{
            labelToExpand: 'Развернуть учебный план',
            labelToMinimize: 'Свернуть учебный план',
            id: 'course-syllabus',
          }}
          heading={<h3>Учебный план</h3>}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.syllabusRaw }} />
        </PreviewExpand>
      )}
      <CreatedBy />
      {activeCourseRun.type === 'verified' && (
        <VerifiedCertPitch />
      )}
      {course.learnerTestimonials && (
        <div className="mb-5">
          <h3>Отзывы обучающихся</h3>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.learnerTestimonials }} />
        </div>
      )}
      {course.faq && (
        <div className="mb-5">
          <h3>Часто задаваемые вопросы</h3>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.faq }} />
        </div>
      )}
      {course.additionalInformation && (
        <div className="mb-5">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: course.additionalInformation }} />
        </div>
      )}
      {/*// TODO: Условия прохождения курса из санкционного списка США*/}
      {/*{activeCourseRun.hasOfacRestrictions && (*/}
      {/*  <div className="mb-5">*/}
      {/*    <h3>Кто может пройти этот курс?</h3>*/}
      {/*    <p>*/}
      {/*      Unfortunately, learners from one or more of the following countries or regions will not*/}
      {/*      be able to register for this course: Iran, Cuba and the Crimea region of Ukraine.*/}
      {/*      While edX has sought licenses from the U.S. Office of Foreign Assets Control (OFAC) to*/}
      {/*      offer our courses to learners in these countries and regions, the licenses we have*/}
      {/*      truly regrets that U.S. sanctions prevent us from offering all of our courses to*/}
      {/*      received are not broad enough to allow us to offer this course in all locations. EdX*/}
      {/*      everyone, no matter where they live.*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
