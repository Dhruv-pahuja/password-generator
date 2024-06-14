import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const [buttonState, setButtonState] = useState({
    text: 'Copy',
    color: 'bg-blue-700',
  });

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str += '0123456789'
    if(characterAllowed) str += '@#$^&*%!(){}'

    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[numberAllowed,characterAllowed,length,setPassword])

  const copyPassToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 33);
    window.navigator.clipboard.writeText(password)

    setButtonState({
      text: 'Copied',
      color: 'bg-green-500',
    });

    setTimeout(() => {
      setButtonState({
        text: 'Copy',
        color: 'bg-blue-700',
      });
    }, 2000);

  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
    <div>
      <h1 className='text-4xl text-center m-5 text-white'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 m-5 text-orange-500 text-l bg-gray-600'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
          <button className={`${buttonState.color} outline-none shrink-0 text-white py-1 px-3 font-semibold`} onClick={copyPassToClipboard}>{buttonState.text}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 '>
            <input type="range" min={6} max={30} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label>length : {length}</label>
          </div>
          <div className='flex  items-center gap-x-1 mx-2'>
            <input type="checkbox" className='text-l' defaultChecked = {numberAllowed} id="numberInput" onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1 mx-2'>
            <input type="checkbox" defaultChecked = {characterAllowed} id="characterInput" onChange={()=>{
              setCharacterAllowed((prev) => !prev)
            }}/>
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
