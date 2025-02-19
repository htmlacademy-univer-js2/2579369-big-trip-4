const dopOptions = [
  {
    type:'Flight',
    offers:[
      {
        id: crypto.randomUUID(),
        title:'Add luggage',
        price: 30,
      },
      {
        id: crypto.randomUUID(),
        title:'Switch to comfort class',
        price:100,
      },
      {
        id: crypto.randomUUID(),
        title:'Add meal',
        price:15,
      },
      {
        id: crypto.randomUUID(),
        title:'Choose seats',
        price:5,
      },
      {
        id: crypto.randomUUID(),
        title:'Travel by train',
        price:40,
      },
    ]

  },
  {
    type:'Drive',
    offers:[
      {
        id: crypto.randomUUID(),
        title:'Rent a car',
        price:200,
      }
    ]
  },
  {
    type:'Taxi',
    offers:[
      {
        id: crypto.randomUUID(),
        title:'Upgrade to a business class',
        price:120,
      }
    ]
  },
];

export {dopOptions};
