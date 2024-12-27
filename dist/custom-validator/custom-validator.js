"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGreaterThan = IsGreaterThan;
exports.IsLessThan = IsLessThan;
const class_validator_1 = require("class-validator");
function IsGreaterThan(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isGreaterThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value > relatedValue;
                },
            },
        });
    };
}
function IsLessThan(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isLessThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value < relatedValue;
                },
            },
        });
    };
}
//# sourceMappingURL=custom-validator.js.map