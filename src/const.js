const pointEmpty =
  {
    type: 'Flight',
    cityInformation:{ cityName: '', description: '', photos: [] },
    dateStart:new Date(),
    dateEnd:new Date(),
    cost:'0',
    isFavorite:false,
    offers:[],
  };

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  INIT: 'INIT',
};

export{UserAction, UpdateType, pointEmpty};
