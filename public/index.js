   let username = document.getElementById("user");
let password = document.getElementById("pass");
let msg = document.getElementById("message");

async function get_accounts(){
    fetch("/account",(req,res)=>{
       
    }).then((res)=>{
        return res.json();
    }).then((datas)=>{
msg.innerHTML =datas[0].Message
    })
}


// insert records 
async function insert_records(){
 
   var login_data = {};
   login_data["username"]=username.value;
      login_data["password"]=password.value;
       login_data["isAdmin"]="false";
      
      fetch('/insert_records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indicate JSON content
        },
        body: JSON.stringify(login_data),
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
       
         alert(data.message);
         
      })
    }
      
    

    
    










async function login(){
 
   var login_data = {};
   login_data["username"]=username.value;
      login_data["password"]=password.value;
    
      fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indicate JSON content
        },
        body: JSON.stringify(login_data),
    }).then(coming_data=> coming_data.json()).then(datas=>{
        alert(datas.message)
    })
    

    
    
}

