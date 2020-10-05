const initialState = {
  objects: []
};

const objectsReducer = (state = initialState, action) => {
  const newState = { ...state };
    switch (action.type) {
    case "INIT_OBJECTS":
      newState.objects = action.value;
      break;
    case "CREATE_OBJECT_ASYNC":
      const newId = state.objects[state.objects.length - 1]._id + 1;
      newState.objects.push({...action.value, _id: newId});
      break;
    case "EDIT_OBJECT_ASYNC":
      const objectIndex = newState.objects.findIndex(object => object._id === action.value._id);
      newState.objects[objectIndex] = action.value; // add a preventive check if objectIndex -1
      break;
    default: 
      return newState;
  }
  return newState;
};

export default objectsReducer;
