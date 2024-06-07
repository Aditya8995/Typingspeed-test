import words from "./words.js";
let text = document.querySelector("#text");

text.focus();
window.onclick = (()=>{
    text.focus();
})

const n = 25;
const selectedwords=[];
for(let i=0; i<n; i++){
    selectedwords.push(words[Math.floor(Math.random()*words.length)]);
}
let word = document.querySelector("#word");
for(let i=0; i<n; i++){
    let div = document.createElement("div");
    for(let j=0; j<selectedwords[i].length; j++){
        let span = document.createElement("span");
        span.innerText = selectedwords[i][j];
        span.classList.add("grey"); 
        span.classList.add("letter");
        div.appendChild(span);
    }
    word.appendChild(div);
}
 
let inputtext=[];
let check = "true";
let wd,lt,startDate;
wd = 0;
lt = 0;
let originallength;
word.children[wd].children[lt].classList.add("current");
document.querySelector("#text").onkeyup = function(e) {
    if((e.keyCode >= 32 && e.keyCode <= 126) || e.keyCode == 8){
        if(check){
            startDate = new Date();
            check = false;
        }
        if(lt == 0){
            originallength = word.children[wd].innerText.length;
        }
    
        if ((e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32) && (lt != 0)      
        ) {
            word.children[wd].children[lt-1].classList.remove("cursoratright");
            if(lt < originallength) word.children[wd].children[lt].classList.remove("current");
            wd++;
            lt = 0;
            if(wd < n)
                word.children[wd].children[lt].classList.add("current");
            let s = document.querySelector("#text").value;
            
            inputtext.push(s.trim());
            document.querySelector("#text").value = "";
        
            console.log(inputtext);
            if(inputtext.length == n){
                check = true;
                let currentDate = new Date();
                let time = currentDate-startDate;
                let correctcount = 0;
                for(let i=0; i<n; i++){
                    if(inputtext[i] === selectedwords[i]){
                        correctcount += 1;
                    }
                }
                console.log(time);
                console.log(correctcount);
                let typingspeed = Math.round((correctcount*60)*1000/time);
                let result = document.querySelector("#result");
                let result1 = document.querySelector("#result1");
                let speedtype = document.querySelector("#speedtype");
                speedtype.style.display = "none";
                result1.innerHTML = "Typing speed is : " + typingspeed + " wpm";
                result.style.display = "flex";

        }
        }
        else if((e.keyCode == 8 || e.code == "Backspace") && lt > originallength){
            lt--;
            word.children[wd].children[lt-1].classList.add("cursoratright");
            word.children[wd].removeChild(word.children[wd].children[lt]);
        }
        else if(e.keyCode == 8 || e.code == "Backspace"){
            if(lt != 0){
                lt--;
                word.children[wd].children[lt].classList.add("grey");
                word.children[wd].children[lt].classList.remove("incorrect");
                word.children[wd].children[lt].classList.remove("correct");
                word.children[wd].children[lt].classList.add("current");
                if(lt == originallength-1){
                    word.children[wd].children[lt].classList.remove("cursoratright");
                }
                else{
                    word.children[wd].children[lt+1].classList.remove("current");
                }
            }
        }
        else if(lt >= originallength){
            let extra = document.createElement("span");
            console.log(5);
            extra.innerText = e.key;
            extra.classList.add("incorrect") ;
            word.children[wd].appendChild(extra);
            word.children[wd].children[lt].classList.add("cursoratright");
            word.children[wd].children[lt].classList.add("letter");
            word.children[wd].children[lt-1].classList.remove("cursoratright");
            lt++;
        }
        else if(e.key == word.children[wd].children[lt].innerText){
            word.children[wd].children[lt].classList.add("correct");
            word.children[wd].children[lt].classList.remove("grey");
            word.children[wd].children[lt].classList.remove("current");
            if(lt<originallength-1)
                word.children[wd].children[lt+1].classList.add("current");
            else
                word.children[wd].children[lt].classList.add("cursoratright");
            lt++;
        }
        else if(e.key != word.children[wd].children[lt].innerText && e.key != " "){
            word.children[wd].children[lt].classList.add("incorrect");
            word.children[wd].children[lt].classList.remove("grey");
            word.children[wd].children[lt].classList.remove("current");
            if(lt<originallength-1)
                word.children[wd].children[lt+1].classList.add("current");
            else
                word.children[wd].children[lt].classList.add("cursoratright");
            lt++;
        }
    }
  }
   