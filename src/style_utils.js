export default function tbnHover() {

  const btnEl = document.querySelector('.btn');
  
  
  if(btnEl) {
    
    btnEl.addEventListener('mouseover', (event) => {
      const x = event.pageX - btnEl.offsetLeft;
      const y = event.pageY - btnEl.offsetTop;
      
      btnEl.style.setProperty('--xPos', x + 'px');
      btnEl.style.setProperty('--yPos', y + 'px');
      
});

}

}