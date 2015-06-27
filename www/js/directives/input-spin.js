angular.module('bar.directives')
// http://jsbin.com/repeyakoja/edit?html,output
.directive("inputSpin", function($parse) {
  return {
    restrict: "E",
    scope: {
      value: "=value",
      onchanged: '&onChanged'
    },
    template: "<div class=\"input-group\"><span class=\"input-group-btn\" ng-click=\"minus()\"><button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-minus\"></span></button></span><input type=\"number\" class=\"form-control text-center\" ng-model=\"value\" ng-change=\"changed()\"><span class=\"input-group-btn\" ng-click=\"plus()\"><button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-plus\"></span></button></span></div>",
    link: function(scope, element, attributes) {
      var max, min, setValue, step;
      max = void 0;
      min = void 0;
      setValue = void 0;
      step = void 0;
      
      if (angular.isUndefined(scope.value)) {
        throw "Missing the value attribute on the input-spin directive.";
      }
      min = (angular.isUndefined(attributes.min) ? null : parseInt(attributes.min));
      max = (angular.isUndefined(attributes.max) ? null : parseInt(attributes.max));
      step = (angular.isUndefined(attributes.step) ? 1 : parseInt(attributes.step));
      
      element.addClass("counter-container");
      scope.readonly = (angular.isUndefined(attributes.editable) ? true : false);

      /**
      Sets the value as an integer.
       */
      setValue = function(val) {
        scope.value = parseInt(val);
        if (scope.onchanged) {
            scope.onchanged();
        }
      };
      setValue(scope.value);

      /**
      Decrement the value and make sure we stay within the limits, if defined.
       */
      scope.minus = function() {
        if (min && (scope.value <= min || scope.value - step <= min) || min === 0 && scope.value < 1) {
          setValue(min);
          return false;
        }
        setValue(scope.value - step);
      };

      /**
      Increment the value and make sure we stay within the limits, if defined.
       */
      scope.plus = function() {
        if (max && (scope.value >= max || scope.value + step >= max)) {
          setValue(max);
          return false;
        }
        setValue(scope.value + step);
      };

      /**
      This is only triggered when the field is manually edited by the user.
      Where we can perform some validation and make sure that they enter the
      correct values from within the restrictions.
       */
      scope.changed = function() {
        if (!scope.value) {
          setValue(0);
        }
        if (/[0-9]/.test(scope.value)) {
          setValue(scope.value);
        } else {
          setValue(scope.min);
        }
        if (min && (scope.value <= min || scope.value - step <= min)) {
          setValue(min);
          return false;
        }
        if (max && (scope.value >= max || scope.value + step >= max)) {
          setValue(max);
          return false;
        }
        setValue(scope.value);
      };
    }
  };
});
