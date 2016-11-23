(function(window){

  var validator = {};
  
  validator.isEmailAddress = function(input) {
    if (!input) throw "error in function isEmailAddress: 'input' parameter missing";
    
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
    
    function isDelimiter(char) {
      if (char === " " || char === undefined) return true;
      
      if ((char < "a" || char > "z") && 
          (char < "A" || char > "Z") && 
          isNaN(+char)) {
        return true;
      }

      return false;
    }
 
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
    
    function isDelimiter(char) {
      if (char === " " || char === undefined) return true;
      
      if ((char < "a" || char > "z") && 
          (char < "A" || char > "Z") && 
          isNaN(+char)) {
        return true;
      }

      return false;
    }
 
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
  
})(window);


