function shoWHide(el) { // string id
    var e = document.getElementById(el);
    switch (true) {
        case e.classList.contains("hide"):
            e.classList.add("show");
            e.classList.remove("hide");
            break;

        case e.classList.contains("show"):
            e.classList.add("hide");
            e.classList.remove("show");
            break;

        default:
            e.classList.add("hide");
            break;
    }
}


var mess= document.getElementById('upozorenje');

var reci = ["MACKA", "PAS" , "TIGAR" ,"ANTILOPA", "LEOPARD" , "KROKODIL" , "KRAVA" , "LAV", "KOKOSKA", "LISICA"];

var rec="";

var pokusajiSlova = ['']; //id pokusaji
var pokusajiReci = ['']; //id pokusaji1

function ispisiPokusaje(niz,id) {
    document.getElementById(id).innerHTML = "";
    for (let i = 0; i < niz.length; i++) {
        document.getElementById(id).innerHTML += niz[i] +"  ";
    }
}

function createSpans(rec) {
    var span;
    for (let i = 0; i < rec.length; i++) {
        span = document.createElement("SPAN");
        var t = document.createTextNode("_");
        span.setAttribute("id", "span"+i);
        span.setAttribute("class", "span");
        span.setAttribute("data-slovo", rec[i]);
        document.getElementById("rec").appendChild(span);
        span.appendChild(t);
    }
}

function chooseWord() {
    var r = Math.floor(Math.random()*10)+1;
    rec = reci[r-1];
    return rec;
}


function start() {
    shoWHide("play");
    shoWHide("game");
    shoWHide("reset");
    shoWHide("h1");
    shoWHide("pp");
}

function removeSpans(id) {
    const p = document.getElementById(id);
    p.innerHTML = '';
}

function reset() {
    window.location.reload();
}

function play() {
    start();
    rec = chooseWord();
    createSpans(rec);
    return rec;
}

function beleska(unos,niz){
    if(niz.indexOf(unos) < 0){
        niz.push(unos);
        console.log(niz);
    }
}

function ubaciSlovo(unos) {
    var duzina = document.getElementById("rec").childElementCount;
    for (let i = 0; i < duzina; i++) {
        var data = document.getElementById("span"+i).getAttribute('data-slovo');
        if(data == unos ) document.getElementById("span"+i).innerHTML = unos;
        beleska(unos,pokusajiSlova);
        
    }
}

function goodEnd(unos) {
    document.getElementById('igra').innerHTML="<p id='good'>Cica Glisa je spasen!<br> Rec : "+ rec+"</p> ";
    document.getElementById('wrapper').style.backgroundColor = "green";
}

function badEnd(unos) {
    document.getElementById('igra').innerHTML="<p id='bad'>Obesio si Cica Glisu! Rec je bila "+ rec + "</p>";
    document.getElementById('wrapper').style.backgroundColor = "red";
}

function ubaciRec(unos) {
    var duzina = unos.length;
    for (let i = 0; i < duzina; i++) {
        document.getElementById("span"+i).innerHTML = unos[i];
        goodEnd(unos);
        
    }
}

function pokusano(pokusaji,unos){
    if(pokusaji.indexOf(unos)>=0) 
    return true;
}

var i = 10;
var bul = true;
function greska(bul){
    if(!bul) {
        document.getElementById('img').setAttribute("src", "img/s"+ (i-1) + ".png");
        i--;
    }
    if(i==0) badEnd(unos);
}

var niz =[];
function stanje() {
    var duzina = document.getElementById("rec").childElementCount;
    var html = document.getElementsByClassName("span");
    for (let i = 0; i < duzina; i++) {
        niz[i] = html[i].innerHTML;
    }
    return niz;
}

function proveraSlova(unos) {
    if(rec.indexOf(unos)> -1){
        mess.innerHTML = "Bravo! Slovo postoji u reci!<br> Hajmo dalje!";
        ubaciSlovo(unos);
        beleska(unos,pokusajiSlova);  
        bul = true;
        return bul;

    } else{
        mess.innerHTML = "Steta! Slovo ne postoji u reci!<br> Hajmo dalje!";
        beleska(unos,pokusajiSlova);  
        bul = false;
        return bul;
        
    }
}

function proveraReci(unos){
    if(rec == unos){
        mess.innerHTML = "Bravo! POGODJENA REC!!!";
        ubaciRec(unos);
        bul = true;
        return bul;
    }
    else{
        mess.innerHTML = "Steta! Nije to ta rec!<br> Hajmo dalje!";
        beleska(unos,pokusajiReci); 
        bul = false;
        return bul;
    }
}

function checkIt(){
    var unos = document.getElementById('unos').value;
    mess.innerHTML = "";
    unos = unos.trim();
    unos = unos.toUpperCase();
    if(unos.indexOf(" ")>0){
        mess.innerHTML = "Pokusaj mora biti bez razmaka! <br> Probaj opet!";
    }

    if(unos.length > 0 ){
        if(unos.length == 1){
            if(pokusano(pokusajiSlova,unos))
            mess.innerHTML = "Vec ste ovo probali! Hajmo dalje!";
            else {
                pokusajiSlova.push(unos);
                proveraSlova(unos);
                niz=stanje();
                if(niz.indexOf("_")==-1)goodEnd(unos);
                ispisiPokusaje(pokusajiSlova,"pokusaji");
                greska(bul);
                
            }
        } else if(unos.length == rec.length){
            if(pokusano(pokusajiReci,unos))
            mess.innerHTML = "Vec ste ovo probali! Hajmo dalje!";
            else {
                pokusajiReci.push(unos);
                proveraReci(unos);
                ispisiPokusaje(pokusajiReci,"pokusaji1");
                greska(bul);
               
            }
        } else {
            mess.innerHTML = "Pokusaj s JEDNIM slovom ili probaj CELU rec (onda duzina unosa ima broj crtica)";
        }
    } else {
        mess.innerHTML = "Niste nista uneli!";
    }

}
