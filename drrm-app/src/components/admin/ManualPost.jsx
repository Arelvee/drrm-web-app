import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";


function ManualPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Non Virtual Module");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [manuals, setManuals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageUrls(res.data.imageUrls);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
  
    try {
      if (!title || !content || !price || !stock || imageUrls.length === 0) {
        throw new Error("Please fill all fields and upload at least one image.");
      }
  
      console.log("Posting data:", { title, content, price, stock, category, imageUrls });
  
      const docRef = await addDoc(collection(db, "manuals"), {
        title,
        content,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category,
        imageUrls,
        createdAt: serverTimestamp(),
      });
  
      console.log("Document written with ID: ", docRef.id);
      
      setManuals((prev) => [...prev, { id: docRef.id, title, content, price, stock, category, imageUrls }]);
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
      });

      // Update UI
      setManuals(manuals.map(m => (m.id === selectedManual.id ? { ...m, title, content, price, stock, category } : m)));

      setSelectedManual({ ...selectedManual, title, content, price, stock, category });
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
    <div className="p-6 flex">
      {/* Left: Table Displaying Manuals */}
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Manuals List</h2>
        {/* Success Message */}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <button
          onClick={() => {
            setShowForm(true);
            setSelectedManual(null); // Hide Manual Details
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          New Post
        </button>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Sold</th>
              <th className="border p-2">Total Sold</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {manuals.map((manual) => (
              <tr key={manual.id} className="text-center">
                <td className="border p-2">{manual.title}</td>
                <td className="border p-2">${Number(manual.price).toFixed(2)}</td>
                <td className="border p-2">{manual.stock}</td>
                <td className="border p-2">{manual.sold || 0}</td>
                <td className="border p-2">${(manual.sold || 0) * manual.price}</td>
                <td className="border p-2">
                  <button
                    onClick={() => { setSelectedManual(manual); setIsEditing(false); setShowForm(false); }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="w-1/3 ml-6 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-4">Post a New Manual</h2>

          <form onSubmit={handlePost} className="space-y-4">
            <input type="text" placeholder="Manual Title" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full p-2 border rounded" required />
            <textarea placeholder="Manual Content" value={content} onChange={(e) => setContent(e.target.value)} className="block w-full p-2 border rounded" required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full p-2 border rounded" required />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="block w-full p-2 border rounded" required />

            {/* Category Dropdown */}
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="block w-full p-2 border rounded" required>
              <option value="Non Virtual Module">Non Virtual Module</option>
              <option value="VR Module (Facilitator)">VR Module (Facilitator)</option>
              <option value="VR Module (Participant)">VR Module (Participant)</option>
            </select>

            <input type="file" multiple onChange={handleImageUpload} className="block w-full p-2 border rounded" />

            {/* Preview multiple images */}
            <div className="flex space-x-2 mt-2">
              {imageUrls.map((url, index) => (
                <img key={index} src={`http://localhost:5000${url}`} alt={`Uploaded ${index}`} className="w-24 h-24" />
              ))}
            </div>

            <button type="submit" className="bg-green-600 text-white p-2 rounded w-full" disabled={loading}>
              {loading ? "Posting..." : "Post Manual"}
            </button>

            {/* Close Form Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-red-600 text-white p-2 rounded w-full mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Right: Details or Form for New Manual */}
      {selectedManual && (
        <div className="w-1/3 ml-6 p-4 border border-gray-300 rounded">
          {isEditing ? (
            <>
              <h2 className="text-xl font-bold mb-4">Edit Manual</h2>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded mb-2"></textarea>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <button onClick={handleUpdate} className="bg-green-600 text-white p-2 rounded w-full mb-2">Save Changes</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded w-full">Cancel</button>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manual Details</h2>
                <button
                  onClick={() => setSelectedManual(null)}
                  className="text-red-500 text-xl font-bold"
                >
                  ✖
                </button>
              </div>
              <p><strong>Title:</strong> {selectedManual.title}</p>
              <p><strong>Price:</strong>{selectedManual.price}</p>
              <p><strong>Stock:</strong>{selectedManual.stock}</p>
              <p><strong>Book Overview:</strong> <br /> <span className="px-5">{selectedManual.content}</span> </p>
              <p><strong>Book Specification</strong></p>
              <ul className="px-5">
                <li>Dimension:</li>
                <li>Papertype:</li>
              </ul>
              <div className="flex space-x-2 mt-2">
                {imageUrls.map((url, index) => (
                  <img key={index} src={`http://localhost:5000${url}`} alt={`Uploaded ${index}`} className="w-24 h-24" />
                ))}
              </div>
              <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded w-full mt-2">
                Edit
              </button>
              <button onClick={() => setShowDeleteConfirmation(true)} className="bg-red-600 text-white p-2 rounded w-full mt-2">
                Delete
              </button>
            </>
          )}
        </div>
      )}

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
                className="bg-gray-400 text-white px-4 py-2 rounded"
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
