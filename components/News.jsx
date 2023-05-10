import Image from 'next/image'
import React from 'react'

export default function News({article}) {
  return (
    <a rel='noreferrer' href={article.url} target='_blank'>
        <div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-500 ease-out'>
           <div className='space-y-0.5'>
            <h6 className='text-sm font-bold'>{article.title}</h6>
            <p className='text-xs font-medium text-gray-500'>{article.source.name}</p>
           </div>
           <Image
           className='w-[70px]  rounded-xl'
           src='/marty-avatar.png'
           width={70}
           height={70}
           alt='news-article-image'
           ></Image>
        </div>

    </a>
  )
}
