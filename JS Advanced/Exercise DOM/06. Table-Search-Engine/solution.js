// function solve() {
//    document.querySelector("#searchBtn").addEventListener("click", search);

//    function search() {
//       let input = document.querySelector("#searchField").value;
//       if (input !== '') {
//          let counter = 0;

//          let tr = Array.from(document.querySelectorAll("tbody > tr"));
//          let trCount = 0;
//          for (const line of tr) {
//             let td = Array.from(line.querySelectorAll('td'));
//             tr[trCount].classList.remove('select');
//             trCount++;
//          }
//          for (const line of tr) {
//             let found = false;
//             let td = Array.from(line.querySelectorAll('td'));
//             for (const col of td) {
//                let word = col.innerText;
//                if (word.includes(input)) {
//                   tr[counter].classList.add('select');
//                }
//             }
//             counter++;
//          }
//          document.querySelector("#searchField").value = '';
//       }
//    }
// }

function solve() {
   const rows = document.querySelectorAll('tbody > tr');
   const input = document.getElementById('searchField');
   const btn = document.getElementById('searchBtn');
   const handler = () => {
     Array.from(rows).map(e => (e.classList = ''));
     Array.from(rows).forEach(e => {
       Array.from(e.children).forEach(elem => {
         const text = elem.textContent;
 
         if (text.includes(input.value) && input.value !== '') {
           elem.parentElement.className = 'select';
         }
       });
     });
     input.value = '';
   };
 
   btn.addEventListener('click', handler);
 }