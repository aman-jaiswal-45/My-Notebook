import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from '../components/AddNote';
import NoteItem from '../components/NoteItem';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center col-span-full h-40">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const Home = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { notes, loading, getNotes, editNote, deleteNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  // State for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  // --- START: CODE FOR DELETE CONFIRMATION ---
  // State to manage the delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // State to store the ID of the note to be deleted
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Function to open the delete modal
  const openDeleteModal = (id) => {
    setNoteToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  // Function to handle the actual deletion
  const handleDeleteConfirm = () => {
    deleteNote(noteToDelete);
    showAlert('Deleted Successfully', 'success');
    closeDeleteModal();
  };
  // --- END: CODE FOR DELETE CONFIRMATION ---

  const openEditModal = (currentNote) => {
    setIsEditModalOpen(true);
    setNoteToEdit({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    editNote(noteToEdit.id, noteToEdit.etitle, noteToEdit.edescription, noteToEdit.etag);
    setIsEditModalOpen(false);
    showAlert('Updated Successfully', 'success');
  };

  const onChange = (e) => {
    setNoteToEdit({ ...noteToEdit, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Edit Note Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          {/* ... (edit modal content remains the same) ... */}
           <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="etitle" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" id="etitle" name="etitle" value={noteToEdit.etitle} onChange={onChange} minLength={5} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="mb-4">
                <label htmlFor="edescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea id="edescription" name="edescription" value={noteToEdit.edescription} onChange={onChange} minLength={5} required rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="etag" className="block text-gray-700 text-sm font-bold mb-2">Tag</label>
                <input type="text" id="etag" name="etag" value={noteToEdit.etag} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button onClick={() => setIsEditModalOpen(false)} type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Close
                </button>
                <button disabled={noteToEdit.etitle.length < 5 || noteToEdit.edescription.length < 5} onClick={handleUpdateNote} type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400">
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- START: JSX FOR DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
            <h3 className="text-xl font-bold text-center">Confirm Deletion</h3>
            <p className="text-center text-gray-600 my-4">Are you sure you want to delete this note? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4 mt-6">
              <button onClick={closeDeleteModal} className="py-2 px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- END: JSX FOR DELETE CONFIRMATION MODAL --- */}


      <div className="my-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <LoadingSpinner />
          ) : notes.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No notes to display. Add one above!</p>
          ) : (
            // Pass the openDeleteModal function as a prop to NoteItem
            notes.map((note) => (
              <NoteItem key={note._id} updateNote={openEditModal} note={note} openDeleteModal={openDeleteModal} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;