/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */
import { useState } from 'react';
import { Select, Radio, RadioChangeEvent } from 'antd';
import { StudyLanguages } from '../../types/types';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

interface CustomCascaderProps {
  options: Option[];
  onChangeField: (values: StudyLanguages[]) => void;
  values: StudyLanguages[];
}

export default function CustomCascader({
  options,
  onChangeField,
  values,
}: CustomCascaderProps) {
  const [selectedLanguages, setSelectedLanguages] =
    useState<StudyLanguages[]>(values);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleLanguageDeselect = (value: string) => {
    const newSelectedLanguages: StudyLanguages[] = selectedLanguages.filter(
      (lang) => lang.language !== value
    );
    setSelectedLanguages(newSelectedLanguages);
    onChangeField(newSelectedLanguages);
  };

  const handleLevelChange = (e: RadioChangeEvent) => {
    setSelectedLevel(e.target.value);

    if (selectedLanguage) {
      setSelectedLanguages([
        ...selectedLanguages,
        { language: selectedLanguage, level: e.target.value },
      ]);

      onChangeField([
        ...selectedLanguages,
        {
          language: selectedLanguage,
          level: e.target.value,
        },
      ]);
      setSelectedLanguage(null);
      setSelectedLevel(null);
    }
  };

  return (
    <div>
      <Select
        className="w-full relative"
        mode="tags"
        showSearch={false}
        value={selectedLanguages.map((lang) => lang.language)}
        onSelect={handleLanguageSelect}
        onDeselect={handleLanguageDeselect}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            label={option.label}
          >
            {option.label}
            {selectedLanguage === option.value && (
              <div className="mt-2">
                <Radio.Group
                  key={`${option.label}-${option.value}`}
                  className="flex flex-col"
                  value={selectedLevel}
                  onChange={handleLevelChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <Radio key={level} value={level} className="text-black">
                      {level === 1 && 'Beginner'}
                      {level === 2 && 'Pre-Intermediate'}
                      {level === 3 && 'Intermediate'}
                      {level === 4 && 'Upper-Intermediate'}
                      {level === 5 && 'Advanced'}
                      {level === 6 && 'Fluent'}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            )}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
