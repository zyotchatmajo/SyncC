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
var Usuario;
var mostrart = 0;
var docidb = 0;
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
        var test = [19,9,6,1,1,1,1,1];
        var test2 = [0,0,0,0,0,0,0,0];
        var test3 = "";
        var testf = [26,26,26,1,1,1,1,1];
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
        let url = await link(test3);
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
        if(i === 1000){
            test4 = true;
        }
    }
    //$('#testo11').append('<iframe id="my_iframe" src ="https://s3-ap-northeast-1.amazonaws.com/tkr-stg-channel-or-jp/assets/stg01_'+test+'2/Android/texture/faceicon" "style="display:none;"></iframe>');
    //console.log("Fin");
    console.log(test);
};

async function link(test3){
        //document.getElementById('testo11').src += `<iframe id="my_iframe" "style="display:none;"></iframe>`
        $('#testo11').append('<iframe id="my_iframe" src ="https://s3-ap-northeast-1.amazonaws.com/tkr-stg-channel-or-jp/assets/stg01_'+test3+'2/Android/texture/faceicon" "style="display:none;"></iframe>');
        //document.getElementById('my_iframe').src = await 'https://s3-ap-northeast-1.amazonaws.com/tkr-stg-channel-or-jp/assets/stg01_'+test3+'2/Android/texture/faceicon';
}
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
                if(doc.data().NumTarea > 0){
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
    var dia = false;
    if(document.getElementById('Dia').value > 0 && document.getElementById('Dia').value < 31){
        dia = true;
    }else{
        alert('Introduce un numero valido');
    }
    var docMaterias = db.collection('data'+localc).doc(''+tarea);
    var getDoc = docMaterias.get()
            .then(doc => {
            if (!doc.exists || doc.data().Nombre == 'null' || dia === false) {                        
                } else {
                    var TareasTotal = 0;
                    var NumTarea = doc.data().NumTarea;   
                    var Nombre = doc.data().Nombre;
                    var Descripcion = document.getElementById('Descripcion').value;
                    var Titulo = document.getElementById('Titulo').value;
                    var Mes = document.getElementById('Mes').value;
                    var Dia = document.getElementById('Dia').value;
                    var date = new Date();
                    var FechaEntrega = new Date(date.getFullYear(), Mes - 1, Dia);
                    var Fecha = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
                    var materia = {Descripcion: Descripcion, Titulo: Titulo, Fecha: Fecha, FechaEntrega: FechaEntrega, Usuario: Usuario};
                    var arraym = [];
                    arraym[tarea] = materia;
                    //db.collection('data1').doc('0').collection('0').doc('0').set({xd : 'Hola'})
                     var UsuarioDoc = db.collection('CalInf').doc(''+localc);
                        var getUser = UsuarioDoc.get()
                                .then(doc => {
                                    TareasTotal = doc.data().NumTareaTotal;
                                console.log(TareasTotal);
                                db.collection('TareasN' + localc).doc('' + TareasTotal).set({Titulo: Titulo, Doc : tarea, Nombre: Nombre, Fecha: Fecha, Tarea: true});
                                db.collection('CalInf').doc('' + localc).update({NumTareaTotal: (TareasTotal + 1)});
                                db.collection('data' + localc).doc('' + tarea).collection('Tareas').doc('' + TareasTotal).set(arraym[tarea]);
                                db.collection('data' + localc).doc('' + tarea).update({NumTarea: (NumTarea + 1)});
                                //var setDoc = db.collection('CalInf').doc('' + localc).update(arraym[num]);
                                //var setDoc = db.collection('data' + localc).doc('' + tarea).set(arraym[tarea]);
                                document.getElementById('id03').style.display = 'none';
                                update();
                                $("#Titulo").val("");
                                $("#Descripcion").val("");
                                $("#Mes").val("");
                                $("#Dia").val("");
                            });

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
    document.getElementById('id04').style.display='none';
    db.collection('TareasN'+localc).doc(''+docidb).update({Tarea : false});
    var docdata = db.collection('data'+localc).doc(''+tarea);
    var getDoc = docdata.get()
            .then(doc => {
                    var test = doc.data().NumTarea;
                    db.collection('data'+localc).doc(''+tarea).update({NumTarea : ( test -1)});
                    update();
    });

    /*var docMaterias = db.collection('data'+localc).doc(''+tarea);
    var getDoc = docMaterias.get()
            .then(doc => {
                        var setDoc = db.collection('data'+localc).doc('' + tarea).set({Tarea : false , Nombre : doc.data().Nombre});
                        document.getElementById('id04').style.display='none';
                        update();
    })
    .catch(err => {
      console.log('Error getting document', err);
    });  */
};
function tareasm(id,tarea){
    document.getElementById('id06').style.display='none';
    var docTarea = db.collection('data'+localc).doc(''+tarea).collection('Tareas').doc(''+id);
    var getDoc = docTarea.get()
            .then(doc =>{
                        document.getElementById('id04').style.display='block';
                        document.getElementById('TareaTit').innerHTML = doc.data().Titulo;
                        document.getElementById('TareaDes').innerHTML = doc.data().Descripcion;
                        var mesok = new Array(12);
                        mesok[0] = "Enero";
                        mesok[1] = "Febrero";
                        mesok[2] = "Marzo";
                        mesok[3] = "Abril";
                        mesok[4] = "Mayo";
                        mesok[5] = "Junio";
                        mesok[6] = "Julio";
                        mesok[7] = "Agosto";
                        mesok[8] = "Septiembre";
                        mesok[9] = "Octubre";
                        mesok[10] = "Noviembre";
                        mesok[11] = "Diciembre";
                        var dia  = new Date(doc.data().Fecha);
                        document.getElementById('TareaAgregado').innerHTML = dia.getDate()+"/"+mesok[(dia.getMonth())]+"/"+dia.getFullYear();
                        dia  = new Date(doc.data().FechaEntrega);
                        document.getElementById('TareaEntrega').innerHTML = dia.getDate()+"/"+mesok[(dia.getMonth())]+"/"+dia.getFullYear();
                        //console.log(doc.data().FechaEntrega);
                        document.getElementById('TareaUsuario').innerHTML = doc.data().Usuario;
                        docidb = id;
    });
    
}
function agregaro(){
    document.getElementById('id03').style.display = 'block';
    document.getElementById('id06').style.display = 'none';
}
function xd(num){
    var docMaterias = db.collection('data'+localc).doc(''+num);
    var getDoc = docMaterias.get()
            .then(doc => {
            if (!doc.exists || doc.data().Nombre === 'null' || doc.data().Nombre === undefined) {
                        var nmateria = prompt("Introduce un nombre de materia:", "");
                        var materia = {Nombre: ""+nmateria, NumTarea : 0};
                        var arraym = [];
                        arraym[num] = materia;                        
                        //var setDoc = db.collection('CalInf').doc('' + localc).update(arraym[num]);
                        var setDoc = db.collection('data'+localc).doc('' + num).set(arraym[num]);
                        update();
            } else {
                    //console.log(doc.data().Nombre);
                    var encontrado = false;
                    var tareas = db.collection('TareasN'+localc);
                    $('#BtnTarea').html('');
                    //console.log(tareas);
                    if(tareas == undefined){
                        document.getElementById('id03').style.display = 'block';
                    }
                    var query = tareas.where('Doc', '==', num).where('Tarea', '==', true).get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            encontrado = true;
                            document.getElementById('id06').style.display='block';
                            $('#BtnTarea').append('<button type="button" onclick="tareasm('+doc.id+','+doc.data().Doc+')" >'+doc.data().Titulo+'</button>');
                            //console.log(doc.id, '=>', doc.data());
                                    
                                });
                                if (encontrado) {
                                        tarea = num;
                                    } else {
                                        document.getElementById('id03').style.display = 'block';
                                        tarea = num;
                                    }
                            })
                            .catch(err => {
                                console.log('Error getting documents', err);
                            });

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
                        //firebase.auth().currentUser.email
                        if(db.collection('users'+UIDC).doc(''+firebase.auth().currentUser.email) === undefined || db.collection('users'+UIDC).doc(''+firebase.auth().currentUser.email) === 'null'){
                            db.collection('users'+UIDC).doc(''+firebase.auth().currentUser.email).set(
                                    {Correo : ''+firebase.auth().currentUser.email , Usuario: 'Usuario' , Status : 0}
                                    );
                            
                            db.collection('CalInf').doc(''+UIDC).update({Users : doc.data().Users + 1 });
                        }else{
                            document.getElementById("titulo").innerHTML = doc.data().Nombre;
                            console.log('Registrado');
                        }
                        var UsuarioDoc = db.collection('users'+UIDC).doc(''+firebase.auth().currentUser.email);
                        var getUser = UsuarioDoc.get()
                                .then(doc => {
                                    if(doc.data().Status === -1){
                                        alert('Fuiste expulsado y no puedes usar este calendario');
                                    }
                                    else {
                                        document.getElementById("Botoncerrar").click();
                                        if(doc.data().Usuario === 'Usuario' || doc.data().Usuario === 'Admin'){
                                        var nombre = prompt("Introduce tu nombre de usuario:", "");
                                        db.collection('users'+UIDC).doc(''+firebase.auth().currentUser.email).update({Usuario : nombre});
                                    }
                                        var text1 = document.getElementById("tabla");
                                        botonactu.style.display = "block";
                                        tabla.style.display = "block";
                                        update();
                                    }
                                    if(doc.data().Status === 1){
                                        AT.style.display = "block";
                                    }
                                    Usuario = ""+doc.data().Usuario;
                                });
                        
                        
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
                        UID: UIDC,
                        Users : 1,
                        NumTareaTotal : 0
                    };
                    var dato = {
                        Calendar: Calendar2
                    };
                    var user ={
                        Correo : firebase.auth().currentUser.email,
                        Usuario : 'Admin',
                        Status : 1
                    };
                    var setDoc = db.collection('CalInf').doc('' + UIDC).set(datos);
                    var setDoc = db.collection('Valores').doc('UID').set(dato);
                    var setDoc = db.collection('users'+UIDC).doc(''+firebase.auth().currentUser.email).set(user);
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