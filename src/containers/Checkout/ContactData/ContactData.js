import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          zipCode: this.state.address.postalCode,
          country: "United States"
        },
        email: this.state.email
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/orders");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  onChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "street" || name === "postalCode") {
      this.setState({
        address: {
          [name]: value
        }
      });
    }
    this.setState({
      [name]: value
    });
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={this.onChangeHandler}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={this.onChangeHandler}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          onChange={this.onChangeHandler}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Zip Code"
          onChange={this.onChangeHandler}
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
