import { dopOptions } from './offers.js';
import { destination } from './destination.js';

const mockPoint = [
  {
    type:'Flight',
    cityInformation:destination[0],
    dateStart:new Date('2025-06-03'),
    dateEnd:new Date('2025-07-03'),
    cost:300,
    isFavorite:false,
    offers:dopOptions[0],

  },
  {
    type:'Car',
    cityInformation:destination[1],
    dateStart:new Date('2025-07-03'),
    dateEnd:new Date('2025-09-03'),
    cost:100,
    isFavorite:false,
    offers:dopOptions[1],
  },
  {
    type:'Train',
    cityInformation:destination[2],
    dateStart:new Date('2025-11-03'),
    dateEnd:new Date('2025-09-04'),
    cost:100,
    offers:null,
  },
  {
    type:'Taxi',
    cityInformation:destination[3],
    dateStart:new Date('2025-00-05'),
    dateEnd:new Date('2025-25-05'),
    cost:100,
    offers:dopOptions[2],
  },
];

export {mockPoint};
