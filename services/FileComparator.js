//Levenshtein Distance
//Calculate how many character changes are needed

const LevenshteinDistance = (s1, s2) => {

    a = s1[0]; b = s2[0];
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    let matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};

//COSINE SIMILARITY
// Calculate Diffrence based on Cosine Product of vectors

const WordRatioCaller = (a, b) => {

    let res = [];

    if (a.length === b.length)
        for (let i = 0; i < a.length; i++)
            res.push(WordRatio(a[i], b[i]));
    else if (a.length > b.length)
        for (let i = 0; i < a.length; i++) {
            res.push(WordRatio(a[i], i >= b.length ? b[b.length - 1] : b[i])); console.log(a[i], b[b.length - 1]);
        }
    else if (a.length < b.length)
        for (let i = 0; i < b.length; i++)
            res.push(WordRatio(i >= a.length ? a[a.length - 1] : a[i], b[i]));

    const numb = res.reduce((a, b) => a + b)
    return numb / res.length;
}

function termFreqMap(str) {

    let words = str.split(' ');

    let termFreq = {};
    words.forEach((w) => {
        w = w.toUpperCase();
        termFreq[w] = (termFreq[w] || 0) + 1;
    });
    return termFreq;
}



const WordRatio = (s1, comp) => {

    let strA = s1;
    let termFreqA = termFreqMap(strA);

    let temp = 0;
    const sum = Object.keys(termFreqA).map(el => {
        return temp += termFreqA[el];
    })

    return termFreqA[comp.toUpperCase()] / sum[sum.length - 1] || 0;
}


//JARO WRINKER 
const JaroCaller = (a, b) => {

    let res = [];


    if (a.length === b.length)
        for (let i = 0; i < a.length; i++)
            res.push(JaroWrinker(a[i], b[i]));
    else if (a.length > b.length)
        for (let i = 0; i < a.length; i++)
            res.push(JaroWrinker(a[i], i >= b.length ? '' : b[i]));
    else if (a.length < b.length)
        for (let i = 0; i < b.length; i++)
            res.push(JaroWrinker(i >= a.length ? '' : a[i], b[i]));


    const numb = res.reduce((a, b) => a + b)

    return numb / res.length;
}



const JaroWrinker = (s1, s2) => {


    let m = 0;

    // Exit early if either are empty.
    if (s1.length === 0 || s2.length === 0) {
        return 0;
    }

    // Exit early if they're an exact match.
    if (s1 === s2) {
        return 1;
    }

    let range = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1,
        s1Matches = new Array(s1.length),
        s2Matches = new Array(s2.length);

    for (let i = 0; i < s1.length; i++) {
        let low = (i >= range) ? i - range : 0,
            high = (i + range <= s2.length) ? (i + range) : (s2.length - 1);

        for (let j = low; j <= high; j++) {
            if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
                ++m;
                s1Matches[i] = s2Matches[j] = true;
                break;
            }
        }
    }

    // Exit early if no matches were found.
    if (m === 0) {
        return 0;
    }

    // Count the transpositions.
    let k = n_trans = 0;
    let j;
    for (let i = 0; i < s1.length; i++) {
        if (s1Matches[i] === true) {
            for (j = k; j < s2.length; j++) {
                if (s2Matches[j] === true) {
                    k = j + 1;
                    break;
                }
            }

            if (s1[i] !== s2[j]) {
                ++n_trans;
            }
        }
    }

    let weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3,
        l = 0,
        p = 0.1;

    if (weight > 0.7) {
        while (s1[l] === s2[l] && l < 4) {
            ++l;
        }

        weight = weight + l * p * (1 - weight);
    }

    return weight;
}


module.exports = {
    LevenshteinDistance,
    WordRatio,
    WordRatioCaller,
    JaroCaller,
    JaroWrinker
}