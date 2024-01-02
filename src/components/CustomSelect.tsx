import Select, { SingleValue, MultiValue } from "react-select";
import { CustomSelectProps, Option } from "../types/Types";
import { memo, useCallback } from "react";

export const CustomSelect = memo(
  ({
    className,
    placeholder,
    field,
    form,
    options,
    isMulti = false,
    onChangeField,
  }: CustomSelectProps) => {
    const handleChangeField = useCallback(
      (newValue: MultiValue<Option> | SingleValue<Option>) => {
        onChangeField && onChangeField(newValue);
      },
      [onChangeField]
    );

    const onChange = useCallback(
      (newValue: MultiValue<Option> | SingleValue<Option>) => {
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
      },
      [form, field.name, handleChangeField]
    );

    const getValue = useCallback(() => {
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
    }, [field.value, isMulti, options]);

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
  }
);

export default CustomSelect;
