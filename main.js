//Este proyecto esta dedicado al muñeco de saw, que su idea fallecio para renacer en este proyecto
//Creado por Sergio y Kevin 
firebase.initializeApp({
	apiKey: "AIzaSyDOw5sWavkXLQxhosMODln9jmom5gN0AoE",
	authDomain: "syncrocalendar-f6301.firebaseapp.com",
	projectId: "syncrocalendar-f6301"

});
var db = firebase.firestore();
var localc = 0;
var tarea = 0;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  } else {
      alert('No has iniciado sesion.');
      location.href ="index.html";
  }
});

$(document).ready(function(){
    $('#UIDC').keypress(function(e){
      if(e.keyCode==13)
      $('#BotonIniciar').click();
    });
});

async function Download() {
        var test = [1,1,1,1,1,1,1,1];
        var test2 = [0,0,0,0,0,0,0,0];
        var test3 = "";
        var testf = [26,26,26,26,26,26,26,26];
        var test2f = [1,1,1,1,1,1,1,1];
        var test4 = false;
    for (var i = 0; test4 === false; i++) {
        for (var k = 0; k < test.length; k++) {
            if(test2[k] !== 1){
                test3 = test3 + toLettersm(test[k]);
            }
            else{
                test3 = test3 + toLetters(test[k]);
            }
        }
        var url = 'https://s3-ap-northeast-1.amazonaws.com/tkr-stg-channel-or-jp/assets/stg01_'+test3+'2/Android/texture/faceicon';
        await document.getElementById('my_iframe').src = url;
        console.log(test3);
        test3 = "";
        test[0] = test[0] + 1;
        for (var k = 0; k < 9; k++) {
            if(test[k] === 27){
                test[k] = 1;
		    if(k !== 8){
			    test[k+1] = test[k+1] + 1;
		    }
                if(test2[k] !== 1){
                    test2[k] = 1;
                }
                else{
                    test2[k] = 0;
                }
            }
        }
        if(test === testf && test2 === test2f){
            test4 = true;
        }
    }
    console.log("Fin");
};

function toLettersm(num) {
    "use strict";
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(96 + mod) : (--pow, 'z');
    return pow ? toLetters(pow) + out : out;
}

function toLetters(num) {
    "use strict";
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetters(pow) + out : out;
}


async function update(){
    var test;
    document.getElementById("loader").style.display = "block";
    for (var i = 0; i < 42; i++) {
        var word = i;
        var docMaterias = db.collection('data' + localc).doc(i + '');
        var doc = await docMaterias.get();
        //console.log(doc);
        try {
            if (!doc.exists || doc.data().Nombre == 'null' || doc.data().Nombre == undefined) {
                test = "No definindo";
            } else {
                if(doc.data().Tarea){
                    test = doc.data().Nombre;
                    document.getElementById(i).innerHTML = test;
                    document.getElementById(i).style.color = "aqua";
                }else{
                    test = doc.data().Nombre;
                    document.getElementById(i).innerHTML = test;
                    document.getElementById(i).style.color = "white";
                }
                
            }
            //console.log(i);
            document.getElementById(i).innerHTML = test;
        } catch (err) {
            //console.log(err);
        } 
    }
    document.getElementById("loader").style.display = "none";
}
function EnviarT(){
    var docMaterias = db.collection('data'+localc).doc(''+tarea);
    var getDoc = docMaterias.get()
            .then(doc => {
            if (!doc.exists || doc.data().Nombre == 'null') {                        
            } else {
                        var Nombre = doc.data().Nombre;
                        var Descripcion = document.getElementById('Descripcion').value;
                        var Titulo = document.getElementById('Titulo').value;
                        var Mes = document.getElementById('Mes').value;
                        var Dia = document.getElementById('Dia').value;
                        var date = new Date();
                        var FechaEntrega = new Date(date.getFullYear(),Mes-1,Dia);
                        var Fecha = new Date(date.getFullYear() , date.getMonth(), date.getDate(), date.getHours() , date.getMinutes() , date.getSeconds());
                        var materia = {Nombre: Nombre, Tarea: true, Descripcion: Descripcion, Titulo: Titulo, Fecha: Fecha, FechaEntrega: FechaEntrega};                       
                        var arraym = [];
                        arraym[tarea] = materia;                        
                        //var setDoc = db.collection('CalInf').doc('' + localc).update(arraym[num]);
                        var setDoc = db.collection('data'+localc).doc('' + tarea).set(arraym[tarea]);
                        document.getElementById('id03').style.display='none';
                        update();
                        $("#Titulo").val("");
                        $("#Descripcion").val("");
                        $("#Mes").val("");
                        $("#Dia").val("");
       }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });  
    
};
function editar(){
    document.getElementById('id04').style.display='none';
    document.getElementById('id03').style.display='block';
    $("#TareaTit").val("#Titulo");
    $("#TareaDes").val("#Descripcion");
};
function eliminar(){
    var docMaterias = db.collection('data'+localc).doc(''+tarea);
    var getDoc = docMaterias.get()
            .then(doc => {
                        var setDoc = db.collection('data'+localc).doc('' + tarea).set({Tarea : false , Nombre : doc.data().Nombre});
                        document.getElementById('id04').style.display='none';
                        update();
    })
    .catch(err => {
      console.log('Error getting document', err);
    });  
};
function xd(num){
    firebase.auth().onAuthStateChanged(function(user) {
     console.log(user);
});
    var docMaterias = db.collection('data'+localc).doc(''+num);
    var getDoc = docMaterias.get()
            .then(doc => {
            if (!doc.exists || doc.data().Nombre == 'null' || doc.data().Nombre == undefined) {
                        var nmateria = prompt("Introduce un nombre de materia:", "");
                        var materia = {Nombre: ""+nmateria, Tarea: false, Descripcion: "", Titulo: ""};
                        var arraym = [];
                        arraym[num] = materia;                        
                        //var setDoc = db.collection('CalInf').doc('' + localc).update(arraym[num]);
                        var setDoc = db.collection('data'+localc).doc('' + num).set(arraym[num]);
                        update();
            } else {
                    //console.log(doc.data().Nombre);
                    if (doc.data().Tarea) {
                        document.getElementById('id04').style.display='block';
                        document.getElementById('TareaTit').innerHTML = doc.data().Titulo;
                        document.getElementById('TareaDes').innerHTML = doc.data().Descripcion;
                        document.getElementById('TareaAgregado').innerHTML = doc.data().Fecha;
                        document.getElementById('TareaEntrega').innerHTML = doc.data().FechaEntrega;
                        tarea = num;
                    }else{
                        document.getElementById('id03').style.display='block';
                        tarea = num;
                        
                    }
       }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });  
};

function salir(){
  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
}, function(error) {
  console.error('Sign Out Error', error);
});  
};
function IniciarC(){
	var NombreC = document.getElementById('NombreC').value;
	var PasswordC = document.getElementById('PasswordC').value;
        var UIDC = document.getElementById('UIDC').value;
        var Documento = db.collection('CalInf').doc(''+UIDC);
        
        var getDoc = Documento.get()
    .       then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    if (NombreC === doc.data().Nombre && PasswordC === doc.data().Password && UIDC === '' + doc.data().UID) {
                        localc = UIDC;
                        document.getElementById("Botoncerrar").click();
                        document.getElementById("titulo").innerHTML = doc.data().Nombre;
                        var text1 = document.getElementById("tabla");
                        botonactu.style.display = "block";
                        tabla.style.display = "block";
                        update();
                    } else {
                        window.alert("Los datos no coinciden");
                    }
       }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });  
};
function RegistrarC(){
	var NombreCR = document.getElementById('NombreCR').value;
	var PasswordCR = document.getElementById('PasswordCR').value;
        var cityRef = db.collection('Valores').doc('UID');
        var UIDC; 
        var getDoc = cityRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    UIDC = (doc.data().Calendar);
                    console.log(UIDC);
                    var Calendar2 = UIDC + 1;
                    var datos = {
                        Nombre: NombreCR,
                        Password: PasswordCR,
                        UID: UIDC
                    };
                    var dato = {
                        Calendar: Calendar2
                    };
                    var setDoc = db.collection('CalInf').doc('' + UIDC).set(datos);
                    var setDoc = db.collection('Valores').doc('UID').set(dato);
                    document.getElementById('id01').style.display='none';
                    document.getElementById('id05').style.display='block';
                    document.getElementById('CalendarioName').innerHTML = document.getElementById('NombreCR').value;
                    document.getElementById('CalendarioPass').innerHTML = document.getElementById('PasswordCR').value;
                    document.getElementById('CalendarioUID').innerHTML = UIDC;
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
}
;
