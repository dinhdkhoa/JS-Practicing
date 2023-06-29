import html from "./core.js";

const cars = ["BMW", "Porsche", "Mercedes"];

const isSuccess = 0;

const output = html`
  <h1>${isSuccess}</h1>
  <ul>
    ${cars.map((car) => `<li>${car},</li>`).join("")}
  </ul>
`;

console.log(output);
