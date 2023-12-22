import React from 'react';

const ModalC = ({ modalC, selectedContact, handleCloseModalsC }) => {
  return (
    <div
      className={`  modal fade ${modalC ? 'show' : ''} `}
      style={{ display: modalC ? 'block' : 'none' }}
      id='staticBackdrop'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabindex='-1'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered  '>
        <div className='modal-content'>
          <div className='modal-body'>
            {/* Display details of the selected contact */}
            <p>ID: {selectedContact?.id}</p>
            <p>Phone: {selectedContact?.phone}</p>
            <p>Country: {selectedContact?.country?.name}</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={handleCloseModalsC}
              style={{
                backgroundColor: '#ffff',
                borderColor: '#46139f',
                color: 'black',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalC;
