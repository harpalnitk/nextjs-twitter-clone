import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
// import  {useSession,signIn} from 'next-auth/react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { useRecoilState } from 'recoil';
import { userState } from '@/atom/userAtom';
import { useRouter } from 'next/router';

export default function LikeCommentButton({ commentId, postId }) {
  // const {data:session} = useSession();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();

  const likeComment = async () => {
    if (currentUser) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            'twitter-posts',
            postId,
            'comments',
            commentId,
            'likes',
            currentUser?.uid
          )
        );
      } else {
        //setDoc updates the doc
        await setDoc(
          doc(
            db,
            'twitter-posts',
            postId,
            'comments',
            commentId,
            'likes',
            currentUser?.uid
          ),
          {
            username: currentUser?.username,
          }
        );
      }
    } else {
      //signIn();
      router.push('/auth/signin');
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'twitter-posts', postId, 'comments', commentId, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
    return unsubscribe;
  }, [commentId, postId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);

  return (
    <div className='flex items-center'>
      {hasLiked ? (
        <HeartIconSolid
          onClick={likeComment}
          className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
        />
      ) : (
        <HeartIcon
          onClick={likeComment}
          className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
        />
      )}
      {likes.length > 0 && (
        <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}>
          {likes.length}
        </span>
      )}
    </div>
  );
}
