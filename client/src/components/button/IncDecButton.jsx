export const IncDecButton = (props) => {
  const { name, value, onChange } = props;

  let incNum = () => {
    onChange(value + 1);
  };

  let decNum = () => {
    if (value > 0) {
      onChange(value - 1);
    }
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
          onClick={decNum}
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
          onClick={incNum}
        >
          +
        </button>
      </div>
    </div>
  );
};
