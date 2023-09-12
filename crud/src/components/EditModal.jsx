import React from "react";

const EditModal = ({
  setShowEditModal,
  editItem,
  setEditItem,
  handleEditBook,
}) => {

  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Edit book name..</h5>
        <input
          type="text"
          value={editItem.title}
          className="form-control"
          onChange={(e) => setEditItem({...editItem, title: e.target.value })}
        />

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Abandon
          </button>
          <button className="btn btn-success" onClick={handleEditBook}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
