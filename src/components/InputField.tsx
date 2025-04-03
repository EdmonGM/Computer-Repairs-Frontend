import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
  // TFieldValues is the values provided in the main UseForm() hook
  name: Path<TFieldValues>; // It ensures the name prop is a valid path (key or nested key) of your form values type
  label: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  rules?: RegisterOptions<TFieldValues>; // ex: required, minLength
  [key: string]: any; // Allows passing any additional props that will be spread onto the <input> element
}
function InputField<TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  defaultValue,
  placeholder,
  rules,
  ...rest
}: Props<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  return (
    <div className="mb-3">
      <div>
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          className="form-control"
          id={name}
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
          {...register(name, rules)}
          {...rest}
        />
      </div>
      {errors[name] && (
        <p className="text-danger">{errors[name].message?.toString()}</p>
      )}
    </div>
  );
}

export default InputField;
