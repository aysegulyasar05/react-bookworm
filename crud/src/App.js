import { useState } from "react";
import { v4 } from "uuid";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import {toast} from  "react-toastify"


function App() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleChange = (e) => {
    setBookName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!bookName){
   toast.warn("Please add a book name.." , { autoClose:2000})
   return;
    }
    //kitap objesi olustur

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    //olusturulan kitap objesini kitaplar dizisine aktar
    //spread operatoru ile onceden eklenen elemanlari muhafaza et

    setBooks([...books, newBook]);

    //inputu ssifirla

    setBookName("");
    toast.success("Sucessfuly added..", { autoClose: 2000 })
  };

  // modal acma islemi

  const handleModal = (id) => {
    //id yi state aktar
    setDeleteId(id);

    //modali ekrana bas
    setShowDeleteModal(true);
  };

  //silme modali

  const handleDelete = () => {
    const filtered = books.filter((book) => book.id !== deleteId);

    setBooks(filtered);

    //modali kapat
    setShowDeleteModal(false);

    toast.warn("Successfully deleted..", { autoClose: 2000 })
  };
  //okundu butonuna tiklaninca calisir

  const handleRead = (book) => {
    //okundu degerini tersine cevir
    const updatedBook = { ...book, isRead: !book.isRead };

    // dizideki elemani güncellemek icin index,id degerlerini bilmeliz. sirasini bul
    const index = books.findIndex((item) => item.id === book.id);

    // books dizisinin kopyasini olusturcam
    const cloneBooks = [...books];

    //kopadaki gerekli elemanin güncelle

    cloneBooks[index] = updatedBook;

    //statei güncelle
    setBooks(cloneBooks);
  };

  //edit modali acar
  const handleEditModal = (book) => {
    //duzenlenecek elemani state aktar
    setEditItem(book);

    //modali ac
    setShowEditModal(true);
  };

  //kitabi günceller

  const handleEditBook = () => {
    //düzenleyecegimiz elemanin indexini bul
    const index = books.findIndex((book) => book.id === editItem.id);

    //statin kopyasini olustur
    const cloneBooks = [...books];

    //eski kitabi cikar yenisini koy
    cloneBooks.splice(index, 1, editItem);

    //stati güncelle
    setBooks(cloneBooks);

    //modali kapat
    setShowEditModal(false);

    toast.info("Book edited..", { autoClose: 2000 })
  };
  return (
    <div>
      <header className="bg-warning text-light py-3 text-center">
        <h1>Book Worm</h1>
      </header>
      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            placeholder="Add a book name.."
            onChange={handleChange}
            value={bookName}
            className="form-control shadow"
            type="search"
          />
          <button className="btn btn-success shadow">Add</button>
        </form>
        {books.length === 0 && <h4>No book has been added yet</h4>}
        {/*eger state icine eleman varsa */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </div>

      {/*Modallar kismi*/}
      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <EditModal
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;
