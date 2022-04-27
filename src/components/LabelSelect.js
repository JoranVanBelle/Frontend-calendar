import { useFormContext } from "react-hook-form";

const LabelSelect = ({
    label,
    options,
    validation,
    ...rest
  }) => {
    const {
        register,
        formState: { errors },
      } = useFormContext();
    return (
      <div className="col-span-6">
        <label htmlFor={label}>
          {label}
        </label>
        <select
          className="lg:border-t sm:text-sm lg:text-lg border-gray-700 shadow-none placeholder-gray-400 text-left font-sans focus:outline-none rounded-none pt-2"
          {...register(label, validation)}
          {...rest}
          id={label}
          name={label}
        >
          <option value="">--Kies een {label}--</option>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors[label] && (
          <p className="text-red-500 text-sm" data-cy="labelselect_error">{errors[label].message}</p>
        )}
      </div>
    );
  };

  export default LabelSelect;
