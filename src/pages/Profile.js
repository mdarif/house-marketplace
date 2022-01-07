import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

function Profile () {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  /*   useEffect(() => {
    setUser(auth.currentUser)
  }, []) */

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const navigate = useNavigate()

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in FB
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update the profile details')
    }
  }

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails(prevState => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails} //Don't change details if FALSE
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails} //Don't change details if FALSE
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile
