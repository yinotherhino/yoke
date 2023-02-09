export const validEmailRegex =new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

export const passwordRegex = new RegExp('^[a-zA-Z0-9]{5,30}$')

export const phoneRegex = new RegExp('^[0-9]{8,15}$')

export const firstNameRegex =new RegExp('.{3,}$')