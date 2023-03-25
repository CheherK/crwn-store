import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from '../../assests/crown-logo.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import './navigation.styles.scss';

const Navigation = () => {

   const { currentUser } = useContext(UserContext);
   const { isOpen } = useContext(CartContext);

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
                  <li>
                     <CartIcon />
                  </li>
               </ul>
            </nav>
         </header>
         {
            isOpen && (<CartDropdown />)
         }
         <Outlet />
      </Fragment>
   );
};


export default Navigation;