import { dopOptions } from './offers.js';
import { points } from './point.js';

const mockPointEdit = [
  {
    type:'Flight',
    cityInformation:points[0],
    dateStart:new Date('2025-06-03'),
    dateEnd:new Date('2025-07-03'),
    cost:300,
    isFavorite:false,
    offers:{
      addLunguauge:dopOptions[0],
      switchToComfortClass:dopOptions[1],
      addMeal:dopOptions[2],
      chooseSeats:dopOptions[3],
      travelByTrain:dopOptions[4],
    },

  },
  {
    type:'Car',
    cityInformation:points[1],
    dateStart:new Date('2025-07-03'),
    dateEnd:new Date('2025-09-03'),
    cost:100,
    isFavorite:false,
    offers:{
      rentCar:dopOptions[5],
    },
  },
  {
    type:'Train',
    cityInformation:points[2],
    dateStart:new Date('2025-11-03'),
    dateEnd:new Date('2025-09-04'),
    cost:100,
    offers:null,
  },
  {
    type:'Bus',
    cityInformation:points[3],
    dateStart:new Date('2025-00-05'),
    dateEnd:new Date('2025-25-05'),
    cost:100,
    offers:null,
  },
];

export {mockPointEdit};
