// TODO: Need translation
import React, { useCallback } from 'react';

export function useRenderContactHelpText(enterpriseConfig) {
  const renderContactHelpText = useCallback(
    () => {
      const { contactEmail } = enterpriseConfig;
      const message = 'обратитесь к администратору вашей организации';

      if (!contactEmail) {
        return message;
      }
      return (
        <a href={`mailto:${contactEmail}`}>
          {message}
        </a>
      );
    },
    [enterpriseConfig],
  );

  return renderContactHelpText;
}
