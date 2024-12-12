import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import { Header,Footer } from "./components/index";
import { Outlet } from 'react-router-dom'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch= useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser() //pehle mene authService call kari(appwrite wali) and currentuser liya
                .then((userData)=>{  //fir usse ko mene authslice me pass kra login logout check krne ke liye
                  if(userData){
                    dispatch(login({userData})) //agar userdata hai to login kro else logout kr diya
                    //ye wala `login and logout`hmne authslice se liya
                  }else{
                    dispatch(logout()) //logout isliye kiya taaki atleast state hmesha updated rahe, coz logout krne se userdata toh null ho jaayega na
                  }
                })
                .finally(()=>setLoading(false))
  
    
  }, [])
  
  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
         { <Outlet/>}
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
