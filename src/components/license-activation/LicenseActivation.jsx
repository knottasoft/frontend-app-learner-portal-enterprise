// TODO: Need translation
import React, { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AppContext } from '@edx/frontend-platform/react';
import { StatusAlert, Container } from '@edx/paragon';

import { LoadingSpinner } from '../loading-spinner';
import { useLicenseActivation } from './data/hooks';

import { useRenderContactHelpText } from '../../utils/hooks';

export const LOADING_MESSAGE = 'Your enterprise license is being activated! You will be automatically redirected to your organization\'s learner portal shortly.';

export default function LicenseActivation() {
  const { activationKey } = useParams();
  const { enterpriseConfig } = useContext(AppContext);
  const renderContactHelpText = useRenderContactHelpText(enterpriseConfig);

  const [activationSuccess, activationError] = useLicenseActivation(activationKey);

  if (activationSuccess) {
    return (
      <Redirect
        to={{
          pathname: `/${enterpriseConfig.slug}`,
          state: { activationSuccess },
        }}
      />
    );
  }

  const PAGE_TITLE = `Активация лицензии - ${enterpriseConfig.name}`;
  if (activationError) {
    return (
      <>
        <Helmet title={PAGE_TITLE} />
        <Container size="lg" className="mt-3">
          <StatusAlert
            alertType="danger"
            dialog={(
              <>
                  Мы не смогли активировать лицензию для этого пользователя.
                  {' '}Пожалуйста, проверьте наличие лицензии и проверьте электронную почту, на которую она была отправлена.
                  Если у вас возникнут дополнительные проблемы, обратитесь за помощью в {renderContactHelpText()}.
              </>
            )}
            dismissible={false}
            open
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet title={PAGE_TITLE} />
      <Container className="py-5">
        <LoadingSpinner screenReaderText={LOADING_MESSAGE} />
      </Container>
    </>
  );
}
