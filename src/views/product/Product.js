import React from 'react';
import { connect } from 'react-redux';
import './Product.scss';
import ProductViewComponent from '../../components/productView/ProductView';
import { getProduct } from '../../redux/actions/product/product';
import { isEmpty } from 'lodash';
import { withRouter } from "react-router-dom";

class ProductView extends React.Component {

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.props.getProduct(id);
    }

    render() {

        const { loaded, errors } = this.props.productState;

        if(!isEmpty(errors)) {
            this.props.history.push('/products');
        }

        return (
            <div className="product-view">
                { loaded ? <ProductViewComponent {...this.props}/> : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { product: productState, baskets: basketsState } = state;
    return { productState,  basketsState }
}

const mapDispatchToProps = dispatch => ({
    getProduct: (id) => dispatch(getProduct(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductView));