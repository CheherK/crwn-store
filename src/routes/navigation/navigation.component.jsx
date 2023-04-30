import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from '../../assets/crown-logo.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import './navigation.styles.scss';
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {

   const currentUser = useSelector(selectCurrentUser);
   const isCartOpen = useSelector(selectIsCartOpen);

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
            isCartOpen && (<CartDropdown />)
         }
         <Outlet />
      </Fragment>
   );
};


export default Navigation;