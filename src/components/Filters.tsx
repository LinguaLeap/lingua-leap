import { Select, Slider } from "antd";
import languageOptions from "../static/languages.json";
import levelOptions from "../static/leveles.json";
import countryOptions from "../static/countries.json";
import genderOptions from "../static/genders.json";

export default function Filters() {
  return (
    <div className="flex flex-row justify-start gap-x-1">
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Language
        </label>
        <Select
          mode="multiple"
          placeholder="Select one or more languages"
          onChange={(value) => {
            console.log(value);
          }}
          options={languageOptions}
        />
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Level
        </label>
        <Select
          placeholder="Select level"
          onChange={(value) => {
            console.log(value);
          }}
          options={levelOptions}
        />
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Country
        </label>
        <Select
          placeholder="Select country"
          onChange={(value) => {
            console.log(value);
          }}
          options={countryOptions}
        />
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Age
        </label>
        <Slider
          range
          min={13}
          max={80}
          defaultValue={[18, 34]}
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <div className="flex flex-col py-2 px-4 w-1/5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Gender
        </label>
        <Select
          placeholder="Select gender"
          onChange={(value) => {
            console.log(value);
          }}
          options={genderOptions}
        />
      </div>
    </div>
  );
}
