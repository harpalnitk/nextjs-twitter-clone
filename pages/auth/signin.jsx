
import Image from "next/image";
import {getProviders, signIn} from 'next-auth/react';

export default function SignIn({providers}) {
  return (
    <div className="flex justify-center mt-20 space-x-4">
        <Image 
        src='/twitter-phone.png'
        height={300} 
        width={300}
        alt='twitter display image'
        className="hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6"/>
        <div className=''>
            {Object.values(providers).map(provider => (
                <div key={provider.name} className='flex flex-col items-center'>
                    <Image
                    src='/twitter-logo-large.png'
                    alt='twitter logo'
                    width={200}
                    height={200}
                    className='w-36 object-cover'/>
                <p className="text-center text-sm italic my-10">This app is Twitter Clone for learning purpose</p>
                <button
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
                onClick={()=> signIn(provider.id,{callbackUrl:'/'})}
                >Sign in with {provider.name}</button>

                </div>
            ))}
        </div>
    </div>
  )
}

export async function getServerSideProps(){
    const providers =  await getProviders();
    return {
        props:{
            providers,
        }
    }
}