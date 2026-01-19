const base_Url ="https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns =document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".submit");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchange = document.querySelector(".exchange");
for(let select of dropdowns)
{
    for(let currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD")
            {
                newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
                newOption.selected = "selected";
        }
        select.append(newOption);   
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;   
    let countryCode = countryList[currCode];
    let newscr = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img =  element.parentElement.querySelector("img");
    img.src = newscr;
}
exchange.addEventListener("click" , (evt) =>{
    evt.preventDefault();
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    
    updateFlag(fromCurr);
    updateFlag(toCurr);


});

btn.addEventListener("click" ,async (evt) =>{
    evt.preventDefault();
    let amount  = document.querySelector(".amount input");
    let amtVal = amount.value;
    

    if(amtVal === ""|| amtVal < 0)
    {
        amtVal = 0;
        amount.value = 0;
    }
    
    
    const URL = `${base_Url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
   
    let rates = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rates;

    

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    
});

