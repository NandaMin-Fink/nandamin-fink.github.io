// updated from Onur Gumus's nice improvements here
// https://codepen.io/onurgumus/pen/LYKwzbe

document.documentElement.classList.toggle('light-mode')

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark-mode')
  document.documentElement.classList.toggle('light-mode')
}

demo.onclick = event => {
  if (document.startViewTransition)
    document.startViewTransition(() => toggleDarkMode())
  else 
    toggleDarkMode()
}