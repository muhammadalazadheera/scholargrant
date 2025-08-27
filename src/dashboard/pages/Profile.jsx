import React from 'react'
import useAuth from '../../hooks/useAuth'
import useUserRole from '../../hooks/useUserRole';

function Profile() {
  const {user} = useAuth();
  const {role} = useUserRole();
  return (
    <div className='w-[100%] mx-auto border border-primary rounded shadow-sm bg-base-100 py-10 flex justify-center items-center flex-col'>
      <img className='rounded-full' width="100px" src={user.photoURL} alt="" />
      <p className='text-center text-xl my-2 text-primary'>{user.displayName} [{role === 'user' ? '' : role}]</p>
      <p className='text-center text-xl mb-2'>{user.email}</p>
    </div>
  )
}

export default Profile