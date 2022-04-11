import React from "react"

const Forms = () => {
    const [formData, setFormData] = React.useState({
        username:"",
        age:"",
        address:"",
        department:"",
        salary:"",
        isMarried:"",

        
    });
    const[forms, setFormsData] = React.useState([])

    React.useEffect( () => {
        getForms()
    },[])

    const  getForms = () =>{
        fetch(`http://localhost:3001/forms`)
        .then( (res) => res.json())
        .then( (res) => setFormsData(res))
        
        .catch( (err) => console.log(err))
    }
    // console.log(forms)
    

    

    const onSubmit = (e) =>{
        e.preventDefault()
        
        const payloadjson = JSON.stringify(formData)
        console.log(payloadjson)
      

        fetch(`http://localhost:3001/forms`, {
            method:"POST",
            body:payloadjson,
            headers:{
                "content-type":"application/json"
            }
            
        }).then ((res) =>res.json())
        .then( (res) => setFormsData(res))
        
    }
    const handelChange = (e) => {
          let{name,value,checked,type} =  e.target
          value = type ===  "checkbox" ? checked : value;


          setFormData((prev) => ({...prev, [name]:value}))
    }
    
     
  
    const { username,age,address,department,salary,isMarried} = formData
    
    return(
        <div>
            <h1>FORM : Persons Details</h1>
            <form onSubmit={onSubmit} >
                <label htmlFor="">Employee Name
                    <input type="text" name = "username" value={username} onChange = {handelChange} />
                </label><br /><br />
                <label htmlFor="">Age
                    <input type="number" name = "age" value={age} onChange = {handelChange} />
                </label><br /><br />
                <label htmlFor="">Address
                    <input type="text" name = "address" value={address} onChange = {handelChange} />
                </label><br /><br />
                <label htmlFor="">Department
                <select name="department"  value={department} onChange = {handelChange}>
                    <option value="cs">cs</option>
                    <option value="IT">IT</option>
                    <option value="ME">ME</option>
                    <option value="Finance">FInance</option>
                </select>
                </label><br /><br />
                <label htmlFor="">
                    salary
                    <input type="number" name = "salary" value={salary} onChange = {handelChange} />
                </label><br /><br />

                <label htmlFor="">
                  isMarried
                  <input type="checkbox" name = "isMarried" value = {isMarried} onChange={handelChange}/>

                </label><br /><br />

                


                <input type="submit" />
                <br />


                
            {forms.map((item) => {
                return  <div>
                    
                {"Name: " + item.username} <br />
                {"Age: " + item.age} <br />
                {"Address: " + item.address} <br />
                {"Department: " + item.department} <br />
                {"Salary: " + item.salary} <br />
                {"Married Status: " + item.isMarried} <br />
                <br /><br />
                </div>
                
            })}
                

            </form>

      </div>
    )
}

export {Forms}