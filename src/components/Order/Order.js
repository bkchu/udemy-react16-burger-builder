import React from "react";

import classes from "./Order.css";

const order = props => {
  /**
   * ingredients: {
   *    salad: 1,
   *    meat: 1,
   *    bacon: 1,
   *    cheese: 3
   * }
   */
  const ingredients = [];
  for (let i in props.ingredients) {
    ingredients.push({ name: i, amount: props.ingredients[i] });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  // const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
  //   return (
  //     <li key={igKey}>
  //       <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
  //       {props.ingredients[igKey]}
  //     </li>
  //   );
  // });

  return (
    <div className={classes.Order}>
      <p>
        <strong>Ingredients</strong>
        {ingredientOutput}
      </p>

      <p>
        Price: <strong>USD ${Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
