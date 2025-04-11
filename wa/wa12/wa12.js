const newQuoteButton = document.querySelector('#js-new-quote')
newQuoteButton.addEventListener('click', () => getQuote() )

cardGrid = document.querySelector('.card-grid')

let answer = '';
counter = 1;

async function getQuote(){
    const url = 'https://api.kanye.rest/'

    try{
        const response = await fetch(url)
        if (!response.ok){
            throw Error.throw(response.statusText)
        }

        const json = await response.json();
        console.log(json)

        if (badWordExists(json.quote)){
            getQuote();
        }
        else {
            displayQuote(json)
        }
       
    }
    catch (err) {
        console.log(err)
        alert('Failed')
    }
}

function displayQuote(json_response) {
    const div = document.createElement('div');
    div.className = "card";
    div.innerHTML = `
    <h2> Quote #${counter} </h2> 
    <img src="kanye.png" alt="Kanye West" class="kanye-img">
    <p> ${json_response.quote} </p>
    `;
    counter +=1;
    cardGrid.prepend(div);
    div.addEventListener('click', () => {
        cardGrid.removeChild(div);
        counter -= 1;
    })
}

// Had to include this to prevent suspicious tweets
const inappropriateWords = ['fuck', 'shit', 'shit.', 'sex'];
function badWordExists(text) {
    const words = text.split(' ');
    
    for (const word of words) {
        if (inappropriateWords.includes(word)) {
            return true;
        }
    }
    
    return false;
}

getQuote();
