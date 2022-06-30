import './index.css'

const FiltersGroup = (props) => {

    const { onChangeColorFilterInput, onChangeTypeFilterInput, onChangeGenderFilterInput, clearFilters} = props

    const colors = ["Red", "White", "Green", "Yellow", "Blue", "Black", "Grey"]
    const genders = ["Men", "Women"]
    const types = ["Hoodie", "Basic", "Polo"]

    const onChangeColorFilter = (event) => {
        onChangeColorFilterInput(event.target.value)
    }
    const onChangeTypeFilter = (event) => {
        onChangeTypeFilterInput(event.target.value)
    }
    const onChangeGenderFilter = (event) => {
        onChangeGenderFilterInput(event.target.value)
    }
    const onClearFilters = () => {
        clearFilters()
    }

    return (
        <>
        <div className="mobile-filters">
            <span>Filters : </span>
            <select>
                {colors.map(color => <option onClick={onChangeColorFilter} value={color}>{color}</option>)}
            </select>
            <select>
                {types.map(type => <option onClick={onChangeTypeFilter} value={type}>{type}</option>)}
            </select>
            <select>
                {genders.map(gender => <option onClick={onChangeGenderFilter} value={gender}>{gender}</option>)}
            </select>
            <button type="button" onClick={onClearFilters}>clear Filters</button>
        </div>
        <div className="filters-group">
            <div className='filters'>
                <button type="button" onClick={onClearFilters}>clear Filters</button>
                <h4>Color</h4>
                <div className="filter-group">
                    {colors.map(color =>
                        <div>
                            <input type="radio" id={color} value={color} onChange={onChangeColorFilter} name="colors" />
                            <label htmlFor={color}>{color}</label>
                        </div>)}
                </div>
                <h4>Gender</h4>
                <div className="filter-group">
                    {genders.map(gender =>
                        <div>
                            <input type="radio" id={gender} value={gender} onChange={onChangeGenderFilter} name="genders" />
                            <label htmlFor={gender}>{gender}</label>
                        </div>)}
                </div>
                <h4>Type</h4>
                <div className="filter-group">
                    {types.map(type =>
                        <div>
                            <input type="radio" id={type} value={type} onChange={onChangeTypeFilter} name="types" />
                            <label htmlFor={type}>{type}</label>
                        </div>)}
                </div>
            </div>
        </div>
        </>
    )

}

export default FiltersGroup