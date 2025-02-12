import { dopOptions } from './offers.js';
import { destinations } from './destination.js';

const points = [
  {
    id:crypto.randomUUID(),
    type:'Flight',
    cityInformation:destinations[0],
    dateStart:'2025-02-10T22:35:56.845Z',
    dateEnd:'2025-02-10T22:55:56.845Z',
    cost:300,
    isFavorite:true,
    offers:[dopOptions[0].offers[0],dopOptions[0].offers[1]],

  },
  {
    id:crypto.randomUUID(),
    type:'Drive',
    cityInformation:destinations[1],
    dateStart:'2025-03-15T02:35:56.845Z',
    dateEnd:'2025-03-15T08:00:56.845Z',
    cost:100,
    isFavorite:true,
    offers:[dopOptions[1].offers[0]],
  },
  {
    id:crypto.randomUUID(),
    type:'Train',
    cityInformation:destinations[2],
    dateStart:'2025-06-25T00:35:56.845Z',
    dateEnd:'2025-06-25T05:13:56.845Z',
    cost:100,
    isFavorite:false,
    offers:[],
  },
  {
    id:crypto.randomUUID(),
    type:'Taxi',
    cityInformation:destinations[3],
    dateStart:'2025-08-07T10:23:56.845Z',
    dateEnd:'2025-08-07T15:40:56.845Z',
    cost:100,
    isFavorite:false,
    offers:[dopOptions[2].offers[0]],
  },
];

const pointEmpty =
  {
    type: 'Flight',
    cityInformation:null,
    dateStart:null,
    dateEnd:null,
    cost:0,
    isFavorite:false,
    offers:[],
  };
export {points, pointEmpty};
