import { createContext, useState } from "react"

export const AppContext = createContext();

const AppProvider = ({children}) => {
  
    const [task, setTask] = useState({
      id: "",
      content: "",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    });
    const [items, setItems] = useState([]);
    const [taskId, setTaskId] = useState();
    const [showSideBar, setShowSideBar] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filterItemId, setFilterItemId] = useState("all");
    const[selectedCategoryId, setSelectedCategoryId] = useState("");
    
  return (
    <div>
        <AppContext.Provider value={{selectedCategoryId, setSelectedCategoryId, task, setTask, items, setItems, showSideBar, setShowSideBar, searchText ,setSearchText, filterItemId, setFilterItemId, taskId, setTaskId}}>
            {children}
        </AppContext.Provider>
    </div>
  )
}

export default AppProvider