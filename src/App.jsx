import { useEffect, useState } from 'react';
import './App.css';
import useCrud from './hooks/useCrud';
import UserForm from './components/UserForm';
import UserCard from './components/UserCard';

function App() {

  const urlBase = 'https://users-crud.academlo.tech/';

  const [isOpen, setIsOpen] = useState(false);

  const [updateUser, setUpdateUser] = useState();

  const [users, getUsers, createUser, deleteUser, editUser, isLoading, setIsLoading, hasError, setHasError] = useCrud(urlBase);


  useEffect(() => {
    const path = 'users';
    getUsers(path);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  }
  //console.log(hasError);

  return (
    <>
      {
        isLoading ?
          <h2>Loading...</h2>
          :
          <div className='app'>
            <header className='app_header'>

              <h1 className='app_title'> Users</h1>

              <button className='app_btn' onClick={handleOpen}> <ion-icon name="add-outline"></ion-icon>Create User</button>
            </header>

            <UserForm
              createUser={createUser}
              updateUser={updateUser}
              editUser={editUser}
              setUpdateUser={setUpdateUser}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              hasError={hasError}
              setIsLoading={isLoading}
            />
            {
              hasError ?
                <div className='app_err'>
                  <h2 className='app_info_err'> 👀 <br />invalid user</h2>
                  <button className='app_btn_err' onClick={() => { setHasError(false) }}><ion-icon name="play-back-outline"></ion-icon>Back</button>
                </div>
                :
                (
                  <div className='app_container'>
                    {
                      users?.map((user) => (
                        <UserCard
                          key={user.id}
                          user={user}
                          deleteUser={deleteUser}
                          setUpdateUser={setUpdateUser}
                        />
                      ))
                    }
                  </div>
                )
            }
          </div>
      }
    </>
  )
}

export default App;
