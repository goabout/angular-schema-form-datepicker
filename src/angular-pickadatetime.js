// The only purpose of that directive is to split date and time into two different fields and combine them together when one of the fields is changed.
angular.module('schemaForm').directive('pickADateTime', function () {

  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
      pickADateTime: '=',
      minDate: '=',
      maxDate: '=',
      format: '='
    },
    link: function (scope, element, attrs) {
      var momentDateTime = null;
      var timeSet = false;
      var dateSet = false;

      //Init
      if (scope.ngModel && moment(scope.ngModel).isValid()) {
        momentDateTime = moment(scope.ngModel);
        scope.pickADateTime.$$date = momentDateTime.format('YYYY-MM-DD');
        scope.pickADateTime.$$time = momentDateTime.format('HH:mm');
        timeSet = true;
        dateSet = true;
      } else {
        momentDateTime = moment().hours('00').minutes('00');
      }

      scope.$watch('pickADateTime.$$date', function(value) {
        if (value) {
          var date = moment(value, 'YYYY-MM-DD');
          
          momentDateTime
          .year(date.year())
          .month(date.month())
          .date(date.date());

          dateSet = true
          setDateTime()
        } else {
          clearBothValues()
        }
      })

      scope.$watch('pickADateTime.$$time', function(value) {
        if (value) {
          var time = value.split(':')
          momentDateTime.hours(time[0]).minutes(time[1]);
          timeSet = true
          setDateTime()
        } else {
          clearBothValues()
        }
      })

      function clearBothValues() {
        timeSet = false
        dateSet = false
        momentDateTime = moment().hours('00').minutes('00');
        scope.pickADateTime.$$date = undefined
        scope.pickADateTime.$$time = undefined

        if (scope.ngModel) {
          scope.ngModel = undefined
          scope.$emit('schemaFormValidate')
        }
      }

      function setDateTime() {
        if (timeSet && dateSet) {
          scope.ngModel = momentDateTime.format('YYYY-MM-DDTHH:mm:ssZ');
          scope.$emit('schemaFormValidate')
        }
      }
    }
  };


})
