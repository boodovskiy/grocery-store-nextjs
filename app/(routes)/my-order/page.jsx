import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const MyOrder = () => {
    const jwt = sessionStorage.get('jwt');
    const router = useRouter();

    useEffect(() => {
        if (!jwt) { router.replace('/'); }
    }, []);

  return (
    <div>MyOrder</div>
  )
}

export default MyOrder