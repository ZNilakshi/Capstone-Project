import { useState, useEffect } from "react";
import {
 FaUserCircle, FaBoxOpen, FaWarehouse, FaTrash,
 FaEdit, FaShoppingBag,  FaSignOutAlt,
  FaImage
} from "react-icons/fa";
import axios from "axios";




const AdminProductPanel = () => {
 const [products, setProducts] = useState([]);
 const [orders, setOrders] = useState([]);
 const [name, setName] = useState("");
 const [price, setPrice] = useState("");
 const [brand, setBrand] = useState("BRAND");
 const [size, setSize] = useState("SIZE");
 const [abv, setAbv] = useState("ABV");
 const [category, setCategory] = useState("CATEGORY");
 const [quantity, setQuantity] = useState("");
 const [photo, setPhoto] = useState(null);
 const [editingIndex, setEditingIndex] = useState(null);
 const [view, setView] = useState("profile");
 const [adminDetails, setAdminDetails] = useState(null);
 const [isUploading, setIsUploading] = useState(false);
 const [selectedProductId, setSelectedProductId] = useState("");
 const [stockToAdd, setStockToAdd] = useState("");
 const [isUpdatingStock, setIsUpdatingStock] = useState(false);
 const [loadingOrders, setLoadingOrders] = useState(false);
 const [orderFilter, setOrderFilter] = useState('all');


 const updateOrderStatus = async (orderId, newStatus) => {
   try {
     await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/orders/${orderId}/status`, {
       status: newStatus
     });
    
     // Update local state
     setOrders(orders.map(order =>
       order._id === orderId ? { ...order, status: newStatus } : order
     ));
   } catch (error) {
     console.error("Error updating order status:", error);
     alert("Failed to update order status");
   }
 };
 useEffect(() => {
   const fetchProducts = async () => {
     try {
       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
       setProducts(response.data);
     } catch (err) {
       console.error("Failed to fetch products", err);
     }
   };
    fetchProducts();
 }, []);
  useEffect(() => {
   const fetchOrders = async () => {
     if (view === "orders") {
       try {
         setLoadingOrders(true);
         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders`);
         setOrders(response.data);
       } catch (err) {
         console.error("Failed to fetch orders", err);
       } finally {
         setLoadingOrders(false);
       }
     }
   };


   fetchOrders();
 }, [view]);


 useEffect(() => {
   const userData = JSON.parse(localStorage.getItem("user"));
   if (userData) {
     setAdminDetails(userData);
   }
 }, []);


 const brands = ["BRAND", "ROCKLAND", "IDL", "DCSL", "MENDIS", "LION", "HEINEKEN","TIGER","DCSL BEER","BISON","ANCHOR"];
 const sizes = ["SIZE", "750ML", "1L", "625ML","500ML","325ML", "375ML","330ML","180ML"];
 const abvLevels = ["ABV", "5%", "6%", "7%", "10%"];
 const categories = ["CATEGORY", "Shake & Beer", "Wine", "Sprite","Arrack","Gin","Whisky","Rum","Vodka","Brandy","Nine Arches"];


 const handlePhotoUpload = async (e) => {
   const file = e.target.files[0];
   if (!file) return;


   try {
     setIsUploading(true);
     const formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", "ml_default");


     const res = await axios.post(
       "https://api.cloudinary.com/v1_1/djuwrvdxe/image/upload",
       formData
     );


     setPhoto(res.data.secure_url);
   } catch (err) {
     console.error("Upload error:", err.response?.data || err.message);
     alert("Failed to upload image");
   } finally {
     setIsUploading(false);
   }
 };
 const addStock = async () => {
   if (!selectedProductId || !stockToAdd || isNaN(stockToAdd)) {
     alert("Please select a product and enter a valid quantity");
     return;
   }


   try {
     setIsUpdatingStock(true);


const response = await axios.put(
 `${process.env.REACT_APP_API_BASE_URL}/api/products/${selectedProductId}/stock`,
 { quantity: parseInt(stockToAdd) }
);




     // Update local products state
     setProducts(products.map(product =>
       product._id === selectedProductId
         ? { ...product, quantity: response.data.quantity }
         : product
     ));


     alert("Stock updated successfully!");
     setStockToAdd("");
     setSelectedProductId("");
   } catch (error) {
     console.error("Error updating stock:", error);
     alert(error.response?.data?.message || "Failed to update stock");
   } finally {
     setIsUpdatingStock(false);
   }
 };


 const removePhoto = () => {
   setPhoto(null);
   // Clear the file input value
   const fileInput = document.querySelector('input[type="file"]');
   if (fileInput) fileInput.value = '';
 };


 const addProduct = async () => {
   if (!name || !price || !quantity) {
     alert("Please fill in all required fields");
     return;
   }


   if (!photo) {
     alert(editingIndex !== null
       ? "Please select a new photo or keep the existing one"
       : "Please upload a product image");
     return;
   }


   const productData = {
     name,
     price: Number(price),
     brand: brand === "BRAND" ? "" : brand,
     size: size === "SIZE" ? "" : size,
     abv: abv === "ABV" ? "" : abv,
     category: category === "CATEGORY" ? "" : category,
     quantity: Number(quantity),
     photo
   };


   try {
     let response;
  
     if (editingIndex !== null) {
       // Update existing product
       response = await axios.put(
         `${process.env.REACT_APP_API_BASE_URL}/api/products/${products[editingIndex]._id}`,
         productData
       );
  
       const updatedProducts = [...products];
       updatedProducts[editingIndex] = response.data;
       setProducts(updatedProducts);
       alert("Product updated successfully!");
     } else {
       // Add new product
       response = await axios.post(
         `${process.env.REACT_APP_API_BASE_URL}/api/products/add`,
         productData
       );
       setProducts([...products, response.data.product]);
       alert("Product saved successfully!");
     }
  
     resetForm();
     setEditingIndex(null);
   }
    catch (error) {
     console.error("Error:", error);
     alert(error.response?.data?.message || "An error occurred");
   }
 };


 const resetForm = () => {
   if (editingIndex === null) {
     // Only reset photo when not in edit mode
     setPhoto(null);
   }
   setName("");
   setPrice("");
   setQuantity("");
   setBrand("BRAND");
   setSize("SIZE");
   setAbv("ABV");
   setCategory("CATEGORY");
   setEditingIndex(null);
 };


 const removeProduct = async (index) => {
   if (!window.confirm("Are you sure you want to delete this product?")) return;


   try {
     await axios.delete(
       `${process.env.REACT_APP_API_BASE_URL}/api/products/${products[index]._id}`
     );
  
     setProducts(products.filter((_, i) => i !== index));
     alert("Product deleted successfully");
   } catch (err) {
     console.error("Delete error:", err);
     alert("Failed to delete product");
   }
  
 };


 const editProduct = (index) => {
   const product = products[index];
   setName(product.name);
   setPrice(product.price);
   setQuantity(product.quantity);
   setBrand(product.brand || "BRAND");
   setSize(product.size || "SIZE");
   setAbv(product.abv || "ABV");
   setCategory(product.category || "CATEGORY");
   setPhoto(product.photo || null);
   setEditingIndex(index);
 };


 const handleLogout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   window.location.href = "/auth";
 };
 return (
   <div className="flex min-h-screen mt-9 bg-gray-100">
     {/* Sidebar */}
     
     <div className="w-64 bg-gradient-to-b from-orange-700 to-orange-400 text-white shadow-xl">
       
       <div className="p-4 flex items-center justify-center border-b border-orange-700">
         <h1 className="text-2xl mt-5 font-bold">Admin Panel</h1>
       </div>
       <nav className="p-4 space-y-2">
         <button
           onClick={() => setView("profile")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "profile" ? "bg-white text-orange-800" : "text-white hover:bg-orange-700"}`}
         >
           <FaUserCircle className="mr-3" />
           Admin Profile
         </button>
         <button
           onClick={() => setView("addProduct")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "addProduct" ? "bg-white text-orange-800" : "text-white hover:bg-orange-700"}`}
         >
           <FaBoxOpen className="mr-3" />
           Add Product
         </button>
         <button
           onClick={() => setView("addStock")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "addStock" ? "bg-white text-orange-800" : "text-white hover:bg-orange-700"}`}
         >
           <FaWarehouse className="mr-3" />
           Manage Stock
         </button>
         <button
           onClick={() => setView("orders")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "orders" ? "bg-white text-orange-800" : "text-white hover:bg-orange-700"}`}
         >
           <FaShoppingBag className="mr-3" />
           Orders
         </button>
         <button
           onClick={handleLogout}
           className="flex items-center w-full p-3 rounded-lg text-white hover:bg-orange-700 transition-all"
         >
           <FaSignOutAlt className="mr-3" />
           Logout
         </button>
       </nav>
     </div>


     {/* Main Content */}
     <div className="flex-1 overflow-auto">
       {/* Header */}
       <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        
         <div className="flex items-center space-x-4">

           {adminDetails && (
             <div className="flex items-center">
               
             </div>
           )}
         </div>
       </header>


       {/* Content Area */}
       <main className="p-6">
         {view === "profile" && adminDetails && (
           <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="p-6">
               <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                
                 <div>
                   <h3 className="text-2xl font-bold text-gray-800">
                     {adminDetails.firstName} {adminDetails.lastName}
                   </h3>
                   <p className="text-gray-600">{adminDetails.email}</p>
                   <p className="text-gray-600">User Name: {adminDetails.username}</p>
                 </div>
               </div>


               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <h4 className="text-lg font-semibold mb-3 text-gray-700">Account Information</h4>
                   <div className="space-y-2 text-gray-600">
                     <p><span className="font-medium">Last Login:</span> {new Date().toLocaleString()}</p>
                   </div>
                 </div>


                 <div className="bg-gray-50 p-4 rounded-lg">
                   <h4 className="text-lg font-semibold mb-3 text-gray-700">Statistics</h4>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-3 rounded-lg shadow-sm">
                       <p className="text-sm text-gray-500">Total Products</p>
                       <p className="text-2xl font-bold text-orange-600">{products.length}</p>
                     </div>
                     <div className="bg-white p-3 rounded-lg shadow-sm">
                       <p className="text-sm text-gray-500">Total Stock</p>
                       <p className="text-2xl font-bold text-orange-600">
                         {products.reduce((sum, product) => sum + parseInt(product.quantity || 0), 0)}
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}


         {view === "addProduct" && (
           <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="p-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-6">
                 {editingIndex !== null ? "Edit Product" : "Add New Product"}
               </h2>
              
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                     <input
                       type="text"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                       placeholder="Enter product name"
                     />
                   </div>


                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR)</label>
                     <input
                       type="number"
                       value={price}
                       onChange={(e) => setPrice(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                       placeholder="Enter price"
                     />
                   </div>


                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                     <input
                       type="number"
                       value={quantity}
                       onChange={(e) => setQuantity(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                       placeholder="Enter quantity"
                     />
                   </div>
                 </div>


                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    style={{ height: '45px' }} 
                   >  
                       {brands.map((brand, index) => (
                         <option key={index} value={brand}>{brand}</option>
                       ))}
                     </select>
                   </div>


                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                     <select
                       value={size}
                       onChange={(e) => setSize(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                       style={{ height: '45px' }} >
                       {sizes.map((size, index) => (
                         <option key={index} value={size}>{size}</option>
                       ))}
                     </select>
                   </div>


                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">ABV</label>
                     <select
                       value={abv}
                       onChange={(e) => setAbv(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                       style={{ height: '45px' }} >
                       {abvLevels.map((abv, index) => (
                         <option key={index} value={abv}>{abv}</option>
                       ))}
                     </select>
                   </div>


                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                     <select
                       value={category}
                       onChange={(e) => setCategory(e.target.value)}
                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                       style={{ height: '45px' }} >
                       {categories.map((category, index) => (
                         <option key={index} value={category}>{category}</option>
                       ))}
                     </select>
                   </div>
                 </div>
               </div>


               <div className="mt-6">
                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                 <div className="flex items-center space-x-4">
                   {photo ? (
                     <>
                       <img
                         src={photo}
                         alt="Product preview"
                         className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                       />
                       <button
                         onClick={removePhoto}
                         className="text-red-500 hover:text-red-700 text-sm font-medium"
                       >
                         Remove Image
                       </button>
                     </>
                   ) : (
                     <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                       <FaImage className="text-2xl" />
                     </div>
                   )}
                   <label className="cursor-pointer">
                     <span className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                       Upload Image
                     </span>
                     <input
                       type="file"
                       accept="image/*"
                       onChange={handlePhotoUpload}
                       className="hidden"
                     />
                   </label>
                 </div>
               </div>


               <div className="mt-8 flex justify-end space-x-3">
                 <button
                   onClick={resetForm}
                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                 >
                   Reset
                 </button>
                 <button
                   onClick={addProduct}
                   disabled={isUploading}
                   className={`px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                 >
                   {isUploading ? "Processing..." : editingIndex !== null ? "Update Product" : "Add Product"}
                 </button>
               </div>
             </div>
           </div>
         )}


         {view === "addStock" && (
           <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="p-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Stock</h2>
              
               {products.length > 0 ? (
                 <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                       <select
                         value={brand}
                         onChange={(e) => {
                           setBrand(e.target.value);
                           setSelectedProductId("");
                         }}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                         style={{ height: '45px' }} >
                         <option value="BRAND">All Brands</option>
                         {brands.filter(b => b !== "BRAND").map((brand, index) => (
                           <option key={index} value={brand}>{brand}</option>
                         ))}
                       </select>
                     </div>


                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                       <select
                         value={category}
                         onChange={(e) => {
                           setCategory(e.target.value);
                           setSelectedProductId("");
                         }}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                         style={{ height: '45px' }} >
                         <option value="CATEGORY">All Categories</option>
                         {categories.filter(c => c !== "CATEGORY").map((category, index) => (
                           <option key={index} value={category}>{category}</option>
                         ))}
                       </select>
                     </div>


                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">ABV</label>
                       <select
                         value={abv}
                         onChange={(e) => {
                           setAbv(e.target.value);
                           setSelectedProductId("");
                         }}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                         style={{ height: '45px' }} >
                         <option value="ABV">All ABV Levels</option>
                         {abvLevels.filter(a => a !== "ABV").map((abv, index) => (
                           <option key={index} value={abv}>{abv}</option>
                         ))}
                       </select>
                     </div>
                   </div>


                   {(brand !== "BRAND" || category !== "CATEGORY" || abv !== "ABV") && (
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                       <select
                         value={selectedProductId}
                         onChange={(e) => setSelectedProductId(e.target.value)}
                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                         style={{ height: '45px' }}>
                         <option value="" disabled>Select a product</option>
                         {products
                           .filter(product =>
                             (brand === "BRAND" || product.brand === brand) &&
                             (category === "CATEGORY" || product.category === category) &&
                             (abv === "ABV" || product.abv === abv)
                           )
                           .map((product) => (
                             <option key={product._id} value={product._id}>
                               {product.name} ({product.size}) - Current: {product.quantity}
                             </option>
                           ))}
                       </select>
                     </div>
                   )}


                   {selectedProductId && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Add</label>
                         <input
                           type="number"
                           value={stockToAdd}
                           onChange={(e) => setStockToAdd(e.target.value)}
                           placeholder="Enter quantity"
                           min="1"
                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                         />
                       </div>
                       <div className="flex items-end">
                         <button
                           onClick={addStock}
                           disabled={isUpdatingStock || !stockToAdd}
                           className={`w-full md:w-auto px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors ${
                             isUpdatingStock || !stockToAdd ? "opacity-50 cursor-not-allowed" : ""
                           }`}
                         >
                           {isUpdatingStock ? "Updating..." : "Update Stock"}
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="text-center py-8 text-gray-500">
                   No products available to manage stock.
                 </div>
               )}
             </div>
           </div>
         )}


         {view === "orders" && (
           <div className="bg-white rounded-xl shadow-md overflow-hidden">
             <div className="p-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
              
               {loadingOrders ? (
                 <div className="flex justify-center py-8">
                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                 </div>
               ) : orders.length === 0 ? (
                 <div className="text-center py-8 text-gray-500">
                   No orders found.
                 </div>
               ) : (
                 <div className="space-y-4">
                   <div className="flex flex-wrap gap-2 mb-4">
                     <button
                       onClick={() => setOrderFilter('all')}
                       className={`px-4 py-2 rounded-lg transition-colors ${
                         orderFilter === 'all' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       }`}
                     >
                       All Orders
                     </button>
                     <button
                       onClick={() => setOrderFilter('pending')}
                       className={`px-4 py-2 rounded-lg transition-colors ${
                         orderFilter === 'pending' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       }`}
                     >
                       Pending
                     </button>
                     <button
                       onClick={() => setOrderFilter('completed')}
                       className={`px-4 py-2 rounded-lg transition-colors ${
                         orderFilter === 'completed' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       }`}
                     >
                       Completed
                     </button>
                   </div>


                   <div className="space-y-4">
                     {orders
                       .filter(order => orderFilter === 'all' || order.status === orderFilter)
                       .map((order) => (
                       <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                         <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                           <div>
                             <p className="font-semibold">Order #{order._id.substring(0, 8)}</p>
                             <p className="text-sm text-gray-500">
                               {new Date(order.createdAt).toLocaleString()}
                             </p>
                           </div>
                           <div className="flex items-center space-x-3">
                             <span className={`px-3 py-1 rounded-full text-sm ${
                               order.status === 'completed'
                                 ? 'bg-green-100 text-green-800'
                                 : 'bg-yellow-100 text-yellow-800'
                             }`}>
                               {order.status}
                             </span>
                             <button
                               onClick={() => updateOrderStatus(order._id, order.status === 'pending' ? 'completed' : 'pending')}
                               className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                                 order.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                               }`}
                             >
                               <span
                                 className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                                   order.status === 'completed' ? 'translate-x-6' : 'translate-x-1'
                                 }`}
                               />
                             </button>
                           </div>
                         </div>


                         <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                           <div>
                             <h3 className="font-semibold text-gray-700 mb-2">Customer</h3>
                             <div className="space-y-1 text-sm text-gray-600">
                               <p>{order.user.firstName} {order.user.lastName}</p>
                               <p>{order.user.email}</p>
                               <p>{order.user.phone}</p>
                               <p>{order.user.location}</p>
                             </div>
                           </div>


                           <div>
                             <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
                             <div className="space-y-3">
                               {order.items.map((item, index) => (
                                 <div key={index} className="flex justify-between">
                                   <div>
                                     <p className="text-gray-800">{item.name}</p>
                                     <p className="text-xs text-gray-500">
                                       {item.size && `Size: ${item.size} | `}
                                       Qty: {item.quantity}
                                     </p>
                                   </div>
                                   <p className="text-gray-800">LKR {item.price.toFixed(2)}</p>
                                 </div>
                               ))}
                             </div>
                           </div>


                           <div className="bg-gray-50 p-4 rounded-lg">
                             <div className="flex justify-between py-2">
                               <span className="text-gray-600">Subtotal:</span>
                               <span className="font-medium">LKR {order.subtotal.toFixed(2)}</span>
                             </div>
                             <div className="flex justify-between py-2 border-t border-gray-200">
                               <span className="text-gray-600">Total:</span>
                               <span className="font-bold text-orange-600">LKR {order.total.toFixed(2)}</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
         )}


         {/* Product List */}
         {products.length > 0 && view !== "profile" && view !== "orders" && (
           <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
             <div className="p-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Inventory</h2>
              
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                       {view === "addProduct" && (
                         <>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ABV</th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                         </>
                       )}
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                       {view === "addProduct" && (
                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                       )}
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {products.map((product, index) => (
                       <tr key={index} className="hover:bg-gray-50">
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div className="text-sm font-medium text-gray-900">{product.name}</div>
                           <div className="text-sm text-gray-500">{product.size}</div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                             product.quantity > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                           }`}>
                             {product.quantity}
                           </span>
                         </td>
                         {view === "addProduct" && (
                           <>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               LKR {product.price}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {product.brand}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {product.size}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {product.abv}
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {product.category}
                             </td>
                           </>
                         )}
                         <td className="px-6 py-4 whitespace-nowrap">
                           {product.photo && (
                             <img
                               src={product.photo}
                               alt={product.name}
                               className="h-10 w-10 rounded-full object-cover"
                             />
                           )}
                         </td>
                         {view === "addProduct" && (
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                             <button
                               onClick={() => editProduct(index)}
                               className="text-orange-600 hover:text-orange-900 mr-3"
                             >
                               <FaEdit />
                             </button>
                             <button
                               onClick={() => removeProduct(index)}
                               className="text-red-600 hover:text-red-900"
                             >
                               <FaTrash />
                             </button>
                           </td>
                         )}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         )}
       </main>
     </div>
   </div>
 );
};


export default AdminProductPanel;

