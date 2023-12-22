import React, { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';
import { useDebounce } from '../hooks/useDebounce';

const ModalB = ({
  isOpen,
  modalB,
  handleCloseModals,
  handleContactClick,

  handleModalA,
  handleModalB,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [searchDelayTimer, setSearchDelayTimer] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);

  const [loading, setLoading] = useState(false);
  const debouncedTerm = useDebounce({
    searchQuery: searchTerm,
    delay: 600,
  });
  const usContacts = useFetchData(
    `https://contact.mediusware.com/api/country-contacts/united states/?format=json`,
    debouncedTerm,
    page
  );
  const filteredContactsB = onlyEven
    ? usContacts?.data?.filter((contact) => contact.id % 2 === 0)
    : usContacts.data;
  const handleModalScroll = (e) => {
    const target = e.target;

    if (
      target.scrollTop + target.clientHeight > target.scrollHeight - 10 &&
      !loading
    ) {
      usContacts.setPage((prevData) => prevData + 1);
    }
  };
  const handleCheckboxChange = () => {
    setOnlyEven(!onlyEven);
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;

    if (searchDelayTimer) {
      clearTimeout(searchDelayTimer);
    }

    const timer = setTimeout(() => {
      setSearchTerm(value);
    }, 100);
    setSearchDelayTimer(timer);
  };

  useEffect(() => {
    if (isOpen) {
      usContacts.fetchData();
    }
  }, [isOpen, usContacts]);

  return (
    <div
      className={`modal fade ${modalB ? 'show' : ''}`}
      style={{ display: modalB ? 'block' : 'none' }}
      tabIndex='-1'
    >
      <div className='modal-dialog modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>US Contacts</h5>

            <div className='d-flex justify-content-end align-items-center'>
              <div className='me-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search Contacts'
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && handleSearchInputEnter()
                  }
                />
              </div>
              <button
                type='button'
                className='btn-close'
                onClick={handleCloseModals}
              ></button>
            </div>
          </div>
          <div
            className=' modal-body modal-body-scrollable'
            onScroll={handleModalScroll}
          >
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
                {filteredContactsB?.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => handleContactClick(contact)}
                    style={{ cursor: 'pointer' }}
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
  );
};

export default ModalB;
