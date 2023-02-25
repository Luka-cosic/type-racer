let text = document.querySelector('.text');
let inputText = document.querySelector('.input-text');
let startBtn = document.querySelector(".start-btn");
let container = document.querySelector(".container");
let carImg = document.querySelector(".car-img");
let mySpeed = document.querySelector(".my-speed");

let textSplit;
let span;
let rand;
let V = 0;
let num = -1;

startBtn.addEventListener("click", preparation);

let s = 5
function preparation (){ 
    container.classList.add("start");

    let lights = document.querySelectorAll(".light");
    let stopWatch = document.querySelector(".stop-watch");
    let traficLights = document.querySelector(".trafic-light");

    lights[0].style.backgroundColor = "red";
    function shuffle() {
        
        rand = Math.floor(Math.random() * mainText.length);
        textSplit = mainText[rand].split("");
        textSplit.map((el) => {
            let span = document.createElement("span");
            span.append(el);
            text.append(span);
        });
        span = document.querySelectorAll("span"); 
    }
    shuffle()
    
    
   let time =  setInterval(()=>{
        stopWatch.innerHTML = s;
        
        if(s === 3){
            lights[0].style.backgroundColor = "gray";
            lights[1].style.backgroundColor = "yellow";
        }
        if(s === 1){
            lights[0].style.backgroundColor = "gray";
            lights[1].style.backgroundColor = "gray";
            lights[2].style.backgroundColor = "green";
            traficLights.style.opacity = "0"
        }
        if(s === 0){ start(); clearInterval(time)};
        s--
    }, 1000)
      
}

function start() {
    inputText.focus();
    let time = 0;

    let clock = setInterval(() => { time++; }, 1000);
    function getAverageTime() {
        let averageTime = textSplit.length / time;
        mySpeed.innerHTML = `My Speed Is: ${averageTime} words/s`
    }

    // Choose text and Create SPANS
    
    //END END Choose text and Create SPANS


    let blander = false;
    let blanderArr = []
    
    
    window.addEventListener("keypress", typing);

    function typing(e) {
        
        num++;
        
        if (textSplit.length - 1 < num ) { 
           
            inputText.value = inputText.value;
            return; 
        };
        console.log(num);
        if (e.key === span[num].innerText) {
            blander ? span[num].style.backgroundColor = "red" :
                (span[num].style.color = "green", moveVehicle());

            if (blanderArr.length > 0) { blanderArr.push(num) };
            handleInput();

        } else {
            blanderArr.push(num);
            blander = true;
            span[num].style.backgroundColor = "red";
            handleInput();
            
        }
        if (textSplit.length - 1 === num) {
            !blander && (clearInterval(clock), getAverageTime());
        };
        
        
    }

    window.addEventListener("keydown", backspace)

    // Use BACKSPACE key
    function backspace(e) {

        if (e.code === "Backspace" && num != -1) {
            console.log(num);
            if (textSplit.length === num + 1 && !blander) { return; };
            if (blanderArr.length === 0) {  movebackVehicle(90 / textSplit.length); };
            if (blanderArr.length > 0) { blanderArr.splice(0, 1); }
            if (blanderArr.length === 0) { blander = false; };
            
            span[num].style.color = "black";
            span[num].style.backgroundColor = "white";
            num--;
        }
    }
    //End of Use BACKSPACE key

    // Delete word from input
    let spanWordCount = 0;
    function handleInput() {
        let spanWord = mainText[rand].split(" ");
        setTimeout(() => {
            if (inputText.value === `${spanWord[spanWordCount]} `) {
                inputText.value = "";
                spanWordCount++;
            }
        }, 1)
    }
    // End of Delete word from input

    // Move Vehicle
    function moveVehicle() {
        let textLength = mainText[rand].split("").length;
        let fast = 90 / textLength;
        V = V + fast; 
        carImg.style.left = `${V}rem`;
        
    }
    // End Of Move Vehicle;

    function movebackVehicle(back){
        V = V - back;
        carImg.style.left = `${V}rem`;
    }




}