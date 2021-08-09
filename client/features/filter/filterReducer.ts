import { EFilterActions, FilterActions, IFilter } from "./filterActions";

const initialState: IFilter = {
  take: 25,
  skip: 0,
  hostname: null,
  extended: false,
  isOpen: false,
  status: null,
};

const filterReducer = (
  state: IFilter = initialState,
  action: FilterActions
): IFilter => {
  switch (action.type) {
    case EFilterActions.UPDATE:
      return { ...state, ...action.payload };
    case EFilterActions.RESET:
      return initialState;
    case EFilterActions.CHANGE_OPEN:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
