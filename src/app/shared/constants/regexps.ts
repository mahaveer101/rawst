export const regExps = {
    alphaNumeric: /^[a-zA-Z0-9\s]+$/i,
    alphaNumericSpecial:  /^[a-z,0-9 ,.^`~'-]+$/i,
    digitsPattern: /^[0-9]+$/i,
    phonePattern: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
    password: /^(?=.*[0-9!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{10,}$/,
    oneToSevenPattern: /^[1-7]\d*$/,
    pincode : /^\d{6}$/,
    number : /^[0-9]\d*$/,
    alphabetic : /^[A-Za-z\s]*$/,
    alphabeticHyphan: /^[a-zA-Z0-9 .-]+$/i,
};
