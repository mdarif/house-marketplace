import { useNavigate, useLocation } from "react-router-dom"
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  const navigate = useNavigate()  // useNavigate() hook returns a function that lets you navigate programmatically
  const location = useLocation()  // This hook returns the current location object. This can be useful if you'd like to perform some side effect whenever the current location changes.

  const pathMatchRoute = (route) => {
    if(route === location.pathname) {
      return true
    }
  }

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c': '#8f8f8f'} width='36px' height='36px' />
            <p className={pathMatchRoute('/') ? 'navbarListItenNameActive' : 'navbarListItemName' }>Explore</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/offers')}>
            <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c': '#8f8f8f'} width='36px' height='36px' />
            <p className={pathMatchRoute('/offers') ? 'navbarListItenNameActive' : 'navbarListItemName' }>Offers</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c': '#8f8f8f'} width='36px' height='36px' />
            <p className={pathMatchRoute('/profile') ? 'navbarListItenNameActive' : 'navbarListItemName' }>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
