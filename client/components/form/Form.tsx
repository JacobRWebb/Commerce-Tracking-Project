import React, { FunctionComponent } from "react";

export interface IFormExpected {
  formFunc: (event: React.FormEvent) => void;
  error?: boolean;
}

const Form: FunctionComponent<IFormExpected> = ({
  formFunc,
  error = false,
  children,
}) => {
  return (
    <form
      onSubmit={formFunc}
      className={`flex items-center justify-center w-screen h-screen select-none ${
        error ? "animate-errorShake" : ""
      }`}
    >
      <div className="flex flex-col bg-white shadow-xl rounded p-8">
        {children}
      </div>
    </form>
  );
};

export default Form;
