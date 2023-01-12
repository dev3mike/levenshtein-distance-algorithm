import words from './words.json';

function sortBySimilarity(words: string[], singleWord: string): string[] {
    // Create an array of objects to store the words and their distances
    let wordDistances = words.map(word => ({
        word: word,
        distance: levenshteinDistance(word, singleWord)
    }));

    // Sort the array by distance
    wordDistances.sort((a, b) => a.distance - b.distance);

    // Return the sorted list of words
    return wordDistances.map(wd => wd.word);
}

function levenshteinDistance(a: string, b: string): number {
    // Create a 2D array to store the distances
    let distances = new Array(a.length + 1);
    for (let i = 0; i <= a.length; i++) {
        distances[i] = new Array(b.length + 1);
    }

    // Initialize the first row and column
    for (let i = 0; i <= a.length; i++) {
        distances[i][0] = i;
    }
    for (let j = 0; j <= b.length; j++) {
        distances[0][j] = j;
    }

    // Fill in the rest of the array
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                distances[i][j] = distances[i - 1][j - 1];
            } else {
                distances[i][j] = Math.min(distances[i - 1][j], distances[i][j - 1], distances[i - 1][j - 1]) + 1;
            }
        }
    }

    // Return the final distance
    return distances[a.length][b.length];
}

const sortedArray = sortBySimilarity(words, "hrllp");

// Output: [ 'hall', 'hallo', 'halls', 'hell', 'hello' ]
console.log(sortedArray.slice(0, 5));