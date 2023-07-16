import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  selected?: string;
  clickHandler: () => void;
}
const Button = ({
  children,
  selected = "btn-primary",
  clickHandler,
}: Props) => {
  return (
    <button type="button" onClick={clickHandler} className={"btn " + selected}>
      {children}
    </button>
  );
};

export default Button;
