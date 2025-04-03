import { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, getDoc, collection, onSnapshot } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import {CircleUser, Search} from "lucide-react";

const Shop = () => {
  const [manuals, setManuals] = useState([]);
  const [selectedManual, setSelectedManual] = useState(null);
  const [filteredManuals, setFilteredManuals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const addToCart = async (manual) => {
    if (!auth.currentUser) {
      showPopup("⚠️ Please log in to add items to your cart!");
      return;
    }
  
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
  
    try {
      const userSnap = await getDoc(userRef);
      let cartItems = userSnap.exists() ? userSnap.data().cart || [] : [];
  
      // Check if the item is already in the cart
      const itemIndex = cartItems.findIndex(item => item.manualId === manual.id);
  
      if (itemIndex !== -1) {
        // If the item exists, update the quantity
        cartItems[itemIndex].quantity += selectedQuantity;
      } else {
        // Add a new item
        cartItems.push({
          manualId: manual.id,
          title: manual.title,
          price: manual.price,
          imageUrl: manual.imageUrls[0],
          quantity: selectedQuantity
        });
      }
  
      await updateDoc(userRef, { cart: cartItems });
  
      showPopup("✅ Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      showPopup("❌ Failed to add item to cart!");
    }
  };
  
  const navigate = useNavigate();
  const [totalCartItems, setTotalCartItems] = useState(0);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;
  
      const userRef = doc(db, "users", user.uid);
  
      const cartUnsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const cart = docSnap.data().cart || [];
          const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
          setTotalCartItems(totalItems);
        }
      });
  
      return () => cartUnsubscribe();
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "manuals"), (querySnapshot) => {
      const fetchedManuals = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setManuals(fetchedManuals);
      filterManuals(fetchedManuals, selectedCategory, searchQuery);
    });

    return () => unsubscribe();
  }, []);

  const showPopup = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const filterManuals = (manualsList, category, search) => {
    let filtered = manualsList;

    if (category !== "All") {
      filtered = filtered.filter((manual) => manual.category === category);
    }

    if (search) {
      filtered = filtered.filter((manual) =>
        manual.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredManuals(filtered);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    filterManuals(manuals, newCategory, searchQuery);
  };

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    filterManuals(manuals, selectedCategory, newSearchQuery);
  };
  

  return (
    <div className="shop-container p-4 mt-20">
      {/* Render All Manuals */}
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold">Manuals</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/cart")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2"
          >
            Cart ({totalCartItems})
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="text-black px-2 flex items-center gap-2"
          > <CircleUser size={40} onClick={() => navigate("/profile")}/>
          </button>
        </div>
      </div>
  
      <div className="flex gap-4 my-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-500 rounded-lg focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Non-Virtual Module">Non-Virtual Manual</option>
          <option value="VR Module (Facilitator)">Virtual Manual (Facilitator)</option>
          <option value="VR Module (Participant)">Virtual Manual (Participant)</option>
        </select>
        <div className="flex items-center border border-gray-500 rounded-lg gap-2 p-2 flex-grow">
          <Search className="text-gray-500" size={20}/>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search manuals..."
            className=" flex-grow focus:outline-none"
          />
        </div>
      </div>
  
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredManuals.length > 0 ? (
          filteredManuals.map((manual) => (
            <div
              key={manual.id}
              className="cursor-pointer p-4 rounded-lg shadow-lg"
              onClick={() => navigate(`/manual-detail`, { state: { manual } })}

            >
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="h-48 w-full"
              >
                {manual.imageUrls.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:5000${img}`}
                      alt={manual.title}
                      className="h-48 w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="my-4">
                <p className="text-sm text-gray-500">{manual.category}</p>
                <h2 className="text-lg font-semibold">{manual.title}</h2>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-red-900">₱ {manual.price}.00</p>
                <p className="text-sm text-gray-500">Stock: {manual.stock}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No manuals available.</p>
        )}
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
  );
}  

export default Shop;