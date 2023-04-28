import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import {useSession, signOut} from 'next-auth/react';
import { useRef, useState } from 'react';
import { db, storage } from '@/firebase';
import {addDoc,collection, doc, serverTimestamp, updateDoc} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function FeedInput() {


    const {data:session} = useSession();
    // console.log('session', session)

    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const filePickerRef = useRef(null);

    const addImageToTweet =  (e) => {
        console.log('addImageToTweet ', selectedImage);
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            console.log('reader.onload ', selectedImage);
            setSelectedImage(readerEvent.target.result)
            console.log('selectedImage ', selectedImage);
        }

    }

    const sendTweet = async (e)=>{
        if(loading) return;
        setLoading(true);
        
        console.log('selectedImage inside send tweet ', selectedImage);
        const docRef = await addDoc(collection(db,'twitter-posts'),{
            id: session.user.uid,
            text:input,
            userImg:session.user.image,
            timestamp:serverTimestamp(),
            name:session.user.name,
            username:session.user.username
        })

        //docRef.id is id of document created
        const imageRef = ref(storage,`twitter-posts/${docRef.id}/image`);
        console.log('selectedImage ', selectedImage);
        if(selectedImage){
            console.log('selectedImage ', selectedImage)
            await uploadString(imageRef, selectedImage,'data_url').then(
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    console.log('downloadURL ', downloadURL)
                    //update tweet doc now
                    await updateDoc(doc(db,'twitter-posts',docRef.id),{
                        image: downloadURL
                    })
                }
            )
        }
        setInput('');
        setSelectedImage(null);
        setLoading(false);
    }

  return <>
      {session && (
        <div className='flex border-b border-gray-200 p-3 space-x-3'>
        <Image 
        onClick={signOut}
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
                placeholder="What's happening"
                value={input}
                onChange={(e)=> setInput(e.target.value)}></textarea>
            </div>
            {selectedImage && (
                <div className='relative'>
                    <XMarkIcon 
                    className='border h-7 text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full'
                    onClick={()=> setSelectedImage(null)}/>
                    <Image 
                    src={selectedImage} 
                    width={300} 
                    height={300} 
                    alt="image"
                    className={`${loading && 'animate-pulse'}`}/>
                </div>
            )}
            <div className='flex items-center justify-between pt-2.5'>
               {!loading && (
                       <>
                        <div className='flex'>
                    <div onClick={() => filePickerRef.current.click()}>
                    <PhotoIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
                    <input type="file" hidden ref={filePickerRef} onChange={addImageToTweet}/>
                    </div>
                    <FaceSmileIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100'/>
                </div>
                <button 
                className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50' 
                disabled={!input.trim()}
                onClick={sendTweet}>Tweet</button>
                 </>
               )}

            </div>
        </div>
    </div>
    )}
  </>


  
}
