
import Image from "next/image";
// import {getProviders, signIn} from 'next-auth/react';
import {getAuth, signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { db } from "@/firebase";
import { useRouter } from "next/router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";


export default function SignIn() {

    const router = useRouter();

    const onGoogleClick = async ()=> {
  try {
    
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const user = auth.currentUser.providerData[0];
    //console.log('user in signin', user)
    const docRef = doc(db,'twitter-users',user.uid);
    //check if user already exists
    const docSnap = await getDoc(docRef);
    //console.log('docSnap', docSnap);
    if(!docSnap.exists()){
     // console.log('docSnap does not exists', docSnap)
      await setDoc(docRef,{
        name:user.displayName,
        email:user.email,
        userImg: user.photoURL,
        uid:user.uid,
        timestamp: serverTimestamp(),
        username:user.displayName.split(' ').join('').toLocaleLowerCase()
  
      })
    }
    router.push('/');
  
  } catch (error) {
    console.log(error)
    
  }
    }

  return (
    <div className="flex justify-center mt-20 space-x-4">
        <Image 
        src='/twitter-phone.png'
        height={300} 
        width={300}
        alt='twitter display image'
        className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"/>
        <div className=''>
           
                <div  className='flex flex-col items-center'>
                    <Image
                    src='/twitter-logo-large.png'
                    alt='twitter logo'
                    width={200}
                    height={200}
                    className='w-36 object-cover'/>
                <p className="text-center text-sm italic my-10">This app is Twitter Clone for learning purpose</p>
                <button
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                onClick={onGoogleClick}
                >Sign in with Google</button>

                </div>
        
        </div>
    </div>
  )
}

