// PUNTATORI
const url = `https://jsonplaceholder.typicode.com/users`; // url dell'API
const filterInput = document.getElementById('filterInput'); // puntatore input di ricerca
const userTable= document.getElementById('userTable'); // puntatore body della tabella in cui andrò a stampare gli users
const filterSelect = document.getElementById('filterSelect'); // puntatore della selezione del parametro da cercare

// STABILISCO LA FUNZIONE ASINCRONA PER RECUPERARE GLI UTENTI DAL JSON
async function ottieniUser() {
  // faccio la chiamata http
  const response = await fetch(url);
  // ottengo la risposta e la converto in file json
  const users = await response.json();

  users.forEach(user => {
    console.log(user);
  });

  // ritorno il risultato per portarmi il valore fuori dalla funzione
  return users;
}


// STAMPO A SCHERMO TUTTI GLI UTENTI
function renderUsers(users) {

  // stabilisco che il contenuto della tabella parte da vuoto
  userTable.innerHTML = '';

  // gestione della creazione degli elementi
  users.forEach((user) => {
    // creo per ogni utente una riga della tabella
    const row = document.createElement('tr');  
    // vado a popolare la row creata
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
      `;

      userTable.appendChild(row);
  });
};

// essendo una funzione asincrona devo aspettare il suo completamento e poi posso lanciare la funzione per stampare a schermo
ottieniUser().then((users) => {
  renderUsers(users);

  // stabilisco la funzione per filtrare la ricerca con l'addEventListener all'input
  filterInput.addEventListener('input', () => {
    // definisco una variabile che vada a prendersi il valore di input della ricerca
    const searchInput = filterInput.value;
     // definisco una variabile che vada a prendersi il valore dell'opzione da ricercare
    const selectOption = filterSelect.value;

    // vado a filtrarmi tutti gli utenti in base alla ricerca 
    const filteredUsers = users.filter((user) => {
      // dobbiamo fare il filtro sull'opzione di riecrca che abbiamo scelto
      const output = user[selectOption].toLowerCase().includes(searchInput.toLowerCase());
      return output;
    })

    renderUsers(filteredUsers);

  });
});



// Check if dark mode is enabled in localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('darkMode', 'true');
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('darkMode', 'false');
}

// Toggle between dark and light mode
function toggleMode() {
  if (localStorage.getItem('darkMode') === 'true') {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

// Set initial mode based on localStorage
if (isDarkMode) {
  enableDarkMode();
}

// Add event listener to the toggle mode button
document.getElementById('toggle-mode').addEventListener('click', toggleMode);

