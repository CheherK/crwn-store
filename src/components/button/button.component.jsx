import './button.styles.scss';
import Spinner from "../spinner/spinner.component"

export const BUTTON_TYPES_CLASSES = {
   google: 'google-sign-in',
   inverted: 'inverted',
}

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
   return (
      <button disabled={isLoading} className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
         {isLoading ? <Spinner /> : children }
      </button>
   );
};

export default Button;