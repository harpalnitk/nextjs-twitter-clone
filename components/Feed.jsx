import FeedHeader from './FeedHeader'
import FeedInput from './FeedInput'
import Post from './Post';

export default function Feed() {

    const posts = [
        {id:1,name:'Harpal Singh',username:'harpalnitk',userImg:'marty-avatar.png',img:'background-1.jpg',text:'nice view!',timestamp: '2 hours ago'},
        {id:2,name:'Harpal Singh2',username:'harpalnitk2',userImg:'marty-avatar.png',img:'background-2.jpg',text:'nice view!',timestamp: '2 hours ago'},
    ];
  return (
    <div className='xl:ml-[370px] border-l border-r  border-gray-200 xl:min-w-[576px]
    sm:ml-[73px] flex-grow max-w-xl'>
        
        {/* Header  */}
        <FeedHeader/>

        {/* Feed Input Box  */}
        <FeedInput/>

        {/* Posts  */}
        {posts.map(post=> <Post key={post.id} post={post}/>)}

    </div>
  )
}
