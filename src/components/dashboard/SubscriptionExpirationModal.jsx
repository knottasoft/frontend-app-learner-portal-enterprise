// TODO: Need translation
import React, { useContext } from 'react';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { Modal, MailtoLink } from '@edx/paragon';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import { UserSubsidyContext } from '../enterprise-user-subsidy';

import {
  SUBSCRIPTION_DAYS_REMAINING_SEVERE,
  SUBSCRIPTION_EXPIRED,
  SEEN_SUBSCRIPTION_EXPIRATION_MODAL_COOKIE_PREFIX,
} from '../../config/constants';

export const MODAL_DIALOG_CLASS_NAME = 'subscription-expiration';
export const SUBSCRIPTION_EXPIRED_MODAL_TITLE = 'Срок действия вашей подписки истек';
export const SUBSCRIPTION_EXPIRING_MODAL_TITLE = 'Срок действия вашей подписки истекает';

const SubscriptionExpirationModal = () => {
  const {
    enterpriseConfig: { contactEmail },
    config,
  } = useContext(AppContext);
  const { subscriptionPlan } = useContext(UserSubsidyContext);
  const { daysUntilExpiration, expirationDate } = subscriptionPlan;

  const renderTitle = () => {
    if (daysUntilExpiration > SUBSCRIPTION_EXPIRED) {
      return (
        <small className="font-weight-bold">{SUBSCRIPTION_EXPIRING_MODAL_TITLE}</small>
      );
    }
    return (
      <small className="font-weight-bold">{SUBSCRIPTION_EXPIRED_MODAL_TITLE}</small>
    );
  };

  const renderContactText = () => {
    const contactText = 'свяжитесь с вашим менеджером по обучению';
    if (contactEmail) {
      return (
        <MailtoLink to={contactEmail} className="font-weight-bold">{contactText}</MailtoLink>
      );
    }
    return contactText;
  };

  const renderCertificateText = () => {
    const { username } = getAuthenticatedUser();
    return (
      <>
        <a href={`${config.LMS_BASE_URL}/u/${username}`} className="font-weight-bold">
            скачать готовые сертификаты
        </a>
      </>
    );
  };

  const renderBody = () => (
    <>
      <p>
          Срок действия доступа вашей компании к учебному порталу ЦОПП СК истекает через
          <span className="font-weight-bold">{`${daysUntilExpiration}`}</span>
          дней. После истечения этого срока у вас будет только аудиторский доступ к вашим курсам.
      </p>
      <p>
          Если вы в настоящее время посещаете курсы, планируйте свое обучение соответствующим образом. Вам также следует использовать
          это время для {renderCertificateText()}.
      </p>
      <p>
          Если вы считаете, что это ошибка или вам нужна помощь, {renderContactText()}.
      </p>
      <i>
          Срок действия доступа истекает {moment(expirationDate).format('DD.MM.YYYY')}.
      </i>
    </>
  );

  const renderExpiredBody = () => (
    <>
      <p>
          Доступ вашей компании к учебному порталу ЦОПП СК истек. У вас будет только аудиторный
          доступ к курсам, на которые вы были записаны по подписке (курсы из ваучеров
          будут по-прежнему полностью доступны).
      </p>
      <p>
          Вы также можете {renderCertificateText()}.
      </p>
      <p>
          Если вы считаете, что это ошибка или вам нужна помощь, {renderContactText()}.
      </p>
      <i>
          Срок действия доступа истекает {moment(expirationDate).format('DD.MM.YYYY')}.
      </i>
    </>
  );

  // If the subscription has already expired, we show a different un-dismissible modal
  const subscriptionExpired = daysUntilExpiration <= SUBSCRIPTION_EXPIRED;
  if (subscriptionExpired) {
    return (
      <Modal
        dialogClassName={`${MODAL_DIALOG_CLASS_NAME} истек срок действия`}
        renderHeaderCloseButton={false}
        title={renderTitle()}
        body={renderExpiredBody()}
        closeText="OK"
        onClose={() => {}}
        open
      />
    );
  }

  if (daysUntilExpiration > SUBSCRIPTION_DAYS_REMAINING_SEVERE) {
    return null;
  }

  const seenCurrentExpirationModalCookieName = `${SEEN_SUBSCRIPTION_EXPIRATION_MODAL_COOKIE_PREFIX}${SUBSCRIPTION_DAYS_REMAINING_SEVERE}`;
  const cookies = new Cookies();
  const seenCurrentExpirationModal = cookies.get(seenCurrentExpirationModalCookieName);
  // If they have already seen the expiration modal for their current expiration range (as
  // determined by the cookie), don't show them anything
  if (seenCurrentExpirationModal) {
    return null;
  }

  return (
    <Modal
      dialogClassName={MODAL_DIALOG_CLASS_NAME}
      renderHeaderCloseButton={false}
      title={renderTitle()}
      body={renderBody()}
      closeText="OK"
      // Mark that the user has seen this range's expiration modal when they close it
      onClose={() => {
        cookies.set(
          seenCurrentExpirationModalCookieName,
          true,
          // Cookies without the `sameSite` attribute are rejected if they are missing the `secure`
          // attribute. See
          // https//developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
          { sameSite: 'strict' },
        );
      }}
      open
    />
  );
};

export default SubscriptionExpirationModal;
