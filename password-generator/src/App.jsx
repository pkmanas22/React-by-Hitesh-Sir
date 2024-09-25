import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"


function App() {
  // useState hook - for changing length in the range
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [isCopied, setIsCopied] = useState(false)

  const passwordRef = useRef(null);

  const handleClipboard = () => {
    navigator.clipboard.writeText(password)
    // useRef hook to select the text for better ui
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,15); // for selection 0 - 15 elements
    setIsCopied(true);
  }

  const generatePassowrd = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let random = Math.floor((Math.random() * str.length) + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
    setIsCopied(false);
  }, [numberAllowed, charAllowed, length, setPassword])  // here setPassword is optional and best practice is to include it inside dependency 

  useEffect(() => { // useEffect hook prevents too many re-renders
    generatePassowrd()
  }, [charAllowed, numberAllowed, length, generatePassowrd])

  return (
    <div className="flex justify-center inset-x-0 mt-10">
      <div className="bg-yellow-700 text-gray-300 p-3 flex flex-col flex-wrap justify-center rounded-xl">
        <div className="text-white text-xl p-2 font-bold text-center">
          Password Generator
        </div>
        <div className="text-lg flex w-full">
          <input
            type="text"
            className="w-full px-3 py-2 text-black font-semibold rounded-l-lg outline-none"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-blue-700 px-3 py-2 rounded-r-xl text-white font-semibold"
            onClick={handleClipboard}
          >{isCopied ? "copied" : "Copy"}</button>
        </div>
        <div className="my-2 flex items-center">
          <input
            type="range"
            name=""
            id=""
            value={length}
            min={8}
            max={50}
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />

          <div className="mx-2">
            Length: {length}
          </div>

          <input type="checkbox"
            name="numberAllowed"
            id="numberAllowed"
            className="mr-1"
            onChange={() => setNumberAllowed((prev) => !prev)}
            checked={numberAllowed}
          />
          <label htmlFor="numberAllowed">Number</label>

          <input type="checkbox"
            name="charAllowed"
            id="charAllowed"
            className="mr-1 ml-2"
            onChange={() => setCharAllowed((prev) => !prev)}
            checked={charAllowed}
          />
          <label htmlFor="charAllowed">Char</label>
        </div>
      </div>
    </div>
  )
}

export default App
