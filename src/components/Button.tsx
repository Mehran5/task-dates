export const Button = ({ text, className, disabled, clickButton, dataTestId }: any) => {

   return (
      <button
         data-testid={dataTestId}
         className={className}
         disabled={disabled}
         onClick={(e) => clickButton(e)}
      >
         {text}
      </button>
   )

}

export default Button;
