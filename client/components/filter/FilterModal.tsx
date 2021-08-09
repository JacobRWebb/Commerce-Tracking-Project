import { actionCreators, RootState } from "features";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const FilterModal: FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { changeOpen } = bindActionCreators(
    actionCreators.FilterActions,
    dispatch
  );

  return (
    <div
      className={`filterShade ${state.filter.isOpen ? "flex" : "hidden"}`}
      onClick={() => changeOpen(false)}
    >
      <div
        className="filterModal"
        onClick={(event) => {
          event.stopPropagation();
        }}
        aria-expanded={state.filter.isOpen}
      >
        Filter Modal
      </div>
    </div>
  );
};

export default FilterModal;
