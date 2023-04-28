import { useState, useEffect } from 'react';
import FeedHeader from './FeedHeader';
import FeedInput from './FeedInput';
import Post from './Post';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'twitter-posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div
      className='xl:ml-[370px] border-l border-r  border-gray-200 xl:min-w-[576px]
    sm:ml-[73px] flex-grow max-w-xl'
    >
      {/* Header  */}
      <FeedHeader />

      {/* Feed Input Box  */}
      <FeedInput />

      {/* Posts  */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
