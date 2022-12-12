import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCart4, BsPatchCheck } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import imgUrl1 from "../../../public/images/contact.jpg";
import search from "../../../public/images/no-record-found.png";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";

const CustomInput = (props) => {
  return <input type="text" {...props} />;
};

const Cart = () => {
  const currencyFormater = (number) => {
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "NGN",
    }).format(number);
  };
  const dummyProducts = [
    {
      imgUrl: "../../../public/images/contact.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "Native",
      price: "$4,500",
      quantity: 1,
    },
    {
      imgUrl: "../../../public/images/white_shopping.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "English",
      price: "$7,000",
      quantity: 1,
    },
    {
      imgUrl: "../../../public/images/straight-suit.jpeg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "Ankara",
      price: "$12,750",
      quantity: 1,
    },
    {
      imgUrl: "../../../public/images/white_shopping.jpg",
      name: "Lorem Ipsum dolor sit amet. consectutur",
      category: "Multipurpose",
      price: "$4,500",
      quantity: 1,
    },
  ];
  const [checkout, setCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "De Facto Man Regular Knitted Fit Polo . Tshirt . Black",
      category: "Native",
      size: "M",
      price: 2800,
      imgUrl: imgUrl1,
      quantity: 1,
    },
    {
      id: 2,
      name: "De Facto Man Regular Knitted Fit Polo . Tshirt . Black",
      category: "Native",
      size: "M",
      price: 1000,
      imgUrl: imgUrl1,
      quantity: 1,
    },
  ]);

  const removeItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  const minusQuantity = (id) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem.quantity === 1) return;
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };
  const plusQuantity = (id) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else return item;
    });
    setCartItems(newCartItems);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((item) => {
      totalPrice += item.price * item.quantity;
    });
    console.log(totalPrice);
    return totalPrice;
  };

  const toggleCheckout = () => {
    setCheckout(!checkout);
  };

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  return (
    <>
      <div class="mx-auto w-[1200px] bg-[#f5f5f5] px-10 py-7 mb-10 mt-3">
        <div class="flex gap-5">
          <div class="w-2/3 bg-white rounded ">
            <p class="border-b p-5 font-semibold">Cart ({cartItems.length})</p>
            <>
              {cartItems.length ? (
                <div>
                  {cartItems.map((item, idx) => (
                    <div className={`${idx !== 0 && "border-t"} `}>
                      <div class="p-5">
                        <div key={idx} class="flex gap-3 text-sm">
                          <img
                            class="w-16 h-24 object-cover"
                            src={item.imgUrl}
                          />
                          <div class="flex justify-between flex-1">
                            <div class="flex flex-col gap-1">
                              <p class="text-base">{item.name}</p>
                              <p>Category - {item.category}</p>
                              <p>
                                Size -{" "}
                                <span class="text-[coral]">
                                  {item.size || "M"}
                                </span>
                              </p>
                              <p class="flex items-center gap-1">
                                <IoMdNotifications color="coral" size={20} />{" "}
                                <span>7 units left</span>
                              </p>
                            </div>
                            <div>
                              <p class="text-base font-semibold">
                                {currencyFormater(item.price)}
                              </p>
                              <div class="flex items-center gap-2 text-sm">
                                <p class="line-through text-[coral]">N 8,000</p>
                                <p>50%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="p-5 flex items-center justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          class="flex items-center gap-2"
                        >
                          <AiFillDelete color="coral" size={22} />
                          <span class="text-sm text-[coral] font-semibold">
                            DELETE
                          </span>
                        </button>
                        <div class="flex items-center gap-4">
                          <button
                            onClick={() => minusQuantity(item.id)}
                            class={`${
                              item.quantity === 1
                                ? "bg-green-100"
                                : "bg-green-400"
                            }  px-2.5 py-0.5 rounded text-2xl`}
                          >
                            -
                          </button>
                          <span class="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => plusQuantity(item.id)}
                            class="bg-green-400 px-2.5 py-1 rounded text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div class="h-52 rounded bg-white grid place-content-center text-center">
                  <img src={search} class="w-14 mx-auto" />
                  <p class="mt-2 mb-6">Your cart is empty at the monent!</p>
                  <Link
                    to="../"
                    class="w-fit mx-auto text-white text-sm px-4 py-1.5 rounded bg-[coral]"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </>
          </div>
          <div class="w-1/3 bg-white rounded h-fit pb-5">
            <p class="border-b p-5 font-semibold">Cart Summary</p>
            <div class="border-b p-5">
              <div class="flex justify-between items-center">
                <p class="font-semibold">Subtotal</p>
                <p>{currencyFormater(getTotalPrice())}</p>
              </div>
            </div>
            <div class="flex justify-between w-full">
              <button
                onClick={toggleCheckout}
                class="mx-auto flex gap-3 font-semibold text-sm text-white mt-5 px-10 py-2 bg-green-400 rounded"
              >
                CHECKOUT {currencyFormater(getTotalPrice())}
              </button>
            </div>
          </div>
        </div>
        <div class="mt-6 rounded bg-white">
          <p class="p-5 border-b font-semibold">Saved For Later</p>
          <div class="p-5 flex gap-4 r">
            {dummyProducts.map((product, idx) => (
              <div key={idx} class="flex flex-col">
                <img
                  class="w-[90%] rounded h-32 object-cover"
                  src={product.imgUrl}
                />
                <p class="mt-2">{product.name}</p>
                <p class="mt-1 text-green-400">{product.category}</p>
                <div class="flex items-center justify-between  w-[90%] mt-5">
                  <p class="font-semibold">{product.price}</p>
                  <button>
                    <BsCart4 size={22} />
                    {/* <p class="text-xs px-5 py-2 bg-green-400 rounded">Add To Cart Now</p> */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="mt-6 rounded bg-white">
          <p class="p-5 border-b font-semibold">You May Also Like</p>
          <div class="p-5 flex gap-4 ">
            {dummyProducts.map((product, idx) => (
              <div
                key={idx}
                class={`flex flex-col justify-between items-center text-center`}
              >
                <img
                  class="w-24 rounded h-32 object-cover"
                  src={product.imgUrl}
                />
                <p class="mt-2 text-sm">{product.name}</p>
                <p class="mt-1 text-[tomato]">{product.category}</p>
                <div class="flex items-center justify-between  w-[90%] mt-5">
                  <p class="font-semibold">{product.price}</p>
                  <button>
                    <BsCart4 size={22} />
                    {/* <p class="text-xs px-5 py-2 bg-green-400 rounded">Add To Cart Now</p> */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {checkout && (
        <div className="z-[1000] fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm grid place-content-center">
          <button
            onClick={toggleCheckout}
            className="fixed top-5 right-5 text-sm flex items-center gap-1 text-[coral] font-semibold"
          >
            CLOSE
            <CgCloseO size={24} color="coral" />
          </button>
          <div className="grid w-[1000px] grid-cols-2 gap-5">
            <div className="bg-white rounded p-5 py-7">
              <p className="pb-5 border-b font-semibold">
                Personal Information
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <div className="grid grid-cols-2 gap-3">
                  <CustomInput
                    placeholder="Full Name"
                    className="px-3 py-2 border outline-none rounded-sm text-sm"
                  />
                  <CustomInput
                    placeholder="Phone Number"
                    className="px-3 py-2 border outline-none rounded-sm text-sm"
                  />
                </div>
                <CustomInput
                  type="email"
                  placeholder="Email"
                  className="px-3 py-2 border outline-none rounded-sm text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <CustomInput
                    placeholder="City"
                    className="px-3 py-2 border outline-none rounded-sm text-sm"
                  />
                  <CustomInput
                    placeholder="State"
                    className="px-3 py-2 border outline-none rounded-sm text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="bg-white rounded p-5 py-7">
              <p className="pb-5 border-b font-semibold">Delivery</p>
              <div className="flex gap-5 mt-10">
                <button className="relative h-20 w-full rounded bg-white shadow grid place-content-center text-center font-semibold">
                  STRIPE
                  <BsPatchCheck className="absolute top-2 right-2" />
                </button>
                <button className="h-20 w-full rounded bg-white shadow grid place-content-center text-center font-semibold">
                  MONIFY
                </button>
              </div>
              <div className="flex justify-end">
                <button className="mt-5 px-5 py-2 text-sm rounded bg-[#ce8448] text-white">
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
