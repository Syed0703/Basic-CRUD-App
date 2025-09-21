import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [data, setData] = useState([]);
  const [name, setName] = useState()
  const [age, setAge] = useState(0)
  const [city, setCity] = useState()
  const [showCreateSection, setShowCreateSection] = useState(false);

  const url = "http://localhost:3000";

  const getData = () => {
    fetch(url + "/data")
    .then(res => res.json())
    .then(res => setData(res))
  }
  
  useEffect(()=>{
    getData();
  },[])

  const handleCreateNew = () => {
    setShowCreateSection(prev=>!prev);
  }

  const handleAddData = () => {
    setShowCreateSection(prev => !prev);
    if(name.trim() !== '' && age > 0 && city.trim() !== ''){
      fetch(url + '/data', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, age, city })
      }).then((res) => {
        if(res.ok){
          setData([...data, { name, age, city }])
          setName("")
          setAge(0)
          setCity("")
        }
      })
    }
    
  }



  return (
    <>
      <div className="container">
        <div className="box">
          <div className='header'><h1>Basic CRUD App</h1></div>
          <div className='input-section'>
            { showCreateSection ? (
              <div className="createSection">
                <div className='inputs'>
                  <input type="text" onChange={(e)=>setName(e.target.value)} className='input' placeholder='Enter the name'/><input type="number" onChange={(e)=>setAge(e.target.value)} className='input' placeholder='Enter the age'/><input type="text" onChange={(e)=>setCity(e.target.value)} className='input' placeholder='Enter the city'/>
                </div>
                <div>
                  <button className='createBtn' onClick={handleAddData}>Add Data</button>
                </div>
              </div>)
            : (<><div><input className="searchInput" type="text" placeholder='Search' /><button className='searchBtn'>Search</button></div><div><button className='createBtn' onClick={handleCreateNew}>Create New</button></div></>) } 
          </div>

          <div className="table">
            <table border="1">
              <thead>
                <tr>
                  <th className='id'>#</th>
                  <th className='name'>Name</th>
                  <th className='age'>Age</th>
                  <th className='city'>City</th>
                  <th className='edit'>Edit</th>
                  <th className='delete'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index)=>{
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.city}</td>
                      <td><button className='editBtn'>Edit</button></td>
                      <td><button className='deleteBtn'>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
