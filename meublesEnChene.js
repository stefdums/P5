//liste des meubles
//creer un li pour chaque article

//boucle qui affiche name du meuble

let request = new XMLHttpRequest();
let listeMeubles = document.getElementById("liste-meubles")

request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        let results = JSON.parse(this.responseText);

//création des elements pour la liste   
        
//creation de la boucle, 
              
        for (let meuble of results){
            let nomDuMeuble = meuble.name
//création d'un a avec href="nomDuMeuble" pour chaque article,            
            let lien = document.createElement("a");
            let adressLien = "meuble.html";
            lien.setAttribute("href", adressLien)
            lien.textContent = nomDuMeuble
//création d'un li pour chaque article
            let li = document.createElement("li");
            li.classList.add("liste-meuble")
//ajout du a dans le li
            li.appendChild(lien)
            listeMeubles.appendChild(li)  

        }

    }
    
};
request.open("GET", "http://localhost:3000/api/furniture");
request.send();