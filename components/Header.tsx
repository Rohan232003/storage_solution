import React from 'react'
import Image from "next/image";
import FileUploader from './FileUploader';
import { signOutUser } from '@/lib/actions/user.actions';
import Search from './Search';
const Header = ({userId,
  accountId,
}: {
  userId: string;
  accountId: string;}) => {
  return (
    <header className='header'>

<Search/>
  <div className='header-wrapper'>
  <FileUploader ownerId={userId} accountId={accountId} />
    <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
    <button type='submit'  className='sign-out-button'>
    <Image 
  src="/assets/icons/logout.svg" 
  alt="Logout"
  width={24} 
  height={24} 
  className="w-6" 
/>
    </button>
  </form>
  </div>
    </header>
  )
}

export default Header