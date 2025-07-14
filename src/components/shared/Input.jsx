const Input = ({ name, label, register, error, ...rest }) => (
  <div className="w-full max-w-md">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-text-primary mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      {...register(name)}
      {...rest}
      className={`w-full px-4 py-3 text-sm bg-input placeholder-text-secondary text-text-primary
        
      rounded-md focus:outline-none focus:ring-2 focus:ring-button-primary transition-colors duration-200 autofill:`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

export default Input;
