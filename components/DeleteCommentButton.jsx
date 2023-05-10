import {
    TrashIcon,
  } from '@heroicons/react/24/outline';
  import {deleteDoc, doc  } from 'firebase/firestore';
  import { db} from '@/firebase';
  import  {useSession,} from 'next-auth/react'; 
import { useRouter } from 'next/router';

export default function DeleteCommentButton({postId,commentId,commentCreatorUserId}) {

    const {data:session} = useSession();
    const router = useRouter();

    const deletePost = async ()=>{
        if(window.confirm('Are you sure you want to delete this comment?')){
      
      try {
            await deleteDoc(doc(db,'twitter-posts', postId,'comments',commentId));
      } catch (error) {
        console.log(error);
      }
        }
      
      }

  return (
    <>
    {session?.user.uid === commentCreatorUserId && (
          <TrashIcon onClick={deletePost} className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
    )}
    </>
  )
}
