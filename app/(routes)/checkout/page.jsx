'use client';
import { Input } from '@/components/ui/input'
import React, { useEffect, useState }  from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'sonner';

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

  const [totalAmount, setTotalAmount] = useState();

   useEffect(()=>{
      if (typeof window !== "undefined") {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        const storedJwt = sessionStorage.getItem("jwt");
  
        if (storedUser && storedJwt) {
          setUser(storedUser);
          setJwt(storedJwt);
        } else {
          router.push('/sign-in'); 
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
    if (!user || !jwt) return; 
    getCartItems(user.id, jwt);
  }, [user, jwt])

  useEffect(()=>{
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount
        });

        setSubtotal(total.toFixed(2));
        setTotalAmount((total*0.9 + 15).toFixed(2));
  },[cartItemList])

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 0.9 + 15;
    return totalAmount.toFixed(2);
  }

  const onApprove = (data) => {
    console.log(data);

    const payload = {
      data: {
        paymentId: data.paymentId.toString(),
        userId: user.id,
        totalOrderAmount: parseFloat(totalAmount),
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList.map(item => ({
          quantity: item.quantity,
          price: item.amount,
          product: item.product_id,
        })),
      }
    }

    GlobalApi.createOrder(payload, jwt).then(resp => {
      toast('Order Placed Successfully!');
      cartItemList.forEach((item, index) => {
        GlobalApi.deleteCartItem(item.document_id, jwt).then(resp => {  console.log('Deleted successfully'); });
      })
      router.replace('/order-confirmation');
    })
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
              {/* <Button onClick={() => onApprove({paymentId: 321})}>Payment <ArrowBigRight /> </Button> */}
              <PayPalButtons style={{ layout: "horizontal" }}
                disabled={!(username && email && address && zip)}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount,
                          currency_code: 'USD'
                        }
                      }
                    ]
                  })
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  const paymentId = order.id;

                  if (paymentId) {
                    onApprove({ paymentId });
                  } else {
                    console.error("Payment ID is missing");
                  }
                }}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Checkout