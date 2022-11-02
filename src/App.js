
import { useState } from 'react';
import './App.css';
import { Display } from './components/Display';
import { Teclado } from './components/Teclado';


// import {evaluate} from "mathjs"; mathjs nos permite evaluar la expresion como una cadena de caracteres y transformarla en una expresion matematica

export function App() {

  const [input, setInput] = useState("0")
  

  return(
    <div className='app-container'>
      <Display input={input}/>
      <Teclado setInput = {setInput} input={input} />
    </div>
  )
}