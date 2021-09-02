# Progress Scraper 🤖

- Made primarily by Justin Nguyen! (posted here for convenience)
- Paste the following code into your browser console and run it while on the reports page for a given day on Progress Tracker
- It automatically puts comma separated values on your clipboard that you can paste into your cohort tracking sheet
- Just make sure all your student names match those on progress tracker and are in alphabetical order
- When you paste these into your Cohort Tracking sheet select the first student's 'self' field
– Select the paste options that appears and choose 'Split Text to Columns'
- Choose either the 'comma' separator or let it detect automatically

```javascript
const allReports = [];
// Self Grade Options
const SELF_GRADE_1 = 'Not comfortable at all'; // r
const SELF_GRADE_2 = 'Struggled with some concepts'; // r
const SELF_GRADE_3 = 'Have general understanding'; // y
const SELF_GRADE_4 = 'Confident I understand'; // no color
const SELF_GRADE_5 = 'Extremely comfortable'; // green
// Pair Grade Options
const PAIR_GRADE_1 = 'Not comfortable at all';
const PAIR_GRADE_2 = 'Struggled with some concepts';
const PAIR_GRADE_3 = 'Had a general understanding';
const PAIR_GRADE_4 = 'Understood it all';
const PAIR_GRADE_5 = 'Extremely comfortable';
const allReportNodes = document.querySelectorAll('.progress-report');
allReportNodes.forEach((node) => {
  const name = node.querySelector('.report-header.group a').innerText;
  const noSelfReport =
    node.querySelector('.report').innerText === 'No report submitted.';
  const noPairReport = node
    .querySelector('.review')
    .innerText.startsWith('No pair review submitted');
  const selfGradeNode = node.querySelector('.report .responses');
  const pairGradeNode = node.querySelector('.review .responses');
  const selfGrade = selfGradeNode ? selfGradeNode.innerText : null;
  const pairGrade = pairGradeNode ? pairGradeNode.innerText : null;
  const student = [name, ' ', ' '];
  if (noSelfReport) {
    // console.log('No report submitted for', node);
    student[1] = '-';
  } else if (
    selfGrade &&
    (selfGrade.includes(SELF_GRADE_1) || selfGrade.includes(SELF_GRADE_2))
  ) {
    student[1] = 'r';
  } else if (selfGrade && selfGrade.includes(SELF_GRADE_3)) {
    student[1] = 'y';
  }
  if (noPairReport) {
    // console.log('no pair report for', node);
    student[2] = '-';
  } else if (
    pairGrade &&
    (pairGrade.includes(PAIR_GRADE_1) || pairGrade.includes(PAIR_GRADE_2))
  ) {
    student[2] = 'r';
  } else if (pairGrade && pairGrade.includes(PAIR_GRADE_3)) {
    student[2] = 'y';
  }
  allReports.push(student);
});
allReports.sort((a, b) => {
  if (a[0] < b[0]) return -1;
  else if (a[0] > b[0]) return 1;
  else return 0;
});
const selfGradeColors = allReports.map((student) => student[1]);
// const selfGradeString = selfGradeColors.join('\n');
const pairGradeColors = allReports.map((student) => student[2]);
// const pairGradeString = pairGradeColors.join('\n');
const selfAndPairColors = selfGradeColors.map((el, i) => {
  return [el, pairGradeColors[i]].join(',');
});
const selfAndPairString = selfAndPairColors.join('\n');

copy(selfAndPairString)
// 2. Paste it into reports tracker (select the first student's 'self' field)
//// a. Select the paste options that appears and choose 'Split Text to Columns'
//// b. Choose either the 'comma' seperator or let it detect automatically.
```
