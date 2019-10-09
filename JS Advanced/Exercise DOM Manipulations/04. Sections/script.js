function create(words) {
   let content = document.querySelector("#content");

   for (const word of words) {
      let div = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = word;
      p.style.display = 'none';
      div.appendChild(p);

      div.addEventListener('click', function(){
         p.style.display = 'block';
      })
      content.appendChild(div);
   }
}



