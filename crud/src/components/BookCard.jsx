import React from 'react'


//bilesen prop alirken deconstuct yontemi ile direkt alinabilir
const BookCard = ({book, handleModal, handleRead ,handleEditModal}) => {
  
  return (
    <div className='d-flex border rounded shadow p-3 justify-content-between align-items-center mt-4'>
   <div>
    <h5 
    style=
    {{textDecoration: book.isRead ? 'line-through' : 'none',}}>{book.title}</h5>
    <p>{book.date}</p>
   </div>
   <div className='btn-group'>
    <button className='btn btn-danger' onClick={() => handleModal(book.id)}>Delete</button>
    <button className='btn btn-primary' onClick={() => handleEditModal(book)}>Edit</button>
    <button className='btn btn-success' onClick={()=> handleRead(book)}>
        {
            book.isRead ? 'Read' : 'Unread'
        }
    </button>
   </div>
    </div>
  )
}

export default BookCard
