import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { NotebookText, Plus, XIcon } from "lucide-react";

function ManualPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Non Virtual Module");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [manuals, setManuals] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [manualStats, setManualStats] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Fetch manuals from Firestore
  useEffect(() => {
    const fetchManuals = async () => {
      const querySnapshot = await getDocs(collection(db, "manuals"));
      const manualsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setManuals(manualsData);
    };

    fetchManuals();
  }, []);
  const openModal = (imageUrl) => {
    setZoomedImage(imageUrl);
  };
  
  const closeModal = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    fetchOrders(); // Run on component mount
    const interval = setInterval(fetchOrders, 5000); // Fetch every 5 seconds (adjust as needed)
    return () => clearInterval(interval);
  }, []);
  
  
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      const stats = {};
  
      ordersData.forEach((order) => {
        if (order.status === "processed") {
          order.cartItems.forEach((item) => {
            if (!stats[item.manualId]) {
              stats[item.manualId] = { sold: 0, totalAmount: 0 };
            }
            stats[item.manualId].sold += item.quantity;
            stats[item.manualId].totalAmount += item.quantity * item.price;
          });
        }
      });
  
      const manualsQuery = await getDocs(collection(db, "manuals"));
      const updatedManuals = [];
  
      const updates = manualsQuery.docs.map(async (docSnapshot) => {
        const manualId = docSnapshot.id;
        const manualData = docSnapshot.data();
        const updatedData = {
          sold: stats[manualId]?.sold || 0,
          totalRevenue: stats[manualId]?.totalAmount || 0,
        };
  
        if (stats[manualId]) {
          const manualRef = doc(db, "manuals", manualId);
          await updateDoc(manualRef, updatedData);
        }
  
        updatedManuals.push({ id: manualId, ...manualData, ...updatedData });
      });
  
      await Promise.all(updates);
      setManuals(updatedManuals);
  
      console.log("Manuals updated with sales data:", updatedManuals);
      setManualStats(stats);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  
  
  
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
  
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
  
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        // Append new image URLs instead of replacing
        setImageUrls((prev) => [...prev, ...data.imageUrls]);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  

  const ImagePreview = ({ imageUrls }) => {
    const [selectedImage, setSelectedImage] = useState(null);
  }

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
  
    try {
      if (!title || !content || !price || !stock || imageUrls.length === 0) {
        throw new Error("Please fill all fields and upload at least one image.");
      }
  
      const docRef = await addDoc(collection(db, "manuals"), {
        title,
        content,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        imageUrls,
        sold: 0,  // Ensure new manuals start with 0 sold
        totalRevenue: 0,
        createdAt: serverTimestamp(),
      });
  
      setManuals((prev) => [
        ...prev,
        {
          id: docRef.id,
          title,
          content,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
          category,
          imageUrls,
          sold: 0,
          totalRevenue: 0,
        },
      ]);
  
      setSuccess("Manual posted successfully!");
      setShowForm(false);
      setTitle("");
      setContent("");
      setPrice("");
      setStock("");
      setCategory("Non Virtual Module");
      setImages([]);
      setImageUrls([]);
    } catch (error) {
      console.error("Error posting manual:", error);
      alert(`Failed to post manual: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleEdit = () => {
    if (!selectedManual) return;
  
    setTitle(selectedManual.title);
    setContent(selectedManual.content);
    setPrice(selectedManual.price);
    setStock(selectedManual.stock);
    setCategory(selectedManual.category);
    setImageUrls(selectedManual.imageUrls || []);
    setIsEditing(true);
  };
  

  const handleUpdate = async () => {
    if (!selectedManual) return;
  
    try {
      const manualRef = doc(db, "manuals", selectedManual.id);
      await updateDoc(manualRef, {
        title,
        content,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        imageUrls, // Include updated images
      });
  
      // Update UI
      setManuals((manuals.map(m => 
        m.id === selectedManual.id 
          ? { ...m, title, content, price, stock, category, imageUrls } 
          : m
      )));
  
      setSelectedManual({ ...selectedManual, title, content, price, stock, category, imageUrls });
      setIsEditing(false);
      setSuccess("Manual updated successfully!");
    } catch (error) {
      console.error("Error updating manual:", error);
      setSuccess("Failed to update manual.");
    }
  };  

  const handleDelete = async () => {
    if (!selectedManual) return;
    setSuccess(null);

    try {
      await deleteDoc(doc(db, "manuals", selectedManual.id));

      // Remove from UI
      setManuals(manuals.filter(m => m.id !== selectedManual.id));
      setSelectedManual(null);
      setIsEditing(false);
      setSuccess("Manual deleted successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);

      // Close delete confirmation
      setShowDeleteConfirmation(false);

    } catch (error) {
      console.error("Error deleting manual:", error);
      setSuccess("Failed to delete manual.");
    }
  };

  return (
    <div className="ml-68 py-6 flex px-auto">
      {selectedManual ? (
  // Show Manual Details When Selected
  <div className="w-full">
    {isEditing ? (
      <>
        <h2 className="text-xl font-bold mb-4">Edit Manual</h2>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8">Manual Title:</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mb-2 text-justify" />

        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8">Content:</p>
          <textarea 
            value={content} 
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-full p-2 border rounded mb-2 h-full"
          />

        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8">Price:</p>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full p-2 pl-8 border border-gray-400 rounded" />
          </div>
        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8">Stock:</p>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-2 border rounded mb-2" />
        </div>
        

        
        <div className="flex items-center w-full gap-2 pt-2 mb-4">
          <label className="w-1/8 "> Category: 
          </label>
          <div className=" flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="Non Virtual Module" 
                checked={category === "Non Virtual Module"} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mr-2 accent-red-900"
                required 
              />
              <span>Non Virtual Module</span>
            </label>

            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="VR Module (Facilitator)" 
                checked={category === "VR Module (Facilitator)"} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mr-2 accent-red-900"
                required 
              />
              <span>VR Module (Facilitator)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="VR Module (Participant)" 
                checked={category === "VR Module (Participant)"} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mr-2 accent-red-900"
                required 
              />
              <span>VR Module (Participant)</span>
            </label>
          </div>
        </div>
        <div className="flex gap-2 w-full mb-4">
          <label className="w-1/8">Upload Image:</label>
          <div>
            {/* Preview multiple images */}
            <div className="flex space-x-2 mt-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={`http://localhost:5000${url}`}
                    alt={`Uploaded ${index}`}
                    className="w-24 h-24 cursor-pointer hover:scale-105 transition-transform rounded"
                    value={imageUrls} onChange={(e) => setImageUrls(e.target.value)}
                    onClick={() => setSelectedImage(`http://localhost:5000${url}`)}
                  />
                  {/* X Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the image click event
                      setImageUrls(imageUrls.filter((_, i) => i !== index));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✖
                  </button>
                </div>
              ))}

              {/* Add Photo Button */}
              <label
                htmlFor="fileInput"
                className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-100"
              >
                <span className="text-gray-400 text-sm">+</span>
                <span className="text-gray-400 text-xs">Add Photo</span>
              </label>
              <input
                id="fileInput"
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {/* Zoomed Image Modal */}
            {selectedImage && (
              <div
                className="fixed inset-0 !bg-black/50 flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
              >
                <img src={selectedImage} alt="Zoomed" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" />
              </div>
            )}
          </div>
        </div>
        
        <button onClick={handleUpdate} className="bg-green-600 text-white p-2 rounded w-full mb-2">Save Changes</button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600">Cancel</button>
      </>
    ) : (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manual Details</h2>
          <button
            onClick={() => setSelectedManual(null)}
            className="text-gray-600 text-xl font-bold"
          >
            <XIcon size={30}/>
          </button>
        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8"><strong>Manual Title:</strong></p>
          <p>{selectedManual.title}</p>
        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8"><strong>Category:</strong></p>
          <p>{selectedManual.category}</p>
        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8"><strong>Price:</strong></p>
          <p>₱{selectedManual.price}</p>
        </div>
        <div className="flex items-center w-full gap-2 pt-2">
          <p className="py-1 w-1/8"><strong>Stock:</strong></p>
          <p>{selectedManual.stock}</p>
        </div>
        <div className="flex w-full gap-2 pt-2">
          <p className="py-1 w-1/6 pr-15"><strong>Content:</strong></p>
          <p className="whitespace-pre-line break-words text-justify">{selectedManual.content}</p>
        </div>
        <div className="flex w-full gap-2 pt-2">
          <p className="py-1 w-1/9"><strong>Specification:</strong></p>
          <ul className="px-5">
            <li>Dimension: 8.27in X 11.69in (A4)</li>
            <li>Booktype: Ringbind</li>
          </ul>
        </div>
        <div className="flex w-full gap-2 pt-2 mb-4">
          <p className="font-bold w-1/8">Images</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedManual.imageUrls?.map((url, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000${url}`}
                  alt={`Uploaded ${index}`}
                  onClick={() => openModal(`http://localhost:5000${url}`)}
                  className="w-24 h-24 object-cover rounded cursor-pointer transition-transform duration-200 hover:scale-105"
                />
              ))}
            </div>
          </div>

            {/* Zoom Modal */}
            {zoomedImage && (
              <div
                className="fixed inset-0 !bg-black/70 flex justify-center items-center z-50"
                onClick={closeModal}
              >
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 bg-black/50 text-white p-2"
                    onClick={closeModal}
                  >
                    ✖
                  </button>
                  <img
                    src={zoomedImage}
                    alt="Zoomed Preview"
                    className="max-w-full max-h-[90vh] rounded-lg"
                  />
                </div>
              </div>
            )}

        <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded w-full mt-2 hover:bg-yellow-600">Edit</button>
      <button onClick={() => setShowDeleteConfirmation(true)} className="bg-red-600 text-white p-2 rounded w-full  hover:bg-red-900 mt-2">Delete</button>
      </>
    )}
  </div>
) : showForm ? (
  <div className="w-full ">
    <h2 className="text-xl font-bold mb-4">Post a New Manual</h2>
    <form onSubmit={handlePost} className="space-y-4">
        <div className="flex items-center gap-2 w-full">
          <label className="w-1/8 ">Manual Title: </label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} className="block w-full p-2 border border-gray-400 rounded" required />
        </div>
        <div className="gap-2 w-full flex">
          <label className="w-1/8 ">Content:</label>
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = "auto"; // Reset height
              e.target.style.height = e.target.scrollHeight + "px"; // Set new height
            }}
            className="block w-full p-2 border border-gray-400 rounded overflow-hidden resize-none"
            required
          />
        </div>
        <div className="flex items-center gap-2 w-full relative">
          <label className="w-1/8">Price:</label>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
            <input 
              type="number" 
              onChange={(e) => setPrice(e.target.value)} 
              className="block w-full p-2 pl-8 border border-gray-400 rounded" 
              required 
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <label className="w-1/8 ">Stock:
          </label>
          <input type="number" onChange={(e) => setStock(e.target.value)} className="block w-full p-2 border border-gray-400 rounded" required />
        </div>
        <div className="flex items-center gap-2 w-full">
          <label className="w-1/8 "> Category: 
          </label>
          <div className=" flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="Non Virtual Module" 
                checked={category === "Non Virtual Module"} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mr-2 accent-red-900"
                required 
              />
              <span>Non Virtual Module</span>
            </label>

            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="VR Module (Facilitator)" 
                checked={category === "VR Module (Facilitator)"} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mr-2 accent-red-900"
                required 
              />
              <span>VR Module (Facilitator)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="VR Module (Participant)" 
                checked={category === "VR Module (Participant)"} 
                onChange={(e) => setCategory(e.target.value)} 
                className="mr-2 accent-red-900"
                required 
              />
              <span>VR Module (Participant)</span>
            </label>
          </div>
        </div>

        <div className="flex gap-2 w-full mb-4">
          <label className="w-1/8">Upload Image:</label>
          <div>
        
          <div className="flex space-x-2 mt-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={`http://localhost:5000${url}`}
                  alt={`Uploaded ${index}`}
                  className="w-24 h-24 cursor-pointer hover:scale-105 transition-transform rounded"
                  onClick={() => setSelectedImage(`http://localhost:5000${url}`)}
                />
            
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setImageUrls(imageUrls.filter((_, i) => i !== index));
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✖
                </button>
              </div>
            ))}

          
            <label
              htmlFor="fileInput"
              className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:bg-gray-100"
            >
              <span className="text-gray-400 text-sm">+</span>
              <span className="text-gray-400 text-xs">Add Photo</span>
            </label>
            <input
              id="fileInput"
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        
          {selectedImage && (
            <div
              className="fixed inset-0 !bg-black/50 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <img src={selectedImage} alt="Zoomed" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </div>

      <button type="submit" className="bg-yellow-500 text-white p-2 rounded w-full hover:bg-yellow-600" disabled={loading}>
        {loading ? "Posting..." : "Post Manual"}
      </button>
      <button
        type="button"
        onClick={() => setShowForm(false)}
        className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  </div>
):(
<div className="w-full">
  <div className="flex justify-between">
    <h2 className="text-2xl font-bold mb-4">Manuals List</h2>
    <button
      onClick={() => {
        setShowForm(true);
        setSelectedManual(null); // Hide Manual Details
      }}
      className="bg-yellow-500 text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2 hover:bg-yellow-600"
    > 
      <Plus size={20}/>New Post
    </button>
  </div>

  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-200 text-center">
        <th className="px-4 py-2">Title</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Stock</th>
        <th className="px-4 py-2">Sold</th>
        <th className="px-4 py-2">Total Revenue</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {manuals.map((manual) => (
        <tr
          key={manual.id}
          className="cursor-pointer text-center border-b border-gray-300 text-sm hover:bg-gray-200"
        >
          <td className="px-4 py-2 flex items-center gap-2">
            {manual.imageUrls?.length > 0 && (
              <img
                src={`http://localhost:5000${manual.imageUrls[0]}`}
                alt={manual.title}
                className="w-15 h-20 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
            {manual.title}
          </td>

          <td className="px-4 py-2">₱{Number(manual.price).toFixed(2)}</td>
          <td className="px-4 py-2">{manual.stock}</td>
          <td className="px-4 py-2">{manual.sold || 0}</td>
          <td className="px-4 py-2 font-bold">₱{manual.totalRevenue}.00</td>
          <td className="px-4 py-2">
            <button
              onClick={() => {
                setSelectedManual(manual);
                setIsEditing(false);
                setShowForm(false);
              }}
              className="text-gray-500 px-3 py-1"
            >
              <NotebookText size={30}/>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
)
}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full !bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this manual?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManualPost;