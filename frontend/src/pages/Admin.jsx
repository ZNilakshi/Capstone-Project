import { useState, useEffect } from "react";
import { FaUserCircle, FaBoxOpen, FaWarehouse, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const AdminProductPanel = () => {
  const [products, setProducts] = useState([]);
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


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://capstone-project-production-df71.up.railway.app/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setAdminDetails(userData);
    }
  }, []);

  const brands = ["BRAND", "ROCKLANDS", "DLL", "DCSL", "MENDIS", "LION", "HEINEKEN"];
  const sizes = ["SIZE", "750ML", "1L", "500ML"];
  const abvLevels = ["ABV", "5%", "6%", "7%", "10%"];
  const categories = ["CATEGORY", "Shake & Beer", "Wine", "Sprite"];

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
        `https://capstone-project-production-df71.up.railway.app/api/products/${selectedProductId}/stock`,
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
          `https://capstone-project-production-df71.up.railway.app/api/products/${products[editingIndex]._id}`,
          productData
        );

        const updatedProducts = [...products];
        updatedProducts[editingIndex] = response.data;
        setProducts(updatedProducts);
        alert("Product updated successfully!");
      } else {
        // Add new product
        response = await axios.post(
          "https://capstone-project-production-df71.up.railway.app/api/products/add",
          productData
        );
        setProducts([...products, response.data.product]);
        alert("Product saved successfully!");
      }

      resetForm();
      setEditingIndex(null);
    } catch (error) {
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
        `https://capstone-project-production-df71.up.railway.app/api/products/${products[index]._id}`
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

    <div className=" p-8 bg-black min-h-screen mt-20 flex gap-8">

      <div className="w-1/3  bg-black p-6 rounded-xl shadow-lg flex flex-col gap-6">
        <button
          onClick={() => setView("profile")}
          className={`p-4 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2 ${view === "profile" ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
        >
          <FaUserCircle /> Admin Profile
        </button>
        <button
          onClick={() => setView("addProduct")}
          className={`p-4 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2 ${view === "addProduct" ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
        >
          <FaBoxOpen /> Add Product
        </button>
        <button
          onClick={() => setView("addStock")}
          className={`p-4 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2 ${view === "addStock" ? "bg-orange-500 text-white" : "bg-gray-200"
            }`}
        >
          <FaWarehouse /> Add Stock
        </button>
        <button
          onClick={handleLogout}
          className="p-4 bg-red-500 text-white rounded-lg text-center font-bold text-xl"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-2/3 flex flex-col gap-6">
        {view === "profile" && adminDetails && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

            <div className="flex items-start gap-8 mb-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <FaUserCircle className="text-gray-400 text-8xl" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {adminDetails.firstName} {adminDetails.lastName}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Username:</span> {adminDetails.username}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {adminDetails.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span> {adminDetails.roles?.join(", ")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">Account Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Account Created:</span> {new Date(adminDetails.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Last Login:</span> {new Date().toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">Admin Statistics</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Total Products:</span> {products.length}</p>
                  <p><span className="font-medium">Total Stock Items:</span> {products.reduce((sum, product) => sum + parseInt(product.quantity || 0), 0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "addProduct" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{editingIndex !== null ? "Edit Product" : "Add Product"}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-orange-400 text-sm">Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-orange-400 text-sm">Price (LKR)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price (LKR)"
                  className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-orange-400 text-sm">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full py-3 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                >
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                >
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">ABV</label>
                <select
                  value={abv}
                  onChange={(e) => setAbv(e.target.value)}
                  className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                >
                  {abvLevels.map((abv, index) => (
                    <option key={index} value={abv}>{abv}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="absolute -top-2 left-3 bg-white px-1 text-orange-400 text-sm">Upload Image</label>
                {photo && (
                  <div className="mb-2 flex items-center gap-2">
                    <img
                      src={photo}
                      alt="Current product"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            <button
              onClick={addProduct}
              disabled={isUploading}
              className={`w-full bg-orange-500 text-white p-3 rounded-lg mt-4 ${isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isUploading ? "Uploading..." :
                (editingIndex !== null ? "Update Product" : "Add Product")}
            </button>
          </div>
        )}

        {view === "addStock" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Manage Stock</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">
                    Select Product
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
                  >
                    <option value="" disabled>Select Product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} (Current: {product.quantity})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-orange-400 text-sm">
                    Quantity to Add
                  </label>
                  <input
                    type="number"
                    value={stockToAdd}
                    onChange={(e) => setStockToAdd(e.target.value)}
                    placeholder="Enter quantity"
                    className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <button
                  onClick={addStock}
                  disabled={isUpdatingStock}
                  className={`col-span-2 w-full bg-orange-500 text-white p-3 rounded-lg mt-4 ${isUpdatingStock ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isUpdatingStock ? "Updating..." : "Update Stock"}
                </button>
              </div>
            ) : (
              <p>No products available to manage stock.</p>
            )}
          </div>
        )}

        {/* Product List */}
        {products.length > 0 && view !== "profile" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Product Name</th>
                    <th className="p-3 text-left">Quantity</th>
                    {view === "addProduct" && (
                      <>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Brand</th>
                        <th className="p-3 text-left">Size</th>
                        <th className="p-3 text-left">ABV</th>
                        <th className="p-3 text-left">Category</th>
                      </>
                    )}
                    <th className="p-3 text-left">Photo</th>
                    {view === "addProduct" && (
                      <th className="p-3 text-left">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">{product.quantity}</td>
                      {view === "addProduct" && (
                        <>
                          <td className="p-3">{product.price} LKR</td>
                          <td className="p-3">{product.brand}</td>
                          <td className="p-3">{product.size}</td>
                          <td className="p-3">{product.abv}</td>
                          <td className="p-3">{product.category}</td>
                        </>
                      )}
                      <td className="p-3">
                        {product.photo && (
                          <img
                            src={product.photo}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}
                      </td>
                      {view === "addProduct" && (
                        <td className="p-3">
                          <button
                            onClick={() => editProduct(index)}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => removeProduct(index)}
                            className="text-red-500 hover:text-red-700"
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
        )}
      </div>
    </div>
  );
};

export default AdminProductPanel;