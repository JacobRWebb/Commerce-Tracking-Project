import { FunctionComponent } from "react";

const EntryMenu: FunctionComponent = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-ful justify-center items-center rounded mb-1 p-4 bg-gray-100 border-gray-200">
      {children}
    </div>
  );
};
export default EntryMenu;
