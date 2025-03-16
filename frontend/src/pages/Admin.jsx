import { useState } from "react";
import { FaUserCircle, FaBoxOpen, FaWarehouse,  FaTrash, FaEdit } from "react-icons/fa";

const AdminProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [abv, setAbv] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [view, setView] = useState("profile");

  
  const brands = ["BRAND", "ROCKLANDS", "DLL", "DCSL", "MENDIS", "LION", "HEINEKEN"];
  const sizes = ["SIZE", "750ML", "1L", "500ML"];
  const abvLevels = ["ABV", "5%", "6%", "7%", "10%"];
  const categories = ["CATEGORY", "Shake & Beer", "Wine", "Sprite"];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const addProduct = () => {
    if (!name || !price || !quantity) return;
    const newProduct = { name, price, brand, size, abv, category, quantity, photo };

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = newProduct;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setName("");
    setPrice("");
    setQuantity("");
    setBrand("");
    setSize("");
    setAbv("");
    setCategory("");
    setPhoto(null);
  };

  // Delete product
  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Edit product
  const editProduct = (index) => {
    const product = products[index];
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setBrand(product.brand);
    setSize(product.size);
    setAbv(product.abv);
    setCategory(product.category);
    setPhoto(product.photo);
    setEditingIndex(index);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-20 flex gap-8">
      {/* Left Panel */}
      <div className="w-1/3 bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
        <button onClick={() => setView("profile")} className="p-4 bg-gray-200 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2">
          <FaUserCircle /> Admin Profile
        </button>
        <button onClick={() => setView("addProduct")} className="p-4 bg-gray-200 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2">
          <FaBoxOpen /> Add Product
        </button>
        <button onClick={() => setView("addStock")} className="p-4 bg-gray-200 rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2">
          <FaWarehouse /> Add Stock
        </button>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 flex flex-col gap-6">
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
  <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">
    Brand
  </label>
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
  <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">
    Size
  </label>
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
  <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">
    ABV
  </label>
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
  <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">
    Category
  </label>
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
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="w-full p-3 border-2 border-black rounded-lg bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
    </div>

    <button onClick={addProduct} className="w-full bg-orange-500 text-white p-3 rounded-lg mt-4">
     {editingIndex !== null ? "Update Product" : "Add Product"}
    </button>
  </div>
)}


{view === "addStock" && (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Add Stock</h2>
    {products.length > 0 ? (
      <div className="grid grid-cols-2 gap-4">
        
        <div className="relative">
  <label className="absolute -top-3 left-3 bg-white px-1 text-orange-400 text-sm">
    Select Product
  </label>
  <select
    value={editingIndex !== null ? editingIndex : ""}
    onChange={(e) => setEditingIndex(Number(e.target.value))}
    className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none"
  >
    <option value="" disabled>Select Product</option>
    {products.map((product, index) => (
      <option key={index} value={index}>
        {product.name}
      </option>
    ))}
  </select>
</div>

         <div className="relative">
        <label className="absolute -top-2 left-3 bg-white px-1 text-orange-400 text-sm">New Stock</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Add New Stock"
          className="w-full py-4 px-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>
        <button
          onClick={() => {
            if (editingIndex !== null && quantity) {
              const updatedProducts = [...products];
              updatedProducts[editingIndex].quantity =
                parseInt(updatedProducts[editingIndex].quantity) + parseInt(quantity);
              setProducts(updatedProducts);
              setQuantity("");
              setEditingIndex(null);
            }
          }}
          className="col-span-2 w-full bg-orange-500 text-white p-3 rounded-lg mt-4"
        >
           Add Stock
        </button>
      </div>
    ) : (
      <p>No products available to add stock.</p>
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
