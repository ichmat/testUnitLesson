import React from "react";
import useHome from "../hooks/useHome";

const Home = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products } = useHome();
  console.log(products);
  return (
    <div>
      {loading && <div>Loading....</div>}
      {!loading && <div>Menu</div>}
      <div onClick={() => setRoute({ route: "cart" })}>Aller sur panier</div>
      <div>
        {products.map((product) => {
          return (
            <React.Fragment>
              <div
                className="product"
                onClick={() => setRoute({ route: "product", data: product })}
              >
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p>Quantitée {product.quantity}</p>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
