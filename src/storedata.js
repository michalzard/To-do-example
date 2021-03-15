function load(name){
if(name) return JSON.parse(localStorage.getItem(name));
}

function save(name,data){
if(name && data)localStorage.setItem(name,JSON.stringify(data));
}


export {save,load};