const words =  [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i","it", "for", "not", "on", "with", "he", "as", "you", "do", "at","this", "but", "his", "by", "from", "they", "we", "say", "her", "she","or", "an", "will", "my", "one", "all", "would", "there", "their", "what","so", "up", "out", "if", "about", "who", "get", "which", "go", "me","when", "make", "can", "like", "time", "no", "just", "him", "know", "take","people", "into", "year", "your", "good", "some", "could", "them", "see", "other","than", "then", "now", "look", "only", "come", "its", "over", "think", "also","back", "after", "use", "two", "how", "our", "work", "first", "well", "way","even", "new", "want", "because", "any", "these", "give", "day", "most", "us","is", "are", "was", "were", "been", "being", "doing", "has", "had", "having","might", "may", "must", "shall", "should", "ought", "does", "did", "done","gone", "going", "made", "putting", "saying", "says", "coming", "gave", "giving","getting", "gets", "goes", "makes", "seeing", "seen", "takes", "taken", "using","uses", "might", "may", "must", "shall", "should", "ought", "been", "does","doing", "done", "gone", "going", "made", "putting", "saying", "says", "coming","gone", "doing", "made", "putting", "said", "say", "sees", "come", "used","uses", "comes", "first", "even", "new", "want", "because", "any", "these","give", "day", "most", "us", "get", "has", "been", "they", "we", "say","her", "she", "or", "an", "will", "my", "one", "all", "would", "there","their", "what", "so", "up", "out", "if", "about", "who", "get", "which","go", "me", "when", "make", "can", "like", "time", "no", "just", "him","know", "take", "people", "into", "year", "your", "good", "some", "could", "them","see", "other", "than", "then", "now", "look", "only", "come", "its", "over","think", "also", "back", "after", "use", "two", "how", "our", "work", "first","well", "way", "even", "new", "want", "because", "any", "these", "give", "day","most", "us", "is", "are", "was", "were", "been", "being", "doing", "has","had", "have", "having", "might", "may", "must", "could", "can", "will", "shall","should", "would", "ought", "does", "did", "doing", "done", "go", "went", "gone","going", "make", "made", "making", "put", "puts", "putting", "say", "said", "saying","says", "come", "came", "coming", "do", "does", "done", "give", "gave", "giving","gets", "make", "makes", "put", "puts", "say", "said", "see", "saw", "seen","take", "took", "taking", "give", "go", "came", "seen", "make", "should", "come","have", "also", "only", "because", "good", "just", "myself", "very", "been", "our","little", "made", "may", "looked", "own", "off", "do", "did", "doing"
];

// selection of elements
const speedtype = document.querySelector("#speedtype");
const exitBtn = document.querySelector("#exit");
const word = document.querySelector("#word");
const numberOfWords = document.querySelectorAll(".numberOfWords");
const timeBtn = document.querySelector("#timeBtn");
const wordBtn = document.querySelector("#wordBtn");
const wordCount = document.querySelector("#wordCount");
const timeSelected = document.querySelector("#timeSelected");
const timeToCompleteTest = document.querySelectorAll(".timeToCompleteTest");
const restartTest = document.querySelector("#restartTest");
const rotateRight = document.querySelector("#rotateRight");
const nextTest = document.querySelector("#nextTest");
const repeatTest = document.querySelector("#repeatTest");
const timer = document.querySelector("#timer");
const wordsCompleted = document.querySelector("#wordsCompleted");
const text = document.querySelector("#text");
const showResult = document.querySelector("#showResult");
const wpm = document.querySelector("#wpmNumber");
const accuracy = document.querySelector("#accuracy");
let selectedwords = [];
let n = words.length;
let t = 15;
let timerid;
let inputtext;
let check1;
let wd,lt,startDate;
let originallength;

// Event listners
exitBtn.addEventListener("click", () => window.close());
timeBtn.addEventListener("click", SetModeToTime);
wordBtn.addEventListener("click", SetModeToWord);
numberOfWords.forEach(wordBtnSelected => {
    wordBtnSelected.addEventListener("click", () => setNumberOfWords(wordBtnSelected));
});
timeToCompleteTest.forEach(timeBtnSelected => {
    timeBtnSelected.addEventListener("click", () => setTimeToCompleteTest(timeBtnSelected));
});
rotateRight.addEventListener('click', restart);
nextTest.addEventListener('click', reset);
repeatTest.addEventListener('click', repeat);


//  to focus our input div
text.focus();
window.onclick = (()=>{
    text.focus();
})


//  function to add class
function addClass(el,name){
    el.classList.add(name);
}
//  function to remove class
function removeClass(el,name){
    el.classList.remove(name);
}


//  begin the new game by adding words to the word div
function newGame(){
    word.style.marginTop = "0px";
    selectedwords=[];
    word.innerText = "";
    for(let i=0; i<n; i++){
        selectedwords.push(words[Math.floor(Math.random()*words.length)]);
    }
    //  used to add elements to the div
    for(let i=0; i<n; i++){
        let div = document.createElement("div");
        for(let j=0; j<selectedwords[i].length; j++){
            let span = document.createElement("span");
            span.innerText = selectedwords[i][j];
            addClass(span, "grey"); 
            addClass(span, "letter");
            div.appendChild(span);
        }
        word.appendChild(div);
    }
    //  used to check the position of the word div
    //  so to adjust the padding of the restart button
    //  if n=25 then spmetimes it may take 3 lines sometimes it takes 2 lines
    //  so this case is taken when it takes 3 lines
    if((Number(word.getBoundingClientRect().bottom) > 400) && (n === 25)){
        restartTest.style.paddingTop = "4vh";
    }
}


//  initialize the variables used 
function startgame(){
    inputtext=[];
    check1 = true;
    wd = 0;
    lt = 0;
    addClass(word.children[wd].children[lt],"current");
    wordsCompleted.style.color = "#2e2f32";
    timer.style.color = "#2e2f32";    
    clearInterval(timerid);
}


//  used to run against keyboard responses
document.querySelector("#text").onkeyup = function(e) {
    if((e.keyCode >= 32 && e.keyCode <= 126) || e.keyCode == 8){
        if(check1){
            startDate = new Date();
            wordsCompleted.innerText = `${wd}/${n}`;
            timer.innerText = `${t}`;
            //  used to display the timer or words completed according to the mode selected
            if(timeBtn.classList.contains("activeMode")){
                wordsCompleted.style.display = "none";
                timer.style.display = "flex";
                timer.style.color = "#e2b714";
            }
            else{
                timer.style.display = "none";
                wordsCompleted.style.display = "flex";
                wordsCompleted.style.color = "#e2b714";
            }
            //   used to start the timer
            if(timeBtn.classList.contains("activeMode")){
                timerid = setInterval(() => {
                    let temporary = Number(timer.innerText)-1;
                    timer.innerText = temporary;
                    //  used to show result
                    if(timer.innerText == "0"){
                        result(t);
                        clearInterval(timerid);
                    }
                }, 1000);
            }
            check1 = false;
        }
        if(lt == 0){
            originallength = word.children[wd].innerText.length;
        }
        //   used to add word entered in input area to the array
        if ((e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32) && (lt != 0)      
        ) {
            wordsCompleted.innerText = `${wd+1}/${n}`
            removeClass(word.children[wd].children[lt-1] , "cursoratright");
            if(lt < originallength) removeClass(word.children[wd].children[lt] , "current");
            wd++;
            lt = 0;
            if(wd < n)
                addClass(word.children[wd].children[lt] , "current");
            let s = text.value;
            
            inputtext.push(s.trim());
            text.value = "";
            console.log(inputtext);
            //  show result
            if(inputtext.length == n && (wordBtn.classList.contains("activeMode"))){
                let currentDate = new Date();
                let time = (currentDate-startDate)/1000;
                result(time);
            }
        }
        //  if backspace is pressed and extra letters have to be removed
        else if((e.keyCode == 8 || e.code == "Backspace") && lt > originallength){
            lt--;
            addClass(word.children[wd].children[lt-1] , "cursoratright");
            word.children[wd].removeChild(word.children[wd].children[lt]);
        }
        //  if letters have to be removed
        else if(e.keyCode == 8 || e.code == "Backspace"){
            if(lt != 0){
                lt--;
                addClass(word.children[wd].children[lt] , "grey");
                removeClass(word.children[wd].children[lt] , "incorrect");
                removeClass(word.children[wd].children[lt] , "correct");
                addClass(word.children[wd].children[lt] , "current");
                if(lt == originallength-1){
                    removeClass(word.children[wd].children[lt] , "cursoratright");
                }
                else{
                    removeClass(word.children[wd].children[lt+1] , "current");
                }
            }
            else if(wd != 0 && inputtext[wd-1] != selectedwords[wd-1]){
                const currentLetter = document.querySelector(".current");
                if(currentLetter.getBoundingClientRect().top < 275 && currentLetter.getBoundingClientRect().left < 210){
                    // do nothing
                }
                else{
                    removeClass(word.children[wd].children[lt] , "current");
                    wd--;
                    lt = inputtext[wd].length;
                    console.log(lt);
                    text.value = "";
                    text.value = inputtext[wd];
                    console.log(text.value);
                    originallength = selectedwords[wd].length;
                    console.log(originallength);
                    if(lt >= originallength) addClass(word.children[wd].children[lt-1] , "cursoratright");
                    else addClass(word.children[wd].children[lt] , "current");
                    
                    inputtext.pop();                    
                }

            }
        }
        //  if extral letters is to be added 
        else if(lt >= originallength){
            let extra = document.createElement("span");
            extra.innerText = e.key;
            extra.classList.add("incorrect") ;
            word.children[wd].appendChild(extra);
            addClass(word.children[wd].children[lt] , "cursoratright");
            addClass(word.children[wd].children[lt] , "letter");
            removeClass(word.children[wd].children[lt-1] , "cursoratright");
            lt++;
        }
        //  if the letter entered is correct
        else if(e.key == word.children[wd].children[lt].innerText){
            addClass(word.children[wd].children[lt] , "correct");
            removeClass(word.children[wd].children[lt] , "grey");
            removeClass(word.children[wd].children[lt] , "current");
            if(lt<originallength-1)
                addClass(word.children[wd].children[lt+1] , "current");
            else
                addClass(word.children[wd].children[lt] , "cursoratright");
            lt++;
        }
        //  if the letter entered is incorrect
        else if(e.key != word.children[wd].children[lt].innerText && e.key != " "){
            addClass(word.children[wd].children[lt] , "incorrect");
            removeClass(word.children[wd].children[lt] , "grey");
            removeClass(word.children[wd].children[lt] , "current");
            if(lt<originallength-1)
                addClass(word.children[wd].children[lt+1] , "current");
            else
                addClass(word.children[wd].children[lt] , "cursoratright");
            lt++;
        }
    }

    //  it is used to change the margin of the worddiv according to the value of n
    //  so that if cursor reaches the last line all the lines could shift one position upwards
    const currentLetter = document.querySelector(".current");
    if(currentLetter != null && (currentLetter.getBoundingClientRect().top > 350)){
        const margin = parseInt(word.style.marginTop || '0px');
        word.style.marginTop = (margin - 47) + 'px';
    }
    
}


//  used to select mode as time
function SetModeToTime() {
    removeClass(wordBtn,"activeMode")
    addClass(timeBtn,"activeMode");
    wordCount.style.display = "none";
    timeSelected.style.display = "flex";
    n = words.length;
    word.style.height = "142px";
    word.parentElement.style.height = "142px";
    restartTest.style.paddingTop = "5vh";
    newGame();
    startgame();
}

//  used to select mode as word
function SetModeToWord() {
    removeClass(timeBtn,"activeMode");
    addClass(wordBtn,"activeMode")
    timeSelected.style.display = "none";
    wordCount.style.display = "flex";
    restartTest.style.paddingTop = "16.7vh";
    numberOfWords.forEach(e => {
        if(e.classList.contains("currentWordCount")){
            n = Number(e.innerText);
        }
    })
    if(n === 25 || n === 10){
        word.style.height = "auto";
        word.parentElement.style.height = "auto";
    }
    if(n === 10){
        restartTest.style.paddingTop = "16.7vh";
    }
    newGame();
    startgame();
}

//  used to select number of words to be displayed
function setNumberOfWords(wordBtnSelected) {
        numberOfWords.forEach(e => {
            removeClass(e, "currentWordCount");
        })
        addClass(wordBtnSelected, "currentWordCount");
        n = Number(wordBtnSelected.innerText);
        if (n === 25 || n === 10) {
            word.style.height = "auto";
            word.parentElement.style.height = "auto";
            if(n === 10){
                restartTest.style.paddingTop = "16.7vh";
            }
            else {
                restartTest.style.paddingTop = "10.4vh";
            }
        } 
        else {
            word.style.height = "142px";
            word.parentElement.style.height = "142px";
            restartTest.style.paddingTop = "5vh";
        }
        newGame();
        startgame();
    }


//  used to select the time for the timer    
function setTimeToCompleteTest(timeBtnSelected) {
        timeToCompleteTest.forEach(e => {
            removeClass(e , "currentTimeSelected");
        })
        addClass(timeBtnSelected , "currentTimeSelected");
        n = words.length;
        t = Number(timeBtnSelected.innerText);
        newGame();
        startgame();
    }


    //  used to show the result
function result(timeTaken){ 
    let correctChracters = 0;
    let incorrectChracters = 0;
    let typingSpeed = 0;
    let acc = 0;
    for(let i=0; i<wd; i++){
        for(let j=0; j<selectedwords[i].length; j++){
            if(inputtext[i][j] === selectedwords[i][j]){
                correctChracters += 1;
            }
            else incorrectChracters += 1;
        }
        if(inputtext[i].length > selectedwords[i].length) incorrectChracters += (inputtext[i].length - selectedwords[i].length);
    }
    typingSpeed = (((correctChracters + wd) / 5) * 60) / timeTaken;
    acc = ((correctChracters / (correctChracters + incorrectChracters))) * 100;

    wpm.innerText = Math.round(typingSpeed);
    accuracy.innerText = Math.round(acc);
    removeClass(showResult , "hide");
    addClass(speedtype , "hide");
}


 
//  used to restart the game  
function  restart() {
    newGame();
    startgame();
};

//  used to reset the game to new one
function reset() {
    newGame();
    startgame();
    removeClass(speedtype , "hide");
    addClass(showResult , "hide");
};

//  used to reset the game played before
function repeat() {
    //  used to remove all the classes that have been assigned to the letters of word div
    for(let i=0; i<n; i++){
        let extraLength = word.children[i].innerText.length;
        console.log(extraLength);
        for(let j=extraLength-1; j>=selectedwords[i].length; j--){
            word.children[i].removeChild(word.children[i].children[j]);
        }
    }
    //  used to assign initial class to all the letters in word div
    for(let i=0; i<n; i++){
        for(let j=0; j<selectedwords[i].length; j++){
            word.children[i].children[j].className = '';
            word.children[i].children[j].classList.add("grey"); 
            word.children[i].children[j].classList.add("letter");
        }
    }
    removeClass(speedtype , "hide");
    addClass(showResult , "hide");
    startgame();
};

newGame();
startgame();
   