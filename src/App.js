import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [products, setProducts] = useState([]);
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products)) // Corrected `data.Products` to `data.products`
      .catch((error) => console.log("Error fetching data", error));
  }, []);

  const handleEdit = (id) => {
    setEditableProduct(id);
  };

  const handleSave = (id) => {
    setEditableProduct(null);
    // Optionally, send updated data to the server here
  };

  const handleChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  return (
    <div className="App">
      <h1>Products List</h1>
      <table border="1">
        <thead>
          <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editableProduct === product.id ? (
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) =>
                      handleChange(product.id, "title", e.target.value)
                    }
                  />
                ) : (
                  product.title
                )}
              </td>
              <td>
                {editableProduct === product.id ? (
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) =>
                      handleChange(product.id, "description", e.target.value)
                    }
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editableProduct === product.id ? (
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleChange(product.id, "price", e.target.value)
                    }
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                {editableProduct === product.id ? (
                  <button onClick={() => handleSave(product.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(product.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;