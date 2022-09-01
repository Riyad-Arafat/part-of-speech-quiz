import { memo, lazy, useEffect, useState, Suspense } from "react";
import { Col, Row, Typography } from "antd";
import { Feedback, WordList } from "../types";
import { getWords, getRank } from "../apis";
import LoadingSpin from "./LoadingSpin";

const ActionsButtons = lazy(() => import("./ActionButtons"));
const CustomeButton = lazy(() => import("./CustomeButton"));
const ProgressStatus = lazy(() => import("./ProgressStatus"));
const QuizHeader = lazy(() => import("./QuizHeader"));

export const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [limit, setlimit] = useState(0);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);
  const [showRank, setShowRank] = useState(false);
  const [words, setWords] = useState<WordList[]>([]);
  const [feedback, setfeedback] = useState<Feedback | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const submit = (value: WordList["pos"]) => {
    setDisabled(true);
    if (value === words[currentIndex].pos) {
      setTimeout(() => {
        setScore(score + 10);
      }, 500);
      setfeedback({
        correct: true,
        answer: value,
      });
    } else {
      setfeedback({
        correct: false,
        answer: value,
      });
    }
    setTimeout(() => {
      setDisabled(false);
      setfeedback(undefined);
      if (currentIndex < limit) setCurrentIndex(currentIndex + 1);
      if (currentIndex + 1 === limit) fetchRank();
    }, 500);
  };

  const trayAgain = () => {
    setTimeout(() => {
      setCurrentIndex(0);
      setScore(0);
      setRank(0);
      setShowRank(false);
      fetchData();
    }, 0);
  };

  const fetchData = async () => {
    setLoading(true);
    const words = await getWords();
    setWords(words);
    setlimit(words.length);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const fetchRank = async () => {
    let data = await getRank(score);
    setRank(data.rank);
    setShowRank(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpin />;
  return (
    <Suspense fallback={<LoadingSpin />}>
      <Row gutter={[24, 24]}>
        <Col span={24} className="text-center">
          <ProgressStatus percent={(currentIndex / limit) * 100} />
          <br />
          <br />
          <QuizHeader score={score} rank={rank} showRank={showRank} />
        </Col>

        <WordView word={words[currentIndex]?.word} show={!showRank} />
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {currentIndex < limit ? (
            <ActionsButtons
              onClick={submit}
              disabled={disabled}
              feedback={feedback}
            />
          ) : (
            <CustomeButton onClick={trayAgain} disabled={false}>
              Tray Again
            </CustomeButton>
          )}
        </Col>
      </Row>
    </Suspense>
  );
};

const WordView = memo(({ word, show }: { word: string; show: boolean }) => {
  if (!show) return null;
  return (
    <Col span={24} className="text-center">
      <Typography.Title level={1}>{word}</Typography.Title>
    </Col>
  );
});

export default Quiz;
