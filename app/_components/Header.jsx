"use client"

import { CircleUserRoundIcon, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import GlobalApi from '../_utils/GlobalApi'
import { STRAPI_BASE_URL } from "@/config";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import { toast } from 'sonner';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartItemList from './CartItemList'


const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [jwt, setJwt] = useState(null);
  const {updateCart, setUpdateCart} = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter();

  useEffect(()=>{
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const storedJwt = sessionStorage.getItem("jwt");

      if (storedUser && storedJwt) {
        setUser(storedUser);
        setJwt(storedJwt);
      }
      setIsLogin(!!storedJwt); // Check login status on the client side

      getCategoryList();
    }
  }, [])

  useEffect(()=>{
    if (user?.id && jwt) {
      getCartItems(user.id, jwt);
    }
  }, [user, jwt, updateCart])

  const getCategoryList = () => GlobalApi.getCategory().then( resp => setCategoryList(resp.data.data) )

  const getCartItems = async (userId, jwt) => {
    const cartItemList_ = await GlobalApi.getCartItems(userId, jwt);
    console.log("Cart Item List:", cartItemList_);
    setTotalCartItem(cartItemList_?.length || 0);
    setCartItemList(cartItemList_);
  }

  const onSignOut = () => {
    sessionStorage.clear();
    router.push('/sign-in');
  }

  const onDeleteItem = (document_id) => {
    GlobalApi.deleteCartItem(document_id, jwt).then(resp => {
      toast('Item removed!');
      getCartItems(user.id, jwt);
    });
  }
  
  useEffect(()=>{
      let total = 0;
      cartItemList.forEach(element => {
          total = total + element.amount
      });

      setSubtotal(total.toFixed(2));
  },[cartItemList])
 
  return (
    <div className='flex justify-between p-5 shadow-md'>
        <div className='flex items-center gap-8'>
            <Link href={'/'}>
              <Image 
                  src='/logo.png'
                  alt="grocery store"
                  width={150}
                  height={100}
                  className='cursor-pointer'
              />
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <h2 className='hidden md:flex gap-2 items-center borderd rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                  <LayoutGrid className='h-5 w-5'/> Category
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categoryList.map((category, index) => (
                  <Link href={'/category/' + category.name} key={index}>
                  <DropdownMenuItem key={index} className="flex gap-2 items-center">
                   <Image 
                      src={STRAPI_BASE_URL + category?.icon?.url}
                      alt='icon' 
                      width={25} 
                      height={25}
                      unoptimized={true}
                    />
                    <h2>{category?.name}</h2>
                  </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <Search />
                <input type='text' placeholder='Search' className='outline-none'/>
            </div>
        </div>
        <div className='flex gap-5 items-center'>
          
          <Sheet>
            <SheetTrigger>
            <h2 className='flex gap-2 items-center text-lg'>
              <ShoppingBasket className='h-7 w-7'/>
              <span className='bg-primary text-white px-2 rounded-full'>{totalCartItem}</span>
            </h2>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="bg-primary text-white font-bold text-lg p-2">My Cart</SheetTitle>
                <SheetDescription>
                  <CartItemList items={cartItemList} onDeleteItem={onDeleteItem}/>
                </SheetDescription>
              </SheetHeader>
              <SheetClose asChild>
                <div className="absolute w-[90%] bottom-6 flex flex-col">
                  <div className="text-lg font-bold flex justify-between">Subtotal: <span>${subtotal}</span></div>
                  <Button onClick={()=>router.push(jwt ? '/checkout' : '/sign-in')}>Checkout</Button>
                </div>
              </SheetClose>
            </SheetContent>
          </Sheet>

          {!isLogin ? <Link href={'/sign-in'}><Button>Login</Button></Link>
                    : 
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><CircleUserRoundIcon className='h-12 w-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer'/></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem><Link href={'/my-order'}>My Orders</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>onSignOut()}>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

         }
        </div>
    </div>
  )
}

export default Header