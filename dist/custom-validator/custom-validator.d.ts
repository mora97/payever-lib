import { ValidationOptions } from 'class-validator';
export declare function IsGreaterThan(property: string, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare function IsLessThan(property: string, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
