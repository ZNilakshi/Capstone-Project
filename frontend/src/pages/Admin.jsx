import { useState, useEffect } from "react";
import {
 FaUserCircle, FaBoxOpen, FaWarehouse, FaTrash,
 FaEdit, FaShoppingBag, FaSignOutAlt,
 FaImage, FaChartLine, FaChartPie, FaChartBar
} from "react-icons/fa";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';


// Register ChartJS components
ChartJS.register(
 ArcElement, Tooltip, Legend, CategoryScale,
 LinearScale, BarElement, Title, PointElement, LineElement
);


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
 const [salesData, setSalesData] = useState(null);
 const [categoryData, setCategoryData] = useState(null);
 const [timeSeriesData, setTimeSeriesData] = useState(null);


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
       // Sort products by createdAt date (newest first)
     const sortedProducts = response.data.sort((a, b) =>
       new Date(b.createdAt) - new Date(a.createdAt)
     );
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


// Add these useEffect hooks to fetch real chart data
useEffect(() => {
 const fetchChartData = async () => {
   if (view === "profile") {
     try {
       // Fetch sales data
       const salesResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/sales-data`);
       if (salesResponse.data) {
         setSalesData({
           labels: salesResponse.data.months.map(month => new Date(0, month - 1).toLocaleString('default', { month: 'short' })),
           datasets: [{
             label: 'Sales (LKR)',
             data: salesResponse.data.sales,
             backgroundColor: 'rgba(54, 162, 235, 0.7)',
             borderColor: 'rgba(54, 162, 235, 1)',
             borderWidth: 1,
           }],
         });
       }


       // Fetch category data
       const categoryResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/category-data`);
       setCategoryData({
         labels: categoryResponse.data.categories,
         datasets: [
           {
             label: 'Sales by Category',
             data: categoryResponse.data.sales,
             backgroundColor: [
               'rgba(255, 99, 132, 0.7)',
               'rgba(54, 162, 235, 0.7)',
               'rgba(255, 206, 86, 0.7)',
               'rgba(75, 192, 192, 0.7)',
               'rgba(153, 102, 255, 0.7)'
             ],
             borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)'
             ],
             borderWidth: 1,
           },
         ],
       });


       // Fetch time series data
       const timeResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/orders/time-data`);
       setTimeSeriesData({
         labels: timeResponse.data.times,
         datasets: [
           {
             label: 'Orders by Time',
             data: timeResponse.data.orders,
             borderColor: 'rgb(255, 159, 64)',
             backgroundColor: 'rgba(255, 159, 64, 0.5)',
             tension: 0.3,
             fill: true
           },
         ],
       });
     } catch (err) {
       console.error("Failed to fetch chart data", err);
     }
   }
 };


 fetchChartData();
}, [view]);


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
       setProducts([response.data.product, ...products]);
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
   <div className="flex min-h-screen bg-gradient-to-br mt-12 from-blue-50 to-orange-50">
     {/* Sidebar */}
     <div className="w-64 bg-gradient-to-b from-orange-600 to-orange-700 text-white shadow-xl backdrop-blur-sm bg-opacity-90">
       <div className="p-4 flex items-center justify-center border-b border-orange-500">
         <div className="bg-white p-2 rounded-full shadow-lg">
           <img
             src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
             alt="Logo"
             className="h-10 w-10"
           />
         </div>
         <h1 className="text-2xl mt-12 font-bold ml-3">Liquor Admin</h1>
       </div>
       <nav className="p-4 space-y-2">
         <button
           onClick={() => setView("profile")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "profile" ? "bg-white text-orange-800 shadow-md" : "text-white hover:bg-orange-600 hover:shadow-md"}`}
         >
           <FaUserCircle className="mr-3 text-lg" />
           Dashboard
         </button>
         <button
           onClick={() => setView("addProduct")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "addProduct" ? "bg-white text-orange-800 shadow-md" : "text-white hover:bg-orange-600 hover:shadow-md"}`}
         >
           <FaBoxOpen className="mr-3 text-lg" />
           Products
         </button>
         <button
           onClick={() => setView("addStock")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "addStock" ? "bg-white text-orange-800 shadow-md" : "text-white hover:bg-orange-600 hover:shadow-md"}`}
         >
           <FaWarehouse className="mr-3 text-lg" />
           Inventory
         </button>
         <button
           onClick={() => setView("orders")}
           className={`flex items-center w-full p-3 rounded-lg transition-all ${view === "orders" ? "bg-white text-orange-800 shadow-md" : "text-white hover:bg-orange-600 hover:shadow-md"}`}
         >
           <FaShoppingBag className="mr-3 text-lg" />
           Orders
         </button>
         <button
           onClick={handleLogout}
           className="flex items-center w-full p-3 rounded-lg text-white hover:bg-orange-600 hover:shadow-md transition-all"
         >
           <FaSignOutAlt className="mr-3 text-lg" />
           Logout
         </button>
       </nav>
     </div>


     {/* Main Content */}
     <div className="flex-1 overflow-auto">
       {/* Header */}
       <header className="bg-white  mt-12 bg-opacity-80 backdrop-blur-sm shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
         <h2 className="text-xl font-bold text-orange-800">
           {view === "profile" && "Admin Dashboard"}
           {view === "addProduct" && "Product Management"}
           {view === "addStock" && "Inventory Management"}
           {view === "orders" && "Order Management"}
         </h2>
         {adminDetails && (
           <div className="flex items-center space-x-4">
             <div className="flex items-center">
             <img
             src="https://cdn-icons-png.flaticon.com/512/2206/2206368.png"
               alt="Admin"
                 className="w-10 h-10 rounded-full border-2 border-orange-300"
               />
               <div className="ml-3">
                 <p className="text-sm font-medium text-gray-700">{adminDetails.firstName} {adminDetails.lastName}</p>
                 <p className="text-xs text-gray-500">Admin</p>
               </div>
             </div>
           </div>
         )}
       </header>


       {/* Content Area */}
       <main className="p-6">
         {view === "profile" && adminDetails && (
           <div className="space-y-6">
             {/* Welcome Card */}
             <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg overflow-hidden text-white">
               <div className="p-6 flex flex-col md:flex-row items-center justify-between">
                 <div>
                   <h3 className="text-2xl font-bold mb-2">Welcome back, {adminDetails.firstName}!</h3>
                   <p className="opacity-90">Here's what's happening with your store today.</p>
                 </div>
                 <div className="mt-4 md:mt-0">
                   <div className="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                     <p className="text-sm">Last login: {new Date().toLocaleString()}</p>
                   </div>
                 </div>
               </div>
             </div>


             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white rounded-xl shadow-md p-6 flex items-center backdrop-blur-sm bg-opacity-80">
                 <div className="bg-orange-100 p-3 rounded-full mr-4">
                   <FaBoxOpen className="text-orange-600 text-xl" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Total Products</p>
                   <p className="text-2xl font-bold text-orange-600">{products.length}</p>
                 </div>
               </div>


               <div className="bg-white rounded-xl shadow-md p-6 flex items-center backdrop-blur-sm bg-opacity-80">
                 <div className="bg-green-100 p-3 rounded-full mr-4">
                   <FaWarehouse className="text-green-600 text-xl" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Total Stock</p>
                   <p className="text-2xl font-bold text-green-600">
                     {products.reduce((sum, product) => sum + parseInt(product.quantity || 0), 0)}
                   </p>
                 </div>
               </div>


               <div className="bg-white rounded-xl shadow-md p-6 flex items-center backdrop-blur-sm bg-opacity-80">
                 <div className="bg-orange-100 p-3 rounded-full mr-4">
                   <FaShoppingBag className="text-orange-600 text-xl" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500">Total Orders</p>
                   <p className="text-2xl font-bold text-orange-600">{orders.length}</p>
                 </div>
               </div>
             </div>


             {/* Charts Section */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-xl shadow-md p-6 backdrop-blur-sm bg-opacity-80">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-gray-700">Monthly Sales</h3>
                   <FaChartLine className="text-orange-500" />
                 </div>
                 {salesData && (
                   <Bar
                     data={salesData}
                     options={{
                       responsive: true,
                       plugins: {
                         legend: {
                           position: 'top',
                         },
                       },
                     }}
                   />
                 )}
               </div>


               <div className="bg-white rounded-xl shadow-md p-6 backdrop-blur-sm bg-opacity-80">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-gray-700">Sales by Category</h3>
                   <FaChartPie className="text-orange-500" />
                 </div>
                 {categoryData && (
                   <Pie
                     data={categoryData}
                     options={{
                       responsive: true,
                       plugins: {
                         legend: {
                           position: 'right',
                         },
                       },
                     }}
                   />
                 )}
               </div>


               <div className="bg-white rounded-xl shadow-md p-6 backdrop-blur-sm bg-opacity-80 lg:col-span-2">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold text-gray-700">Daily Order Trends</h3>
                   <FaChartBar className="text-orange-500" />
                 </div>
                 {timeSeriesData && (
                   <Line
                     data={timeSeriesData}
                     options={{
                       responsive: true,
                       plugins: {
                         legend: {
                           position: 'top',
                         },
                       },
                     }}
                   />
                 )}
               </div>
             </div>
           </div>
         )}


         {view === "addProduct" && (
           <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-90">
             <div className="p-6">
        
               <h2 className="text-2xl font-bold text-gray-800 mb-6">
                 {editingIndex !== null ? "Edit Product" : "Add New Product"}
               </h2>
            
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-4">
   {/* Product Name */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
     <input
       type="text"
       value={name}
       onChange={(e) => setName(e.target.value)}
       className="block w-full pl-4 pr-3 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       placeholder="Enter product name"
     />
   </div>


   {/* Price */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Price (LKR)</label>
     <input
       type="number"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
       className="block w-full pl-4 pr-3 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       placeholder="Enter price"
     />
   </div>


   {/* Quantity */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
     <input
       type="number"
       value={quantity}
       onChange={(e) => setQuantity(e.target.value)}
       className="block w-full pl-4 pr-3 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       placeholder="Enter quantity"
     />
   </div>
 </div>


 <div className="space-y-4">
   {/* Brand Select */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
     <div className="relative">
       <select
         value={brand}
         onChange={(e) => setBrand(e.target.value)}
         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       >
         {brands.map((brand, index) => (
           <option key={index} value={brand}>{brand}</option>
         ))}
       </select>
       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
         </svg>
       </div>
     </div>
   </div>


   {/* Size Select */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
     <div className="relative">
       <select
         value={size}
         onChange={(e) => setSize(e.target.value)}
         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       >
         {sizes.map((size, index) => (
           <option key={index} value={size}>{size}</option>
         ))}
       </select>
       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
         </svg>
       </div>
     </div>
   </div>


   {/* ABV Select */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Alcohol Strength</label>
     <div className="relative">
       <select
         value={abv}
         onChange={(e) => setAbv(e.target.value)}
         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       >
         {abvLevels.map((abv, index) => (
           <option key={index} value={abv}>{abv}</option>
         ))}
       </select>
       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
         </svg>
       </div>
     </div>
   </div>


   {/* Category Select */}
   <div className="relative">
     <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
     <div className="relative">
       <select
         value={category}
         onChange={(e) => setCategory(e.target.value)}
         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
       >
         {categories.map((category, index) => (
           <option key={index} value={category}>{category}</option>
         ))}
       </select>
       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
         </svg>
       </div>
     </div>
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
           <div className="bg-white rounded-xl shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-90">
             <div className="p-6">
               <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Stock</h2>
            
               {products.length > 0 ? (
                 <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {/* Brand Select */}
                   <div className="relative">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Brand
                     </label>
                     <div className="relative">
                       <select
                         value={brand}
                         onChange={(e) => {
                           setBrand(e.target.value);
                           setSelectedProductId("");
                         }}
                         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                       >
                         <option value="BRAND" className="text-gray-400">Select brand</option>
                         {brands.filter(b => b !== "BRAND").map((brand, index) => (
                           <option key={index} value={brand}>{brand}</option>
                         ))}
                       </select>
                       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                       </div>
                     </div>
                   </div>
              
                   {/* Category Select */}
                   <div className="relative">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Category
                     </label>
                     <div className="relative">
                       <select
                         value={category}
                         onChange={(e) => {
                           setCategory(e.target.value);
                           setSelectedProductId("");
                         }}
                         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                       >
                         <option value="CATEGORY" className="text-gray-400">Select category</option>
                         {categories.filter(c => c !== "CATEGORY").map((category, index) => (
                           <option key={index} value={category}>{category}</option>
                         ))}
                       </select>
                       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                       </div>
                     </div>
                   </div>
              
                   {/* ABV Select */}
                   <div className="relative">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Alcohol Strength
                     </label>
                     <div className="relative">
                       <select
                         value={abv}
                         onChange={(e) => {
                           setAbv(e.target.value);
                           setSelectedProductId("");
                         }}
                         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                       >
                         <option value="ABV" className="text-gray-400">Select ABV level</option>
                         {abvLevels.filter(a => a !== "ABV").map((abv, index) => (
                           <option key={index} value={abv}>{abv}</option>
                         ))}
                       </select>
                       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                       </div>
                     </div>
                   </div>
                 </div>
              
                 {(brand !== "BRAND" || category !== "CATEGORY" || abv !== "ABV") && (
                   <div className="relative">
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Select Product
                     </label>
                     <div className="relative">
                       <select
                         value={selectedProductId}
                         onChange={(e) => setSelectedProductId(e.target.value)}
                         className="appearance-none block w-full pl-4 pr-10 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                       >
                         <option value="" disabled className="text-gray-400">Select a product</option>
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
                       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                         <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                       </div>
                     </div>
                   </div>
                 )}
              
                 {selectedProductId && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="relative">
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Quantity to Add
                       </label>
                       <input
                         type="number"
                         value={stockToAdd}
                         onChange={(e) => setStockToAdd(e.target.value)}
                         placeholder="Enter quantity"
                         min="1"
                         className="block w-full pl-4 pr-3 py-2.5 text-base text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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





