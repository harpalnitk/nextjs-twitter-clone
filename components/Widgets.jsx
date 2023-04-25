import { useState } from "react";
import News from "./News";
import SearchBar from "./SearchBar";

export default function Widgets({newsResults}) {

  const [articleNum,setArticleNum] = useState(3);
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
       {/* searchBar  */}
       <SearchBar/>

       {/** News */}
       <div className=" text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {newsResults.slice(0,articleNum).map(article=> (
       <News key={article.title} article={article}/>
       ))}
       <button onClick={()=> setArticleNum(articleNum + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
       </div>
 
    </div>
  )
}
