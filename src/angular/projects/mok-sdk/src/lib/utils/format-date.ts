import moment from 'moment';

export function formatDate(date: any): string {
  const now = moment();
  const reqDate = moment(moment.utc(date).format('YYYY-MM-DD HH:mm:ss'));

  const diff = moment.duration(reqDate.diff(now)).humanize(true);

  return diff;
}
