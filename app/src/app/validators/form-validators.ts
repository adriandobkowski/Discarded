import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export const trimmedRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string | null | undefined;
  if (value === null || value === undefined) return { trimmedRequired: true };
  if (typeof value !== 'string') return null;

  return value.trim().length > 0 ? null : { trimmedRequired: true };
};

export const minSelected = (min: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray;
    const length = Array.isArray(array.value) ? array.value.length : 0;

    return length >= min ? null : { minSelected: { min, actual: length } };
  };
};

export const messageOrMediaRequired = (messageKey = 'message', mediaKey = 'media'): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as { get: (key: string) => AbstractControl | null };
    const messageCtrl = group.get(messageKey);
    const mediaCtrl = group.get(mediaKey);
    const messageRaw: unknown = messageCtrl?.value ?? '';
    const mediaRaw: unknown = mediaCtrl?.value ?? null;
    const message = typeof messageRaw === 'string' ? messageRaw.trim() : '';

    return message.length > 0 || Boolean(mediaRaw) ? null : { messageOrMediaRequired: true };
  };
};
