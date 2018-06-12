/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  } else {
      alert('No has iniciado sesion.');
      location.href ="/index.html";
  }
});

function xd(){
    alert('hola');
};