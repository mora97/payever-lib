import { ValidationOptions } from 'class-validator';
export declare function IsGreaterThan(property: string, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function IsLessThan(property: string, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
