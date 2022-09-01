import { Button } from "antd";
import { memo } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  isCorrect?: boolean;
  notCorrect?: boolean;
}

export const CustomeButton = memo(
  ({
    onClick,
    children,
    disabled = false,
    isCorrect = undefined,
    notCorrect = undefined,
  }: ButtonProps) => {
    return (
      <Button
        type="ghost"
        shape="round"
        size="large"
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: isCorrect ? "green" : notCorrect ? "red" : "",
          color: isCorrect || notCorrect ? "white" : "",
        }}
      >
        {children}
      </Button>
    );
  }
);

export default CustomeButton;
