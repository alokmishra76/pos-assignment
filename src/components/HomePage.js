import React, {Component} from 'react';
import './HomePage.css';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import {DataProvider} from './homeContext';
import ProjectData from './productData/pos.product.json';

export default class HomePage extends Component{
	render(){
		return(
			<DataProvider value={{productQtyHandler: this.productQtyHandler, deleteItem: this.deleteItem}}>
                  <section className="home-screen">
                     
                  <LeftSide productQtyHandler={this.productQtyHandler} insertItem={this.state.products} subTotal={this.state.subTotal} cancelSale={this.cancelSale} />
                  <RightSide projectData={ProjectData} addItem={this.addItem} />
                  </section>  

                </DataProvider>
			)
	}
}