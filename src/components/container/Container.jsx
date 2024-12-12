import React from 'react'

const Container = ({children}) => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}
//Build the container so that isse pure container ki propereties manage kr paaye. like bg colour wiidth etc etc
export default Container