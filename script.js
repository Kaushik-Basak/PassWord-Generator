// we fetch all the custom attribute and classes for adding js
const passwordDisplay = document.querySelector("[dataPasswordDisplay]");
const copyMsg = document.querySelector("[data-copy-msg]");
const CopyBtn = document.querySelector("[data-copy]");

const lengthDisplay = document.querySelector("[data-length-number]");
const inputSlider = document.querySelector("[data-length-slider]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generate-button");

// initialization
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let password = "";
let passwordLength = 10;
let checkCount = 0;
// handleSlider() → iska kam sirf password length ko ui me reflect karwate hai
handleSlider();
// set strength circle color = gray
setIndicator("#ccc");

// set password length
function handleSlider(){
    // slider value = 10
    inputSlider.value = passwordLength;
    // length display = 10
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// I get min to max random integer that means(1 to 20)
function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

// I want to get single digit random no. so we write(0 to 9) random integer.
function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    // 'a' value in ASCII is 97 and 'z' value in ASCII is 122.We write 123 
    // because the last character is excluded in getRandomInt().So in these range we
    // call the function getRandomInteger. But I want a lowercase character, so
    // i have to convert it in string. So i write String.fromCharCode function.
    // The String. fromCharCode() method converts Unicode values to characters. 
    // The String. fromCharCode() is a static method of the String object. 
    // It takes one or more Unicode code point numbers as arguments.
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    // 'A' value in ASCII is 65 and 'Z' value in ASCII is 90.We write 91
    // because the last character is excluded in getRandomInteger().
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbols(){
    // from symbols variable we have to go to last/max character to find out random symbols.
    const randomNo = getRandomInteger(0,symbols.length);
    // charAt() fetch the random symbol from the symbols variable at a certain index
    return symbols.charAt(randomNo);
}

function calculateStrength(){
    // at first all the checkbox are non-tick
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSymbol = false;
    // Then we check, if the user tick the uppercase checkbox, then it is true
    if (uppercaseCheck.checked){
            hasUpper = true;
    }
    // Then we check, if the user tick the lowercase checkbox, then it is true
    if (lowercaseCheck.checked){
        hasLower = true;
    }
    // Then we check, if the user tick the number checkbox, then it is true
    if (numbersCheck.checked){
        hasNum = true;
    }
    // Then we check, if the user tick the symbol checkbox, then it is true
    if (symbolsCheck.checked){
        hasSymbol = true;
    }

    // these are the conditions to set when the indicator is (gray, red or green)
    if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
      } 
      else if((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
      } 
      else {
        setIndicator("#f00");
      }
}

// This function helps to copy password in the clipboard
async function copyContent(){
    // if it finds some error, so we write this in try, catch block
    try {
    // The navigator.clipboard.writeText() method in JavaScript copies
    // text to the user's clipboard. It returns a Promise that's resolved
    // or rejected depending on whether the text was copied. You can use
    // the async/await syntax with the writeText() method for waiting
    // until the text is copied.
        await navigator.clipboard.writeText(passwordDisplay.value);
    // This is the text, it's shown when we click on the copy image
        copyMsg.innerText = "copied";
    } 
    catch (e) {
        copyMsg.innerText = "failed";
    }

    // classList property
    // The classList property in JavaScript provides methods to 
    // manipulate an element's list of CSS classes. It offers a 
    // convenient way to add, remove, toggle, or check for the 
    // presence of CSS classes on an HTML element.

    // Here are the main methods provided by classList:

    // add(): Adds one or more classes to an element
    // remove(): Removes one or more classes from an element
    // toggle(): Adds a class if it doesn't exist, or removes it if it does
    // contains(): Checks if an element has a specific class
    // replace(): Replaces an existing class with a new one

    // to make copy wala text visible
    copyMsg.classList.add("active");
    // after 2 seconds copied text is removed. so we write this setTimeout()
    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// handleCheckBoxChange function was written because for the checkCount
function handleCheckBoxChange(){
    checkCount = 0;
    // whenever the checkbox will be checked/ticked, then checkCount
    // will be incremented. 
    allCheckBox.forEach(checkbox => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    //special condition
    // Suppose if the 4 checkbox will be ticked, and if we put the slider at
    // 2, that means password is 2 and checkbox is 4. It is not a suitable
    // case. so we give this condition, if password length is less than
    // checkbox count, then it will be equal to checkbox.
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
    // handleSlider() → iska kam sirf password length ko ui me reflect karwate hai
        handleSlider();
    }
}

// we write an eventlistner for all the checkboxes, because if we tick some
// checkbox and after sometime if we untick a single checkbox, then the
// checkcount will be changed. so we write this listner, if any changes
// happen, it will again update checkcount and return it. This checkCount
// logic is written in handleCheckBoxChange method.
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

// if slider change from one point to another, for that we write this
// eventlistner.
// The input event is triggered whenever the user modifies the value
// of an input field
inputSlider.addEventListener('input', (e) => {
    // The 'input' event is a specific type of event in JavaScript that
    // is triggered when the value of an <input>, <select>, or <textarea>
    // element is changed. This event fires immediately after the value of
    // the element has been modified, making it useful for real-time
    // handling of user input.

    // Key characteristics of the 'input' event:

    // It fires for each change to the element's value, including:

    // Typing or pasting text into a text input or textarea
    // Checking/unchecking a checkbox
    // Selecting a different option in a select dropdown
    // Adjusting a range input (slider)

    // It's more immediate than the 'change' event, which typically fires
    // when the element loses focus.

    // Inside the callback function, e.target.value allows you to access
    // the current value of the input field that triggered the event.
    // When combined, event.target.value gives you the current value of
    // the element that triggered the event. 
    // When an event occurs, we say it has been "triggered."

    // We add an event listener to an input element.
    // When the user types or modifies the input, the 'input' event is triggered.
    // In the event handler, event.target refers to the input element.
    // event.target.value gives us the current text in the input field.
    passwordLength = e.target.value;
    // handleSlider() → iska kam sirf password length ko ui me reflect karwate hai
    handleSlider();
})

// we write an eventlistner for copy the password. But if password length
// is less than 0, then we will not be able to copy the password.
CopyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {

    //if none of the checkbox are selected then return
    if(checkCount == 0) 
        return;

    // same condition for handleCheckBoxChange. we write this because when
    // we click on generate button this will also check , what are the count
    // of checkboxes?
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //remove old password
    password = "";

    let funcArr = [];

    // if uppercase is true
    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    // if lowercase is true
    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    // if numbers are true
    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    // if symbols are true
    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);

    //compulsory addition

    // The parentheses () after funcArr[i] indicate that the function 
    // stored in the array funcArr at index i is being called or invoked.
    // Here's what's happening:

    // funcArr is an array that contains functions.
    // funcArr[i] accesses the function at index i in the array.
    // The () immediately following funcArr[i] calls (executes) that function.

    // This syntax funcArr[i]() means:

    // Get the function stored at index i of the funcArr array
    // Immediately invoke (call) that function
    // Without the (), you would just be referencing the function itself,
    // not calling it.
    for(let i=0; i<funcArr.length; i++) {
        password = password + funcArr[i]();
    }

    //remaining adddition
    // it goes to 0 to funcArr.length -> means funcArr has uppercase,
    // lowercase, numbers & symbols. In 4 choices, getRandomInteger method
    // picks random choices in that 4 methods
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandomInteger(0 , funcArr.length);
        password = password + funcArr[randIndex]();
    }
    //shuffle the password because first character is always uppercase,
    // 2nd character is always lowecase, 3rd character is always numbers
    // & 4th character is always symbols and remaining will be random.
    // But for first 4 characters this is constant. So anyone can identify
    // the first 4 characters. So we shuffle the whole password, so that 
    // no one can identify it.

    // Array.from() is being used to convert the password string into an array
    // of individual characters. Let's break it down:

    // password is likely a string (e.g., "hello123")
    // Array.from(password) creates a new array where each element is a
    // character from the password string. For example:

    // If password is "hello123"
    // Array.from(password) produces ['h', 'e', 'l', 'l', 'o', '1', '2', '3']


    // This new array is then passed to the shufflePassword function,
    // which rearranges the characters.
    // The result of shufflePassword is then assigned back to password.

    // The Array.from() method is crucial here because it allows the string
    // to be easily converted into an array of characters. This is 
    // necessary because strings in JavaScript are immutable, while arrays
    //  can be easily manipulated (in this case, shuffled).

    // This approach is commonly used when you need to perform operations
    // on each character of a string individually, or when you need to
    // rearrange the characters, which is much easier to do with an array
    // than with a string.
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    calculateStrength();
});