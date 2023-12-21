import React, { useState } from 'react';

const Problem1 = () => {
  const [show, setShow] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ name: '', status: '' });
  const handleClick = (val) => {
    setShow(val);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { name: formData.name, status: formData.status }]);
    setFormData({ name: '', status: '' });
  };

  const getFilteredAndSortedTasks = () => {
    // Filter tasks based on the selected filter
    let filteredTasks;
    if (show === 'active') {
      filteredTasks = tasks.filter((task) => task.status === 'Active');
    } else if (show === 'completed') {
      filteredTasks = tasks.filter((task) => task.status === 'Completed');
    } else {
      filteredTasks = tasks;
    }

    // Sort tasks: Active tasks first, Completed next, and others later
    return filteredTasks.sort((a, b) => {
      if (a.status === 'Active' && b.status !== 'Active') {
        return -1;
      } else if (a.status !== 'Active' && b.status === 'Active') {
        return 1;
      } else if (a.status === 'Completed' && b.status !== 'Completed') {
        return -1;
      } else if (a.status !== 'Completed' && b.status === 'Completed') {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
        <div className='col-6 '>
          <form
            onSubmit={handleFormSubmit}
            className='row gy-2 gx-3 align-items-center mb-4'
          >
            <div className='col-auto'>
              <input
                type='text'
                className='form-control'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-auto'>
              <input
                type='text'
                className='form-control'
                name='status'
                value={formData.status}
                placeholder='Status'
                onChange={handleInputChange}
              />
            </div>
            <div className='col-auto'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className='col-8'>
          <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
            <li className='nav-item'>
              <button
                className={`nav-link ${show === 'all' && 'active'}`}
                type='button'
                onClick={() => handleClick('all')}
              >
                All
              </button>
            </li>
            <li className='nav-item'>
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type='button'
                onClick={() => handleClick('active')}
              >
                Active
              </button>
            </li>
            <li className='nav-item'>
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type='button'
                onClick={() => handleClick('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className='tab-content'></div>
          <table className='table table-striped '>
            <thead>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            {getFilteredAndSortedTasks().map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
