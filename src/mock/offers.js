const dopOptions = [
  {
    id: crypto.randomUUID(),
    type:'Flight',
    offers:[
      {
        title:'Add luggage',
        price:'30',
      },
      {
        title:'Switch to comfort class',
        price:'100',
      },
      {
        title:'Add meal',
        price:'15',
      },
      {
        title:'Choose seats',
        price:'5',
      },
      {
        title:'Travel by train',
        price:'40',
      },
    ]

  },
  {
    id: crypto.randomUUID(),
    type:'Car',
    offers:[
      {
        title:'Rnet a car',
        price:'200',
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type:'Taxi',
    offers:[
      {
        title:'Upgrade to a business class',
        price:'120',
      }
    ]
  },
];

export {dopOptions};
