

//validation input du formulaire
let form = document.querySelector("form")
let prenom = document.querySelector("#firstname")
let nom = document.querySelector("#lastname")
let adress = document.querySelector("#adress")
let city = document.querySelector("#city")
let email = document.querySelector("#email")
let submit = document.querySelector("#submit")

console.log(form.length)
console.log(form[0].value)
form.addEventListener("submit", function(e){

    for (let i = 0; i < form.length; i++){

        if(form[i].value !== ""){
            window.confirm("Voulez confirmer?")
            //form[i].required = true
            console.log("validé")

        }else{
            e.preventDefault()
            alert(form[i].id + " n'est pas remplis" )
            
        }
    }
    
})