import {
    TrashIcon,
  } from '@heroicons/react/24/outline';
  import {deleteDoc, doc  } from 'firebase/firestore';
  import { db, storage } from '@/firebase';
  import { deleteObject, ref } from 'firebase/storage';
  // import  {useSession,} from 'next-auth/react'; 
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '@/atom/userAtom';

export default function DeleteButton({id,postCreatorUserId,postImage}) {

    //const {data:session} = useSession();
    const router = useRouter();
    const [currentUser,setCurrentUser] = useRecoilState(userState);
    const deletePost = async ()=>{
        if(window.confirm('Are you sure you want to delete this post?')){
      
      try {
            await deleteDoc(doc(db,'twitter-posts', id));
            if(postImage){
              await deleteObject(ref(storage,`twitter-posts/${id}/image`));
            }
            router.push('/')
      } catch (error) {
        console.log(error);
      }
        }
      
      }

  return (
    <>
    {currentUser?.uid === postCreatorUserId && (
          <TrashIcon onClick={deletePost} className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
    )}
    </>
  )
}
