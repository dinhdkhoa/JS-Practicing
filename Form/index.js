function Validator({ form, rules, onSubmit }) {
  const validationRules = {}; // check nhiều đkiện test (1)
  const formElement = document.querySelector(form);

  const validate = (inputElement, rule, inputParent, errorMessageSpan) => {
    var testResult;
    const allTestFunctionArray = validationRules[rule.querySelector]; //1
    for (let test of allTestFunctionArray) {
      testResult = test(inputElement.value);
      if (testResult != undefined) break;
    } //1
    if (testResult) {
      errorMessageSpan.innerText = testResult;
      inputParent.classList.add("invalid");
    } else {
      errorMessageSpan.innerText = "";
      inputParent.classList.remove("invalid");
    }
    return !testResult;
  };

  if (formElement) {
    formElement.onsubmit = (e) => {
      //   let formData = {};
      let formIsValid = true;
      e.preventDefault();
      rules.forEach((rule) => {
        const inputElement = formElement.querySelector(
          `input[name="${rule.querySelector}"]`
        );
        const inputParent = inputElement.parentElement;
        const errorMessageSpan = inputParent.querySelector(".form-message");
        const valid = validate(
          inputElement,
          rule,
          inputParent,
          errorMessageSpan
        );
        if (!valid) {
          formIsValid = false;
        }
      });

      let allInputElement = formElement.querySelectorAll("[name]");
      if (formIsValid) {
        if (typeof onSubmit === "function") {
          const formData = Array.from(allInputElement).reduce(
            (values, input) => {
              return (values[input.name] = input.value) && values;
            },
            {}
          );
          onSubmit(formData);
        }
      }
    };

    rules.forEach((rule) => {
      if (Array.isArray(validationRules[rule.querySelector])) {
        //1
        validationRules[rule.querySelector].push(rule.test);
      } else {
        validationRules[rule.querySelector] = [rule.test];
      } //1

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
  const type = {
    fullname: "Tên",
    password: "Mật Khẩu",
    password_confirmation: "Mật Khẩu",
    email: "Email",
  };
  return {
    querySelector: querySelector,
    test: (input) =>
      input.trim()
        ? undefined
        : `Vui lòng không bỏ trống ${type[querySelector]}!!!`,
  };
};
Validator.isEmail = (querySelector) => {
  return {
    querySelector: querySelector,
    test: (input) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
        ? undefined
        : "Vui lòng nhập đúng định dạng Email!!!",
  };
};
Validator.minLength = (querySelector) => {
  return {
    querySelector: querySelector,
    test: (input) =>
      input.length >= 6 ? undefined : "Mật Khẩu phải dài hơn 6 kí tự",
  };
};
Validator.isMatched = (querySelector, matchingValue) => {
  return {
    querySelector: querySelector,
    test: (input) => {
      return input === matchingValue() ? undefined : "Mật Khẩu phải trùng nhau";
    },
  };
};

Validator({
  form: "#form-1",
  rules: [
    Validator.isRequired("fullname"),
    Validator.isRequired("email"),
    Validator.isEmail("email"),
    Validator.minLength("password"),
    Validator.isMatched(
      "password_confirmation",
      () => document.querySelector("#form-1 #password").value
    ),
    Validator.isRequired("password_confirmation"),
  ],
  onSubmit: (data) => {
    console.log(data);
  },
});
