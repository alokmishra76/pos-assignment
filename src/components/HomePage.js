import React, {Component} from 'react';
import './HomePage.css';
import RightBlock from './RightBlock';
import LeftBlock from './LeftBlock';
import {DataProvider} from './homeContext';
import ProjectData from '../productData/pos.product.json';

export default class HomePage extends Component{
  constructor(props) {
    super(props)
    this.state = {}
    this.state.products = []
    this.state.subTotal = 0;
    this.quantityHandler = this.quantityHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.calculateSubTotal = this.calculateSubTotal.bind(this);
    this.cancelSale = this.cancelSale.bind(this);
}

quantityHandler(item,op) {
  const products = [...this.state.products];
  let index = products.findIndex(product => product.id === item.name);
  
  if(op ==="dec"){
     if(products[index].quantity > 1) products[index].quantity -=1;
  }else{
      products[index].quantity += 1;
  }
  
  products[index].total = products[index].quantity * products[index].price;
  
  this.setState({ products: products, subTotal: this.calculateSubTotal() });
}
addItem(item) {
  
  if (this.state.products.length !== 0) {
      let itemFound = this.state.products.some(product => (product.id === item.name));
      if (itemFound) {
          this.quantityHandler(item);
          return;
      }
  }
  item.id = item.name;
  item.quantity = 1;
  
  item.total = item.price;
  this.setState(state => ({
      products: [
          ...state.products,
          item
      ],
    
      subTotal: state.subTotal + parseInt(item.price)
  }))
}

deleteItem(item){
  const products = [...this.state.products];
  let index = products.findIndex(product => product.id === item.name);
  products.splice(index,1);
  this.setState(state => ({
      products: products, 
      subTotal: state.subTotal - item.price*item.quantity
  }));

}

calculateSubTotal() {
  let subTotal = 0;
  this.state.products.map((item) => subTotal += parseInt(item.price)*item.quantity);
  return subTotal;
}

cancelSale(){
  this.setState({
      products: [],
      subTotal: 0
  })
}
	render(){
		return(
			<DataProvider value={{quantityHandler: this.quantityHandler, deleteItem: this.deleteItem}}>
                  <section className="home-screen">
                     
                  <LeftBlock quantityHandler={this.quantityHandler} insertItem={this.state.products} subTotal={this.state.subTotal} cancelSale={this.cancelSale} />
                  <RightBlock projectData={ProjectData} addItem={this.addItem} />
                  </section>  

                </DataProvider>
			)
	}
}