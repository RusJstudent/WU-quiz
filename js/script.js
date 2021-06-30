'use strict';

let question1 = `Well, lets's start.<br>In which year did WarUniverse appear?`;
let question2 = `How much minutes set <br>to complete Blade runner quest?`;
let question3 = `Do you know developer's nickname<br> that starts with "S" letter?`;
let question4 = `Most difficult question.<br>How much maps does WU have?`; // There are in total 30 maps in the game: 21 PvE, 2 PvP, 3 gates, sector-18 and 3 special maps named X-1, X-2, X-3
let question5 = `Last question:<br>What percent of hp you<br>regenerate with entrans<br>when you shoot somebody<br>who is out of shields?`;
let q = [question1, question2, question3, question4, question5];

let answers = ['2017', '20', 'spaiowenta', '30', '50'];



// let userName = prompt('Before we start, write here you name, please', '');
// // let userName = 'admin';
// if (userName === null || userName.trim() === "") enteredNoName();

let difficulty = ['easy', 'normal', 'hard', 'unreal'];
let difficultyTime = [120, 30, 7, 1];
let index;

let rightAnswers = 0;

let i = 1;

setDifficulty();

// function enteredNoName() {
//     userName = prompt('Is not answer, dude. Write you name, please', '');
//     if (!userName) noName();
// }

function result(num) {
    return num === 0 ? `${rightAnswers} out of ${q.length} questions\u{1F630}<br><br>` :
    num === 1 ? `${rightAnswers} out of ${q.length} questions\u{1F615}<br><br>` :
    (num === 2 || num === 3) ? `${rightAnswers} out of ${q.length} questions<br><br>Not bad!\u{1F610}<br><br>` :
    (num === 4) ? `${rightAnswers} out of ${q.length} questions<br><br>Good enough!\u{263A}<br><br>` :
    (num === 5 && index === 3) ? `${rightAnswers} out of ${q.length} questions<br><br>
Achievement unlocked:<br>"The fastest hands<br> in the wild west"!\u{1F60E}<br>Make screenshot and share<br>this insane result!`:
    (num === 5) ? `${rightAnswers} out of ${q.length} questions<br><br>Outstanding!\u{1F60A}` :
    `${rightAnswers} out of ${q.length} questions<br>Something wrong here.<br>Please pm EvilYou#1118 <br>in discord to fix this bug<br><br>`;
}

function setDifficulty() {
    main.innerHTML= `Please, choose the difficulty. <br>There are 4 levels of difficulty over here:<br>
    ${difficulty[0]}, ${difficulty[1]}, ${difficulty[2]} and ${difficulty[3]}.<br>
    Higher difficulty, <br>less time you have.<br><br>
    Please, write difficulty level <br>you choose to form below:`;
    let timerId0 = setInterval(() => {
        if (difficulty.includes(input.value.toLowerCase()) ) {
            index = difficulty.indexOf(input.value.toLowerCase());

            img0.hidden = true;
            if (index === 0) {
                img1.hidden = false;
            } else if (index === 1) {
                img2.hidden = false;
            } else if (index === 2) {
                img3.hidden = false;
            } else if (index === 3) {
                img4.hidden = false;
            }

            input.value = "";
            clearInterval(timerId0);
            askQuestion(i);
        }
    }, 300);
}

function askQuestion(number) {
    let counter;
    main.innerHTML = q[number - 1];
    qNum.textContent = "Question №" + i;
    hurry.hidden = false;

    let timerId = setInterval(() => {
        counter = counter ?? difficultyTime[index];
        timer.style.color = counter <= 5 ? "red" : counter <= 20 ? "orange" : "green";
        timer.textContent = counter;
        if (answers[i - 1] === input.value.toLowerCase()) {
            isTrue.textContent = 'Correct!';
            clearInterval(timerId);
            rightAnswers++;
            nextQuestion();
        } else {
            counter--;
            if (counter === -1) {
                isTrue.textContent = "Time's up!";
                if (index < 2) {
                    isTrue.innerHTML = `Time's up.<br>
                    Correct answer: ${answers[i - 1]}`;
                }
                clearInterval(timerId);
                nextQuestion();
            }
        }
    }, 1000);
}

function nextQuestion() {
    input.value = "";
    input.hidden = true;
    isTrue.hidden = false;
    hurry.hidden = true;
    i++;
    setTimeout(() => {
        isTrue.hidden = true;
        if (i <= q.length) {
            askQuestion(i);
            input.hidden = false;
        } else {
            timer.hidden = true;
            qNum.hidden = true;
            quizFinished();
        }
    }, 1000 * (4 - index));
}

// <i><ins>${userName}</ins></i>
function quizFinished() {
    main.innerHTML = `WU quiz<br>
    on level "${difficulty[index]}"<br> finished.<br><br>
    Your result: ${Math.round(rightAnswers/q.length*100)}%<br>
    You have answered <br>${result(rightAnswers)}`;
}
