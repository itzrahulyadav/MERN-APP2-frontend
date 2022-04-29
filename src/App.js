import { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios";

function App() {
  const [foodName,setFoodName] = useState('');
  const [days,setDays] = useState(0);
  const [foodList,setFoodList] = useState([]);
  const [newFoodName,setNewFoodName] = useState('');
 
  const addToList = () => {

       Axios.post("http://localhost:5000/insert",{
         foodName:foodName,
         days:days
       })
  }
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`);
  }
  const updateFood = (id) => {
    Axios.put("http://localhost:5000/update",
    {id:id,
    newFoodName:newFoodName}
    )
  }
  useEffect(()=>{
    Axios.get('http://localhost:5000/read').then(resp => {
       setFoodList(resp.data);
    })
  },[foodList])

  return (
    <div className="App">
     <h1>TodoList</h1>
     <label>food name:</label>
     <input type = "text" 
      onChange = {(e)=>setFoodName(e.target.value)}
     />
     <label>Days since you last ate:</label>
     <input type = "number" 
        onChange={(e) => setDays(e.target.value)}
     />
     <button onClick = {addToList}>Add to list</button>
     <h1>food list</h1>
     {
       foodList.map((ele,key)=>{
         return(
           <div key = {key}>
             <h1>{ele.foodName}</h1>
             <p>`I haven't eaten it till {ele.daysSinceIAte} days`</p>
             <input
              type = 'text'
              placeholder = "new food name" 
             onClick = {(e)=>setNewFoodName(e.target.value)}/>
             <button onClick = {()=>updateFood(ele._id)}>update</button>
             <button onClick = {()=>deleteFood(ele._id)}>Delete</button>
           </div>
         )
       })
     }
    </div>
  );
}

export default App;
