import './form-input.styles.scss';

const FormInput = ({ label, ...othersParams }) => {
   return (
      <div className='form-input-group'>
         <input className='form-input' id={label} {...othersParams} />
         {label && (
            <label className={`${othersParams.value.length ? 'shrink' : ''} form-input-label`} for={label}>{label}</label>
         )}
      </div>
   );
};

export default FormInput;