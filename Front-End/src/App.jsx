import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="container">
        <div className="box">
          <div className='header'><h1>Basic CRUD App</h1></div>
          <div className='input-section'><div><input className="searchInput" type="text" placeholder='Search'/><button className='searchBtn'>Search</button></div><div><button className='createBtn'>Create New</button></div></div>

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
                <tr>
                  <td>1</td>
                  <td>Syed</td>
                  <td>21</td>
                  <td>Chennai</td>
                  <td><button className='editBtn'>Edit</button></td>
                  <td><button className='deleteBtn'>Delete</button></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Syed</td>
                  <td>21</td>
                  <td>Chennai</td>
                  <td><button className='editBtn'>Edit</button></td>
                  <td><button className='deleteBtn'>Delete</button></td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Syed</td>
                  <td>21</td>
                  <td>Chennai</td>
                  <td><button className='editBtn'>Edit</button></td>
                  <td><button className='deleteBtn'>Delete</button></td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
