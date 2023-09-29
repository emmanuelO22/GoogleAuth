import { auth, provider } from './FirebaseConfig';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      setUser(user);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  const handleLogout = () => {
    setUser(null);
  };
  const renderUserDetails = () => (
    <>
      <button className='btn btn-secondary btn-md' onClick={handleLogout}>
        Log Me Out
      </button>
      <h3>Welcome Esteemed User {user.displayName}</h3>
      <p>{user.email}</p>
      <div className='photo'>
        <img src={user.photoURL} alt="User Display Picture" referrerPolicy='no-referrer' />
      </div>
    </>
  );
  const renderLoginButton = () => (
    <button className='btn btn-danger btn-md' onClick={handleGoogleSignIn}>
      Sign In With Google Account
    </button>
  );
  return (
    <div className="wrapper">
      <div className='box'>
        {user ? renderUserDetails() : renderLoginButton()}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
export default App;