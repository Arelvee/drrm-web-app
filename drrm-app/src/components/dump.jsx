import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import FManual1 from '../assets/fmanual (1).jpg';
import FManual2 from '../assets/fmanual (2).jpg';
import PManual1 from '../assets/pmanual (1).jpg';
import PManual2 from '../assets/pmanual (2).jpg';
import AManual1 from '../assets/amanual (1).jpg';
import AManual2 from '../assets/amanual (2).jpg';

function Shop() {
  const [activeTab, setActiveTab] = useState("pmanuals");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);
  

  const manuals = {
    pmanuals: [
      { id: 1, title: "Earthquake Incident Management", price: 300.00, stock: 9, images: [PManual1, AManual1],  overview: "A guide for managing earthquake-related incidents.", dimensions: "8.5 x 11 inches", bookType: "Paperback", reviews: ["Very informative!", "A must-have for emergency responders."]  },
      { id: 2, title: "Fire Incident Management", price: 350.00, stock: 9, images: [PManual2, AManual2],overview: "A guide for handling fire emergencies.", dimensions: "8.5 x 11 inches", bookType: "Paperback", reviews: ["Great resource!", "Well-organized and easy to follow."] },
    ],
    fmanuals: [
      { id: 3, title: "Earthquake Incident Management", price: 300.00, stock: 9, images: [FManual1, AManual1],overview: "A comprehensive facilitator's manual for earthquake response.", dimensions: "8.5 x 11 inches", bookType: "Hardcover", reviews: ["Highly detailed!", "Excellent reference for training."]  },
      { id: 4, title: "Fire Incident Management", price: 300.00, stock: 9, images: [FManual2, AManual2], overview: "Facilitator's manual for managing fire-related incidents.", dimensions: "8.5 x 11 inches", bookType: "Hardcover", reviews: ["Perfect for workshops!", "Covers all key aspects."] },
    ],
  };

  const filteredManuals = manuals[activeTab].filter(manual => 
    manual.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (manual) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === manual.id);
      if (existingItem) {
        // Increase quantity instead of adding duplicate
        return prevCart.map(item =>
          item.id === manual.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...manual, quantity: 1 }]; // Add new item with quantity 1
      }
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )

      
    );
  };
  
  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <main>
      <section className="mt-20 mb-8 px-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-semibold">MANUALS</h1>
          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 font-medium leading-none"
            >
              <svg className="w-6 h-6 lg:me-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
              </svg>
              My Cart
              {totalCartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalCartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
        {showCart ? (<div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg border border-gray-300 p-4">
              <h2 className="text-lg font-semibold mb-2">Shopping Cart</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) :(
                <table className="w-full border-collapse">
                  <thead className="hidden md:table-header-group">
                    <tr className="border-b">
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2"></th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Total</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b block md:table-row ">
                        {/* Product & Description */}
                        <td className="p-2 justify-center">
                          <img src={item.images[0]} alt={item.title} className="w-25 h-25 object-cover rounded" />
                        </td>
                        <td>
                          <div>
                            <p className="text-gray-600 text-sm sm:text-lg">
                              {manuals === "pmanuals" ? "Participant's Manual" : "Facilitator's Manual"}
                            </p>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-gray-600 text-sm">₱ {item.price}.00</p>
                          </div>

                          {/* Quantity (Visible on small screens only) */}
                          <div className="flex items-center mt-2 md:hidden">
                            <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 bg-gray-300 rounded">-</button>
                            <span className="mx-2">{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 bg-gray-300 rounded">+</button>
                          </div>
                        </td>

                        {/* Quantity Column (Hidden on small screens) */}
                        <td className="p-2 text-center hidden md:table-cell">
                          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 bg-gray-300 rounded">-</button>
                          <span className="mx-2">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 bg-gray-300 rounded">+</button>
                        </td>

                        {/* Total Price */}
                        <td className="p-2 text-center">
                          <p>₱{item.price * item.quantity}.00</p>
                        </td>

                        {/* Remove Button */}
                        <td className="p-2 text-center">
                          <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-600 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg border border-gray-300 p-4">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <div className="flex justify-between text-lg text-black">
                <p className="font-bold">Items:</p>
                <p>{totalCartQuantity}</p>
              </div>
              <div className="flex justify-between text-lg text-black">
                <p className="font-bold">Sub Total:</p>
                <p>₱ {totalPrice}.00</p>
              </div>
              <div className="flex justify-between text-lg text-black">
                <p className="font-bold">Payment Method:</p>
                <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.50" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg> Cash on Delivery</p>
              </div>

              <hr className="border-gray-300 my-5" />
              
              <div>
                <h2  className="text-lg font-semibold mb-2">Delivery Information</h2>
                <p className="text-lg font-bold">Pick-up Address</p>
                <p>
                  670 Padre Faura St, Ermita, Manila, 1000 Metro Manila
                </p>
                <p className="font-bold">UPMNL-DDRM-H • 09208014528</p>
              </div>

              <button className="mt-4 p-2 bg-green-600 text-white rounded-lg w-full">Place Order</button>
              <button onClick={() => setShowCart(false)} className="mt-2 p-2 bg-red-900 text-white rounded-lg w-full">Close</button>
            </div>
          </div>
          ):(
            !selectedManual ? (<>
              <div className="flex items-center justify-between mb-4">
                <nav className="flex text-sm sm:text-lg">
                  <button onClick={() => setActiveTab("pmanuals")} className={`p-2 ${activeTab === "pmanuals" ? "text-white font-bold bg-red-900" : "p-2 font-bold"}`}>Participant Manual</button>
                  <button onClick={() => setActiveTab("fmanuals")} className={`p-2 ${activeTab === "fmanuals" ? "text-white font-bold bg-red-900" : "p-2 font-bold"}`}>Facilitator Manual</button>
                </nav>
                <input
                  type="text"
                  placeholder="Search manuals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 rounded-md w-64"
                />
              </div>
              <hr className="border-gray-300" />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {filteredManuals.length === 0 && <p className="text-gray-500">No Results Found</p>}
  
                {filteredManuals.map((manual) => (
                  <div key={manual.id} className="manual text-lg p-4 rounded-lg flex flex-col justify-between shadow-xl border border-gray-300 " onClick={() => setSelectedManual(manual)}>
                    <Swiper 
                      modules={[Autoplay]} 
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      className="h-48 w-full"
                    >
                      {manual.images.map((img, index) => (
                        <SwiperSlide key={index}><img src={img} alt={manual.title} className="h-48 w-full object-cover"/></SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="my-4 grow">
                      <p className="text-gray-600 text-sm sm:text-lg">
                        {activeTab === "pmanuals" ? "Participant's Manual" : "Facilitator's Manual"}
                      </p>
                      <h2 className="text-lg md:text-2xl font-semibold">{manual.title}</h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
                      <p className="text-sm text-gray-500">Stock: {manual.stock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </> ): (
              <div className="p-6 border rounded-lg shadow-lg bg-white">
                          <button onClick={() => setSelectedManual(null)} className="text-red-600 font-bold mb-4">Back to Shop</button>
                          <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-64 ">
                            {selectedManual.images.map((img, index) => (
                              <SwiperSlide key={index}><img src={img} alt={selectedManual.title} className="h-64 w-full object-cover"/></SwiperSlide>
                            ))}
                          </Swiper>
                          <h2 className="text-3xl font-bold my-4">{selectedManual.title}</h2>
                          <p><strong>Overview:</strong> {selectedManual.overview}</p>
                          <p><strong>Dimensions:</strong> {selectedManual.dimensions}</p>
                          <p><strong>Book Type:</strong> {selectedManual.bookType}</p>
                          <button onClick={() => handleAddToCart(selectedManual)} className="p-2 bg-green-600 text-white rounded-lg">Add to Cart</button>
                        </div>
            )
          )}
      </section>
    </main>
  );
}

export default Shop;
