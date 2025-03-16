import "./FilterPanel.css";

const FilterList = ({
  filterItems,
  filterItemId,
  setFilterItemId,
  FilterPanel_number,
}) => {
  return (
    <div className="filter-container">
      {filterItems.map((filterItem) => {
        return (
          <div key={filterItem.id} className={` filter-item ${filterItem.id === filterItemId ? "selected" : ""}`}
            onClick={() => setFilterItemId(filterItem.id)}>

            <div className="filter-name">
              <img src={filterItem.iconPath} />
              <p>{filterItem.label}</p>
            </div>
            <p>{FilterPanel_number[filterItem.id]}</p>

          </div>);
      })}
    </div>
  );
};

export default FilterList;
