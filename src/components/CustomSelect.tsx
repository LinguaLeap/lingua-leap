import Select, { SingleValue, MultiValue } from "react-select";
import { CustomSelectProps, Option } from "../types/Types";

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  onChangeField,
}: CustomSelectProps) => {
  const handleChangeField = (
    newValue: MultiValue<Option> | SingleValue<Option>
  ) => {
    onChangeField && onChangeField(newValue);
  };

  const onChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    if (Array.isArray(newValue)) {
      form.setFieldValue(
        field.name,
        newValue.map((item: Option) => item.value)
      );
    } else if (
      newValue &&
      typeof newValue === "object" &&
      "value" in newValue
    ) {
      form.setFieldValue(field.name, newValue.value);
    }
    handleChangeField(newValue);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? Array.isArray(field.value)
          ? options.filter(
              (option: Option) => field.value.indexOf(option.value ?? "") >= 0
            )
          : []
        : options.find((option: Option) => option.value === field.value);
    } else {
      return isMulti ? [] : ({ label: "", value: "" } as Option);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
