const inputamount = document.getElementById("bill-amount")
const inputtip = document.getElementById("tip-amount")
const total = document.getElementById("total-amount")
const calculate = document.getElementById("calculatebtn")
function calculatetotal(){
    const amountvalue = parseFloat(inputamount.value)
    const tipvalue = parseFloat(inputtip.value)
    if(isNaN(amountvalue) || isNaN(tipvalue) || amountvalue<=0){
        total.style.color="red"
        total.innerText = "Please enter valid number !";
        return;
    }else{
        total.style.color="black"
    }
    const totaltip = (amountvalue * tipvalue)/ 100
    const totalamount = amountvalue + totaltip
    total.innerText = "Total $"+totalamount.toFixed(2)
}
calculate.addEventListener("click",calculatetotal);
