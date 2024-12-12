import React,{useId} from 'react'

//* forward ref: https://react.dev/reference/react/forwardRef

//forward ref let us store the state of different component whereeever you need
//?coz is input ko hum as a component le rhe hain and we need its state to proper functiong of the form so, in this case the forward ref hook is used

//input ko simple fat arrow function me le liya for better look and ease of codebase

//inputko foreward ref me wrap kr diya
const Input= React.forwardRef(function Input({
label, //The label provides context and accessibility to the input field, mark kr skte hai
type="text",
className="",
...props},ref){
    const id = useId();
 return(
    <div className='w-full'>
        {label && <label
        className='inline-block mb-1 pl-1'
        htmlFor={id}
        >{label}
        </label>}
        <input 
        type ={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
        ></input>
    </div>
 )
})

export default Input