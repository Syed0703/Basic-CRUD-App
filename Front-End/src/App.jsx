import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [age, setAge] = useState(0);
  const [city, setCity] = useState();
  const [showCreateSection, setShowCreateSection] = useState(false);

  const [editId, setEditId] = useState(-1);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState(-1);
  const [editCity, setEditCity] = useState("");
  const [searchData, setSearchData] = useState([])
  const [search, setSearch] = useState("")

  const url = "http://localhost:3000";

  const getData = () => {
    fetch(url + "/data")
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreateNew = () => {
    setShowCreateSection((prev) => !prev);
  };

  const handleAddData = () => {
    setShowCreateSection((prev) => !prev);
    if (name.trim() !== "" && age > 0 && city.trim() !== "") {
      fetch(url + "/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, city }),
      }).then((res) => {
        if (res.ok) {
          setData([...data, { name, age, city }]);
          setName("");
          setAge(0);
          setCity("");
          alert("Data added");
        }
      });
    }
  };

  const handleDeleteData = (id) => {
    confirm("Are you sure you want to delete?");
    if (confirm) {
      fetch(url + "/data/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedData = data.filter((val) => val._id !== id);
        setData(updatedData);
      });
    }
  };

  const handleEditData = (item) => {
    // confirm("Are you sure you want to edit?")
    setEditId(item._id);
    setEditName(item.name);
    setEditAge(item.age);
    setEditCity(item.city);
    console.log(editId);
  };

  const handleUpdateData = () => {
    if (editName.trim() !== "" && editAge > 0 && editCity.trim() !== "") {
      fetch(url + "/data/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          age: editAge,
          city: editCity,
        }),
      }).then((res) => {
        if (res.ok) {
          // Update item to list
          const updatedData = data.map((item) => {
            if (item._id == editId) {
              item.name = editName;
              item.age = editAge;
              item.city = editCity;
            }
            return item;
          });

          setData(updatedData);
          setName("");
          setAge(0);
          setCity("");
          setEditId(-1);
        } else {
          console.log("Update error");
        }
      });
    }
  };

  const handleCancelEdit = () => {
    setEditId(-1);
    setEditCity("");
    setEditAge(0);
    setEditCity("");
  }

  const handleSearchData = () => {
  if (search.trim() !== "") {
    fetch(`${url}/data/search?q=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((res) => setData(res)) // Replace full data with search results
      .catch((err) => console.error("Search error:", err));
  } else {
    getData(); // Reset to full list if search is cleared
  }
};


  return (
    <>
      <div className="container">
        <div className="box">
          <div className="header">
            <h1>Basic CRUD App</h1>
          </div>
          <div className="input-section">
            {showCreateSection ? (
              <div className="createSection">
                <div className="inputs">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Enter the name"
                  />
                  <input
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                    placeholder="Enter the age"
                  />
                  <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                    placeholder="Enter the city"
                  />
                </div>
                <div>
                  <button className="createBtn" onClick={handleAddData}>
                    Add Data
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <input
                    className="searchInput"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="searchBtn" onClick={handleSearchData}>Search</button>
                  <button className="resetBtn" onClick={getData}>Reset</button>

                </div>
                <div>
                  <button className="createBtn" onClick={handleCreateNew}>
                    Create New
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="table">
            <table border="1">
              <thead>
                <tr>
                  <th className="id">#</th>
                  <th className="name">Name</th>
                  <th className="age">Age</th>
                  <th className="city">City</th>
                  <th className="edit">Edit</th>
                  <th className="delete">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>

                    <td>
                      {editId === item._id ? (
                        <input
                          type="text"
                          className="editNameInput"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Enter the name"
                        />
                      ) : (
                        item.name
                      )}
                    </td>

                    <td>
                      {editId === item._id ? (
                        <input
                          type="number"
                          className="editAgeInput"
                          value={editAge}
                          onChange={(e) => setEditAge(Number(e.target.value))}
                          placeholder="Enter the age"
                        />
                      ) : (
                        item.age
                      )}
                    </td>

                    <td>
                      {editId === item._id ? (
                        <input
                          type="text"
                          className="editCityInput"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          placeholder="Enter the city"
                        />
                      ) : (
                        item.city
                      )}
                    </td>

                    <td>
                      {editId === item._id ? (
                        <button className="editBtn" onClick={handleUpdateData}>
                          Update
                        </button>
                      ) : (
                        <button
                          className="editBtn"
                          onClick={() => handleEditData(item)}
                        >
                          Edit
                        </button>
                      )}
                    </td>

                    <td>
                      {editId === item._id ? (
                        <button
                          className="deleteBtn"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="deleteBtn"
                          onClick={() => handleDeleteData(item._id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
