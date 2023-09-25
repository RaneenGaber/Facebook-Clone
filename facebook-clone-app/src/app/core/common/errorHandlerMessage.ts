import {errorList} from "./errorList"
export function setErrorMessage(errorKey:any): string{
  const matchingErrors = errorList.filter((el: any) => el.key === errorKey[0]?.message);

  if (matchingErrors.length > 0) {
    // Assuming you want to return the first matching error's message.
    return matchingErrors[0].message;
  } else {
    // Return a default message if no matching error is found.
    return "Default error message";
  }
}
