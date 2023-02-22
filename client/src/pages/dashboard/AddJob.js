import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Add job </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='Position'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='Company'
            type='text'
            name='Company'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
          <button className='btn btn-block' type='clear' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Clear'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;