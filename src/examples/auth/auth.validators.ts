import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const SPECIAL_CHARACTER_PATTERN = /[^A-Za-z0-9]/;

export const specialCharacterValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const value = control.value as string | null | undefined;
  if (value == null || value === '') {
    return null;
  }

  return SPECIAL_CHARACTER_PATTERN.test(value)
    ? null
    : { specialCharacter: true };
};

export function matchFieldsValidator(
  sourceControlName: string,
  confirmationControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as { get: (name: string) => AbstractControl | null };
    const source = group.get(sourceControlName);
    const confirmation = group.get(confirmationControlName);

    if (!source || !confirmation) {
      return null;
    }

    const mismatch = source.value !== confirmation.value;

    return mismatch ? { fieldsMismatch: true } : null;
  };
}
