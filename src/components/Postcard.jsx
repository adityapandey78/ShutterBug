import React, { useEffect } from 'react'
import service from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  const [imageSrc,setImgSrc]=React.useState(null);
  
  useEffect(()=>{
   const fetchImage=async()=>{
       const image=await service.getFilePreview(featuredImage);
       setImgSrc(image);
   }
   fetchImage();
  },[featuredImage])
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={imageSrc} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard