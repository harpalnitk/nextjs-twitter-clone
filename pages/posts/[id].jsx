import CommentsModal from "@/components/CommentsModal";
import BackButtonHeader from "@/components/BackButtonHeader";

import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";
import {useRouter} from 'next/router';
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "@/components/Post";


export default function PostPage({articles, randomUsers}) {

    const [post,setPost]= useState();

    const router = useRouter();
    const {id} = router.query;

    useEffect(()=>{
        onSnapshot(doc(db,'twitter-posts',id),
        (snapshot)=> setPost(snapshot))
    },[db,id]);


  return (
    <>
   <Head>
    <title>Post Page</title>
    <meta name="description" content="Post" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <main className="flex min-h-screen mx-auto">
    {/* Sidebar  */}

    <Sidebar></Sidebar>

   {/* Post  */}
   <div
      className='xl:ml-[370px] border-l border-r  border-gray-200 xl:min-w-[576px]
    sm:ml-[73px] flex-grow max-w-xl'
    >
  <BackButtonHeader />

  

     <Post id={id} post={post}/>


    </div>


   {/* Widgets  */}
    <Widgets articles={articles} randomUsers={randomUsers}/>


   {/* Modal  */}
   <CommentsModal/>
   </main>

    </>
  )
}


//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function  getServerSideProps(){
  const URL = `https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`;
  
  let newsResults; 
  try {
    newsResults = await fetch(URL)
    .then(
      res => res.json() 
    )
} catch (error) {
  console.log(error);
}
//Who to follow section

const URL_RANDOM_USERS = `https://randomuser.me/api/?results=50&inc=name,login,picture`;
let randomUserResults;
try {
  randomUserResults = await fetch(URL_RANDOM_USERS)
  .then( res => res.json())
  
} catch (error) {
  console.log(error);
}
 


  return {
    props:{
      articles : newsResults ? newsResults.articles : [],
      randomUsers: randomUserResults? randomUserResults.results : []
    }
  }

}