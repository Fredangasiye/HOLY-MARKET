import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu' },
    { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa' },
    { code: 'nso', name: 'Sepedi', nativeName: 'Sepedi (Northern Sotho)' },
    { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
    { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-black" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-48 focus:ring-2 focus:ring-green-600 focus:border-transparent text-black">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}