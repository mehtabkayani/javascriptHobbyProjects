const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part")


const words = ['application','programming','school','wizard',"abnormal","worm","spaceship","children","norway","homosapiens","jungle","smooking","age","ball","cricket"];

const correctLetters = [];
const wrongLetters = [];

let selectedWord = words[Math.floor(Math.random()* words.length)]




async function displayWord(){
    wordEl.innerHTML =  `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter"> 
                    ${correctLetters.includes (letter) ? letter : ''}
                </span>
            `).join('')
        }
    `;
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You Won! 😊'
        popup.style.display = 'flex'
    }
}

//Update thje wrong letters
function updateWrongLettersEl(){
    //Display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    
    `;

    //Display part
    figureParts.forEach((part, index) => {
        const error = wrongLetters.length;

        if(index < error){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }

    });
    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = "Unfortunatly you lost. 😒";
        popup.style.display = 'flex';
    }
   
}

//Show notification
function showNotification(){
    notification.classList.add("show");

    setTimeout(()=> {
        notification.classList.remove("show");

    },2000)
}

//Keydown letter press
window.addEventListener("keydown", e => {
    // console.log(e.keyCode)
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)

                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }
});

// Restart game play again
playAgainBtn.addEventListener("click", ()=>{
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)]
    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none'
})


displayWord();

// const wordsArrayApi = [];
// let dataLength = 0;
// getWords();
// async function getWords(){
//    const listOfWords = await fetch("https://random-word-api.herokuapp.com/all");
//    const data = await listOfWords.json();
//    dataLength = await data.length;
//    for (const iterator of data) {
       
//        wordsApi.push(await iterator)
//     }
//     let w = await getRandomWordFromArray(wordsApi)
//     console.log(w)
// }

// async function getRandomWordFromArray(array){
    
//     let selectedWord = await array[Math.floor(Math.random()* array.length)]
//     return selectedWord;
// }
