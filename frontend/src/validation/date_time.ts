import * as z from "zod";

export const NullableDateTimeSchema = z.nullable(
  z
    .string()
    .pipe(z.iso.datetime())
    .transform((input) => new Date(input))
);

export const DateTimeSchema = z
  .string()
  .pipe(z.iso.datetime())
  .transform((input) => new Date(input));
