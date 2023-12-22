import React, { useEffect, useState } from 'react';
import ModalA from './ModalA';
import ModalB from './ModalB';
import ModalC from './ModalC';
const Problem2 = () => {
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);
  const [modalC, setModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const updateUrl = (path) => {
    window.history.pushState({}, '', path);
  };

  const handleModalA = () => {
    setSearchTerm('');
    updateUrl('/problem-2/all-contacts');
    setModalA(true);
    setModalB(false);
  };

  const handleModalB = () => {
    setSearchTerm('');
    updateUrl('/problem-2/us-contacts');
    setModalB(true);
    setModalA(false);
  };

  const handleCloseModals = () => {
    updateUrl('/problem-2');
    setModalA(false);
    setModalB(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setModalC(true);
  };
  const handleCloseModalsC = () => {
    setSearchTerm('');

    setModalC(false);
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
        <div className='d-flex justify-content-center gap-3'>
          <button
            className='btn btn-lg btn-outline-primary'
            onClick={handleModalA}
          >
            All Contacts
          </button>
          <button
            className='btn btn-lg btn-outline-warning'
            onClick={handleModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      <ModalA
        modalA={modalA}
        handleCloseModals={handleCloseModals}
        handleContactClick={handleContactClick}
        onlyEven={onlyEven}
        handleModalA={handleModalA}
        handleModalB={handleModalB}
      />

      {/* Modal B */}
      <ModalB
        modalB={modalB}
        handleCloseModals={handleCloseModals}
        handleContactClick={handleContactClick}
        onlyEven={onlyEven}
        handleModalA={handleModalA}
        handleModalB={handleModalB}
      />

      {/* Modal C */}
      <ModalC
        modalC={modalC}
        selectedContact={selectedContact}
        handleCloseModalsC={handleCloseModalsC}
      />
    </div>
  );
};

export default Problem2;

//  <div
//    className={`modal fade ${modalA ? 'show' : ''}`}
//    style={{ display: modalA ? 'block' : 'none' }}
//    tabIndex='-1'
//  >
//    <div className='modal-dialog  modal-dialog-scrollable'>
//      <div className='modal-content'>
//        <div className='modal-header '>
//          <h5 className='modal-title'>All Contacts</h5>

//          <div className='d-flex justify-content-end align-items-center'>
//            <div className='me-3'>
//              <input
//                type='text'
//                className='form-control'
//                placeholder='Search Contacts'
//                value={searchTerm}
//                onChange={handleSearchInputChange}
//                // onKeyPress={(e) =>
//                //   e.key === 'Enter' && handleSearchInputEnter()
//                // }
//              />
//            </div>
//            <button
//              type='button'
//              className='btn-close'
//              onClick={handleCloseModals}
//            ></button>
//          </div>
//        </div>

//        <div
//          className='modal-body modal-body-scrollable '
//          onScroll={handleModalScroll}
//        >
//          {/* Table to display contacts */}
//          <table className='table table-striped bordered hover'>
//            <thead>
//              <tr>
//                <th>ID</th>
//                <th>Phone</th>
//                <th>Country</th>
//              </tr>
//            </thead>
//            {/* Table body */}
//            <tbody>
//              {filteredContactsA?.map((contact) => (
//                <tr key={contact.id} onClick={() => handleContactClick(contact)}>
//                  <td>{contact.id}</td>
//                  <td>{contact.phone}</td>
//                  <td>{contact.country.name}</td>
//                </tr>
//              ))}
//            </tbody>
//          </table>
//        </div>
//        <div className='modal-footer'>
//          {/* Checkbox for 'Only even' */}
//          <div className='form-check form-switch'>
//            <input
//              className='form-check-input'
//              type='checkbox'
//              id='onlyEven'
//              checked={onlyEven}
//              onChange={handleCheckboxChange}
//            />
//            <label className='form-check-label' htmlFor='onlyEven'>
//              Only even
//            </label>
//          </div>

//          {/* ... (modal content) */}
//          <div className='modal-footer'>
//            {/* Switch to Modal B Button */}
//            <button
//              type='button'
//              className='btn btn-primary'
//              onClick={handleModalA}
//              style={{ backgroundColor: '#46139f' }}
//            >
//              All Contacts
//            </button>
//            {/* Switch to Modal B Button */}
//            <button
//              type='button'
//              className='btn btn-warning'
//              onClick={handleModalB}
//              style={{ backgroundColor: '#ff750' }}
//            >
//              US Contacts
//            </button>
//            {/* Close Modal A Button */}
//            <button
//              type='button'
//              className='btn btn-secondary'
//              onClick={handleCloseModals}
//              style={{
//                backgroundColor: '#ffff',
//                borderColor: '#46139f',
//                color: 'black',
//              }}
//            >
//              Close
//            </button>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>;

// <div
//   className={`modal fade ${modalB ? 'show' : ''}`}
//   style={{ display: modalB ? 'block' : 'none' }}
//   tabIndex='-1'
// >
//   <div className='modal-dialog modal-dialog-scrollable'>
//     <div className='modal-content'>
//       <div className='modal-header'>
//         <h5 className='modal-title'>US Contacts</h5>

//         <div className='d-flex justify-content-end align-items-center'>
//           <div className='me-3'>
//             <input
//               type='text'
//               className='form-control'
//               placeholder='Search Contacts'
//               value={searchTerm}
//               onChange={handleSearchInputChange}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearchInputEnter()}
//             />
//           </div>
//           <button
//             type='button'
//             className='btn-close'
//             onClick={handleCloseModals}
//           ></button>
//         </div>
//       </div>
//       <div
//         className=' modal-body modal-body-scrollable'
//         onScroll={handleModalScroll}
//       >
//         {/* Table to display US contacts */}
//         <table className='table table-striped bordered hover'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Phone</th>
//               <th>Country</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredContactsB?.map((contact) => (
//               <tr key={contact.id} onClick={() => handleContactClick(contact)}>
//                 <td>{contact.id}</td>
//                 <td>{contact.phone}</td>
//                 <td>{contact.country.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='modal-footer'>
//         {/* Checkbox for 'Only even' */}
//         <div className='form-check form-switch'>
//           <input
//             className='form-check-input'
//             type='checkbox'
//             id='onlyEven'
//             checked={onlyEven}
//             onChange={handleCheckboxChange}
//           />
//           <label className='form-check-label' htmlFor='onlyEven'>
//             Only even
//           </label>
//         </div>

//         <div className='modal-footer'>
//           {/* Switch to Modal B Button */}
//           <button
//             type='button'
//             className='btn btn-primary'
//             onClick={handleModalA}
//             style={{ backgroundColor: '#46139f' }}
//           >
//             All Contacts
//           </button>
//           {/* Switch to Modal B Button */}
//           <button
//             type='button'
//             className='btn btn-warning'
//             onClick={handleModalB}
//             style={{ backgroundColor: '#ff750' }}
//           >
//             US Contacts
//           </button>
//           {/* Close Modal A Button */}
//           <button
//             type='button'
//             className='btn btn-secondary'
//             onClick={handleCloseModals}
//             style={{
//               backgroundColor: '#ffff',
//               borderColor: '#46139f',
//               color: 'black',
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>;

//   <div
//     className={`  modal fade ${modalC ? 'show' : ''} `}
//     style={{ display: modalC ? 'block' : 'none' }}
//     id='staticBackdrop'
//     data-bs-backdrop='static'
//     data-bs-keyboard='false'
//     tabindex='-1'
//     aria-labelledby='staticBackdropLabel'
//     aria-hidden='true'
//   >
//     <div className='modal-dialog modal-dialog-centered'>
//       <div className='modal-content'>
//         <div className='modal-body'>
//           {/* Display details of the selected contact */}
//           <p>ID: {selectedContact?.id}</p>
//           <p>Phone: {selectedContact?.phone}</p>
//           <p>Country: {selectedContact?.country?.name}</p>
//         </div>
//         <div className='modal-footer'>
//           <button
//             type='button'
//             className='btn btn-secondary'
//             onClick={handleCloseModalsC}
//             style={{
//               backgroundColor: '#ffff',
//               borderColor: '#46139f',
//               color: 'black',
//             }}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>;
