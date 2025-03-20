'use client';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  

const MyOrder = () => {
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const jwtFromStorage = sessionStorage.getItem('jwt');
        const userFromStorage = JSON.parse(sessionStorage.getItem('user'));

         if (!jwtFromStorage) { 
            router.replace('/'); 
        } else {
            setJwt(jwtFromStorage);
            setUser(userFromStorage);
        }
    }, []);

    useEffect(() => {
        if (jwt && user) {
            getMyOrder();
        }
    }, [jwt, user]);

    const getMyOrder = async () => {
        const orderList = await GlobalApi.getMyOrder(user.id, jwt);
        console.log('MyOrder List:', orderList);
    }

  return (
    <div>
        <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My Order</h2>
        <div className='py-8 mx-7 md:mx-20'>
            <h3 className='text-3xl font-bold text-primary'>Order History</h3>
            <Collapsible>
                <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>
            </Collapsible>
        </div>
    </div>
  )
}

export default MyOrder