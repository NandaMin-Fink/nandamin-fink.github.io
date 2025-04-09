const newQuoteButton = document.querySelector('#js-new-quote')
newQuoteButton.addEventListener('click', () => getQuote() )

const showAnswerButton = document.querySelector('#js-tweet')
showAnswerButton.addEventListener('click', () => displayAnswer() )
const displayAnswerDiv = document.querySelector('#js-answer-text')

let answer = '';
getQuote();

async function getQuote(){
    displayAnswerDiv.innerHTML = '';
    const url = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'

    try{
        const response = await fetch(url)
        if (!response.ok){
            throw Error.throw(response.statusText)
        }

        const json = await response.json();
        console.log(json)
        answer = json.answer
        displayQuote(json)
    }
    catch (err) {
        console.log(err)
        alert('Failed')
    }
}

function displayQuote(json_response) {
    const displayQuoteDiv = document.querySelector('#js-quote-text')
    displayQuoteDiv.innerHTML = `<p> ${json_response.question} </p>`
}

function displayAnswer(){
    displayAnswerDiv.innerHTML = `<p> ${answer} </p>`
}
