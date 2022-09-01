import { Rank, WordList } from "../types";

export const getWords = async (): Promise<WordList[] | []> => {
  return await fetch("http://localhost:5555/words", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data: WordList[]) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const getRank = async (score: number): Promise<Rank> => {
  return await fetch("http://localhost:5555/rank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ score }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data: Rank) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
