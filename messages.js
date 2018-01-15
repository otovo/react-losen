import { defineMessages } from 'react-intl';

const I18N_NAMESPACE = 'Wizard';

export default defineMessages({
  nextStart: {
    id: `${I18N_NAMESPACE}.nextStart`,
    defaultMessage: 'Start',
  },
  nextFinish: {
    id: `${I18N_NAMESPACE}.nextFinish`,
    defaultMessage: 'Fullfør',
  },
  nextDefault: {
    id: `${I18N_NAMESPACE}.nextDefault`,
    defaultMessage: 'Neste',
  },

  previousStart: {
    id: `${I18N_NAMESPACE}.previousStart`,
    defaultMessage: 'Avbryt',
  },
  previousFinish: {
    id: `${I18N_NAMESPACE}.previousFinish`,
    defaultMessage: 'Tilbake',
  },
  previousDefault: {
    id: `${I18N_NAMESPACE}.previousDefault`,
    defaultMessage: 'Forrige',
  },
});
