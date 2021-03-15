import React from 'react';
import {useState,useEffect} from "react";
import "./todoContainer.css";
import {Input,Button} from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlineBlankSharp';
import CheckBoxedIcon from '@material-ui/icons/CheckBoxSharp';
import {v4 as uuid} from "uuid";

//import CreateIcon from '@material-ui/icons/CreateSharp';
import DeleteIcon from '@material-ui/icons/DeleteSharp';

//localstorage
import {save,load} from "../storedata";

function TodoContainer() {
        //input handling
    const [inputValue,setInput] = useState("");
    const [items,setItems] = useState([]);
    const onInputChange=(e)=>{
        setInput(e.target.value);
    }
    const onInputKeyPress=(e)=>{
        if(e.key==="Enter" && inputValue) addItem();
    } 
    const addItem=()=>{
        setItems([...items,{name:inputValue,completed:false,id:uuid()}]);
        setInput("");
    }
    const deleteItem=(itemId)=>{
        setItems(items.filter(({id})=>id!==itemId));     
    }

    //loads data saved
    useEffect(() => {
    //let loadedData=loadParsed("todos");
    let data=load("todos");
    setItems(data);
    }, []);
    //saves data to localstorage
    useEffect(() => {
    save("todos",items);
    }, [items]);

    const TodoItem=({removeId,completed,name})=>{
        
        const completeItem=()=>{
            setItems(items.map(item=>{
                if(item.id===removeId){
                    return{
                        ...item,completed:!item.completed
                    }
                }
                return item;
            }))
        }
        return(
            <div className="todo-item">
            {completed ? <CheckBoxedIcon className="todo-item-checkbox" onClick={completeItem}/>
             : <CheckBoxIcon className="todo-item-checkbox" onClick={completeItem} />}
            {completed ? <div className="todo-item-name" style={{textDecoration:"line-through",color:"gray"}}>{name}</div>
            : <div className="todo-item-name">{name}</div> }

            <DeleteIcon className="todo-item-delete" onClick={()=>{deleteItem(removeId);}}/>
            </div>
        )
    }


    return (
        <div className="todo-container">
        <h2>What will you do today?</h2>

        <div className="todo-input">
        <Input className="todo-input-input" placeholder="📋 What needs to be done?" fullWidth onChange={onInputChange} value={inputValue} onKeyPress={onInputKeyPress}
        inputProps={{style:{color:"white"}}}></Input>
        <Button className="todo-input-button" color="primary" variant="contained" disabled={inputValue ? false : true} 
        onClick={addItem}>Add</Button>
        </div>
        <h3 className="todo-title">Todo List</h3>
        <div className="todo-items">
        {
        items.map((item,i)=>{
        return <TodoItem key={item.id} removeId={item.id} completed={item.completed} name={item.name}/>
        })
        }
          

        </div>

        </div>
    )
    
}

export default TodoContainer

/**
 * DISCORD THEME COLORS
 * #202225 left panel
 * #2f3136 left sidebar
 * #292b2f profile menu
 * #36393f message box
 * #2f3136 right sidebar
 * #202225 top bar
 */