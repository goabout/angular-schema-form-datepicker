angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/datepicker/datepicker.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false, \'required\': isRequired()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n  <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <span ng-if=\"form.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonLeft\"></span>\n    <input ng-show=\"form.key\"\n           style=\"background-color: white\"\n           type=\"text\"\n           class=\"form-control {{form.fieldHtmlClass}}\"\n           schema-validate=\"form\"\n           ng-model=\"$$value$$\"\n           ng-disabled=\"form.readonly\"\n           pick-a-date=\"form.pickadate\"\n           min-date=\"form.minDate\"\n           max-date=\"form.maxDate\"\n           name=\"{{form.key.slice(-1)[0]}}\"\n           format=\"form.format\" />\n    <span ng-if=\"form.fieldAddonRight\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonRight\"></span>\n  </div>\n\n  <span ng-if=\"form.feedback !== false\"\n      class=\"form-control-feedback\"\n      ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span>\n\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/datepicker/datetimepicker.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false, \'required\': isRequired()}\" pick-a-date-time=\"form\" ng-model=\"$$value$$ \">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-sm-8\">\n        <span ng-if=\"form.fieldAddonLeft\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n               style=\"background-color: white\"\n               type=\"text\"\n               class=\"form-control {{form.fieldHtmlClass}}\"\n               ng-model=\"form.$$date\"\n               ng-disabled=\"form.readonly\"\n               pick-a-date=\"form.pickadate\"\n               min-date=\"form.minDate\"\n               max-date=\"form.maxDate\"\n               name=\"{{form.key.slice(-1)[0]}}\"\n               format=\"form.format\" />\n        <span ng-if=\"form.fieldAddonRight\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonRight\"></span>\n      </div>\n      <div class=\"col-xs-12 col-sm-4\">\n        <span ng-if=\"form.fieldAddonLeft\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n               style=\"background-color: white\"\n               type=\"text\"\n               class=\"form-control {{form.fieldHtmlClass}}\"\n               ng-model=\"form.$$time\"\n               ng-disabled=\"form.readonly\"\n               pick-a-time=\"form.pickatime\"\n               min-time=\"form.minTime\"\n               max-time=\"form.maxTime\"\n               name=\"{{form.key.slice(-1)[0]}}\"\n               format=\"form.format\" />\n        <span ng-if=\"form.fieldAddonRight\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonRight\"></span>\n      </div>\n\n      <span ng-if=\"form.feedback !== false\"\n          class=\"form-control-feedback form-control-above-field\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span>\n    </div>\n\n    <!-- Input with both values combined so default validation divective can be used -->\n    <input class=\"hidden\" schema-validate=\"form\" ng-model=\"$$value$$\" name=\"{{form.key.slice(-1)[0]}}\">\n  </div>\n    \n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/datepicker/timepicker.html","<div class=\"form-group schema-form-{{form.type}} {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false, \'required\': isRequired()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n    <span ng-if=\"form.fieldAddonLeft\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonLeft\"></span>\n    <input ng-show=\"form.key\"\n           style=\"background-color: white\"\n           type=\"text\"\n           class=\"form-control {{form.fieldHtmlClass}}\"\n           schema-validate=\"form\"\n           ng-model=\"$$value$$\"\n           ng-disabled=\"form.readonly\"\n           pick-a-time=\"form.pickatime\"\n           min-time=\"form.minTime\"\n           max-time=\"form.maxTime\"\n           name=\"{{form.key.slice(-1)[0]}}\"\n           format=\"form.format\" />\n    <span ng-if=\"form.fieldAddonRight\"\n          class=\"input-group-addon\"\n          ng-bind-html=\"form.fieldAddonRight\"></span>\n  </div>\n\n  <span ng-if=\"form.feedback !== false\"\n      class=\"form-control-feedback\"\n      ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"></span>\n\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");}]);
angular.module('schemaForm').directive('pickADate', function () {

  //String dates for min and max is not supported
  //https://github.com/amsul/pickadate.js/issues/439
  //So strings we create dates from
  var formatDate = function(value) {
    //Strings or timestamps we make a date of
    if (angular.isString(value) || angular.isNumber(value)) {
      return new Date(value);
    }
    return value; //We hope it's a date object
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      pickADate: '=',
      minDate: '=',
      maxDate: '=',
      format: '='
    },
    link: function (scope, element, attrs, ngModel) {
      //Bail out gracefully if pickadate is not loaded.
      if (!element.pickadate) {
        return;
      }

      //By setting formatSubmit to null we inhibit the
      //hidden field that pickadate likes to create.
      //We use ngModel formatters instead to format the value.
      var opts = {
        onClose: function () {
          element.blur();
        },
        formatSubmit: null
      };
      if (scope.pickADate) {
        angular.extend(opts, scope.pickADate);
      }
      element.pickadate(opts);

      //Defaultformat is for json schema date-time is ISO8601
      //i.e.  "yyyy-mm-dd"
      var defaultFormat = 'yyyy-mm-dd';

      //View format on the other hand we get from the pickadate translation file
      var viewFormat    = $.fn.pickadate.defaults.format;

      var picker = element.pickadate('picker');

      //The view value
      ngModel.$formatters.push(function(value) {
        if (angular.isUndefined(value) || value === null) {
          return value;
        }

        //We set 'view' and 'highlight' instead of 'select'
        //since the latter also changes the input, which we do not want.
        picker.set('view', value, {format: scope.format || defaultFormat});
        picker.set('highlight', value, {format: scope.format || defaultFormat});

        //piggy back on highlight to and let pickadate do the transformation.
        return picker.get('highlight', viewFormat);
      });

      ngModel.$parsers.push(function() {
        return picker.get('select', scope.format || defaultFormat);
      });

      //bind once.
      if (angular.isDefined(attrs.minDate)) {
        var onceMin = scope.$watch('minDate', function (value) {
          if (value) {
            picker.set('min', formatDate(value));
            onceMin();
          }
        }, true);
      }

      if (angular.isDefined(attrs.maxDate)) {
        var onceMax = scope.$watch('maxDate', function (value) {
          if (value) {
            picker.set('max', formatDate(value));
            onceMax();
          }
        }, true);
      }
    }
  };
});

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
        scope.ngModel = undefined
        momentDateTime = moment().hours('00').minutes('00');
        scope.pickADateTime.$$date = undefined
        scope.pickADateTime.$$time = undefined
        scope.$emit('schemaFormValidate')
      }

      function setDateTime() {
        if (timeSet && dateSet) {
          scope.ngModel = momentDateTime.format('YYYY-MM-DDTHH:mm:ssZ');
        }
        scope.$emit('schemaFormValidate')
      }
    }
  };


})

angular.module('schemaForm').directive('pickATime', function () {

  var formatTime = function(value) {
    //Strings or timestamps we make a time of
    if (angular.isString(value) || angular.isNumber(value)) {
      return new Date(value);
    }
    return value; //We hope it's a time object
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      pickATime: '=',
      minTime: '=',
      maxTime: '=',
      format: '='
    },
    link: function (scope, element, attrs, ngModel) {
      //Bail out gracefully if pickatime is not loaded.
      if (!element.pickatime) {
        return;
      }

      //By setting formatSubmit to null we inhibit the
      //hidden field that pickatime likes to create.
      //We use ngModel formatters instead to format the value.
      var opts = {
        onClose: function () {
          element.blur();
        },
        formatSubmit: null
      };
      if (scope.pickATime) {
        angular.extend(opts, scope.pickATime);
      }
      element.pickatime(opts);

      //Defaultformat is for json schema date-time is ISO8601
      //i.e.  "hh:mm"
      var defaultFormat = 'H:i';

      //View format on the other hand we get from the pickadate translation file
      var viewFormat    = $.fn.pickatime.defaults.format;

      var picker = element.pickatime('picker');

      //The view value
      ngModel.$formatters.push(function(value) {
        if (angular.isUndefined(value) || value === null) {
          return value;
        }

        //We set 'view' and 'highlight' instead of 'select'
        //since the latter also changes the input, which we do not want.
        picker.set('view', value, {format: scope.format || defaultFormat});
        picker.set('highlight', value, {format: scope.format || defaultFormat});

        //piggy back on highlight to and let pickatime do the transformation.
        return picker.get('highlight', viewFormat);
      });

      ngModel.$parsers.push(function() {
        return picker.get('select', scope.format || defaultFormat);
      });

      //bind once.
      if (angular.isDefined(attrs.minTime)) {
        var onceMin = scope.$watch('minTime', function (value) {
          if (value) {
            picker.set('min', formatTime(value));
            onceMin();
          }
        }, true);
      }

      if (angular.isDefined(attrs.maxTime)) {
        var onceMax = scope.$watch('maxTime', function (value) {
          if (value) {
            picker.set('max', formatTime(value));
            onceMax();
          }
        }, true);
      }
    }
  };
});

angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var datepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'date')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'datepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(datepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'datepicker',
      'directives/decorators/bootstrap/datepicker/datepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'datepicker',
      'directives/decorators/bootstrap/datepicker/datepicker.html'
    );
  }
]);

angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var datetimepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'date-time')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'datetimepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(datetimepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'datetimepicker',
      'directives/decorators/bootstrap/datepicker/datetimepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'datetimepicker',
      'directives/decorators/bootstrap/datepicker/datetimepicker.html'
    );
  }
]);

angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var timepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'time')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'timepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(timepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'timepicker',
      'directives/decorators/bootstrap/datepicker/timepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'timepicker',
      'directives/decorators/bootstrap/datepicker/timepicker.html'
    );
  }
]);
