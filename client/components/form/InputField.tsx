import React, {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";

const InputField: FunctionComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    icon?: React.ReactNode;
  }
> = ({ icon, ...inputElements }) => {
  return (
    <div className="flex flex-row w-full mb-4 h-9">
      {icon ? (
        <div className="flex items-center h-9 rounded mr-2 px-3 bg-gray-200">
          {icon}
        </div>
      ) : (
        <></>
      )}
      <input
        className={`w-full h-full  bg-background-lighter text-background-dark placeholder-background-dark autoc ring-1 ring-background-light rounded p-1 disabled:opacity-50`}
        type="text"
        {...inputElements}
      />
    </div>
  );
};

export default InputField;
