import React, { useEffect, useState } from 'react';

const Problem2 = () => {
  //   const history = useHistory();
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);
  const [modalC, setModalC] = useState(false);
  //   const [country, setCountry] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const fetchContacts = async () => {
    try {
      const response = await fetch(
        'https://contact.mediusware.com/api/contacts/?format=json'
        // `https://contact.mediusware.com/api/country-contacts/${country}/?format=json`
      );
      const data = await response.json();
      setAllContacts(data.results);
      setUSContacts(
        data.results.filter(
          (contact) => contact.country.name === 'United States'
        )
      );
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleModalA = () => {
    // history.push('/all-country');
    setModalA(true);
    setModalB(false);
  };

  const handleModalB = () => {
    // history.push('/united States');
    setModalB(true);
    setModalA(false);
  };

  const handleCloseModals = () => {
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
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleCloseModals}
              >
                Close
              </button>
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
                {/* Table headers */}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Country</th>
                  </tr>
                </thead>
                {/* Table body */}
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
              <button
                type='button'
                className='btn btn-secondary'
                onClick={handleCloseModals}
              >
                Close
              </button>
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
              {/* Add more details as needed */}
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
