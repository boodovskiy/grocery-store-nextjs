'use client';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import moment from 'moment';
import MyOrderItem from '@/app/_components/MyOrderItem';
  

const MyOrder = () => {
    const [jwt, setJwt] = useState(null);
    const [user, setUser] = useState(null);
    const [orderList, setOrderList] = useState([]);
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
        const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
        console.log('MyOrder List:', orderList_);
        setOrderList(orderList_);
    }

  return (
    <div>
        <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My Order</h2>
        <div className='py-8 mx-7 md:mx-20'>
            <h3 className='text-3xl font-bold text-primary'>Order History</h3>
            <div>
                {orderList.map((item, index) => (
                    <Collapsible key={index}>
                        <CollapsibleTrigger>
                            <div className='border p-2 bg-slate-100 flex gap-24'>
                                <div><span className='font-bold mr-2'>Order Date:</span> {moment(item?.createdAt).format('DD/MMM/yyy')}</div>
                                <div><span className='font-bold mr-2'>Total Amount:</span> {item?.totalOrderAmount}</div>
                                <div><span className='font-bold mr-2'>Status:</span> {item?.status}</div>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            {item.orderItemList.map( (order, index_) => (
                                <MyOrderItem orderItem={order} key={index_}/>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MyOrder