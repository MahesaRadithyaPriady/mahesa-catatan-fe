import React, { useState } from "react";
import Modal from "react-modal";
import Btn from "../components/btn";
import DeleteCatatanV from "../validation/deleteCatatan";

Modal.setAppElement("#root");

const handleDelete = async (id) => {
  const deleteCatatan = await DeleteCatatanV(id);
  if (deleteCatatan.success) {
  } else {
    console.log(deleteCatatan);
  }
};

const BtnErrorTrash = ({ id }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Btn typeBtn="error" onclickHandler={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </Btn>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="bg-black bg-opacity-50 fixed inset-0"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
          <p className="text-gray-600 mt-2">
            This action will permanently delete the item.
          </p>
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(id);
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BtnErrorTrash;
