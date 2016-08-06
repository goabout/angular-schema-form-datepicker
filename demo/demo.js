angular.module('demo', [
  'ngSanitize',
  'schemaForm'
])
.controller('DemoController', function($scope) {

  $scope.propertySchema = {
    title: "Boekformulier huurfiets",
    type: "object",
    properties: {
      "amount": {
         "type": "number",
         "title": "Aantal",
         "validationMessage": "Vul het gewenste aantal in."
      },
      "insurance": {
         "type": "boolean",
         "title": "Insurance"
      },
      "date": {
         "type": "string",
         "title": "Date",
         "format": "date",
         "description": "Vul hier de gewenste ophaaldatum."
      },
      "dateTime": {
         "type": "string",
         "title": "Date Time",
         "format": "date-time",
         "description": "Vul hier de gewenste ophaaldatum en -tijd in."
      },
      "time": {
         "type": "string",
         "title": "Time",
         "format": "time",
         "description": "Vul hier de gewenste ophaaldatum en -tijd in."
      }
    },
    form: [
      {
        "key": "amount",
        "type": "number"
      },
      "date",
      "dateTime",
      "time",
      {
        "key": "insurance",
        "type": "checkbox"
      }
    ],
    required: [ "amount", "date", "dateTime", "time" ]
  }

  $scope.propertyForm = $scope.propertySchema.form

  $scope.propertyModel = {
    "amount":5,"insurance":false,"time":"13:00", "date": "2016-08-10", "dateTime":"2016-08-10T11:30:08+03:00"}

})
