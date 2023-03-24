import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from '../../assests/crown-logo.svg';
import './navigation.styles.scss';

const Navigation = () => {

   const { currentUser } = useContext(UserContext);

   return (
      <Fragment>
         <header className="navigation">
            <Link className="logo-container" to='/'>
               <CrwnLogo />
            </Link>
            <nav>
               <ul>
                  <li>
                     <Link to='/'>
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link to='/shop'>
                        Shop
                     </Link>
                  </li>
                  <li>
                     {currentUser ?
                        <span onClick={signOutUser}>Sign Out</span> :
                        <Link to='auth'>
                           Sign In
                        </Link>
                     }
                  </li>
               </ul>
            </nav>
         </header>
         <Outlet />
      </Fragment>
   );
};


export default Navigation;