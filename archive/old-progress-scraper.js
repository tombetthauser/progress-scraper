// --------------------------------------------

// Welcome to Progress Scraper!

// This consolidates the student reports from the day into a readable summary in the browser console.
// It's is currently a duct-tapepd mess, but I tried to organize a bit!
// It developed piece by piece during the June cohort, needs an overhaul...

// To use it right now you just copy all of this and paste it into your browser console in Progress Tracker while you're looking at a given day's student reports.

// --------------------------------------------

let podNames = []; // Not yet in use...

// Grab all student report paragraph nodes.
let pNodes = Array.from(document.querySelectorAll('p'));

// Create objects for final console.log output.
let longResponses = {};
let wordCloudObj = {};

// Add words to boringWords if we want them to not appear in the common words list.
let boringWords = ["now", "one", "am", " ", "or", "them", "try", "through", "had", "as", "about", "using", "get", "things", "when", "pretty", "did", "can", "make", "would", "far", "time", "just", "definitely", "doing", "use", "what", "sure", "still", "at", "way", "some", "could", "our", "last", "out", "also", "do", "no", "while", "this", "even", "went", "after", "start", "always", "going", "got", "her", "both", "something", "i'll", "made", "don't", "really", "not", "link", "submitted", "was", "i've", "from", "i'm", "so", "and", "that", "with", "lot", "like", "in", "my", "but", "be", "on", "it's", "the", "it", "is", "we", "all", "a", "an", "by", "to", "you", "me", "he", "she", "they", "we", "how", "it", "i", "are", "to", "for", "of"];
let punctuation = '!"#$%&\()*+,-./:;<=>?@[\\]^_`{|}~';

// Helper function for comparing lengths of two paragraph nodes.
function compareLengths(a, b) {
  if (a.innerText.length < b.innerText.length) return -1;
  if (a.innerText.length > b.innerText.length) return 1;
  return 0;
}

// --------------------------------------------



// Go over each word in each report and create word counts in wordCloudObj.
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

// Create sorted word cloud array that is made of sub arrays that have both the word and count.
let sortedWordCloud = [];
for (var word in wordCloudObj) {
  let val = wordCloudObj[word];
  if (val > 1) sortedWordCloud.push([word, wordCloudObj[word]]);
}

// Then actually sort that sorted word counts array.
sortedWordCloud.sort(function (a, b) {
  return a[1] - b[1];
});

// Filter out all the boring words that have been identified as uninteresting for TAs.
sortedWordCloud = sortedWordCloud.filter(subArr => {
  let word = subArr[0];
  let count = subArr[1];
  return boringWords.includes(word) === false && count > 9;
})
sortedWordCloud = sortedWordCloud.reverse();

// --------------------------------------------

// Section for filtering out just names on the input pod names list.
// In progress! Not yet working...

// let allNames = {}; // key = firstName; val = [Student1LastName, Student2LastName]
// let podFirsts = podNames.map(name => name.split(" ")[0].toLowerCase());
// let podLasts = podNames.map(name => name.split(" ")[name.split(" ").length - 1].toLowerCase());

// Populate allNames obj
// pNodes.forEach(ele => {
//   let parent = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
//   let name = parent.textContent.split('\n')[11].trim();
//   let split = name.split(" ");
//   let first = split[0];
//   let last = split[split.length - 1];

//   if (allNames[first.toLowerCase()]) {
//     allNames[first.toLowerCase()].push(last.toLowerCase());
//   } else {
//     allNames[first.toLowerCase()] = [last.toLowerCase()];
//   }

  // console.log(first.toLowerCase());

  // let isNameInPod = false;
  // for (let i = 0; i < podFirsts.length; i++) {
  //   let currFirst = podFirsts[i];
  //   let currLast = podLasts[i];
  //   // console.log(first, last);
  //   // console.log(first.toLowerCase() === currFirst.toLowerCase())
  //   if (first.toLowerCase() === currFirst.toLowerCase()) {
  //     if (last.toLowerCase() === currLast.toLowerCase()) {
  //       isNameInPod = true;
  //       // console.log(first, last);
  //     }
  //   }
  // }
// })

// console.log(Object.keys(allNames).length);



// --------------------------------------------



// Sort all paragraph nodes by length in the pNodes array.
pNodes.sort(compareLengths);

// Filter out the five longest reports to display as highlights, might need to be changed.
let filteredNodes = pNodes.slice(pNodes.length - 5, pNodes.length);

// Grab student names and store them in the long responses object by working up parent nodes chain.
filteredNodes.forEach(ele => {
  let parent = ele.parentElement.parentElement.parentElement.parentElement.parentElement;
  let name = parent.textContent.split('\n')[11].trim();
  longResponses[name] = ele.innerHTML;
});


// --------------------------------------------



// Create some reference arrays for all the red-flagged reports.
let fails = Array.from(document.querySelectorAll(".grade-fail"));
let parents = fails.map(ele => ele.parentElement.parentElement.parentElement.parentElement);
let names = parents.map(ele => ele.innerHTML.split('">')[5].split("</a>")[0]);
let problems = fails.map(ele => ele.innerText);

let failsObject = {};

// Combine those arrays into one object with student names as keys and their report text as values.
for (let i = 0; i < fails.length; i++) {
  failsObject[names[i]] = problems[i];
}

// --------------------------------------------



// Grab all date information for final summary console.log text.
const date = new Date();
const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
const weekday = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);

// Print out all the console.log text... And that's it!
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