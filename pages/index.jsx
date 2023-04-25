import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";


export default function Home({newsResults}) {
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
    <Widgets newsResults={newsResults.articles}/>


   {/* Modal  */}
   </main>

    </>
  )
}


//https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function  getServerSideProps(){
  const URL = `https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`;
  const newsResults = await fetch(URL)
  .then(
    res => res.json() 
  )

  return {
    props:{
      newsResults
    }
  }

}