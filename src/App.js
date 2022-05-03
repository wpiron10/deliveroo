// imports
import "./App.css";
import logo from "./assets/img/logo.png";
import banner from "./assets/img/header-image.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // Déclaration des states
  const [data, setData] = useState({});

  const [cart, setCart] = useState([{ title: "title", isDone: false }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-exo-backend.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  const addMealToCart = (title) => {
    // console.log("Index à modifier =>", index);
    // console.log("article à ajouter =>", meal);
    const newCart = [...cart];
    newCart.push({ title: title, isDone: true });
    console.log(cart, "cart");
    console.log(newCart, "newcart");

    return setCart(newCart);
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="App">
      <header>
        <div className="logo-content">
          <img className="logo" alt="logo-deliveroo" src={logo} />
        </div>
      </header>

      <div className="container">
        <div className="banner">
          <div className="col-1">
            <h1>{data.restaurant.name}</h1>
            <p className="banner-desc">{data.restaurant.description}</p>
          </div>
          <div className="col-2">
            <img
              className="banner-img"
              alt={data.restaurant.name}
              src={banner}
            />
          </div>
        </div>
        <div className="App-content">
          <div className="subcontainer">
            <div className="main-content">
              {data.categories.map((category, index) => {
                // console.log(data.categories, "< data.categories");
                // console.log(index, "< index");
                return (
                  data.categories[index].meals.length > 0 && (
                    <div className="meal-type" key={index}>
                      <h2>{category.name}</h2>
                      {category.meals.map((meal, index) => {
                        return (
                          <div
                            className="meal"
                            key={index}
                            onClick={() => {
                              addMealToCart(meal.title);
                            }}
                            value={meal}
                          >
                            <div
                              className={
                                meal.picture
                                  ? "submeal-1"
                                  : "submeal-1-without-img"
                              }
                            >
                              <h3>{meal.title}</h3>

                              {meal.description && (
                                <p className="meal-desc">{meal.description}</p>
                              )}
                              <div className="line-sub-desc">
                                <p className="meal-price">{meal.price}</p>
                                {meal.popular && (
                                  <div className="review">
                                    <div className="star-review"></div>
                                    <p className="meal-review">Populaire</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            {meal.picture && (
                              <div className="submeal-2">
                                <img
                                  className="meal-img"
                                  alt={meal.title}
                                  src={meal.picture}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <div className="col-2">
            <div className="main-content">
              <div className="cart-container">
                <button className="validate-cart">Valider mon panier</button>
                {console.log(cart.title)}
                {cart.isDone === true ? (
                  cart.title.map(
                    (title, index)(
                      <div>
                        <div className="cart-meal" key={index}>
                          <div className="meal-priceline">
                            <div className="cart-counter-meal">
                              <button>-</button>
                              <div>00</div>
                              <button>+</button>
                            </div>
                            <div className="cart-title-meal">
                              <h3>{cart.title}</h3>
                            </div>
                            <div>
                              <p className="cart-price-meal">{cart.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <>
                    <div className="cart-total">
                      <p>Sous-total</p>
                      <p>10</p>
                    </div>
                    <div className="cart-total">
                      <p>Total</p>
                      <p>11</p>
                    </div>
                  </>
                )}

                {/* :( <button className="validate-cart">Valider mon panier</button>
                <p className="message-cart">Votre panier est vide.</p> ) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
