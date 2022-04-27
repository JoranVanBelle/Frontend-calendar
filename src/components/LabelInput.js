import { useFormContext } from "react-hook-form";

const LabelInput = ({
  label,
  placeholder,
  type,
  defaultValue,
  validation,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
        <label htmlFor={label}>
          {label}
        </label>
        <input className="sm:text-sm lg:text-lg border-transparent shadow-none focus:border-transparent focus:outline-none focus:bg-transparent"
          {...register(label, validation)}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          id={label}
          name={label}
          {...rest}
        />
        {errors[label] ? (
          <p className="text-red-500 lg:text-sm sm:text-xs" data-cy="labelinput_error">{errors[label].message}</p>
        ) : null }
    </div>
  );
};

export default LabelInput;
