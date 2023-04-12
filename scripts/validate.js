const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector))
  forms.forEach(form => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault()
    })
    setEventListeners(form, rest);
  })
}

const setEventListeners = (validForms, {inputSelector, submitButtonSelector, inputErrorClass, errorClass, ...rest}) => {
  const inputs = Array.from(validForms.querySelectorAll(inputSelector))
  const buttonForms = validForms.querySelector(submitButtonSelector)
  disableButton(buttonForms, rest)
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      checkInputValidity(input, inputErrorClass, errorClass)
      if (invalidInput(inputs)) {
        disableButton(buttonForms, rest)
      } else {
        enableButton(buttonForms, rest)
      }
    })
  })
}

const checkInputValidity = (input, inputErrorClass, errorClass) => {
  const inputErrorContainer = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    hideInputError(input, inputErrorContainer, inputErrorClass, errorClass)
  } else {
    showInputError(input, inputErrorContainer, inputErrorClass, errorClass)
  }
}

const showInputError = (input, inputErrorContainer, inputErrorClass, errorClass) => {
  input.classList.add(inputErrorClass);
  inputErrorContainer.classList.add(errorClass);
  inputErrorContainer.textContent = input.validationMessage;
};

const hideInputError = (input, inputErrorContainer, inputErrorClass, errorClass) => {
  input.classList.remove(inputErrorClass);
  inputErrorContainer.classList.remove(errorClass);
  inputErrorContainer.textContent = "";
};

const enableButton = (button, {inactiveButtonClass, activeButtonClass}) => {
  button.classList.remove(inactiveButtonClass)
  button.classList.add(activeButtonClass)
  button.setAttribute("disable", true)
}

const disableButton = (button, {inactiveButtonClass, activeButtonClass}) => {
  button.classList.add(inactiveButtonClass)
  button.classList.remove(activeButtonClass)
  button.removeAttribute("disable")
}

const invalidInput = (inputs) => {  
  return inputs.some(item => !item.validity.valid)
}

const removeValidationErrors = (form) => { 
  form.querySelectorAll(configValidation.inputSelector).forEach((input) => {
    const inputErrorElement = document.querySelector(`#${input.id}-error`)
    if (!input.validity.valid) {
     hideInputError(input, inputErrorElement, configValidation.inputErrorClass, configValidation.errorClass)
   }
  })
}
