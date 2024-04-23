import React from 'react';
import './styles/userCard.css';

const UserCard = ({user , deleteUser, setUpdateUser}) => {

   // console.log(user);

   const handleDelete = () => {
    deleteUser('users', user.id);

   }

   const handleEdit = () => {
    setUpdateUser(user);

   }

    return (
        <section className='user'>
            <h2 className='user_name'>{user.first_name} {user.last_name}</h2>
            <hr className='user_line'/>
            <ul className='user_list'>
                <li className='user_item' ><span>Email: </span><span>{user.email}</span></li>
                <li className='user_item' ><span>Birthday: </span><span><ion-icon name="gift-outline"></ion-icon> {user.birthday}</span></li>
            </ul>
            <hr className='user_line' />
            <div className='user_buttons'>
                <button className='user_btn' onClick={handleDelete}><ion-icon name="trash-outline"></ion-icon></button>
                <button onClick={handleEdit}><ion-icon name="create-outline"></ion-icon></button>
            </div>
        </section>
    )
}

export default UserCard;