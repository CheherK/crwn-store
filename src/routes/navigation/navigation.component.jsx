import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from '../../assests/crown-logo.svg';
import './navigation.styles.scss';

const Navigation = () => 
   (
      <Fragment>
         <header className="navigation">
            <Link className="logo-container" to ='/'>
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
                  <li>Contact</li>
               </ul>
            </nav>
         </header>
         <Outlet />
      </Fragment>
   )

export default Navigation;