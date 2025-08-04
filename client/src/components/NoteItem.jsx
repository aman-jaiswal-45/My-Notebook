const NoteItem = ({ note, updateNote, openDeleteModal }) => {
// --- END: UPDATE NoteItem PROPS ---
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold text-gray-800">{note.title}</h5>
          <div className="flex items-center space-x-3">
            {/* --- START: UPDATE onClick HANDLER --- */}
            {/* Call openDeleteModal with the note's ID when the trash icon is clicked */}
            <i
              className="fas fa-trash-alt text-red-500 hover:text-red-700 cursor-pointer transition-colors"
              onClick={() => {
                openDeleteModal(note._id);
              }}
            ></i>
            {/* --- END: UPDATE onClick HANDLER --- */}
            <i
              className="fas fa-edit text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
              onClick={() => updateNote(note)}
            ></i>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{note.description}</p>
      </div>
      {note.tag && (
        <div className="self-start">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{note.tag}
          </span>
        </div>
      )}
    </div>
  );
};

export default NoteItem;