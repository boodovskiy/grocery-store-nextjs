'use client';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigRight } from 'lucide-react'
import React, { useEffect, useState }  from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter()

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

   useEffect(()=>{
      if (typeof window !== "undefined") {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        const storedJwt = sessionStorage.getItem("jwt");
  
        if (storedUser && storedJwt) {
          setUser(storedUser);
          setJwt(storedJwt);
        }
  
      }
    }, [])

    const getCartItems = async (userId, jwt) => {
      const cartItemList_ = await GlobalApi.getCartItems(userId, jwt);
      console.log("Cart Item List:", cartItemList_);
      setTotalCartItem(cartItemList_?.length || 0);
      setCartItemList(cartItemList_);
    }

  useEffect(()=>{
      if (user?.id && jwt) {
        getCartItems(user.id, jwt);
      } else {
        router.push('/sign-in');
      }
    }, [user, jwt])

  useEffect(()=>{
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount
        });
  
        setSubtotal(total.toFixed(2));
  },[cartItemList])

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 0.9 + 15;
    return totalAmount.toFixed(2);
  }

  return (
    <div>
        <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>
        <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
          <div className="md:col-span-2 mx-20">
            <div className="font-bold text-3xl">Billing Details</div>

            <div className="grid grid-cols-2 gap-10 mt-3">
              <Input placeholder='Name' onChange={(e)=>setUsername(e.target.value)}/>
              <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-3">
              <Input placeholder='Phone' onChange={(e)=>setPhone(e.target.value)}/>
              <Input placeholder='Zip' onChange={(e)=>setZip(e.target.value)}/>
            </div>

            <div className="mt-3">
              <Input placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
            </div>

          </div>
          <div className="mx-10 border">
            <div className="p-3 bg-gray-200 font-bold text-center">Total Cart ({totalCartItem})</div>
            <div className="p-4 flex flex-col gap-4">
              <div className="font-bold flex justify-between">Subtotal: <span>${subtotal}</span></div>
              <hr />
              <div className="flex justify-between">Delivery : <span>$15:00</span></div>
              <div className="flex justify-between">Tax (9%): <span>${(totalCartItem*0.9).toFixed(2)}</span></div>
              <hr />
              <div className="font-bold flex justify-between">Total: <span>${calculateTotalAmount()}</span></div>
              <Button>Payment <ArrowBigRight /> </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Checkout