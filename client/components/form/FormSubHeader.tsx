import { FunctionComponent } from "react";

export interface IFormSubHeader {
  value: string;
}

const FormSubHeader: FunctionComponent<IFormSubHeader> = ({ value }) => {
  return (
    <h1 className="mb-8 text-center text-xl text-background-dark">{value}</h1>
  );
};

export default FormSubHeader;
