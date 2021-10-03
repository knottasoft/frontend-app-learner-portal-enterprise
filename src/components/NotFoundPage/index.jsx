// TODO: Need translation
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AppContext } from '@edx/frontend-platform/react';
import { Container } from '@edx/paragon';

const NotFoundPage = () => {
  const { enterpriseConfig } = useContext(AppContext);

  let PAGE_TITLE = 'Страница не найдена';
  if (enterpriseConfig) {
    PAGE_TITLE += ` - ${enterpriseConfig.name}`;
  }

  return (
    <Container size="lg" className="mt-3">
      <Helmet title={PAGE_TITLE} />
      <div className="text-center py-5">
        <h1>404</h1>
        <p className="lead">Ой, извините, мы не можем найти эту страницу!</p>
        <p>Либо что-то пошло не так, либо страница больше не существует.</p>
      </div>
    </Container>
  );
};

export default NotFoundPage;
