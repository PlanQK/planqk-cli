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

import { RequestFile } from './models';
import { DataPoolRef } from './dataPoolRef';

export class CreateJobRequest {
    'inputData'?: string;
    'inputDataRef'?: DataPoolRef;
    'parameters'?: string;
    'parametersRef'?: DataPoolRef;
    'persistResult'?: boolean;
    'serviceDefinitionId': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "inputData",
            "baseName": "inputData",
            "type": "string"
        },
        {
            "name": "inputDataRef",
            "baseName": "inputDataRef",
            "type": "DataPoolRef"
        },
        {
            "name": "parameters",
            "baseName": "parameters",
            "type": "string"
        },
        {
            "name": "parametersRef",
            "baseName": "parametersRef",
            "type": "DataPoolRef"
        },
        {
            "name": "persistResult",
            "baseName": "persistResult",
            "type": "boolean"
        },
        {
            "name": "serviceDefinitionId",
            "baseName": "serviceDefinitionId",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return CreateJobRequest.attributeTypeMap;
    }
}

