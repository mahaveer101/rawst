/// <reference lib="webworker" />
import * as moment from 'moment';
var intervalTimer = null;
addEventListener('message', ({ data }) => {
  if (intervalTimer) {
    clearInterval(intervalTimer);
    intervalTimer = null;
  }
  if (data.startTimer) {
    const timeObjectInList = data.hours.split(':');
    let start = moment();
    start.hour(timeObjectInList[0]);
    start.minute(timeObjectInList[1]);
    start.second(timeObjectInList[2]);
    let seconds = timeObjectInList[2];
    intervalTimer = setInterval(() => {
      let now = moment(start);
      now.seconds(seconds);
      let hour: any = now.hour();
      hour = hour <= 9? `0${hour}`: hour;
      let minute: any = now.minute();
      minute = minute <= 9? `0${minute}`: minute;
      let second: any = now.second();
      second = second <= 9? `0${second}`: second;
      const workingHours = `${hour}:${minute}:${second}`;
      postMessage(workingHours);
      seconds++;
    }, 1000);
  } else {
    postMessage(data.hours);
  }
});
