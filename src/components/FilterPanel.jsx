//import  { useState } from "react";
import PropTypes from "prop-types";
import "./FilterPanel.css";
import { useContext, useMemo } from "react";
import FilterList from "./FilterList";
import CategoryList from "./CategoryList";
import { AppContext } from "../context/AppProvider";
const filterItems = [
  {
    id: "all",
    label: "All",
    iconPath: "./inbox.png",
  },
  {
    id: "important",
    label: "Important",
    iconPath: "./flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./check.png",
  },
  {
    id: "deleted",
    label: "Deleted",
    iconPath: "./delete.png",
  },
];

const FilterPanel = () => {
  //import items (itemList) using useContext
  const {items : itemList, searchText, setSearchText, filterItemId, setFilterItemId} = useContext(AppContext);

  const FilterPanel_number = useMemo(() => {
    return itemList.reduce((acc, cur) => {
      let newAcc = {...acc};
      if(cur.isImportant){
        newAcc = {...newAcc, important: newAcc.important + 1};
      }
      if(cur.isCompleted){
        newAcc = {...newAcc, completed: newAcc.completed + 1};
      }
      if(cur.isDeleted){
        newAcc = {...newAcc, deleted: newAcc.deleted + 1};
      }
      return newAcc;
  
    }, {all: itemList.length, important: 0, completed: 0, deleted: 0});
  }, [itemList]) ;
  console.log({FilterPanel_number});

  const Amount_CategoryItem = useMemo(() =>{
    return itemList.reduce((acc, cur) => {
      // let newAcc = {...acc};
      console.log([cur.category]);
      switch (cur.category) {
        case "personal":
          return {...acc, personal: acc.personal + 1};

        case "company":
          return {...acc, company: acc.company + 1};

        case "travel":
          return  {...acc, travel: acc.travel + 1};

        case "idea":
          return {...acc, idea: acc.idea + 1};
        
        default:
          break;
      }
      // return newAcc;

    },{personal: 0, company: 0, travel: 0, idea: 0})
    
  }, [itemList]);
  console.log(Amount_CategoryItem);

  return (
    <div className="filter-panel">
      <input type="search-text" placeholder="Search" value = {searchText} onChange = {(e) => {
        setSearchText(e.target.value);
      }} />
      <div>
      <FilterList filterItems = {filterItems} 
      filterItemId = {filterItemId}
      setFilterItemId = {setFilterItemId}
      FilterPanel_number = {FilterPanel_number}/>
      </div>
      <div><CategoryList Amount_CategoryItem = {Amount_CategoryItem}/></div>
    </div>
  );
};

FilterPanel.propTypes = {
  filterItemId : PropTypes.string,
  setFilterItemId : PropTypes.func,
  itemList: PropTypes.array,
  searchText : PropTypes.string,
  setSearchText : PropTypes.func,
}

export default FilterPanel;
