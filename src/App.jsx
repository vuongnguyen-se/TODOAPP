//import { useRef } from "react";
import { useMemo, useContext } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem.jsx";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { AppContext } from "./context/AppProvider.jsx";

function App() {
  // const [task, setTask] = useState({
  //   id: "",
  //   content: "",
  //   isImportant: false,
  //   isCompleted: false,
  //   isDeleted: false,
  //   category: "personal",
  // });

  //useState variable to get hold of the selected Filter Item Id (that user clicked into)
  // const [filterItemId, setFilterItemId] = useState("all");
  // const [items, setItems] = useState([]);
  //useState variable to toggle the sidebar
  // const [showSideBar, setShowSideBar] = useState(false);
  // const [taskId, setTaskId] = useState();
  // const [searchText, setSearchText] = useState("");
  //const inputRef = useRef();

  //use the selected Category Id from AppProvider
  const {selectedCategoryId, task, setTask, items, setItems, showSideBar, setShowSideBar, searchText, filterItemId, taskId, setTaskId}= useContext(AppContext);

  function handleChange(e) {
    const ValueInput = e.target.value;
    console.log(ValueInput);
    setTask({
      ...task,
      id: crypto.randomUUID(),
      content: ValueInput,
    });
    console.log(task);
  }

  function handleEnter() {
    setItems([...items, task]);
    console.log(items);
  }

  const handleCheckBox = (taskId) => {
    let newItems = items.map((item) => {
      if (item.id === taskId) {
        return { ...item, isCompleted: !item.isCompleted };
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

  const handleItemClick = (task_id) => {
    setShowSideBar(true);
    setTaskId(task_id);
  };
  const findTask = items.find((item) => item.id === taskId);

  const handleSideBarSave = (newTodoTask) => {
    const newTodoTask1 = items.map((item) => {
      if (item.id === newTodoTask.id) {
        return newTodoTask;
      }
      return item;
    });
    setItems(newTodoTask1);
  };

  const todoList = useMemo(() => {
    return items.filter((task) => {
      // search function
      if(!task.content.includes(searchText)){
        return false;
      }
      // filter category function (personal, company , travel, idea)
      if(selectedCategoryId && task.category != selectedCategoryId){
        return false;
      }

      // filter function (all, important, completed, deleted)
      switch (filterItemId) {
        case "all":
          return true;
        case "important":
          return task.isImportant === true;
        case "completed":
          return task.isCompleted === true;
        case "deleted":
          return task.isDeleted === true;
        default:
          return true;
      }
    });
  }, [items, filterItemId, searchText, selectedCategoryId])
  .map((task) => {
    return (
      <TodoItem
        key={task.id}
        id={task.id}
        name={task.content}
        isImportant={task.isImportant}
        isCompleted={task.isCompleted}
        handleCheckBoxChange={handleCheckBox}
        handleItemClick={handleItemClick}
      />
    );
  });

  return (
    <div className="container">
      <FilterPanel
        // filterItemId={filterItemId}
        // setFilterItemId={setFilterItemId}
        // itemList={items}
        // searchText = {searchText}
        // setSearchText = {setSearchText}
      />
      <div className="main-content">
        <input
          type="text"
          className="taskInput"
          placeholder="add new task"
          value={task.content}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTask({ ...task, content: "" });
              handleEnter(e);
            }
          }}
        />
        <div>{todoList}</div>
        {showSideBar && (
          <Sidebar
            key={taskId}
            handleSideBarSave={handleSideBarSave}
            TaskDATA={findTask}
            // setShowSideBar={setShowSideBar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
