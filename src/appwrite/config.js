import conf from '../conf/conf';
import {Client,ID,Databases,Storage,Query, Flag} from "appwrite";
// https://appwrite.io/docs/references/cloud/client-web/databases Database DOCs
//https://appwrite.io/docs/products/storage/quick-start storage DOCs
export class Service{
    client= new Client();
    databases;
    bucket; //bucket matbl storage hi hai

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
            this.databases =new Databases(this.client);
            this.bucket= new  Storage(this.client);
    }

    //*Post Upload service
    //Create post method
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,  // DB ID
                conf.appwriteColletionID, // Collection ID
                slug || ID.unique(), //document Id slug ko le rha hu chahe ho ID.unique() bhi le skte hain
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Create Post:: error", error.message);
        }
    }

    //Update post Method
    //update doc me Document ID bhi dena hai so for the ease mene slug ko alag rakha hai
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug, //doc ID Slug hai mera
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
                
                
            )
            
        } catch (error) {
            console.log("Appwrite service :: Update Post:: error", error);
            
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug, 
                console.log("Deleted the file")
                
            )
            return true; //delete ho gya hai bhai
        } catch (error) {
            console.log("Appwrite services :: Delete Post :: error", error);
            return false
        }
    }

    async getPost(slug){
        //get post me bs ek ID chaiye
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                slug //slug is Dcoument ID
            )
        } catch (error) {
          console.log("Appwrite Serivce :: getPost:: error",error);
            return false; //in case kuchh ni mila toh
        }
    }
    //to get all the posts
    //idhjr queries use krenge taaki jo document activehain unhee hi lu me
    async getPosts(queries=[Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteColletionID,
                queries,//queries mene upr define kr rkha hai // wese idr bhi kr skte the
            )
        } catch (error) {
            console.log("Appwrite Services :: listPost() :: error", error );
            return false;
            
        }
    }

    //*file upload service

    //https://appwrite.io/docs/products/storage/upload-download

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
            console.log("Upload file is  trying to upload the file")
        } catch (error) {
            console.log("Appwrite Services :: uploadFile():: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Services :: deletFile()::  error",error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            const result= this.bucket.getFilePreview(
                conf.appwriteBucketID,
                fileId);
        return result.href;
              
        } catch (error) {
            console.log("Appwrite Services :: getFilePreview():: error", error);
            return '';
        }
    }
}

const service = new Service()
export default service //appwriteServices