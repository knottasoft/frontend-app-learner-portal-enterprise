// TODO: Need translation
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import {
  Container, StatusAlert, Row, breakpoints,
} from '@edx/paragon';
import { AppContext } from '@edx/frontend-platform/react';

import { IntegrationWarningModal } from '../integration-warning-modal';
import { MainContent, Sidebar } from '../layout';
import { DashboardMainContent } from './main-content';
import { DashboardSidebar } from './sidebar';
import SubscriptionExpirationModal from './SubscriptionExpirationModal';
import { UserSubsidyContext } from '../enterprise-user-subsidy';

export const LICENCE_ACTIVATION_MESSAGE = 'Your license has been successfully activated.';

export default function Dashboard() {
  const { enterpriseConfig } = useContext(AppContext);
  const { subscriptionPlan } = useContext(UserSubsidyContext);

  const { state } = useLocation();

  const renderLicenseActivationSuccess = () => (
    <>
      <div>
        <StatusAlert
          alertType="success"
          dialog={(
            <>
              {LICENCE_ACTIVATION_MESSAGE}
            </>
          )}
          onClose={() => {}}
          open
        />
      </div>
    </>
  );

  const PAGE_TITLE = `Панель управления - ${enterpriseConfig.name}`;

  return (
    <>
      <Helmet title={PAGE_TITLE} />
      <Container size="lg" className="py-5">
        {state?.activationSuccess && renderLicenseActivationSuccess()}
        <Row>
          <MainContent>
            <DashboardMainContent />
          </MainContent>
          <MediaQuery minWidth={breakpoints.large.minWidth}>
            {matches => matches && (
              <Sidebar data-testid="sidebar">
                <DashboardSidebar />
              </Sidebar>
            )}
          </MediaQuery>
          <IntegrationWarningModal isOpen={enterpriseConfig.showIntegrationWarning} />
          {subscriptionPlan && <SubscriptionExpirationModal />}
        </Row>
      </Container>
    </>
  );
}
