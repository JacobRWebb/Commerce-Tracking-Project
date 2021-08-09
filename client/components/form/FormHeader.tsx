import { FunctionComponent } from "react";

export interface IFormHeader {
  value: string;
}

const FormHeader: FunctionComponent<IFormHeader> = ({ value }) => {
  return (
    <h1 className="text-background-dark text-center text-5xl mb-4">{value}</h1>
  );
};

export default FormHeader;
