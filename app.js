/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

windows.open(https://zyotchatmajo.github.io/SynchCalendarTEST/test.html);
firebase.initializeApp({
	apiKey: "AIzaSyDOw5sWavkXLQxhosMODln9jmom5gN0AoE",
	authDomain: "syncrocalendar-f6301.firebaseapp.com",
	projectId: "syncrocalendar-f6301"

});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar usuarios
function guardar(){
	var nombre = document.getElementById('nombre').value;
	var password = document.getElementById('password').value;

	db.collection("users").add({
	    Name: nombre,
	    Password: password
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    document.getElementById('nombre').value = '';
	    document.getElementById('password').value = '';
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);

})
}

function registrar(){
	var email = document.getElementById('email').value;
	var password = document.getElementById('passwordemail').value;
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		// ...
})
};

function inicio(){
	var email = document.getElementById('emaili').value;
	var password = document.getElementById('passwordi').value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
         // Handle Errors here.
        var errorCode = error.code;
         var errorMessage = error.message;
        // ...
    })
};
function salir(){
	firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
         // An error happened.
    });
};
function test(){
	firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var email = user.email;
        window.alert(email);
        var	tabla = document.getElementById('tabla');
        db.collection("users").onSnapshot((querySnapshot) => {
	tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Name}`);
        tabla.innerHTML += `<tr>
          <td>${doc.data().Name}</td>
          <td>${doc.data().Password}</td>
        </tr>`
    });
});
  } else {
      window.alert("No has iniciado sesion");
    // User is signed out.
    // ...
  }
});
};

//Leer documentos
