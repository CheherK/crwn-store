import SignUpForm from '../../components/sign-up-form/sign-in-form.component';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './athentication.styles.scss';
const Authentication = () => {
   return (
      <div className='authentication-container'>
         <SignInForm />
         <SignUpForm />
      </div>
   )
}
   

export default Authentication;