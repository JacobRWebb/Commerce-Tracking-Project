import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from "react";

const FormButton: FunctionComponent<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...buttonProps }) => {
  return (
    <button
      className="w-20 h-8 ml-auto text-background-dark text-xl rounded  ring-background-light bg-background-light disabled:opacity-50"
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default FormButton;
