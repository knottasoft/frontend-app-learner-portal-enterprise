// TODO: Need translation
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const ENROLL_MODAL_TEXT_NO_OFFERS = 'Ваша организация не предоставила вам доступ к курсам, но вы все равно можете записаться на этот курс после оплаты.';
export const createUseVoucherText = offersCount => `При регистрации на этот курс будет использован 1 из ваших кодов регистрации ${offersCount}.`;

export const modalText = {
  noOffers: {
    body: ENROLL_MODAL_TEXT_NO_OFFERS,
    button: 'Продолжить оплату',
    title: 'Оплата требуется для зачисления на курс',
  },
  fullOffers: {
    body: (offersCount) => createUseVoucherText(offersCount),
    button: 'Записаться на курс',
    title: 'Использовать 1 код регистрации для этого курса?',
  },
};

const EnrollModal = ({
  courseHasOffer,
  enrollmentUrl,
  isModalOpen,
  offersCount,
  setIsModalOpen,
}) => {
  const { fullOffers, noOffers } = modalText;
  const [submitting, setSubmitting] = useState(false);
  const buttonText = courseHasOffer ? fullOffers.button : noOffers.button;
  const enrollText = courseHasOffer ? fullOffers.body(offersCount) : noOffers.body;
  const titleText = courseHasOffer ? fullOffers.title : noOffers.title;

  return (
    <Modal
      open={isModalOpen}
      closeText="Cancel"
      title={titleText}
      body={<div><p>{enrollText}</p></div>}
      buttons={[
        <a className="btn btn-primary" href={enrollmentUrl} role="button" onClick={() => setSubmitting(true)}>
          <>{submitting && <FontAwesomeIcon icon={faSpinner} alt="loading" className="fa-spin mr-2" />}{buttonText}</>
        </a>,
      ]}
      onClose={() => setIsModalOpen(false)}
    />
  );
};

EnrollModal.propTypes = {
  courseHasOffer: PropTypes.bool.isRequired,
  enrollmentUrl: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  offersCount: PropTypes.number.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default EnrollModal;
