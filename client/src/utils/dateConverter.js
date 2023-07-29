import moment from 'moment';

export function convertToDateTime(inputDate) {
  return moment(inputDate, 'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
}
