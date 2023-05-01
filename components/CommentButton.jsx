import {
    ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { modalState, postIdState } from '@/atom/modalAtom';
import { useRecoilState } from 'recoil';
import  {useSession,signIn} from 'next-auth/react'; 
import { collection,onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export default function CommentButton({id}) {
    const [comments,setComments] = useState([]);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const {data:session} = useSession();
   
    useEffect(()=>{
        const unsubscribe  = onSnapshot(
         collection(db,'twitter-posts',id,'comments'),
         (snapshot)=>setComments(snapshot.docs)
        )
        return unsubscribe;
       },[id]);


  return (
    <div className='flex items-center select-none'>
    <ChatBubbleLeftEllipsisIcon  
    onClick={()=>{
      if(!session){
        signIn();
      }else{
        setPostId(id);
        setOpen(!open);
      }
    
    }}
    className='h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
    {comments.length > 0 && (
      <span className='text-sm'>{comments.length}</span>
    )}
    </div>
  )
}
