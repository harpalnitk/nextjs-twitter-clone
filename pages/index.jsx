import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Head from "next/head";


export default function Home() {
  return (
    <>
   <Head>
    <title>Twitter Clone</title>
    <meta name="description" content="Nextjs 12 Tutorial with Tailwind CSS" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <main className="flex min-h-screen max-w-7xl mx-auto">
    {/* Sidebar  */}

    <Sidebar></Sidebar>

   {/* Feed  */}
    <Feed/>

   {/* Widgets  */}
    <Widgets/>


   {/* Modal  */}
   </main>

    </>
  )
}
