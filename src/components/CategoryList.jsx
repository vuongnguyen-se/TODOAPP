import { useContext } from "react";
import { Category_Items } from "../constants";
import "./CategoryList.css";
import { AppContext } from "../context/AppProvider";

const CategoryList = ({Amount_CategoryItem}) => {
  const {selectedCategoryId, setSelectedCategoryId} = useContext(AppContext);
  return (
    <div>
      <p>Categories</p>
      <div>
        {Category_Items.map((category) => {
          return (
            <div key={category.id} className={`category-item ${category.id === selectedCategoryId ? "selected" : ""}`} onClick={() => setSelectedCategoryId(category.id)}>
              <p>{category.label}</p>
              <p>{Amount_CategoryItem[category.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
