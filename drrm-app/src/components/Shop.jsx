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
  const [selectedImage, setSelectedImage] = useState(null);
  

  const manuals = {
    pmanuals: [
      { id: 1, title: "Earthquake Incident Management", price: 300.00, stock: 9, quantity: 1, images: [PManual1, AManual1], reviews: ["Very informative!", "A must-have for emergency responders."]  },
      { id: 2, title: "Fire Incident Management", price: 350.00, stock: 9, quantity: 1, images: [PManual2, AManual2], reviews: ["Great resource!", "Well-organized and easy to follow."] },
    ],
    fmanuals: [
      { id: 3, title: "Earthquake Incident Management", price: 300.00, stock: 9, quantity: 1, images: [FManual1, AManual1], reviews: ["Highly detailed!", "Excellent reference for training."]  },
      { id: 4, title: "Fire Incident Management", price: 300.00, stock: 9, quantity: 1, images: [FManual2, AManual2], reviews: ["Perfect for workshops!", "Covers all key aspects."] },
    ],
  };

  const filteredManuals = manuals[activeTab].filter(manual => 
    manual.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (manual) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === manual.id);
      if (existingItem) {
        // Increase quantity based on selectedManual's quantity
        return prevCart.map(item =>
          item.id === manual.id
            ? { ...item, quantity: item.quantity + selectedManual.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...manual, quantity: selectedManual.quantity }]; // Use selected quantity
      }
    });
  };
  

  const handleQuantityChange = (id, newQuantity) => {
    // Update selectedManual if it's the one being changed
    if (selectedManual && selectedManual.id === id) {
      setSelectedManual(prev => ({
        ...prev,
        quantity: Math.max(1, newQuantity) // Prevent going below 1
      }));
    }
  
    // Update cart items
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
          <h1 className="text-4xl font-semibold ">MANUALS</h1>
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
              <button onClick={() => setShowCart(false)} className="mt-2 p-2 bg-red-900 text-white rounded-lg w-full">Continue to Shop</button>
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
              <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-300">
              <button onClick={() => setSelectedManual(null)} className="flex items-center text-black mb-4">{manuals.pmanuals.some(item => item.id === selectedManual.id) ? "Participant's Manual" : "Facilitator's Manual"}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right mx-2"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg> {selectedManual.title} </button>
              
              <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex justify-center">
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-64 w-full">
                {selectedManual.images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img 
                            src={img} 
                            alt={selectedManual.title} 
                            className="h-64 object-cover mx-auto cursor-pointer"
                            onClick={() => setSelectedImage(img)} // Open modal on click
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
                    onClick={() => setSelectedImage(null)} // Close on background click
                >
                    <div className="relative">
                        <button 
                            className="absolute top-2 right-2 bg-black/80 text-white font-bold rounded-full p-2"
                            onClick={() => setSelectedImage(null)} // Close button
                        >
                            ✕
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Enlarged Image" 
                            className="max-w-[90vw] max-h-[90vh] rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
            
                {/* Description Section */}
                <div className="md:w-2/3">
                  <p> {manuals.pmanuals.some(item => item.id === selectedManual.id) ? "Participant's Manual" : "Facilitator's Manual"}</p>
                  <h2 className="text-3xl font-bold mb-10">{selectedManual.title}</h2>
                  <p className="text-2xl font-bold text-red-900">₱ {selectedManual.price}.00</p>
                  <p><strong>Dimensions:</strong> 8.5 x 11 inches</p>
                  <p><strong>Book Type:</strong> Paperback</p>
                  <div className="flex justify-between items-center">
                    {/* Quantity Label on the Left */}
                    <p><strong>Quantity:</strong></p>

                    {/* Quantity Controls on the Right */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleQuantityChange(selectedManual.id, (selectedManual.quantity || 1) - 1)} 
                        className="px-3 py-1 bg-gray-300 rounded w-8"
                      >
                        -
                      </button>
                      <span className="mx-4">{selectedManual.quantity || 1}</span>
                      <button 
                        onClick={() => handleQuantityChange(selectedManual.id, (selectedManual.quantity || 1) + 1)} 
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>

                  </div>

                  <div className="flex gap-4 mt-4">
                    <button onClick={() => handleAddToCart(selectedManual)} className="bg-yellow-600 text-white text-sm p-2 rounded w-full">Add To Cart</button>
                    <button className="bg-red-900 text-white text-sm p-2 rounded w-full">Buy Now</button>
                  </div>
                </div>
              </div>
              <div className="my-8 text-justify">
                <h2 className="text-xl font-bold">Manual Overview</h2>
                <hr className="border-gray-300 my-5" />
                <p className="text-justify"> The University of the Philippines Manila is one of the leading institutions conducting research on Disaster Risk Reduction and Management related to health (DRRM-H) through the Health Emergencies and Disasters (HEAD) study group of the National Institutes of Health (NIH). With the Center for Innovations for Disaster Risk Reduction and Management in Health in the country in the National Capital Region, UPM is given an opportunity to conduct disaster simulation trainings (1) to develop the necessary skills for command and control, communication, and coordination; (2) to enable camp managers to identify and refer evacuees in need of psychosocial intervention; and (3) to identify available resources in communities affected by disasters. The program aims to improve the efficiency and cost effectiveness of DRRM-H in the Philippines, aligning with the Sendai Framework and the Bangkok Principles for the Implementation of the Health Aspects of the Sendai Framework.
                The program, Center for Innovations for Disaster Risk Reduction Management in Health (DRRM-H) in NCR, is composed of three project components: (1) Creation and Pilot Testing of Disaster Resource Mapping and Damage Assessment Software; (2) Mental Health Triaging for Evacuation Center and Camp Management; and (3) Simulation Based Learning Laboratory. The Simulation Based Learning Laboratory led by Dr. Carlos D. Gundran seeks to strengthen the application aspect of trainings, leading to improved disaster response and decreased morbidity and mortality during disasters, through the use of disaster simulation tools. </p>

                {/* Reviews Section */}
                <h2 className="text-xl font-bold mt-6">Customer Reviews</h2>
                <hr className="border-gray-300 my-5" />
                {selectedManual.reviews.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedManual.reviews.map((review, index) => (
                      <li key={index}>
                        <div className="flex gap-2 items-center text-xl mb-4">
                          <p><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg></p>
                          <p ><strong>Username</strong><br /> ⭐⭐⭐⭐</p>
                        </div>
                        {review}
                        <p className="flex gap-1 mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#696969" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>March 2, 2025</p>
                        <hr className="border-gray-300 my-5" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </div>

            </div>
            )
          )}
      </section>
    </main>
  );
}

export default Shop;
