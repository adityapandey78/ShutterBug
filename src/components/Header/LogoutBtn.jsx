import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch =useDispatch()
    const logoutHandler =()=>{
        authService.logout().then(()=>{ //appwrite se kogout kiya
            dispatch(logout()) //store ko dispatch kr diya , logout slicer udhr bhi bnaya tha na
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>LogOut</button>
  )
}

export default LogoutBtn