// TODO: Need translation
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { AppContext, ErrorPage } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform/config';
import { Container } from '@edx/paragon';

import { LoadingSpinner } from '../loading-spinner';
import NotFoundPage from '../NotFoundPage';

import { isDefined, isDefinedAndNull } from '../../utils/common';
import {
  useEnterpriseCustomerConfig,
} from './data/hooks';

export default function EnterprisePage({ children, useEnterpriseConfigCache }) {
  const { enterpriseSlug } = useParams();
  const [enterpriseConfig, fetchError] = useEnterpriseCustomerConfig(enterpriseSlug, useEnterpriseConfigCache);

  const user = getAuthenticatedUser();
  const { profileImage } = user;

  // Render the app as loading while waiting on the configuration or additional user metadata
  if (!isDefined([enterpriseConfig, profileImage])) {
    return (
      <Container className="py-5">
        <LoadingSpinner screenReaderText="загрузка реквизитов организации" />
      </Container>
    );
  }

  if (fetchError) {
    return <ErrorPage message={fetchError.message} />;
  }

  if (isDefinedAndNull(enterpriseConfig)) {
    return <NotFoundPage />;
  }

  return (
    <AppContext.Provider
      value={{
        authenticatedUser: getAuthenticatedUser(),
        config: getConfig(),
        courseCards: {
          'in-progress': {
            settingsMenu: {
              hasMarkComplete: true,
            },
          },
        },
        enterpriseConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

EnterprisePage.propTypes = {
  children: PropTypes.node.isRequired,
  useEnterpriseConfigCache: PropTypes.bool,
};

EnterprisePage.defaultProps = {
  useEnterpriseConfigCache: true,
};
