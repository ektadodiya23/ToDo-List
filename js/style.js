const adduserBtn = document.getElementById('addUser');
const btnText = adduserBtn.innerText ; 
const userText = document.getElementById('username');
const Agecount = document.getElementById('userAge');
const displayRecord = document.getElementById('displayTable');


let userdata = [];

let editId = null;

// get data from localstorage...
userdata = JSON.parse(localStorage.getItem('users')) ?? [];



adduserBtn.onclick = () => {
    const name = userText.value;
    const age = Agecount.value;
    let adddata = {
        user: name,
        userage: age
    }
    if(editId!=null){
        // edit

        userdata.splice(editId , 1 , adddata);
    }else{
        // insert
        userdata.push(adddata);
    }
    saveInfo(userdata);
    userText.value = '';
    Agecount.value = '';
    displayINfo();
    adduserBtn.innerText = btnText ;

}

function saveInfo(userdata) {
    let str = JSON.stringify(userdata)
    localStorage.setItem('users', str);

}

function displayINfo() {

    let table = '';
        userdata.forEach((data, i) => {
            table +=
                `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${data.user}</td>
            <td>${data.userage}</td>
            
            <td>
                <span class="dlt-btn" onclick=' deleteInfo(${i})'><i
                        class=" fa-regular fa-trash-can "></i></span>
                <span class="dlt-btn" onclick=' editInfo(${i})'><i
                        class="fa-regular fa-pen-to-square"></i></span>
            </td>
            
        </tr>
            
        `
        
        });

        displayRecord.innerHTML = table;
}
displayINfo()

function editInfo(id) {

    editId = id ;
    userText.value = userdata[id].user ; 
    Agecount.value = userdata[id].userage ; 
    adduserBtn.innerText = 'Save Change !'
}




function deleteInfo(id) {
     
    userdata.splice(id ,1);
    saveInfo(userdata);
    displayINfo();  
       
}