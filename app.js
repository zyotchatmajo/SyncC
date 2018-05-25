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

};

//Leer documentos
var	tabla = document.getElementById('tabla');
db.collection("users").get().then((querySnapshot) => {
	tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Name}`);
        tabla.innerHTML += `<tr>
          <td>${doc.data().Name}</td>
          <td>${doc.data().Password}</td>
        </tr>`
    });
});