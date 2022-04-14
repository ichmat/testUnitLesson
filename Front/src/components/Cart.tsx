import React from "react";
import useCart from "../hooks/useCart";

const Cart = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products, message, loadCart, removeToCart } = useCart();
  return (
    <div>
      <div onClick={() => setRoute({ route: "home" })}>Retour</div>
      {message && <p>{message}</p>}
      {loading && <div>Loading....</div>}
      {!loading && <div>Votre pannier</div>}
      <div key={1}>
        {products && products.map((product) => {
          return (
            <React.Fragment>
              <div className="product">
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p>Quantitée {product.quantity}</p>
              </div>
              <button onClick={() => removeToCart(product)}>
                Supprimer du panier
              </button>
              <hr />
            </React.Fragment>
          );
        })}
        {!products && (
          <React.Fragment>
          <div>
            <p>Aucun produits</p>
          </div>
        </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Cart;
