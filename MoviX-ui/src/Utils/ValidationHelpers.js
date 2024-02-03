

//validating name value in form
export const nameValidaterHelper = (userName) => {
  let messages = [];
  let isValid = true;

  if (userName.trim().length === 0) {
    messages = [...messages, 'Name must not be empty']
    isValid = false
  }
  else if (userName.trim().length < 8 || userName.trim().length > 28) {
    messages = [...messages, 'Name must be between 8 and 28 characters']
    isValid = false;
  }
  var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (format.test(userName.trim())) {
    console.log("Contains special character");
    messages = [...messages, 'Name must not contain special characters']
    isValid = false;
  }

  return { isValid, messages };
}


export const emailValidaterHelper = (userEmail) => {
  let isValid = true;
  let messages = [];
  if (userEmail.trim().length === 0) {
    isValid = false;
    messages = [...messages, 'Email must not be empty']
  }
  else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userEmail))) {
    messages = [...messages, 'Enter a valid Email']
    isValid = false
  }
  return ({ isValid, messages })
}



//Validating Password
export const passwordValidaterHelper = (userPassword) => {
  let isValid = true;
  let messages = [];

  if (userPassword.trim().length === 0) {
    isValid = false;
    messages = [...messages, 'Password must not be empty']
  }
  else {
    if (/[A-Z]/.test(userPassword) === false) {
      isValid = false;
      messages = [...messages, 'Password must contain one Uppercase Character']
    }

    if (/[a-z]/.test(userPassword) === false) {
      isValid = false;
      messages = [...messages, 'Password must contain one Lowercase Character']
    }

    if (/\d/.test(userPassword) === false) {
      isValid = false;
      messages = [...messages, 'Password must contain one numeric digit']
    }

    let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(userPassword)) {
      isValid = false;
      messages = [...messages, 'Password must contain one special character']
    }
  }

  return ({ isValid, messages });
}


//validating about in form
export const aboutValidaterHelper = (userAbout) => {
  let isValid = true;
  let messages = [];

  if (userAbout.trim().length === 0) {
    isValid = false;
    messages = [...messages, 'About must not be empty']
  }

  return ({ isValid, messages });
}


//validating image in form
export const imageValidaterHelper = (image) => {

  const imageType = image?.type.substring(0, 5);
  console.log(imageType);

  let isValid = true;
  let messages = [];

  if (!imageType.match('image')) {
    console.log("Not image");
    isValid = false;
    messages = [...messages, "File must be an image"]
  }

  return ({ isValid, messages });
}