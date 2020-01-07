import { required, email, max, min, digits, regex, is } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("min", {
  ...min,
  message: "This field must be {length} characters at least"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("digits", {
  ...digits,
  message: "This field must have at least {length} digits"
});

extend("regex", {
  ...regex,
  message: "This field must have at least 2 capital symbols and one of these specials \"-?#$%&=\""
});

extend("is", {
  ...is,
  message: "Passwords must be the same"
});