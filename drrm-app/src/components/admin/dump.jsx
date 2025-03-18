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
import { useNavigate } from "react-router-dom";

function Shop() {
  const [activeTab, setActiveTab] = useState("pmanuals");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedManual, setSelectedManual] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState(null);
  const manuals = {
    pmanuals: [
      { id: 1, title: "Earthquake Incident Management", price: 300, stock: 9, images: [PManual1, AManual1] },
      { id: 2, title: "Fire Incident Management", price: 350, stock: 9, images: [PManual2, AManual2] },
    ],
    fmanuals: [
      { id: 3, title: "Earthquake Incident Management", price: 300, stock: 9, images: [FManual1, AManual1] },
      { id: 4, title: "Fire Incident Management", price: 300, stock: 9, images: [FManual2, AManual2] },
    ],
  };

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (manual) => {
    if (!manual) return;
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.id === manual.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === manual.id
            ? { ...item, quantity: Math.min(item.quantity + (manual.quantity || 1), manual.stock) }
            : item
        );
      } else {
        return [...prevCart, { ...manual, quantity: manual.quantity || 1 }];
      }
    });
  };  

  const handleQuantityChange = (manualId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    setSelectedManual(prev => {
      if (!prev || prev.id !== manualId) return prev; // Ensure only the selected manual updates
      return { ...prev, quantity: newQuantity };
    });
  };

   // Show pop-up message for 2 seconds
   const showPopup = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2000);
  };

  const navigate = useNavigate();
  
  return (
    <main>
      <section className="mt-20 mb-8 px-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-4xl font-semibold">MANUALS</h1>
          <div className="relative">
          <button
            onClick={() => navigate("/cart", { state: { cartItems } })}
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
        
        {selectedManual ? (
          <div className="p-4">
            <button onClick={() => setSelectedManual(null)} className="text-black mb-4">Back to Manuals</button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex justify-center">
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-64 w-full">
                  {selectedManual.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={selectedManual.title}
                        className="h-64 object-cover mx-auto cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">{selectedManual.title}</h2>
                <p className="text-2xl font-bold text-red-900">₱ {selectedManual.price}.00</p>
                <p><strong>Stock:</strong> {selectedManual.stock}</p>
                <div className="mt-4 flex items-center justify-between w-full">
                  {/* Quantity Label */}
                  <p className="font-medium">Quantity:</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 w-max">
                    <button
                      onClick={() => handleQuantityChange(selectedManual.id, (selectedManual.quantity || 1) - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-xl font-bold"
                    >
                      −
                    </button>
                    
                    <span className="text-lg font-semibold min-w-[32px] text-center">
                      {selectedManual.quantity || 1}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(selectedManual.id, (selectedManual.quantity || 1) + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-xl font-bold"
                    >
                      +
                    </button>
                  </div>

                </div>
                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedManual);
                        showPopup("✅ Item added to cart!");
                      }}
                      className="bg-yellow-600 text-white text-sm p-2 rounded w-full"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => showPopup("Proceeding to checkout...")}
                      className="bg-red-900 text-white text-sm p-2 rounded w-full"
                    >
                      Buy Now
                    </button>
                  </div>
                  {/* Pop-up Message */}
                  {message && (
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                      <div className="bg-black/60 text-white text-2xl font-bold px-6 py-4 rounded-lg shadow-lg">
                        {message}
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="my-8 text-justify">
                <div className="border border-gray-300 p-4 rounded-lg">
                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowShippingInfo(!showShippingInfo)}
                    className="text-xl font-bold flex items-center gap-2 w-full text-left"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-info"
                      >
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                    </span>
                    Shipping Fee Information
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-chevron-${showShippingInfo ? 'up' : 'down'} ml-auto`}
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>


                  {/* Show Details When Toggled */}
                  {showShippingInfo && (
                    <div className="mt-4 text-gray-700">
                    <p>
                      <strong>Note:</strong> The shipping fee will <span className="text-red-600 font-bold">not</span> be shouldered by the company. The delivery cost depends on the recipient’s location and chosen courier.
                    </p>
         
                    <h3 className="mt-4 font-semibold">Shipping Couriers:</h3>
                    <ul className="list-disc list-inside mt-2">
                      <li><strong>Metro Manila:</strong> Lalamove</li>
                      <li><strong>Outside Metro Manila:</strong> DHL & LBC</li>
                    </ul>
         
                    <p className="mt-4">
                      Once your order is placed, we will coordinate the best available shipping option and provide you with the estimated delivery cost.
                    </p>
                  </div>
                  )}
                </div>
              </div>
            <div>
                <h2 className="text-xl font-bold mt-8">YOU MAY ALSO LIKE</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                  {manuals.pmanuals.concat(manuals.fmanuals) // Combine both participant & facilitator manuals
                    .filter(manual => manual.id !== selectedManual?.id) // Exclude the selected manual
                    .map((manual) => (
                      <div
                        key={manual.id}
                        className="manual text-lg p-4 rounded-lg flex flex-col justify-between shadow-xl border border-gray-300 cursor-pointer"
                        onClick={() => setSelectedManual(manual)}
                      >
                        <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-48 w-full">
                          {manual.images.map((img, index) => (
                            <SwiperSlide key={index}>
                              <img src={img} alt={manual.title} className="h-48 w-full object-cover"/>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <div className="my-4 grow">
                          <p className="text-gray-600 text-sm sm:text-lg">
                            {manuals.pmanuals.some(item => item.id === manual.id) ? "Participant's Manual" : "Facilitator's Manual"}
                          </p>
                          <h2 className="text-lg md:text-2xl font-semibold">{manual.title}</h2>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
                          <p className="text-sm text-gray-500">Stock: {manual.stock}</p>
                        </div>
                      </div>
                   ))
                  }
                </div>
              </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {manuals[activeTab].map((manual) => (
              <div key={manual.id} className="manual p-4 rounded-lg shadow-xl border border-gray-300 cursor-pointer" onClick={() => setSelectedManual(manual)}>
                <Swiper modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="h-48 w-full">
                  {manual.images.map((img, index) => (
                    <SwiperSlide key={index}><img src={img} alt={manual.title} className="h-48 w-full object-cover" /></SwiperSlide>
                  ))}
                </Swiper>
                <h2 className="text-lg font-semibold mt-4">{manual.title}</h2>
                <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Shop;
