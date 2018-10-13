import moment from 'moment'
import brLocale from 'moment/locale/pt-br'

export const initializeMoment = () => moment.updateLocale('pt-br', brLocale)
