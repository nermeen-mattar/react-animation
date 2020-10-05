import React from "react";
import productData from "./constants/productData.json";

import "./App.css";
import { Header } from "react-native/Libraries/NewAppScreen";

function App (props) {
  props.onInit(productData);
  return (
      <Header>
        <Text> hello</Text>
      </Header>
    );
}

export default App;
