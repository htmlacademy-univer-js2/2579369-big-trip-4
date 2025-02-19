import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function formatDateTimeLong(date) {
  return dayjs(date).format('YY/MM/DD HH:mm');
}

function isTimeExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function formatDateTimeShort(date){
  return dayjs(date).format('HH:mm');
}
function formatDateMonthDay(date){
  return dayjs(date).format('MMM DD');
}

function duration(dateStart,dateEnd){
  const timeDiff = dayjs(dateStart).diff(dayjs(dateEnd),'DD[D] HH[H mm[m]');
  return timeDiff;
}
export {getRandomArrayElement,duration, formatDateMonthDay, formatDateTimeLong,formatDateTimeShort, isTimeExpired};
