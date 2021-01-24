import React, { Component } from 'react';
import './LeftBlock.css';
import {AddProduct} from './AddProduct';

export default class LeftBlock extends Component {
    constructor(props) {
        super(props)
        this.defaultState = {
            vat: "",
            discount: "",
            modalOpen: false
        }
        this.state = this.defaultState;
        this.vatHandler = this.vatHandler.bind(this);
        this.discountHandler = this.discountHandler.bind(this);
    }


    vatHandler(e) {
        this.setState({ vat: e.target.value })
    }
    discountHandler(e) {
        this.setState({ discount: e.target.value })
    }
    calculatePercent(percent, total) {
        return percent === '' ? 0 : (total * parseInt(percent)) / 100;
    }
    calculateTotal(subTotal = 0) {
        let vat = this.calculatePercent(this.state.vat, subTotal);
        let discount = this.calculatePercent(this.state.discount, subTotal);
        return parseInt(subTotal) + vat - discount;
    }
    calculateTotalQty() {
        let totQty = 0;
        this.props.insertItem.map((item) => totQty += item.quantity);
        return totQty;
    }
    resetState() {
        this.setState(() => this.defaultState);
    }
    processSale() {
        this.setState({ modalOpen: true })
    }
    closeModal() {
        this.setState({ modalOpen: false })
        this.resetState();
    }
    render() {
        return (
            <div className="panel left-panel">
            <div className="product-label">
                <div className="wide-div">PRODUCTS</div>
                <div className="fx-1">PRICE</div>
                <div className="fx-1">QUANTITY</div>
                <div className="fx-1">TOTAL</div>
            </div>
            <div className="added-products">
                {
                    Object.keys(this.props.insertItem).length === 0 ? <div className="no-product">THERE ARE NO PRODUCTS</div> : <AddProduct itemDesc={this.props.insertItem} />
                }

            </div>
            <div className="tax-and-total">
                <div className="tat-item">
                    <div className="tat-heading">SubTotal</div>
                    <div className="tat-data"><span>{this.props.subTotal} EUR</span><span>{this.calculateTotalQty()} items</span></div>
                </div>
                <div className="tat-item">
                    <div className="tat-heading">VAT tax</div>
                    <div className="tat-data">
                        <input onChange={this.vatHandler} value={this.state.vat} placeholder="N/A" className="inp-grey" />
                        <span>{this.calculatePercent(this.state.vat, this.props.subTotal)} EUR</span>
                    </div>
                </div>
                <div className="tat-item">
                    <div className="tat-heading">Discount</div>
                    <div className="tat-data">
                        <input onChange={this.discountHandler} value={this.state.discount} placeholder="N/A" className="inp-grey" />
                        <span>{this.calculatePercent(this.state.discount, this.props.subTotal)} EUR</span>
                    </div>
                </div>
                <div className="tat-item">
                    <div className="tat-heading">Total</div>
                    <div className="tat-data"><span className="total-amount">{this.calculateTotal(this.props.subTotal)} EUR</span></div>
                </div>
            </div>
            <div className="btn-wrapper">
                <button className="btn-red" onClick={() => { this.props.cancelSale(); this.resetState(); }}>CANCEL SALE</button>
                <button className="btn-green" onClick={() => { this.processSale(); }}>PROCESS SALE</button>
            </div>
            <div className={`modal-home ${this.state.modalOpen ? 'show-modal' : ''}`}>
                <div className="modal-receipt">
                    <div className="receipt-head">Receipt</div>
                    <div className="receipt-body">
                        <div className="receipt-data">
                            <div className="sale-no">Sale no.: 00102</div>
                            <div className="date-col">{Date()}</div>
                            <div className="data-1">
                                <div className="data-th-1">
                                    <div>#</div>
                                    <div>products</div>
                                    <div>Quantity</div>
                                    <div>SubTotal</div>
                                </div>

                                {
                                    this.props.insertItem.map((item, ind) => (
                                        <div className="data-tr-1" key={item.name}>
                                            <div>{ind}</div>
                                            <div>{item.name}</div>
                                            <div>{item.quantity}</div>
                                            <div>{item.price} INR</div>
                                        </div>

                                    ))
                                }


                            </div>
                            <div className="data-2">
                                <div className="tr-2">
                                    <div>Total Items</div>
                                    <div>{this.calculateTotalQty()}</div>
                                    <div>Total</div>
                                    <div>{this.calculateTotal(this.props.subTotal)} INR</div>
                                </div>
                                <div className="tr-3">
                                    <div>Discount</div>
                                    <div>{this.state.vat} %</div>
                                </div>
                                <div className="tr-3">
                                    <div>VAT</div>
                                    <div>{this.state.discount} %</div>
                                </div>
                            </div>

                        </div>
                        <button className="close-modal" onClick={() => { this.props.cancelSale(); this.closeModal() }}>Close</button>
                    </div>
                </div>
            </div>
        </div >
        )
    }
}

