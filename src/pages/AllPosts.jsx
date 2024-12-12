import React,{useState,useEffect} from 'react'
import service from '../appwrite/config' 
import { Container,Postcard } from '../components'

function AllPosts() {
    const [posts,setPosts]=useState([]) //udhr config se all posts ek arrya send krega appwrite
    useEffect(()=>{
        service.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <Postcard {...post} />  
                </div>
            ))}
            </div>
        </Container>
    </div>
  ) 
}

export default AllPosts