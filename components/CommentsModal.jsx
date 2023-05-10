import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '@/atom/modalAtom';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { onSnapshot, doc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import Image from 'next/image';
import Moment from 'react-moment';
import {useSession} from 'next-auth/react';
import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';


export default function CommentsModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState('');

  const {data:session} = useSession();

  const router = useRouter();

  useEffect(() => {
    onSnapshot(
      doc(db, 'twitter-posts', postId),
      //it's not a collection so using just snapshot
      //instead of snapshot.docs
      (snapshot) => setPost(snapshot)
    );
  }, [postId, db]);

const sendComment = async ()=>{
await addDoc(collection(db,'twitter-posts',postId,'comments'),{
  comment:input,
  name:session.user.name,
  username:session.user.username,
  userImg:session.user.image,
  timestamp:serverTimestamp(),
  userId:session.user.uid,
})
setOpen(false);
setInput('');
router.push(`/posts/${postId}`);
}




  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className='max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
        >
          <div className='p-1'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <div
                onClick={() => setOpen(false)}
                className='hoverEffect w-9 h-9 flex items-center justify-center'
              >
                <XMarkIcon className='h-[23px] text-gray-700 p-0'></XMarkIcon>
              </div>
            </div>
            {/* user Image- Left Side  */}
            <div className='p-2 flex items-center space-x-1 relative'>
              {/* span is for vertical line under the image  */}
                <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300'/>
              <Image
                className='h-11 w-11 rounded-full mr-4'
                src={post?.data()?.userImg}
                width={100}
                height={100}
                alt='post-user-image'
              />
              <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
                {post?.data()?.name}
              </h4>
              <span className='text-sm sm:text-[15px]'>
                @{post?.data()?.username} -{' '}
              </span>
              <span className='text-sm sm:text-[15px] hover:underline'>
                <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            
            <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>{post?.data()?.text}</p>
            
            
            
            {/* input box of user who is commenting on post */}
            <div className='flex p-3 space-x-3'>
        <Image 
      
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
        src={session?.user.image} 
        alt='user-image'
        width={100}
        height={100}></Image>
        <div className='w-full divide-y divide-gray-200'>
            <div className=''>
                <textarea 
                className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700' 
                rows="2" 
                placeholder="Tweet your reply"
                value={input}
                onChange={(e)=> setInput(e.target.value)}></textarea>
            </div>

            <div className='flex items-center justify-between pt-2.5'>
         
                        <div className='flex'>
                    <div 
                    // onClick={() => filePickerRef.current.click()}
                    >
                    <PhotoIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
                    {/* <input type="file" hidden ref={filePickerRef} onChange={addImageToTweet}/> */}
                    </div>
                    <FaceSmileIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
                </div>
                <button 
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50' 
                disabled={!input.trim()}
                onClick={sendComment}>Reply</button>
             

            </div>
        </div>
    </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
