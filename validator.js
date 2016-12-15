 var validator = (function(window) {

  var validator = {};
  
  // Helper function
  function isDelimiter(char) {
    if (char === " " || char === undefined) return true;
      
    if ((char < "a" || char > "z") && 
        (char < "A" || char > "Z") && 
        isNaN(+char)) {
      return true;
    }

    return false;
  }

  validator.isEmailAddress = function(input) {
    if (input !== "" && !input) throw "error in function isEmailAddress: 'input' parameter missing";
    
    var strArray = input.split("@");
     
    if (strArray.length == 2 && strArray[0].length > 0 && strArray[1].length > 0) {
      return true; 
    }
    else {
      return false; 
    }
  };
  
  validator.isPhoneNumber = function(input) {
    if (!input) throw "error in function isPhoneNumber: 'input' parameter missing";
    
    var number = parseInt(input);
    
    if (!isNaN(number) && ("" + number).length === 9) {
       return true;
    }
    else {
      return false;
    }
  };

  validator.withoutSymbols = function(input) {
    if (!input) throw "error in function withoutSymbols: 'input' parameter missing";

    var arr = ("" + input).split("");

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== " ") {
        if ((arr[i] < "a" || arr[i] > "z") && 
            (arr[i] < "A" || arr[i] > "Z") && 
            isNaN(+arr[i])) {
          arr[i] = "";
        }
      }
    }
    
    return arr.join("");
  };

  validator.isDate = function(input) {
    if (!input) throw "error in function isDate: 'input' parameter missing";
    
    var date = Date.parse(input);
    
    if (date) return true;
    else return false;
  };

  validator.isBeforeDate = function(input, ref) {
    if (!input) throw "error in function isBeforeDate: 'input' parameter missing";
    if (!ref) throw "error in function isBeforeDate: 'reference' parameter missing";
    
    var date1 = Date.parse(input);
    var date2 = Date.parse(ref);
    
    return date1 < date2;
  };

  validator.isAfterDate = function(input, ref) {
    if (!input) throw "error in function isBeforeDate: 'input' parameter missing";
    if (!ref) throw "error in function isBeforeDate: 'reference' parameter missing";
    
    var date1 = Date.parse(input);
    var date2 = Date.parse(ref);
    
    return date1 > date2;
  };

  validator.isBeforeToday = function(input) {
    if (!input) throw "error in function isBeforeToday: 'input' parameter missing";
    
    var inputDate = Date.parse(input);
    var currDate = Date.parse(new Date());
    
    return inputDate < currDate;
  };

  validator.isAfterToday = function(input) {
    if (!input) throw "error in function isAfterToday: 'input' parameter missing";
    
    var inputDate = Date.parse(input);
    var currDate = Date.parse(new Date());
    
    return inputDate > currDate;
  };

  validator.isEmpty = function(input) {
    if (input === "") return true;
    if (!input) return false;
    
    if (input.length === 0) {
       return true;
    }
    else {
      var empty = true;
      
      for (var i = 0; i < input.length; i++) {
        if (input[i] !== " ") {
          empty = false;
          break;
        }
      }
      
      return empty;
    }
  };

  validator.contains = function(input, words) {
    if (!input) throw "error in function contains: 'input' parameter missing";
    if (!words) throw "error in function contains: 'words' parameter missing";

    input = (""+input).toLowerCase();
 
    var contains;
    
    for (var i = 0; i < words.length; i++) {   
      words[i] = words[i].toLowerCase();
      contains = false;
      
      for (var j = 0; j < input.length; j++) {  
        if (isDelimiter(input[j-1]) && isDelimiter(input[j+words[i].length])) {
          var k;
          for (k = 0; k < words[i].length; k++) {
            if (words[i][k] !== input[j + k]) break;
          }
          
          if (k === words[i].length) {
            contains = true;
          }
        }    
      }
      
      if (!contains) break;
    }
    
    return contains;
  };

  validator.lacks = function(input, words) {
    if (!input) throw "error in function lacks: 'input' parameter missing";
    if (!words) throw "error in function lacks: 'words' parameter missing";

    input = (""+input).toLowerCase();
 
    var lacks;
    
    for (var i = 0; i < words.length; i++) {   
      words[i] = words[i].toLowerCase();
      lacks = true;

      for (var j = 0; j < input.length; j++) {  
        if (isDelimiter(input[j-1]) && isDelimiter(input[j+words[i].length])) {
          var k;
          for (k = 0; k < words[i].length; k++) {
            if (words[i][k] !== input[j + k]) break;
          }
          
          if (k === words[i].length) {
            lacks = false;
          }
        }    
      }
      
      if (!lacks) break;
    }
    
    return lacks;
  };
  
  validator.isComposedOf = function(input, strings) {
    if (!input) throw "error in function isComposedOf: 'input' parameter missing";
    if (!strings) throw "error in function isComposedOf: 'strings' parameter missing";
    
    // Set all input to lower case
    var lowInp = (""+input).toLowerCase();
    var lowStrs = [];
    
    for (var i = 0; i < strings.length; i++) lowStrs[i] = strings[i].toLowerCase();
      
    // Create array of objects containing each char of the input string
    var charArr = lowInp.split("");
    
    // Helper function to detect non-alphanumeric characters.
    function isSymbol(c) {
      if ((c < "a" || c > "z") && 
          (c < "A" || c > "Z") && 
          (c < "0" || c > "9")) {
        return true;
      }
      else return false;
    }
    
    for (var i = 0; i < charArr.length; i++) {
      // Mark white spaces or symbols as used.
      if (isSymbol(charArr[i])) {
        charArr[i] = {
          char: charArr[i],
          used: true
        }
      }
      else {
        charArr[i] = {
          char: charArr[i],
          used: false
        }
      }  
    } 
    
    // Traverse the input string for each string in the strings array, marking each used char in charArr.
    for (var i = 0; i < lowStrs.length; i++) {
      
      var str = lowStrs[i];     
      for (var j = 0; j < charArr.length; j++) {
        
        if (j + (str.length - 1) <= charArr.length) {    
          
          // If first char of str matches a char on input, check rest of chars in str.       
          if (charArr[j].char === str[0]) {  
            
            var k;
            for (k = 0; k < str.length; k++) if (str[k] !== charArr[j + k].char) break;
            
            // Check if loop completed (all characters of str were found), then mark used chars.
            if (k === str.length) for (var l = 0; l < k; l++) charArr[j + l].used = true;  
          }
        }
        // Check if all chars have been used before proceding to next string
        for (var m = 0; m < charArr.length; m++) if (charArr[m].used === false) break;
        
        // if the for loop ended, means all chars are used. Return true, else go to the next string.
        if (m === charArr.length) return true;
      }  
    }
    return false;   
  };
  
  validator.isLength = function(input, n) {
    if (input !== "" && !input) throw "error in function isLength: 'input' parameter missing.";
    if (n !== 0 && !n) throw "error in function isLength: 'n' parameter missing.";
    
    var result = ""+input.length;
    return result <= n;
  };

  validator.isOfLength = function(input, n) {
    if (input !== "" && !input) throw "error in function isLength: 'input' parameter missing.";
    if (!n) throw "error in function isLength: 'n' parameter missing.";
    
    var result = ""+input.length;
    return result >= n;
  };

  validator.countWords = function(input) {
    if (!input) return 0;
    
    var len = +(""+input).length;
    var strArr = (""+input).split("");
    var count = 0;
    
    for (var i = 0; i < len + 1; i++) {
      if (isDelimiter(strArr[i - 1]) && !isDelimiter(strArr[i])) count++;
    } 
    
    return count;
  };

  validator.lessWordsThan = function(input, n) {
    if (!input) throw "error in function lessWordsThan: 'input' parameter missing.";
    if (!n) throw "error in function lessWordsThan: 'n' parameter missing.";
    
    var wordCount = this.countWords(input);
    
    return wordCount <= n;
  };

  validator.moreWordsThan = function(input, n) {
    if (!input) throw "error in function moreWordsThan: 'input' parameter missing.";
    if (!n) throw "error in function moreWordsThan: 'n' parameter missing.";
    
    var wordCount = this.countWords(input);
    
    return wordCount >= n;
  };
  
  validator.isBetween = function(input, floor, ceil) {
    if (!input) throw "error in function isBetween: 'input' parameter missing.";
    if (!floor) throw "error in function isBetween: 'floor' parameter missing.";
    if (!ceil) throw "error in function isBetween: 'ceil' parameter missing.";
    
    return input >= floor && input <= ceil;
  };
  
  validator.isAlphaNumeric = function(input) {
    if (input === "") return false;
    if (!input) throw "error in function isAlphaNumeric: 'input' parameter missing.";
  
    var inputStr = ""+input;
  
    for (var i = 0; i < inputStr.length; i++) {
      if ((inputStr[i] < "a" || inputStr[i] > "z") &&
          (inputStr[i] < "A" || inputStr[i] > "Z") &&
          (inputStr[i] < "0" || inputStr[i] > "9")) {
        return false;
      }
    }
  
    return true;
  };
  
  validator.isNumber = function(input) {
    if (input !== "" && !input) throw "error in Function isNumber: 'input' parameter missing."

    var inputNum = +input;

    if(!isNaN(inputNum)) return true;
    else return false;
  };

  validator.isCreditCard = function(input) {
    if (!input) throw "error in function isCreditCard: 'input' parameter missing.";
    
    var inputStr = ""+input;
    
    if (inputStr.length < 16) return false;
    if (inputStr.length === 16) return this.isNumber(inputStr);
    
    var inputArr = inputStr.split("-");
    
    if (inputArr.length !== 4) return false;
    
    for (var i = 0; i < inputArr.length; i++) {
      if (inputArr[i].length !== 4 || !(this.isNumber(inputArr[i]))) return false;
    }
    
    return true;
  };
  
  validator.isHex = function(input) {
    if (!input) throw "error in function isHex: 'input' parameter missing.";
    
    var inputStr = ""+input;
    
    if (inputStr.length < 4 || inputStr.length > 7 || inputStr[0] !== "#") return false;
    
    for (var i = 1; i < inputStr.length; i++) {
      if ((inputStr[i] < "0" || inputStr[i] > "9") && 
          (inputStr[i] < "a" || inputStr[i] > "f") &&
          (inputStr[i] < "A" || inputStr[i] > "F")) {
        return false;
      }
    }
    
    return true;
  };
  
  validator.isRGB = function(input) {
    if (!input) throw "error in function isRGB: 'input' parameter missing.";
    
    var inputStr = ""+input;
    
    if (inputStr.indexOf("rgb(") !== 0 || inputStr[inputStr.length - 1] !== ")") return false;
    
    inputStr = inputStr.slice(4, inputStr.length - 1);
   
    var inputArr = inputStr.split(",");
    
    if (inputArr.length !== 3) return false;
    
    for (var i = 0; i < inputArr.length; i++) {
      var value = inputArr[i].trim();
      var numValue = +value;
      
      if (isNaN(numValue)) return false;  
      if (numValue < 0 || numValue > 255) return false;
    }
    
    return true;
  };
  
  validator.isHSL = function(input) {
    if (!input) throw "error in function isHSL: 'input' parameter missing.";
    
    var inputStr = ""+input;

    if (inputStr.indexOf("hsl(") !== 0 || inputStr[inputStr.length - 1] !== ")") return false;

    inputStr = inputStr.slice(4, inputStr.length - 1);
    
    var inputArr = inputStr.split(",");
    
    if (inputArr.length !== 3) return false;

    var numValues = [];
    
    for (var i = 0; i < inputArr.length; i++) {
      inputArr[i] = inputArr[i].trim();
      numValues[i] = +inputArr[i];
      if (isNaN(numValues[i])) return false;  
    }

    if (numValues[0] < 0 || numValues[0] > 360) return false;
    if (numValues[1] < 0 || numValues[1] > 1) return false;
    if (numValues[2] < 0 || numValues[2] > 1) return false;
    
    return true;
  };
  
  validator.isColor = function(input) {
    if (!input) throw "error in function isColor: 'input' parameter missing.";
    
    return this.isHex(input) || this.isRGB(input) || this.isHSL(input);
  };
  
  validator.isTrimmed = function(input) {
    if (!input) throw "error in function isTrimmed: 'input' parameter missing.";
    
    var inputStr = ""+input;
    
    if (inputStr[0] === " " || inputStr[inputStr.length - 1] === " ") return false;
    
    for (var i = 0; i < inputStr.length; i++) {
      if (inputStr[i] === " ") {
        if (inputStr[i - 1] === " " || inputStr[i + 1] === " ") return false;
      }
    }
    
    return true;
  };

  
  
  return validator;
})(window);
