import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// Load Navbar
  import Navbar from "./component/Navbar";
// Load Halaman
import Products from "./page/Products";
import Product from "./page/Product";
import Cart from "./page/Cart";
// import Pelanggaran from "./page/Pelanggaran";
import User from "./page/User";
import Profil from "./page/Profil";
// import Poin from "./page/Poin";
// import PelanggaranSiswa from "./page/PelanggaranSiswa";
import Login from "./page/Login";
import Register from "./page/Register";
import Order from "./page/Order";
import Checkout from "./page/Checkout";
import Confirm from "./page/Confirm";

class Main extends Component {
  render() {
    return (
      <Switch>
        {/* Load component tiap halaman */}

        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* siswa */}
        
        <Route path="/products">
          <Navbar />
          <Products />
        </Route>
       
        <Route path="/product">
          <Navbar />
          <Product />
        </Route>
        <Route path="/cart">
          <Navbar />
          <Cart />
        </Route>
        {/* user */}
        <Route path="/user">
          <Navbar />
          <User />
        </Route>
        <Route path="/profil">
          <Navbar />
          <Profil />
        </Route>
        <Route path="/order">
          <Navbar />
          <Order />
        </Route>
        <Route path="/checkout">
          <Navbar />
          <Checkout />
        </Route>
        <Route path="/confirm">
          <Navbar />
          <Confirm />
        </Route>
        {/* pelanggaran siswa */}
        {/* <Route path="/pelanggaran_siswa">
          <Navbar />
          <PelanggaranSiswa />
        </Route> */} 
      </Switch>
    );
  }
}

export default Main;
