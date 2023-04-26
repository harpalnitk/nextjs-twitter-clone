import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";


export default function Home({articles, randomUsers}) {
  return (
    <>
   <Head>
    <title>Twitter Clone</title>
    <meta name="description" content="Nextjs 12 Tutorial with Tailwind CSS" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <main className="flex min-h-screen mx-auto">
    {/* Sidebar  */}

    <Sidebar></Sidebar>

   {/* Feed  */}
    <Feed/>

   {/* Widgets  */}
    <Widgets articles={articles} randomUsers={randomUsers}/>


   {/* Modal  */}
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