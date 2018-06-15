/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
firebase.initializeApp({
	apiKey: "AIzaSyDOw5sWavkXLQxhosMODln9jmom5gN0AoE",
	authDomain: "syncrocalendar-f6301.firebaseapp.com",
	projectId: "syncrocalendar-f6301"

});
var db = firebase.firestore();

      
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

function RegistrarC(){
	var NombreC = document.getElementById('NombreC').value;
	var PasswordC = document.getElementById('PasswordC').value;
        var cityRef = db.collection('Valores').doc('UID');
        var UIDC; 
        var getDoc = cityRef.get()
    .       then(doc => {
            if (!doc.exists) {
            console.log('No such document!');
            } else {
            UIDC = (doc.data().Calendar);
            console.log(UIDC);
            var Calendar2 = UIDC + 1;
            var datos = {
                Nombre: NombreC,
                Password: PasswordC,
                UID: UIDC
            };
            var dato = {
              Calendar: Calendar2  
            };
        var setDoc = db.collection('CalInf').doc(''+UIDC).set(datos);
        var setDoc = db.collection('Valores').doc('UID').set(dato);
       }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });  
};