import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline'
import {useRouter} from 'next/router';

export default function FeedHeader() {

    const router= useRouter();
  return (
    <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <div 
        className='hoverEffect flex items-center justify-center'
        onClick={()=> router.push('/')}>
            <ArrowLeftIcon className='h-5 '/>
        </div>
    <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Tweet</h2>
</div>
  )
}