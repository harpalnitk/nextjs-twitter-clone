import {
  ChartBarIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Moment from 'react-moment';
import LikeCommentButton from './LikeCommentButton';
import DeleteCommentButton from './DeleteCommentButton';


export default function Comment({ commentId, originalPostId, comment }) {

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 pl-20'>
      {/* user Image- Left Side  */}
      <Image
        className='h-11 w-11 rounded-full mr-4'
        src={comment?.userImg}
        width={100}
        height={100}
        alt='comment-user-image'
      />

      {/* Right Side  */}

{/* when image is not there horizontal ellipsis do not move to end 
to fix this adding flex-1 to below div */}
      <div className='flex-1'>
        {/* Header  */}

        <div className='flex items-center justify-between'>
          {/* post user Info  */}
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{comment?.name}</h4>
            <span className='text-sm sm:text-[15px]'>@{comment?.username} - </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
              </span>
          </div>

          {/* dot icon  */}
          <EllipsisHorizontalIcon 
          className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2' />
        </div>

        {/* post text  */}
        <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{comment?.comment}</p>




        {/* post buttons  */}
        <div className='flex justify-between text-gray-500 p-2'>

         

           <DeleteCommentButton postId={originalPostId} commentId={commentId} commentCreatorUserId={comment?.userId}/>
           <LikeCommentButton commentId={commentId} postId={originalPostId}/>

          <ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
}
