import { Component } from "react";
import FiltersGroup from "../FiltersGroup";
import ProductCard from "../ProductCard";
import "./index.css"

const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS",
}

class ProductsSection extends Component {
    state = {
        initialProductsList: [],
        apiStatus: apiStatusConstants.initial,
        searchInput: "",
        colorFilterInput: "",
        typeFilterInput: "",
        genderFilterInput: "",
    }

    componentDidMount() {
        this.getProducts()
    }

    getProducts = async () => {
        this.setState({
            apiStatus: apiStatusConstants.inProgress
        })

        const apiUrl = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
        const options = {
            method: 'GET'
        }

        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const fetchedData = await response.json()
            this.setState({
                apiStatus: apiStatusConstants.success,
                initialProductsList: fetchedData
            })
        } else {
            this.setState({
                apiStatus: apiStatusConstants.failure,
            })
        }
    }

    onChangeSearchInput = (event) => {
        this.setState({ searchInput: event.target.value });
    };

    onChangeColorFilterInput = (value) => {
        this.setState({ colorFilterInput: value })
    }

    onChangeTypeFilterInput = (value) => {
        this.setState({ typeFilterInput: value })
    }

    onChangeGenderFilterInput = (value) => {
        this.setState({ genderFilterInput: value })
    }

    clearFilters = () => {
        this.setState({
            searchInput: "",
            colorFilterInput: "",
            typeFilterInput: "",
            genderFilterInput: "",
        })
    }

    renderProductsListView = () => {
        const { initialProductsList, searchInput, colorFilterInput, typeFilterInput, genderFilterInput } = this.state
        let finalFilteredList = []

        const searchedProductsList = initialProductsList.filter((product) =>
            product.name.toLowerCase().includes(searchInput.toLowerCase()))

        const colorFilteredProductsList = searchedProductsList.filter((product) =>
            product.color.toLowerCase().includes(colorFilterInput.toLowerCase()))

        if (colorFilteredProductsList.length === 0) {
            finalFilteredList = []
        } else {
            finalFilteredList = colorFilteredProductsList
        }

        const typeFilteredProductsList = finalFilteredList.filter((product) =>
            product.type.toLowerCase().includes(typeFilterInput.toLowerCase()))
        if (typeFilteredProductsList.length === 0) {
            finalFilteredList = []
        } else {
            finalFilteredList = typeFilteredProductsList
        }

        const genderFilteredProductsList = finalFilteredList.filter((product) =>
            product.gender.toLowerCase().startsWith(genderFilterInput.toLowerCase()))
        if (genderFilteredProductsList.length === 0) {
            finalFilteredList = []
        } else {
            finalFilteredList = genderFilteredProductsList
        }

        return (
            <div className="filters-products-section">
                <FiltersGroup onChangeColorFilterInput={this.onChangeColorFilterInput}
                    onChangeTypeFilterInput={this.onChangeTypeFilterInput}
                    onChangeGenderFilterInput={this.onChangeGenderFilterInput}
                    clearFilters={this.clearFilters} />
                <div className="products-container">
                    <input
                        type="search"
                        value={searchInput}
                        className="search-bar"
                        placeholder="search products..."
                        onChange={this.onChangeSearchInput}
                    />
                    {finalFilteredList.length ? <ul className="prodcts-list">
                        {finalFilteredList.map(product => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </ul> : <p >No Matching Products</p>
                    }
                </div>
            </div>
        )
    }

    renderFailureView = () => <p className="failure-loading-view">OOPS!!! Something Went Wrong</p>

    renderLoadingView = () => <p className="failure-loading-view">loading....</p>

    renderProducts = () => {
        const { apiStatus } = this.state

        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderProductsListView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            default:
                return null
        }
    }

    render() {
        return (
            <div className="products-section">
                {this.renderProducts()}
            </div>
        )
    }
}

export default ProductsSection