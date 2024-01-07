import { memo } from "react";
import { LanguageCardType, LanguageCardNum } from "../../types/types";
import decodeLanguage from "../../static/decodeLanguage.json";
import { LanguageLevelEnum } from "../../enums";

const LanguageCard = memo(({ type, language, level }: LanguageCardType) => {
  const decode: Record<string, string> = decodeLanguage;

  return (
    <div className="py-3">
      <h3 className="text-lg font-semibold text-teal-700 dark:text-white dark:opacity-85">
        {decode[language]}
      </h3>

      <div className="text-gray-600 dark:text-white dark:opacity-65">
        {type === LanguageCardNum.STUDY && level
          ? LanguageLevelEnum[level]
          : LanguageLevelEnum[6]}
      </div>
    </div>
  );
});

export default LanguageCard;
