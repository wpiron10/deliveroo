import "./App.css";
import logo from "./assets/img/logo.png";
import banner from "./assets/img/header-image.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-exo-backend.herokuapp.com/"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

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
                            <div className="meal" key={index}>
                              <div
                                className={
                                  meal.picture
                                    ? "submeal-1"
                                    : "submeal-1-without-img"
                                }
                              >
                                <h3>{meal.title}</h3>

                                {meal.description && (
                                  <p className="meal-desc">
                                    {meal.description}
                                  </p>
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
                <div className="content-banner-1">
                  <button className="validate-cart">Valider mon panier</button>
                  <p className="message-cart">Votre panier est vide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
