import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Problem2 = () => {
  const navigate = useNavigate();
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);
  const [modalC, setModalC] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  //   console.log('USE PARAMS', useParams());
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        'https://contact.mediusware.com/api/contacts/?format=json'
      );
      const data = await response.json();
      setAllContacts(data.results);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchUsContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/united states/?format=json`
      );
      const data = await response.json();
      setUSContacts(data.results);
    } catch (error) {
      console.error('Error fetching US-contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchUsContacts();
  }, []);

  const updateUrl = (path) => {
    window.history.pushState({}, '', path);
  };
  const handleModalA = () => {
    updateUrl('/problem-2/all-contacts');
    setModalA(true);
    setModalB(false);
  };

  const handleModalB = () => {
    updateUrl('/problem-2/us-contacts');
    setModalB(true);
    setModalA(false);
  };

  const handleCloseModals = () => {
    updateUrl('/problem-2');
    setModalA(false);
    setModalB(false);
    setModalC(false);
  };

  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setModalC(true);
  };
  const handleCloseModalsC = () => {
    setModalC(false);
  };
  const filteredContactsA = onlyEven
    ? allContacts.filter((contact) => contact.id % 2 === 0)
    : allContacts;
  const filteredContactsB = onlyEven
    ? usContacts.filter((contact) => contact.id % 2 === 0)
    : usContacts;

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
      <div
        className={`modal fade ${modalA ? 'show' : ''}`}
        style={{ display: modalA ? 'block' : 'none' }}
        tabIndex='-1'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>All Contacts</h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleCloseModals}
              ></button>
            </div>
            <div className='modal-body'>
              {/* Table to display contacts */}
              <table className='table table-striped bordered hover'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {filteredContactsA.map((contact) => (
                    <tr
                      key={contact.id}
                      onClick={() => handleContactClick(contact)}
                    >
                      <td>{contact.id}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.country.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              {/* Checkbox for 'Only even' */}
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlyEven'
                  checked={onlyEven}
                  onChange={handleCheckboxChange}
                />
                <label className='form-check-label' htmlFor='onlyEven'>
                  Only even
                </label>
              </div>

              {/* ... (modal content) */}
              <div className='modal-footer'>
                {/* Switch to Modal B Button */}
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={handleModalA}
                  style={{ backgroundColor: '#46139f' }}
                >
                  All Contacts
                </button>
                {/* Switch to Modal B Button */}
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={handleModalB}
                  style={{ backgroundColor: '#ff750' }}
                >
                  US Contacts
                </button>
                {/* Close Modal A Button */}
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleCloseModals}
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
      </div>

      {/* Modal B */}
      <div
        className={`modal fade ${modalB ? 'show' : ''}`}
        style={{ display: modalB ? 'block' : 'none' }}
        tabIndex='-1'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>US Contacts</h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleCloseModals}
              ></button>
            </div>
            <div className='modal-body'>
              {/* Table to display US contacts */}
              <table className='table table-striped bordered hover'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredContactsB.map((contact) => (
                    <tr
                      key={contact.id}
                      onClick={() => handleContactClick(contact)}
                    >
                      <td>{contact.id}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.country.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              {/* Checkbox for 'Only even' */}
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='onlyEven'
                  checked={onlyEven}
                  onChange={handleCheckboxChange}
                />
                <label className='form-check-label' htmlFor='onlyEven'>
                  Only even
                </label>
              </div>

              <div className='modal-footer'>
                {/* Switch to Modal B Button */}
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={handleModalA}
                  style={{ backgroundColor: '#46139f' }}
                >
                  All Contacts
                </button>
                {/* Switch to Modal B Button */}
                <button
                  type='button'
                  className='btn btn-warning'
                  onClick={handleModalB}
                  style={{ backgroundColor: '#ff750' }}
                >
                  US Contacts
                </button>
                {/* Close Modal A Button */}
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleCloseModals}
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
      </div>

      {/* Modal C */}
      <div
        className={`modal ${modalC ? 'show' : ''}`}
        style={{ display: modalC ? 'block' : 'none' }}
        tabIndex='-1'
        role='dialog'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='btn-close'
                onClick={handleCloseModalsC}
              ></button>
            </div>
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${modalC ? 'show' : ''}`}
        style={{ display: modalC ? 'block' : 'none' }}
        tabIndex='-1'
      >
        {/* Modal C content */}
        {/* Display details of the selected contact */}
      </div>
    </div>
  );
};

export default Problem2;
