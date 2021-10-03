// TODO: Need translation
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoad, faRocket } from '@fortawesome/free-solid-svg-icons';

import './styles/VerifiedCertPitch.scss';

function VerifiedCertPitchIcon({ icon }) {
  return (
    <div className="icon d-flex bg-info mr-3 p-2 align-items-center justify-content-center">
      <FontAwesomeIcon className="text-white" icon={icon} />
    </div>
  );
}

VerifiedCertPitchIcon.propTypes = {
  icon: PropTypes.shape({}).isRequired,
};

export default function VerifiedCertPitch() {
  return (
    <div className="verified-cert-pitch mb-5">
      <h3 className="mb-4">
        Получить подтвержденный сертификат, чтобы подчеркнуть полученные знания и навыки
      </h3>
      <ul className="pl-0 mb-0 list-unstyled">
        <li className="d-flex mb-4">
          <VerifiedCertPitchIcon icon={faRocket} />
          <div>
            <h4>Официальный и подтвержденный</h4>
            <span>
              Получите сертификат с логотипом учебного заведения,
              подписанный преподавателем, чтобы подтвердить свои достижения.
            </span>
          </div>
        </li>
        <li className="d-flex mb-4">
          <VerifiedCertPitchIcon icon={faRoad} />
          <div>
            <h4>Легко делиться</h4>
            <span>
              Добавьте сертификат к своему резюме или резюме,
              или разместите его непосредственно на LinkedIn.
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
