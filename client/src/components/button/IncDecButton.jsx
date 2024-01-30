export const IncDecButton = ({ name, value, setValue, ...props }) => {
  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
  };

  const decrement = () => {
    const newValue = value - 1;
    if (newValue > 0) {
      setValue(newValue);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div className="my-2 flex items-center">
      {props.label ? (
        <label className="mb-2 mr-2 font-medium text-textColor-light">{props.label}</label>
      ) : (
        ""
      )}
      <div className="flex items-center">
        <button
          className="hover:bg-accent-primary flex h-6 w-6 items-center justify-center rounded-md border border-secondary-light bg-secondary-light text-white transition-all duration-300 ease-in-out hover:bg-opacity-40 hover:text-secondary"
          type="button"
          onClick={decrement}
        >
          -
        </button>
        <input
          name={name}
          type="text"
          className="m-2 w-10 rounded-md bg-background p-1 text-center"
          value={value}
          onChange={onChange}
        />

        <button
          className="hover:bg-accent-primary flex h-6 w-6 items-center justify-center rounded-md border border-secondary-light bg-secondary-light text-white transition-all duration-300 ease-in-out hover:bg-opacity-40 hover:text-secondary"
          type="button"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};
