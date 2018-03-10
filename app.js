'use strict';

/* Firebase DataBase */
// Initialize Firebase
const config = {
  apiKey: "AIzaSyCU7sunr0NegZGEXvSdZHM3PFHrc8qkx9g",
  authDomain: "makeitrealfirstapp.firebaseapp.com",
  databaseURL: "https://makeitrealfirstapp.firebaseio.com",
  projectId: "makeitrealfirstapp",
  storageBucket: "",
  messagingSenderId: "337688713377"
};
firebase.initializeApp(config);


const $inputName = document.getElementById('name')
const $inputEmail = document.getElementById('email')
const $inputAge = document.getElementById('age')
const $userList = document.getElementById('usersList')

const $selectBebida = document.getElementById('bebida')
//const $selectBebida = document.getElementById('bebida').options

// Se crea una instancia de la base de datos
readUserData();

const database = firebase.database();

let id = 0;
let users = [];

let menor = false;

function saveUser(evt) {
  // Evitar que se recargue
  evt.preventDefault();

  const name = $inputName.value
  const email = $inputEmail.value
  const age = $inputAge.value
  const drink = $selectBebida.value

  const id = Math.floor(Math.random() * 3333333 )
  const user = { name, email, age, drink }

  // users.push(`
  //   <tr>
  //     <td>${id}</td>
  //     <td>${name}</td>
  //     <td>${email}</td>
  //     <td>${age}</td>
  //   </tr>
  // `);

  const validate = verificaEdad();

  if (validate) {
    //printTable(users);
    database.ref(`users/${id}`).set(user)
  }
}

// function printTable(array) {
//   let print = '';

//   for (let index in array) {
//     print = print + array[index];
//   }
//   $userList.innerHTML = print;
// }

function verificaEdad() {
  const bebida = $selectBebida.value;

  // const optionSelectedIndex = $selectBebida.SelectedIndex;
  // const drink = $selectBebida[optionSelectedIndex].option;

  if(($inputAge.value <= 18) && (bebida !== 'agua')){
    alert('Oilo');
    return false
  }
  return true
}

// funcion para leer todos los usuarios 
function readUserData() {
  let users = firebase.database().ref('users/');

  // la funcion ON se queda escuchando si existe algun cambio
  // en alguno de ellos.
  users.on('value', function (snapshot) {
    // llamado a la funcion dibujar
    refreshUI(snapshot.val());
  });
}

// Funcion que pinta/dibuja los usuarios en una tabla
function refreshUI(users) {
  let tBody = '';
  Object.keys(users).forEach(function (key) {
    var tRow =
      `
      <tr>
        <th scope="row">${key}</th>
        <td>${users[key].name}</td>
        <td>${users[key].email}</td>
        <td>${users[key].age}</td>
        <td>${users[key].drink}</td>
      </tr>
    `;
    tBody += tRow;
  });

  debugger

  // tBody debe ser agregado al html
  document.getElementById('usersList').innerHTML = tBody;
};

/* Solucion cristian

'use strict';

const $inputName = document.getElementById('name')
const $inputEmail = document.getElementById('email')
const $inputAge = document.getElementById('age')
const $userList = document.getElementById('usersList')

function saveUser(evt) {
  // Evitar que se recargue
  evt.preventDefault();

  const name = $inputName.value
  const email = $inputEmail.value
  const age = $inputAge.value

  // Nuevo
  const $node = document.createElement('tr');

  const row = `
  <tr>
    <td>1</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${age}</td>
  </tr>
  `
  // Nuevo
  $node.innerHTML = row;
  $userList.appendChild($node)
} */


