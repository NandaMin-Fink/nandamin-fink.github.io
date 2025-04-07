const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = [
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
]

/* Declaring the alternative text for each image file */

const altTextArray = [
    "a human eye",
    "a wave",
    "purple and white flowers",
    "ancient egeyptian art",
    "a butterfly",
]

/* Looping through images */


for (let i = 0; i < images.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', "images/" + images[i]);
    newImage.setAttribute('alt', altTextArray[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', image => 
      {
        displayedImage.src = image.target.src;
        displayedImage.alt = image.target.alt;
      }
    );
  }


/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => 
{
    let btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') 
    {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } 
    else 
    {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}
);