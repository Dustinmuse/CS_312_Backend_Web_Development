import { ReactNode } from "react";

import styles from "./index.module.css";

type ButtonVariant = "blue" | "outline";

interface Props {
  disabled?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
  clickHandler?: () => void;
}

const Button = ({ disabled = false, children, variant, clickHandler }: Props) => {
  const currentVariant = variant || "default";

  const className = [
    styles.root,
    styles[currentVariant as keyof typeof styles],
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = (content: ReactNode) => {
    if (disabled) {
      return <span>{content}</span>;
    }

    return <span onClick={clickHandler}>{content}</span>;
  };

  return <div className={className}>{renderContent(children)}</div>;
};

export default Button;
