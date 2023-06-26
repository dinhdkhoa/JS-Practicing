function Validator({ form, rules }) {
  const formElement = document.querySelector(form);

  const validate = (inputElement, rule, inputParent, errorMessageSpan) => {
    const testResult = rule.test(inputElement.value);

    if (testResult) {
      errorMessageSpan.innerText = testResult;
      inputParent.classList.add("invalid");
    } else {
      errorMessageSpan.innerText = "";
      inputParent.classList.remove("invalid");
    }
  };

  if (formElement) {
    rules.forEach((rule) => {
      const inputElement = formElement.querySelector(
        `input[name="${rule.querySelector}"]`
      );
      const inputParent = inputElement.parentElement;
      const errorMessageSpan = inputParent.querySelector(".form-message");
      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule, inputParent, errorMessageSpan);
        };
        inputElement.oninput = (e) => {
          errorMessageSpan.innerText = "";
          inputParent.classList.remove("invalid");
        };
      }
    });
  }
}

Validator.isRequired = (querySelector) => {
  return {
    querySelector: querySelector,
    test: (input) => (input.trim() ? undefined : "Vui lòng nhập Tên!!!"),
  };
};
Validator.isEmail = (querySelector) => {
  return {
    querySelector: querySelector,
    test: (input) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
        ? undefined
        : "Vui lòng nhập đúng định dạng!!!",
  };
};

Validator({
  form: "#form-1",
  rules: [Validator.isRequired("fullname"), Validator.isEmail("email")],
});
