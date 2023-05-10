import {
    HeartIcon,
  } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import  {useSession,signIn} from 'next-auth/react'; 
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';


export default function LikeCommentButton({commentId,postId}) {

    const {data:session} = useSession();
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);

    const likeComment = async ()=>{
        if(session){
          if(hasLiked){
            await deleteDoc(doc(db,'twitter-posts',postId,'comments',commentId,'likes', session?.user.uid));
      }else{
      //setDoc updates the doc
      await setDoc(doc(db,'twitter-posts',postId,'comments',commentId,'likes',session?.user.uid),{
       username: session.user.username
      });
      }
        }else{
          signIn();
        }
      }

      useEffect(()=>{
        const unsubscribe  = onSnapshot(
         collection(db,'twitter-posts',postId,'comments',commentId,'likes'),
         (snapshot)=>setLikes(snapshot.docs)
        )
        return unsubscribe;
       },[commentId,postId]);

       useEffect(()=>{
        setHasLiked(likes.findIndex(like => like.id === session?.user.uid) !== -1)
        },[likes,session?.user.uid]);


  return (
    <div className='flex items-center'>
    {hasLiked ? (
    <HeartIconSolid onClick={likeComment} className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100' />
    ):(
      <HeartIcon onClick={likeComment} className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
    )}
    {
      likes.length > 0 && (
        <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>{likes.length}</span>
      )
    }
    </div>
  )
}
