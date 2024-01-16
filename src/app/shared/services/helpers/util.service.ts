import * as moment from "moment";

export function getFormattedDate(date) {
  try {
    return moment(date).format('YYYY-MM-DD');
  } catch (e) {
    return '';
  }
}

export function getTimeInTwentyFourHours(date) {
  try {
    return moment(date).format('HH:mm');
  } catch (e) {
    return '';
  }
}