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
    isFavorite:false,
    offers:null,
  },
  {
    type:'Taxi',
    cityInformation:destination[3],
    dateStart:new Date('2025-00-05'),
    dateEnd:new Date('2025-25-05'),
    cost:100,
    isFavorite:false,
    offers:dopOptions[2],
  },
];

const pointEmpty [
  {
    type: '',
    cityInformation:'',
    dateStart:null,
    dateEnd:null,
    cost:0,
    isFavorite:false,
    offers:[],
  }
];
export {mockPoint, pointEmpty};
