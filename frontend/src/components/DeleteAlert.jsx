import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className='text-sm text-white'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button
                type="button"
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors'
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    </div>
  );
};

export default DeleteAlert