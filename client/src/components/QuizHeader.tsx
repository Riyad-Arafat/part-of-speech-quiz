import { Typography } from "antd";
import { memo } from "react";

interface QuizHeaderProps {
  score: number;
  rank: number;
  showRank: boolean;
}

export const QuizHeader = memo(({ score, rank, showRank }: QuizHeaderProps) => {
  return (
    <div>
      <Typography.Title level={4}>
        Score: <Typography.Text>{score}</Typography.Text>
      </Typography.Title>
      {showRank ? (
        <Typography.Title level={4}>
          Your Rank:{" "}
          <Typography.Text
            type={score < 50 ? "danger" : score < 70 ? "warning" : "success"}
          >
            {rank}%
          </Typography.Text>
        </Typography.Title>
      ) : null}
    </div>
  );
});

export default QuizHeader;
