import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../Styles/Products.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios"; // ✅ must import axios

const Productedetails = () => {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();

  let properstyle={
    width:400,
    margin:"20px auto",
    padding:"20px"
  }

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("search proper data...");
        }
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // ✅ Delete product
  let handledelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:4000/products/${id}`)
          .then(() => {
            swal("Deleted!", "Product has been deleted successfully!", "success");
            // ✅ update state without reloading
            setProducts(products.filter((p) => p.id !== id));
          })
          .catch((err) => {
            swal("Error!", "Something went wrong while deleting!", "error");
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="productdetails">
      <h1>Product Details...</h1>

      {isLoading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <section className="products">
        {products.map((product) => (
          <Card key={product.id} className="product-card" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={product.image || "https://via.placeholder.com/150"}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                category: {product.category} <br />
                {product.description}
              </Card.Text>
              <Button variant="success">Cart</Button>
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`/update/${product.id}`);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handledelete(product.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Productedetails;
