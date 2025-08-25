import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../Styles/Products.css";


const Productedetails = () => {
  let [products, setProducts] = useState([]); // empty array
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => {
        if (response.ok) {
          return response.json(); // ✅ fixed
        } else {
          throw new Error("search proper data...");
        }
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false); // stop loading
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="productdetails">
      <h1>Product Details...</h1>

      {/* Loading / Error Messages */}
      {isLoading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

  <section className="products">
  {products.map((product) => (
    <Card key={product.id} className="product-card" style={{ width: '18rem' }}>
      <Card.Img 
        variant="top" 
        src={product.image || "https://via.placeholder.com/150"} 
      />
      <Card.Body>
        <Card.Title>{product.Title}</Card.Title>
        <Card.Text>
          Price: ${product.price} <br />
          {product.description}
        </Card.Text>
        <Button variant="primary">Buy Now</Button>
      </Card.Body>
    </Card>
  ))}
</section>

       
    </div>
  );
};

export default Productedetails;
