// TODO: Need translation
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getConfig } from '@edx/frontend-platform/config';

class Offer extends React.Component {
  renderTitle(usageType, benefitValue) {
    if (usageType === 'Percentage') {
      if (benefitValue === 100) {
        return 'Записаться бесплатно';
      }
      return `Получить скидку ${benefitValue}%`;
    }
    return `Получить скидку ₽${benefitValue}`;
  }

  renderFinePrint(redemptionsRemaining, couponEndDate) {
    let message = `Истекает ${moment(couponEndDate).format('DD.MM.YYYY')}.`;
    if (redemptionsRemaining > 1) {
      message = `Вы можете использовать ${redemptionsRemaining} несколько раз. ${message}`;
    }
    return message;
  }

  render() {
    const {
      usageType,
      benefitValue,
      redemptionsRemaining,
      code,
      couponEndDate,
    } = this.props;
    const config = getConfig();
    const offerUrl = `${config.ECOMMERCE_BASE_URL}/coupons/offer/?code=${code}`;

    return (
      <a href={offerUrl} className="offer card mb-3 d-block">
        <div className="card-body">
          <h5 className="card-title font-weight-bold h6">
            {this.renderTitle(usageType, benefitValue)}
          </h5>
          <p className="card-text">
            {this.renderFinePrint(redemptionsRemaining, couponEndDate)}
          </p>
        </div>
      </a>
    );
  }
}

Offer.propTypes = {
  usageType: PropTypes.string.isRequired,
  benefitValue: PropTypes.number.isRequired,
  redemptionsRemaining: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  couponEndDate: PropTypes.string.isRequired,
};

export default Offer;
