import { actionCreators, RootState } from "features";
import { IFilter } from "features/filter/filterActions";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const EntryFilter: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { changeOpen, updateFilter } = bindActionCreators(
    actionCreators.FilterActions,
    dispatch
  );
  const { fetchEntries } = bindActionCreators(
    actionCreators.EntriesActions,
    dispatch
  );
  const state = useSelector((state: RootState) => state);

  return (
    <div className="flex flex-col justify-between p-2 mb-4 bg-white rounded shadow-lg">
      <div className="flex flex-row justify-between">
        <button
          onClick={() => changeOpen(true)}
          className="bg-blue-500 py-1 px-3 rounded text-white"
        >
          Filter
        </button>
        <div className="flex flex-row items-center space-x-2">
          <button
            className="bg-white rounded ring-1 p-1 disabled:opacity-50"
            disabled={state.filter.skip <= 0}
            onClick={async () => {
              let filter: IFilter = state.filter;
              filter.skip = state.filter.skip - state.filter.take;
              await updateFilter({
                ...filter,
              });
              fetchEntries({ ...filter });
            }}
          >
            Previous
          </button>
          <p>
            {state.filter.skip / state.filter.take + 1} /{" "}
            {Math.ceil(state.entries.count / state.filter.take)}
          </p>
          <button
            className="bg-white rounded ring-1 p-1 disabled:opacity-50"
            disabled={
              state.filter.skip + state.filter.take > state.entries.count
            }
            onClick={async () => {
              let filter: IFilter = state.filter;
              filter.skip = state.filter.skip + state.filter.take;
              await updateFilter({
                ...filter,
              });
              fetchEntries({ ...filter });
            }}
          >
            Next
          </button>
        </div>
      </div>
      <p>Displaying {state.entries.entries.length} Entries.</p>
    </div>
  );
};

export default EntryFilter;
