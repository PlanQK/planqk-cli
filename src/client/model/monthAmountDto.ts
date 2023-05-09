/**
 * PlanQK Platform OpenAPI definition
 * OpenAPI definition for the Platform and Ecosystem for Quantum-assisted Artificial Intelligence Platform
 *
 * The version of the OpenAPI document: v1
 * Contact: info@stoneone.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {AmountMajorDto} from './amountMajorDto'
import {ProductGroupDto} from './productGroupDto'

export class MonthAmountDto {
    'year'?: number;
    'month'?: number;
    'amountMajor'?: AmountMajorDto;
    'groups'?: Array<ProductGroupDto>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "year",
            "baseName": "year",
            "type": "number"
        },
        {
            "name": "month",
            "baseName": "month",
            "type": "number"
        },
        {
            "name": "amountMajor",
            "baseName": "amountMajor",
            "type": "AmountMajorDto"
        },
        {
            "name": "groups",
            "baseName": "groups",
            "type": "Array<ProductGroupDto>"
        }    ];

    static getAttributeTypeMap() {
        return MonthAmountDto.attributeTypeMap;
    }
}

