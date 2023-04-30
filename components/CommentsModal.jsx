import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '@/atom/modalAtom';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import Image from 'next/image';
import Moment from 'react-moment';

export default function CommentsModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});

  useEffect(() => {
    onSnapshot(
      doc(db, 'twitter-posts', postId),
      //it's not a collection so using just snapshot
      //instead of snapshot.docs
      (snapshot) => setPost(snapshot)
    );
  }, [postId, db]);
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className='max-w-lg w-[90%] h-[300px] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'
        >
          <div className='p-1'>
            <div className='border-b border-gray-200 py-2 px-1.5'>
              <div
                onClick={() => setOpen(false)}
                className='hoverEffect w-9 h-9 flex items-center justify-center'
              >
                <XMarkIcon className='h-[22px] text-gray-700'></XMarkIcon>
              </div>
            </div>
            {/* user Image- Left Side  */}
            <div className='p-2 flex items-center space-x-1'>
                <span className='w-.5 '/>
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
          </div>
        </Modal>
      )}
    </div>
  );
}
