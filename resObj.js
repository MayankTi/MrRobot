/*
 * Will give a constructor to create res objects required by API AI
 */


module.exports = function ResObj(speech /* str */, displayText /* str */, data /* dict of obj */, 
  contextOut /* arr of context obj */, source /* string */  ){
  this.speech = speech;
  this.displayText = displayText;
  this.data = data;
  this.contextOut = contextOut;
  this.source = source;
}