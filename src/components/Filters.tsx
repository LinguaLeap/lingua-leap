import { Select } from "antd";
import languageOptions from "../static/languages.json";

export default function Filters() {
  return (
    <div className="flex flex-row justify-start gap-x-1">
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label>Language</label>
        <Select
          mode="multiple"
          placeholder="Select one language"
          onChange={() => {}}
          optionLabelProp="label"
          options={languageOptions}
        />
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label>Level</label>
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label>Country</label>
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label>Age</label>
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label>Gender</label>
      </div>
    </div>
  );
}
