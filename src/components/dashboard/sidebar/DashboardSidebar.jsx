// TODO: Need translation
import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppContext } from '@edx/frontend-platform/react';
import { MailtoLink } from '@edx/paragon';

import { SidebarBlock } from '../../layout';
import OfferSummaryCard from './OfferSummaryCard';
import SubscriptionSummaryCard from './SubscriptionSummaryCard';
import SidebarCard from './SidebarCard';
import { UserSubsidyContext } from '../../enterprise-user-subsidy';
import { LICENSE_STATUS } from '../../enterprise-user-subsidy/data/constants';

export const CATALOG_ACCESS_CARD_BUTTON_TEXT = 'Найти курс';
export const NEED_HELP_BLOCK_TITLE = 'Нужна помощь?';
export const EMAIL_MESSAGE = 'свяжитесь с администратором вашей организации';

const DashboardSidebar = () => {
  const {
    enterpriseConfig: {
      contactEmail,
      slug,
    },
  } = useContext(AppContext);
  const {
    subscriptionPlan,
    subscriptionLicense: userSubscriptionLicense,
    hasAccessToPortal,
    offers: { offersCount },
  } = useContext(UserSubsidyContext);

  const renderContactHelpText = () => {
    const message = EMAIL_MESSAGE;
    if (contactEmail) {
      return (
        <MailtoLink to={contactEmail}>
          {message}
        </MailtoLink>
      );
    }
    return message;
  };

  const shouldShowCatalogAccessCard = useMemo(
    () => {
      const hasSubscriptionPlan = !!subscriptionPlan;
      const hasActivatedLicense = userSubscriptionLicense?.status === LICENSE_STATUS.ACTIVATED;
      const hasOffers = offersCount > 0;

      return (hasSubscriptionPlan && hasActivatedLicense) || hasOffers;
    },
    [subscriptionPlan, userSubscriptionLicense, offersCount],
  );

  return (
    <div className="mt-3 mt-lg-0">
      {shouldShowCatalogAccessCard && (
        <SidebarCard cardClassNames="border-primary border-brand-primary catalog-access-card mb-5">
          {(subscriptionPlan && userSubscriptionLicense?.status === LICENSE_STATUS.ACTIVATED) && (
            <SubscriptionSummaryCard
              subscriptionPlan={subscriptionPlan}
              className="mb-3"
            />
          )}
          {offersCount > 0 && (
            <OfferSummaryCard
              offersCount={offersCount}
              className="mb-3"
            />
          )}
          <Link
            to={`/${slug}/search`}
            className={classNames('btn btn-outline-primary btn-block', { disabled: !hasAccessToPortal })}
          >
            {CATALOG_ACCESS_CARD_BUTTON_TEXT}
          </Link>
        </SidebarCard>
      )}
      <SidebarBlock
        title={NEED_HELP_BLOCK_TITLE}
        titleOptions={{ tag: 'h3' }}
        className="mb-5"
      >
        <p>
          Для получения технической поддержки посетите{' '}
          <a href="https://support.edx.org/hc/en-us">Справочный центр ЦОПП СК</a>.
        </p>
        <p>
          Чтобы запросить дополнительные льготы или конкретные курсы, {renderContactHelpText()}.
        </p>
      </SidebarBlock>
    </div>
  );
};

export default DashboardSidebar;
