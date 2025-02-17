import dayjs from 'dayjs';

function isPointPresent(point) {
  return (dayjs().isAfter(point.dateStart) && dayjs().isBefore(point.dateEnd));
}

function isPointFuture(point){
  return (dayjs().isBefore(point.dateStart));
}

function isPointPast(point){
  return (dayjs().isAfter(point.dateEnd));
}

export {isPointFuture,isPointPast,isPointPresent};
