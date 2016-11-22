(function(window){

  var validator = {};
  
  validator.isEmailAddress = function(input) {
    if (!input) throw "e-mail validation error: input parameter missing";
    
    var strArray = input.split("@");
    
    if (strArray.length == 2 && strArray[0].length > 0 && strArray[1].length > 0) {
      return true; 
    }
    else {
      return false; 
    }
  };

  validator.isPhoneNumber = function(input) {
    if (!input) throw "phone number validation error: input parameter missing";
    
    var number = parseInt(input);
    
    if (!isNaN(number) && ("" + number).length === 9) {
       return true;
    }
    else {
      return false;
    }
  };

  validator.withoutSymbols = function(input) {
    if (!input) throw "validation error in function withoutSymbols: input parameter missing";

    var arr = ("" + input).split("");

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== " ") {
        if ((arr[i] < "a" || arr[i] > "z") && isNaN(+arr[i])) {
          arr[i] = "";
        }
      }
    }

    return arr.join("");
  };

})(window);


