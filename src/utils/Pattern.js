const pattern = {
  text: "(^[A-Za-z]*$)",
  number: "(^[0-9]*$)",
  textNumber: "(^[A-Za-z0-9]*$)",
  decimal: "(^[0-9.]*$)",
  domain: "^[a-zA-Z0-9 ]{3,20}$",
  email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  mobile: "(^[0-9]{10}$)",
  // Password pattern: at least 8 characters, one lowercase letter, one number, and one special character
  password: "^(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$",
  panCard: "(^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$)",
  aadharCard: "",

  // Debit/Credit card pattern
  cardNumber: {
    ptr: "^(?:\\d{4}\\s?){4}$",
    mask: "0000 0000 0000 0000",
  },
  expiryDate: {
    ptr: "^(0[1-9]|1[0-2])\\/\\d{2}$",
    mask: "00/00",
  },
  cvvNumber: "^\\d{3,4}$",
  zipCode: "^\\d{5}(?:-\\d{4})?$",
  pinCode: "^\\d{6}$",
  cardHolderName: "^[A-Za-z\\s]+$",
  link:
    "^(https?:\\/\\/)?" + // protocol
    "((([a-zA-Z0-9$_.+!*'(),;?&=-]|%[0-9a-fA-F]{2})+@)?" + // userinfo
    "(([a-zA-Z0-9.-]|%[0-9a-fA-F]{2})+|\\[[0-9a-fA-F:.]+\\])" + // host (domain or IP)
    "(\\:[0-9]{2,5})?)" + // port
    "(\\/[a-zA-Z0-9$_.+!*'(),;:@&=-]*)*" + // path
    "(\\?[a-zA-Z0-9$_.+!*'(),;:@&=-]*)?" + // query
    "(\\#[a-zA-Z0-9$_.+!*'(),;:@&=-]*)?$", // fragment
  bankAccount: "^[0-9]{9,18}$",
  ifscCode: "^[A-Z]{4}0[A-Z0-9]{6}$",
  upi: "^[a-zA-Z0-9.\\-_]{2,256}@[a-zA-Z]{2,64}$",
};

const keyCode = {
  inr: "₹",
  usd: "$",
};

export { pattern, keyCode };
