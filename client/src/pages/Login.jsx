import { useState } from "react"

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');

  return (
    <form className="flex flex-col mt-14 items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800"/>
      </div>

      {currentState === 'Login' ? '' : <input className="py-2 w-full px-4 border border-gray-600" type="text" placeholder="Name" required/> }
      <input className="py-2 w-full px-4 border border-gray-600" type="text" placeholder="Email" required/>
      <input className="py-2 w-full px-4 border border-gray-600" type="password" placeholder="Password" required/>

      <div className="flex justify-between w-full text-sm">
        <p className="cursor-pointer">Forgot your password?</p>
        <p onClick={() => currentState === 'Login' ? setCurrentState('Sign Up') : setCurrentState('Login')} className="cursor-pointer">{currentState === 'Login' ? 'Create account' : 'Login here'}</p>
      </div>

      <button className="bg-black text-white py-2 px-8 rounded-sm mt-4">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
