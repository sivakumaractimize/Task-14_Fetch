let outPutData=[];
function getData() {
    fetch("http://localhost:3000/employe")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            outPutData=data;
            console.log(outPutData);
            let tableData="";
             
            let count=0;
            outPutData.map(emp =>{
                count++;
          
                tableData +=`
                <tr>
                    <th scope="row">${count}</th>
                    <td>${emp.Name}</td>
                    <td>${emp.Email}</td>
                    <td>${emp.Designation}</td>
                    <td><button class="btn btn-primary"  onclick="updateRecord('${emp.id.toString()}')"    >Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteRecord('${emp.id.toString()}')">Delete</button></td>

                   
                </tr>`;
                

            })
            document.getElementById("table-body").innerHTML = tableData;
           
              



        });
}




function add() {

    let name = $("#name").val();
    let email = $("#email").val();
    let desg = $("#designation").val();
    

    console.log(name);
    let senddata = {
      
        Name: name,
        Email: email,
        Designation: desg
    };
    console.log(senddata);

    fetch("http://localhost:3000/employe", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(senddata),
        
    })
    .then(response => {
        //alert("Employe added....!")
        return response.json();
       
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function deleteRecord(id) {
    const url = `http://localhost:3000/employe/${id}`;

    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Record deleted successfully');
        // Handle any further actions after successful deletion
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function updateRecord(id){

       let update=outPutData.find(value => value.id===id)

       console.log(update)
       $("#ubtn").css("display", "block");


       $("#name").val(update.Name);
       $("#email").val(update.Email);
       $("#designation").val(update.Designation);


       let updateBut=$("#ubtn");

       updateBut.on("click",function(event)
          {
               let name=  $("#name").val();
               let email=  $("#email").val();
               let desg= $("#designation").val();

               let updatedata = {
      
                Name: name,
                Email: email,
                Designation: desg
            };
               fetch(`http://localhost:3000/employe/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedata),
                
            })
            .then(response => {
                //alert("Employe Details Updated...!")
                return response.json();
                getData();
               
               
            })
            .catch(error => {
                console.error('Error:', error);
            });

          })


}


