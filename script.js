const BASE_URL =
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
// expired API 
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button')
const fromCrr = document.querySelector(".from select");
const toCrr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for ( let select of dropdowns){
    for (let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText= currCode
        newOption.value = currCode;
        if (select.name === "from" &&  currCode === "USD"){
            newOption.selected = "selected"
        }
        else if (select.name === "to" &&  currCode === "INR"){
            newOption.selected = true
        }
         select.append(newOption)
        }
        select.addEventListener("change",(evt)=>{
            updateflag(evt.target)
        })
}

const updateflag = (element)=>{
    
   let currCode = element.value
   let countrycode = countryList[currCode]
   let newSrc = `https://flagsapi.com/${countrycode}/shiny/64.png`
   let img = element.parentElement.querySelector('img')
   img.src=newSrc
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector('.amount input') 
    let amtVal = Number(amount.value )
    if(isNaN(amtVal) || amtVal<0){
        amtVal = 1 
        amount.value = 1;
    }
const URL = `${BASE_URL}/${fromCrr.value.toLowerCase()}/${toCrr.value.toLowerCase()}.json`
let response = await fetch (URL);
let data = await response.json();
let rate = data[toCrr.value.toLowerCase()];
let finalAmount = Number(amtVal * rate) ; 
msg.innerText=`${amtVal} ${fromCrr.value} = ${finalAmount} ${toCrr.value}`
});
