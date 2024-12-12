import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'


function PostForm({post}) {
    //all these are from the react form hooks and its functions
    //we can handle submit, watch, setvalue,control the form and getValues

    const {register,handleSubmit,watch,setValue,control,getValues} =useForm({
        //useform bhi ek object leta hai default values wali
        defaultValues:{
            title:post?.title||"",
            slug: post?.slug||"",
            Content:post?.Content||"no content submitted here!",
            status:post?.status|| "active",
        },
    })
    const navigate=useNavigate() //navigate krane ke liye
    const userData=useSelector((state)=> state.auth.userData) //ye redux ke liye

    //now making the submit 
    const submit =async(data)=>{
        try {
            const slug = slugTransform(data.title, userData.$id);  // Generate slug
      console.log('Generated slug:', slug);    // Log the slug


        if(post){
           const file= data.image[0]? await service.uploadFile(data.image[0]):null;
            // ye upr image uploadkrne ke liye hai
            console.log("Uploaded the Image!");
            
            if(file){

            
                try {
                    console.log("Attempting to delete the old Image");
                    await service.deleteFile(post.featuredImage)
                    console.log("Old Image deleted Successfully!"); 
                } catch (deletError) {
                    console.log("There was error in deleting file!",deletError);
                }
                
            }
            
            try{
                const updatePayload={
                ...data,
                slug: data.title !== post.title ? slugTransform(data.title) : post.slug, // Update slug if title changes
                featuredImage:file?file.$id:post.featuredImage,//retaining the existing file
                }
                console.log("Payload for update post!",updatePayload);
                
                const dbPost=await service.updatePost(post.$id,updatePayload);
                console.log("Response from updatePayload", dbPost);
            
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
                console.log("Updating the post was success!");
                
            } else {
                console.error("Update operation returned null or undefined:", dbPost);
            }
        }catch (error) {
            console.error("Error during update process:", error);
        }
            
        } else{
            const file= await service.uploadFile(data.image[0]);
            if(file){
                const fileId=file.$id
                data.featuredImage=fileId

                //explicitly including the conntent
                const postData={
                   title: data.title,
                   content: data.content,
                   featuredImage: file?file.$id:undefined,
                   status: data.status,
                   slug
                };
                console.log("Data being sent to createPost:", postData); // Debug log
                console.log("The uploaded content is",data.content);
                
               // const dbPost=await service.createPost(postData)
                const dbPost=await service.createPost({...data,userId:userData.$id})
                console.log("Response from createPost:", dbPost); // Debug log
                
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }catch(error){
        console.error("Error during submit:", error);
    }
    }

    const slugTransform = useCallback((value)=>{if (value && typeof value==='string') {
        return value
                    .trim() //wo value pehle trim krega
                    .toLowerCase()
                    .replace(/[^a-z\d\s-]/g, '') //regex hain ye, jo bich ki spaces and all ko sahi kr de and kuchh inputkr de
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-') // Replace multiple consecutive hyphens with a single hyphen
            }
        return ''
    },[])
    React.useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}));
            }
        });
        return()=>subscription.unsubscribe();

        //this retrun is used for better optimised code 
    },[watch,slugTransform,setValue]) //in sbko humne ek useeffect me rkha hai
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap"> 
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })} //input ese hi leete hain register ko spread krke
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={ post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm