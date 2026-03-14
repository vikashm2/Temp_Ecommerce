import { useState } from 'react';

// product form component for create/edit
const ProductForm = ({ product, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    category: product?.category || '',
    stock: product?.stock || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Product Title</label>
          <input
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full glass rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="e.g. Neo-Matrix Headphones"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
          <input
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full glass rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="e.g. Electronics"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
        <textarea
          required
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full glass rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Detailed description of the product..."
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Price ($)</label>
          <input
            required
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full glass rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Stock</label>
          <input
            required
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full glass rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
          <input
            required
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full glass rounded-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="https://cloudinary.com/..."
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full btn-primary disabled:opacity-50 mt-4"
      >
        {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductForm;
