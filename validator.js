exports.validate = function(event){
    /*Write your custom code here
    By default always return true
    */
   if (event && event.currentIntent && event.currentIntent.slots && event.currentIntent.slots.sLocation){
        return true;
   }
   return false;
}