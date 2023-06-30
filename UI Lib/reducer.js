const initData = {
  cars: ["BMW"]
};

export function reducer(state = initData, action, args) {
  switch (action) {
    case "ADD":
      const newCar = args;
      return { ...state, cars: [...state.cars, newCar] };
      break;
    default:
      return state;
  }
}
