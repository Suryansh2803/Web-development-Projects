let p = document.querySelector('p');
window.addEventListener('keydown', function(e) {
    if (e.key === " ") {
        p.textContent = "Space";
    }    
  else if (e.key === 'Enter') {
        p.textContent = Enter;
    }else{
        p.textContent = e.key;
    }
})
