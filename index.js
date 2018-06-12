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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    location.href ="SynchCalendarTEST/main.html";
  } else {
    // User is signed out.
    // ...
  }
});

function iniciar(){
	var email = document.getElementById('CorreoI').value;
	var password = document.getElementById('PasswordI').value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
         // Handle Errors here.
        var errorCode = error.code;
  	var errorMessage = error.message;
  	if (errorCode === 'auth/wrong-password') {
  		  alert('Contraseña incorrecta.');
  		} else {
  		  alert(errorMessage);
  	}
  console.log(error);
        // ...
    })
};

function registrar(){
	var email = document.getElementById('CorreoR').value;
	var password = document.getElementById('PasswordR').value;
        console.log(email);
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
         // Handle Errors here.
        var errorCode = error.code;
  	var errorMessage = error.message;
  	if (errorCode === 'auth/wrong-password') {
  		  alert('Contraseña incorrecta.');
  		} else {
  		  alert(errorMessage);
  	}
  console.log(error);
        // ...
    })
};
