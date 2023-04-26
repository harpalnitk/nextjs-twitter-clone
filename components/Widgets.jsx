import { useState } from "react";
import News from "./News";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default function Widgets({articles, randomUsers}) {

  const [articleNum,setArticleNum] = useState(3);
  const [userNum,setUserNum] = useState(3);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
       {/* searchBar  */}
       <SearchBar/>

       {/** News */}
       <div className=" text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {articles.slice(0,articleNum).map(article=> (
       <News key={article.title} article={article}/>
       ))}
       <button onClick={()=> setArticleNum(articleNum + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
       </div>

       {/* Random Users */}

       <div className=" text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%] sticky top-16">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {randomUsers.slice(0,userNum).map(user => (
          <div key={user.login.username} className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200'>
            <Image 
            className='rounded-full w-12'
            src={user.picture.thumbnail}
            width={100}
            height={100}
            alt='follow-user-image'/>
            <div className="truncate ml-4 leadin-5">
              <h4 className='font-bold hover:underline text-[14px] truncate'>{user.login.username}</h4>
              <h5 className="text-[13px] text-gray-500 truncate">{user.name.first + ' ' + user.name.last}</h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm p-3.5 py-1.5 font-bold">Follow</button>
          </div>
        ))}
        <button onClick={()=> setUserNum(userNum + 3)}  className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
       </div>
 
    </div>
  )
}
