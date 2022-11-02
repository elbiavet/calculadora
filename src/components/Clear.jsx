

export const Clear = ({setInput, setCountPunto, setCountOperador}) => {
  const clear = () => {
    setInput("0") 
    setCountPunto("1")
    setCountOperador("1")
  }
  return (
    <button id="clear" onClick={clear}>Clear</button>
  )
}
