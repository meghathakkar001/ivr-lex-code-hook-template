exports.validate = function(event){
    /*Write your custom code here
    By default always return true
    */
   if (event && event.currentIntent && event.currentIntent.slots){
        return true;
   }
   return false;
}