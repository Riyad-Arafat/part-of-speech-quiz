import { Space } from "antd";
import { memo } from "react";
import { WordList, Feedback } from "src/types";
import { CustomeButton } from "./CustomeButton";

interface ButtonProps {
  onClick: (value: WordList["pos"]) => void;
  disabled?: boolean;
  feedback?: Feedback;
}
export const ActionsButtons = memo(
  ({ onClick, disabled = false, feedback }: ButtonProps) => {
    const onClickNoun = () => onClick("noun");
    const onClickVerb = () => onClick("verb");
    const onClickAdverb = () => onClick("adverb");
    const onClickAdjective = () => onClick("adjective");
    return (
      <Space
        align="center"
        size="large"
        wrap
        style={{
          justifyContent: "center",
        }}
      >
        <CustomeButton
          onClick={onClickNoun}
          disabled={disabled}
          isCorrect={
            (feedback?.answer === "noun" && feedback?.correct) || undefined
          }
          notCorrect={
            (feedback?.answer === "noun" && !feedback?.correct) || undefined
          }
        >
          Noun
        </CustomeButton>
        <CustomeButton
          onClick={onClickVerb}
          disabled={disabled}
          isCorrect={feedback?.answer === "verb" && feedback?.correct}
          notCorrect={feedback?.answer === "verb" && !feedback?.correct}
        >
          Verb
        </CustomeButton>
        <CustomeButton
          onClick={onClickAdjective}
          disabled={disabled}
          isCorrect={feedback?.answer === "adjective" && feedback?.correct}
          notCorrect={feedback?.answer === "adjective" && !feedback?.correct}
        >
          Adjective
        </CustomeButton>
        <CustomeButton
          onClick={onClickAdverb}
          disabled={disabled}
          isCorrect={feedback?.answer === "adverb" && feedback?.correct}
          notCorrect={feedback?.answer === "adverb" && !feedback?.correct}
        >
          Adverb
        </CustomeButton>
      </Space>
    );
  }
);

export default ActionsButtons;
