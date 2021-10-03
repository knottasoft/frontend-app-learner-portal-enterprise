// TODO: Need translation
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '@edx/frontend-platform/react';
import { Button } from '@edx/paragon';

import { CourseEnrollments } from './course-enrollments';

const DashboardMainContent = () => {
  const { enterpriseConfig: { name, slug } } = useContext(AppContext);

  return (
    <CourseEnrollments>
      {/* The children below will only be rendered if there are no course runs. */}
      <h2>Найти курс</h2>
      <p>
          Вы не записаны ни на один курс, спонсируемый {name}.
          Чтобы начать посещать курсы, просмотрите каталог ниже.
      </p>
      <p>
        <Button
          as={Link}
          to={`/${slug}/search`}
          className="btn-brand-primary"
        >
            Найти курс
        </Button>
      </p>
    </CourseEnrollments>
  );
};

export default DashboardMainContent;
