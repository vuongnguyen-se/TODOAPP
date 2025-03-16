import { useContext, useState } from 'react'
import "./Sidebar.css";
import { Category_Items } from '../constants';
import { AppContext } from '../context/AppProvider';

const Sidebar = (props) => {
  const {setShowSideBar} = useContext(AppContext);

  const data = props.TaskDATA;
  const [altContent, setContent] = useState(data.content);
  const[altIsImportant, setIsImportant] = useState(data.isImportant);
  const[altIsCompleted, setIsCompleted] = useState(data.isCompleted);
  const[altCategory, setAltCategory] = useState(data.category);

  const handleHittingSave = () => {
    const newTodoTask = {...data, content : altContent, isImportant : altIsImportant, isCompleted : altIsCompleted, category: altCategory};
    props.handleSideBarSave(newTodoTask);
    setShowSideBar(false);
  };

  return (
    <div className='sidebar'>
        <form className='sb-form'> 
          <div className='sb-form-field'>
          <label htmlFor="sb-name">Todo Name</label>
          <input id = "sb-name" type="text" value = {altContent} 
          onChange={(e) => setContent(e.target.value)}/>
          </div>
          <div className='sb-form-field'>
          <label htmlFor="sb-important">Is important</label>
          <input id = "sb-important" type="checkbox" checked = {altIsImportant} 
          onChange={() => setIsImportant(!altIsImportant)}/>
          </div>
          <div className='sb-form-field'>
          <label htmlFor="sb-completed">Is completed</label>
          <input id = "sb-completed" type="checkbox" checked = {altIsCompleted} 
          onChange={() => setIsCompleted(!altIsCompleted)}/>
          </div>

          <div className='sb-form-field'>
            <label htmlFor="category-items"> Category </label>
            <select id="category-items" value = {altCategory} onChange = {(e) => {setAltCategory(e.target.value)}}>
              {Category_Items.map((category) =>{ 
                return(
                <option value={category.id} key={category.id} >{category.label}</option>
                );
              })}
            </select>
          
          </div>
          
        </form>
        <div className='sb-footer'>
          <button onClick={handleHittingSave}>SAVE</button>
          <button onClick={() => props.setShowSideBar(false)}>CANCEL</button>
        </div>
        </div>
  )
}

export default Sidebar