import { ALLOWED_SPECIALS } from "@/features/auth/password_utilities";

export const count = (s: string, predicate: (c: string) => boolean) =>
  [...s].filter(predicate).length;

export const isUpper = (c: string) => c >= "A" && c <= "Z";
export const isLower = (c: string) => c >= "a" && c <= "z";
export const isDigit = (c: string) => c >= "0" && c <= "9";

export const isSpecial = (c: string) => ALLOWED_SPECIALS.includes(c);

export const isAsciiPrintable = (c: string) => {
  const code = c.charCodeAt(0);
  return code >= 33 && code <= 126;
};
