import { memo } from "react";
import { LanguageCardType, LanguageCardNum } from "../../types/types";
import decodeLanguage from "../../static/decodeLanguage.json";
import { LanguageLevelEnum } from "../../enums";

const LanguageCard = memo(({ type, language, level }: LanguageCardType) => {
  const decode: Record<string, string> = decodeLanguage;
  return (
    <div className="shadow px-4 py-3 bg-gray-100">
      <h3>{decode[language]}</h3>
      {type === LanguageCardNum.STUDY && level && (
        <div>{LanguageLevelEnum[level]}</div>
      )}
    </div>
  );
});
export default LanguageCard;
