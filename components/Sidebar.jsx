import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {  HomeIcon } from "@heroicons/react/24/solid";
import { BellIcon, BookmarkIcon, ClipboardIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, HashtagIcon, InboxIcon, UserIcon } from "@heroicons/react/24/outline";
import { useSession,signIn,signOut } from "next-auth/react";
export default function Sidebar() {

    const {data:session} = useSession();
  return (
    // fixed makes sidebar menu positioned at top using scrolling of feed 
    //feed component will go outside of original flexbox because of this position
    //fixed used in sidebar
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
        {/* Twitter Logo  */}
        <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
            <Image src='/twitter_logo.png'
            width={50}
            height={50}>

            </Image>
        </div>

        {/* Menu  */}
        <div className='mt-4 mb-2.5 xl:items-start'>
            <SidebarMenuItem text='Home' Icon={HomeIcon} active></SidebarMenuItem>
            <SidebarMenuItem text='Explore' Icon={HashtagIcon}></SidebarMenuItem>
            {session && (
                <>
                <SidebarMenuItem text='Notifications' Icon={BellIcon}></SidebarMenuItem>
 <SidebarMenuItem text='Messages' Icon={InboxIcon}></SidebarMenuItem>
 <SidebarMenuItem text='Bookmark' Icon={BookmarkIcon}></SidebarMenuItem>
 <SidebarMenuItem text='Lists' Icon={ClipboardIcon}></SidebarMenuItem>
 <SidebarMenuItem text='Profile' Icon={UserIcon}></SidebarMenuItem>
 <SidebarMenuItem text='More' Icon={EllipsisHorizontalCircleIcon}></SidebarMenuItem>
                </>
 
            )}
           
        </div>

        
        {session ? (
            <>
        {/* Tweet Button  */}
        <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>


        {/* MiniProfile  */}
        <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            <Image 
            src={session.user.image} 
            width='100'
             height='100' 
             alt='user-image'
             className="h-10 w-10 rounded-full xl:mr-2"
             onClick={signOut}
             />
            <div className='leading-5 hidden xl:inline'>
                <h4 className="font-bold">{session.user.name}</h4>
                <p className="text-gray-500">@{session.user.username}</p>
            </div>
            <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"/>
        </div>
            </>
        ) : (
            <button 
            onClick={signIn}
            className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"> Sign In</button>
        )}


    </div>
  )
}
