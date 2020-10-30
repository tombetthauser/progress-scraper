let pNodes = Array.from(document.querySelectorAll('p'));

let longResponses = {};
let wordCloudObj = {};

let boringWords = ["now", "one", "am", " ", "or", "them", "try", "through", "had", "as", "about", "using", "get", "things", "when", "pretty", "did", "can", "make", "would", "far", "time", "just", "definitely", "doing", "use", "what", "sure", "still", "at", "way", "some", "could", "our", "last", "out", "also", "do", "no", "while", "this", "even", "went", "after", "start", "always", "going", "got", "her", "both", "something", "i'll", "made", "don't", "really", "not", "link", "submitted", "was", "i've", "from", "i'm", "so", "and", "that", "with", "lot", "like", "in", "my", "but", "be", "on", "it's", "the", "it", "is", "we", "all", "a", "an", "by", "to", "you", "me", "he", "she", "they", "we", "how", "it", "i", "are", "to", "for", "of"];
let punctuation = '!"#$%&\()*+,-./:;<=>?@[\\]^_`{|}~';


function compareLengths(a, b) {
  if (a.innerText.length < b.innerText.length) return -1;
  if (a.innerText.length > b.innerText.length) return 1;
  return 0;
}

pNodes.sort(compareLengths);
let filteredNodes = pNodes.slice(pNodes.length - 5, pNodes.length);

filteredNodes.forEach(ele => {
  let parent = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
  let name = parent.textContent.split('\n')[11].trim();
  longResponses[name] = ele.innerHTML;
});

pNodes.forEach(ele => {
  let wordsArr = ele.innerText.split(' ');

  wordsArr.forEach(word => {
    let wordArr = word.split('');
    let cleanedWordArr = wordArr.filter(char => !punctuation.includes(char));
    let cleanedWord = cleanedWordArr.join('');
    let currentCount = wordCloudObj[cleanedWord.toLowerCase()];
    wordCloudObj[cleanedWord.toLowerCase()] = currentCount ? currentCount + 1 : 1;
  });
});

let sortedWordCloud = [];
for (var word in wordCloudObj) {
  let val = wordCloudObj[word];
  if (val > 1) sortedWordCloud.push([word, wordCloudObj[word]]);
}

sortedWordCloud.sort(function (a, b) {
  return a[1] - b[1];
});

sortedWordCloud = sortedWordCloud.filter(subArr => {
  let word = subArr[0];
  let count = subArr[1];
  return boringWords.includes(word) === false && count > 9;
})

sortedWordCloud = sortedWordCloud.reverse();

let fails = Array.from(document.querySelectorAll(".grade-fail"));
let parents = fails.map(ele => ele.parentElement.parentElement.parentElement.parentElement);
let names = parents.map(ele => ele.innerHTML.split('">')[5].split("</a>")[0]);
let problems = fails.map(ele => ele.innerText);

let failsObject = {};

for (let i = 0; i < fails.length; i++) {
  failsObject[names[i]] = problems[i];
}

const date = new Date();
const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
const weekday = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);

console.log(`\n\n\n
  -------------------------------------------\n
  Student Reports Summary – ${weekday} ${month} ${day}, ${year}\n
  -------------------------------------------\n
  \n\n5 Longest Responses (${filteredNodes[0].innerText.length}+ characters):\n\n
`);

for (let name in longResponses) console.log(`${name}: "${longResponses[name]}"\n\n`);
console.log(`\n\n\nRed Flagged Responses:\n\n`);
for (let name in failsObject) console.log(`${name}: "${failsObject[name]}"\n\n`);

console.log(`\n\n\nCommon Words from Reports:\n\n`);
console.log(sortedWordCloud.join(` | `));
console.log(`\n\n(end of summary)\n----------------------------\n`);











// class Scraper {
//   constructor() {
//     this.filterLength = 150; // How many characters counts as a 'long' student entry?

//     this.pNodes = [];
//     this.issuesObject = {};
//   }

//   retreivePNodes() {
//     this.pNodes = Array.from(document.querySelectorAll('p'));
//   }

//   filterPNodes() {
//     this.pNodes = this.pNodes.filter(ele => {
//       ele.innerHTML.length > this.filterLength
//     });
//   }

//   pNodesToIssuesObj() {
//     this.pNodes.forEach(ele => {
//       const parent = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
//       const name = parent.textContent.split('\n')[11].trim();

//       this.issuesObject[name] = ele.innerHTML; 
//     })
//   }

//   run() {
//     this.retreivePNodes();
//     this.filterPNodes();
//     this.pNodesToIssuesObj();
//   }
// }

// const newScraper = new Scraper();
// newScraper.run();

// console.log(newScraper.pNodes)