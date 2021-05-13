let contenedor = document.getElementById('contenedor');

for (let i = 1; i <= 100; i++) {
    // let  variable1 = i % 3 == 0, variable2 = i % 5 == 0;
    if(i%3 != 0 && i%5 != 0){
        contenedor.innerHTML += i + '<br>'
    }else{
        if(i%3 == 0 && i%5 == 0){
            contenedor.innerHTML +='FizzBuzz<br>'
        }else if (i%3 == 0 && i%5 != 0) {
            contenedor.innerHTML += "Fizz <br>"
        }else if(i%3 != 0 && i%5 == 0){
            contenedor.innerHTML += "Buzz <br>"  
        }
    }
//     console.log(variable1 ? variable2 ? "FizzBuzz" : "Fizz" : variable2 ? "Buzz" : i);
}