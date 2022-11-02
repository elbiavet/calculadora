import "../estilos/Teclado.css"
import { Clear } from "./Clear"
import {evaluate} from "mathjs"; // podría no importar nada y usar el método eval() de JS, pero es inestable.
import { useState } from "react";

export const Teclado = ({input, setInput}) => {

  //creo contadores para manejar el punto decimal, el resultado y el ingreso de operadores. Funcionan como un interruptor de 1(on) a 0(off). También se puede imaginar como un bono de consumo, tengo 1 bono que se gasta cuando hago click en la funcion y que se recarga con otras funciones.
  const [countPunto, setCountPunto] = useState("1")
  const [countIgual, setCountIgual] = useState("1")
  const [countOperador, setCountOperador] = useState("1")
 
  
  //Gracias al contador, la funcion ingresarNumero se relaciona con la de MostrarResultado, ya que cuando doy al "=" no quiero que concatene el siguiente numero que ingreso. Además, no quiero que se concatene el número ingresado con el 0 que sale al inicio o cuando hago clear. 
  const ingresarNumero = (value) =>{
    setCountOperador("1") //cuando ingreso un numero quiero poder usar operadores (on)

    if(countIgual === "1"){ //si puedo mostrar resultado (on) significa que estamos ante una nueva operacion 
      if(input !== "0" || input === "0."){ // si lo que hay en el input es cualquier numero distinto a 0 o es un "0."
        setInput(`${input}${value}`) // concatena el numero que ingreso
      }else {setInput(value)} // si es un 0, no concatenes, e introduce directamente el valor 
    } else if(countIgual ==="0"){ // si no puedo mostrar resultado (off) significa que lo que hay en el input es un resultado
      setInput(value) // en ese caso ingresa el numero sin concatenar, como si estuvieramos ante un 0. 
      setCountIgual("1") //y cambia el contador del resultado para que podamos hacer la operacion.
    }
  }

// cuando ingreso un 0, si esta al inicio del input, que siga siendo "0" (para que en la funcion ingresarNumero no se concatene lo siguiente), y si no esta al inicio, se concatena con lo que hay en el input.
  const ingresarCero = (value) =>{
      let regex = /^0/
      regex.test(input) ? setInput("0") : setInput(`${input}${value}`)
  }


//He usado un contador para que no se pueda meter otro punto seguido.  No ha servido el metodo includes() ni el metodo indexOf() ni las regex.
  const ingresarPunto = (value) => {
    if(countPunto === "1"){ //si puedo meter un punto(on)
      setInput(`${input}${value}`); //lo introduzco concatenado
      setCountPunto("0"); // y pongo el contador a = (off). Este contador se recupera cuando meto un operador o hago clear.
    } 
  }

// He usado un contador para que si se da a dos operadores se haga solo la ultima operacion solicitada
  const ingresarOperador = (value) =>{
    let regex = /[*/+-]+/ //esta regex tiene en cuenta cualquier operador de los indicados repetido 1 o mas veces

    
    if(countOperador === "1"){ //si puedo meter un operador (on)
      setInput(`${input}${value}`) // lo concateno con lo que hay en el input
      setCountOperador("0"); //lo pongo a 0 (off) para que no se puedan meter dos seguidos

      
      } else if (countOperador === "0") { // si mi contador esta en 0 (off) 
      setInput(input.replace(regex, value)) //reemplazo el anterior operador por el nuevo. 
      //Para que se recupere y solo funcione si son seguidos, lo pongo en 1 (on) en la funcion ingresarNumero.
      }
     setCountPunto("1") //pone el contador de los puntos a 1 (on) tras ingresar un operador para que se puedan hacer operaciones con decimales.
     setCountIgual("1") //pone el contador del resultado a 1  (on) tras ingresar un operador para que se puedan resolver operaciones.
    }
   
  
//uso el metodo evaluate de Math para evaluar la expresion matematica. Uso Number y tofixed para que no salgan tantos decimales
  const mostrarResultado = () => {
    let solucion = Number(evaluate(input).toFixed(7)); 
    
    if(countIgual === "1") setInput(solucion) //si puedo mostrar resultado, muestra la solucion
    setCountIgual("0") // pone el contador del resultado a 0 (off)
    setCountOperador("1") // pone el contador del operador en 1 (on)
  }

//uso una funcion diferente para discriminar el signo negativo
  const ingresarSignoNegativo = (value) =>{
    setInput(`${input}${value}`)
    setCountPunto("1") //lo pone en on para que podamos hacer operaciones con decimales
  }

  return (
    <>
        <div className="teclado">
        
        <button id="one" onClick={()=> ingresarNumero(1)}>1</button>
        <button id="two" onClick={()=> ingresarNumero(2)}>2</button>
        <button id="three" onClick={()=> ingresarNumero(3)}>3</button>
        <button id="divide" onClick={()=> ingresarOperador("/")}>/</button>

        <button id="four" onClick={()=> ingresarNumero(4)}>4</button>
        <button id="five" onClick={()=> ingresarNumero(5)}>5</button>
        <button id="six" onClick={()=> ingresarNumero(6)}>6</button>
        <button id="multiply" onClick={()=> ingresarOperador("*")}>*</button>

        <button id="seven" onClick={()=> ingresarNumero(7)}>7</button>
        <button id="eight" onClick={()=> ingresarNumero(8)}>8</button>
        <button id="nine" onClick={()=> ingresarNumero(9)}>9</button>
        <button id="subtract" onClick={()=> ingresarSignoNegativo("-")}>-</button>

        <button id="decimal" onClick={()=> ingresarPunto(".")}>.</button>
        <button id="zero" onClick={()=> ingresarCero(0)}>0</button>
        <button id="equals" onClick={mostrarResultado}>=</button>
        <button id="add" onClick={()=> ingresarOperador("+")}>+</button>
    </div>
     <Clear setInput={setInput} setCountPunto={setCountPunto} setCountOperador = {setCountOperador}/></>
  )
}
