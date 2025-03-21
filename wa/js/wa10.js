const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText = "It was 94 fahrenheit outside, so :insertx: went to the grocery store. When they got to :inserty:, they couldn't believe their eyes. There was :insertz:. Bob immediatly walked back outside, but was squished by the automatic sliding door — :insertx: weighs 300 pounds and has squished Bob much harder."
const insertX = ["CJ Dubs", "T Dizzy","Brizzy T"]
const insertY = ["Safeway", "King Soopers", "Sprouts"]
const insertZ = ["a few dozen eggs hatching chickens in the poultry aisle", "a couple filming a tiktok in the cleaning aisle", "no more spaghetti"]

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    let xItem = randomValueFromArray(insertX)
    let yItem = randomValueFromArray(insertY)
    let zItem = randomValueFromArray(insertZ)

    newStory = newStory.replaceAll(':insertx:', xItem)
    newStory = newStory.replaceAll(':inserty:', yItem)
    newStory = newStory.replaceAll(':insertz:', zItem)

    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll('Bob', name)
    }

    if(document.getElementById("uk").checked) {
        const weight = Math.round(300/14) + ' stone';
        const temperature =  Math.round((94 -32) * (5/9)) + ' centigrade';

        newStory = newStory.replaceAll('94 fahrenheit', temperature)
        newStory = newStory.replaceAll('300 pounds', weight)
    }


    story.textContent = newStory;
    story.style.visibility = 'visible';
}