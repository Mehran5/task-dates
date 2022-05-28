export const Button = ({ text, className, disabled, clickButton }: any) => {
   return (
      <button
         className={className}
         disabled={disabled}
         onClick={(e) => clickButton(e)}
      >
         {text}
      </button>
   )
}