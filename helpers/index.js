import { scores } from "./constant.js";

// Function to get the score for a given key
export const getScoreForKey = (keyToFind) => {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i].key === keyToFind) {
            return scores[i].score;
        }
    }

    return 0;
};