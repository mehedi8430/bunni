import { useTranslation } from "react-i18next";

export default function Translator({ text }: { text: string }) {
  const { t } = useTranslation();
  return t(text);
}
