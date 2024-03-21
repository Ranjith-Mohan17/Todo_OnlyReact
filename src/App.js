import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState } from 'react';
import { useEffect } from "react";
function App() {
  const [items,setItems] = useState(JSON.parse(localStorage.getItem('todo_list')) || []);

    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')

    useEffect(()=>{
      console.log("load Time")},[items])
      
    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const addNewItem = { id, checked: false, item };
        const updatedItems = [...items, addNewItem];
        setItems(updatedItems);
        localStorage.setItem("todo_list", JSON.stringify(updatedItems));
    };
    const handleCheck = (id) => {
        const listItems = items.map((item) => 
        item.id===id ? {...item, checked:!item.checked}: item)
        setItems(listItems)
        localStorage.setItem("todo_list", JSON.stringify(listItems))
    }  
    const handleDelete = (id) => {
        const listItems = items.filter((item) =>
        item.id!==id)
        setItems(listItems)
        localStorage.setItem("todo_list", JSON.stringify(listItems))
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!newItem) return
      addItem(newItem)
      setNewItem('')
    }
  return (
    <div className="App">
      <Header />
      <AddItem 
         newItem={newItem}
         setNewItem={setNewItem}
         handleSubmit={handleSubmit}
         />
      <SearchItem search={search}
                  setSearch={setSearch}
          />
      <Content  items = {items .filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
