import moment from 'moment';

export const strDateToYear = (str: string | undefined | null) => {
  moment.locale('en');
  return str !== undefined && str != null && str.length > 0
    ? moment(str).format('yyyy')
    : '----';
};
