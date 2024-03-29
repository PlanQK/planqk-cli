/* tslint:disable */
/* eslint-disable */
/**
 * PlanQK Platform API
 * Part of the OpenAPI specification for the PlanQK Platform.
 *
 * The version of the OpenAPI document: v1
 * Contact: info@anaqor.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {exists} from '../runtime'

/**
 *
 * @export
 * @interface AccessTokenDto
 */
export interface AccessTokenDto {
    /**
     *
     * @type {string}
     * @memberof AccessTokenDto
     */
    id?: string;
    /**
     *
     * @type {string}
     * @memberof AccessTokenDto
     */
    name?: string;
    /**
     *
     * @type {Set<string>}
     * @memberof AccessTokenDto
     */
    scopes?: Set<AccessTokenDtoScopesEnum>;
    /**
     *
     * @type {Date}
     * @memberof AccessTokenDto
     */
    createdAt?: Date;
    /**
     *
     * @type {Date}
     * @memberof AccessTokenDto
     */
    usedAt?: Date;
    /**
     *
     * @type {Date}
     * @memberof AccessTokenDto
     */
    expiresAt?: Date;
    /**
     *
     * @type {string}
     * @memberof AccessTokenDto
     */
    value?: string;
    /**
     *
     * @type {string}
     * @memberof AccessTokenDto
     */
    token?: string;
}


/**
 * @export
 */
export const AccessTokenDtoScopesEnum = {
    Api: 'API',
    QuantumTokens: 'QUANTUM_TOKENS'
} as const;
export type AccessTokenDtoScopesEnum = typeof AccessTokenDtoScopesEnum[keyof typeof AccessTokenDtoScopesEnum];


/**
 * Check if a given object implements the AccessTokenDto interface.
 */
export function instanceOfAccessTokenDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AccessTokenDtoFromJSON(json: any): AccessTokenDto {
    return AccessTokenDtoFromJSONTyped(json, false);
}

export function AccessTokenDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccessTokenDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'scopes': !exists(json, 'scopes') ? undefined : json['scopes'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'usedAt': !exists(json, 'usedAt') ? undefined : (new Date(json['usedAt'])),
        'expiresAt': !exists(json, 'expiresAt') ? undefined : (new Date(json['expiresAt'])),
        'value': !exists(json, 'value') ? undefined : json['value'],
        'token': !exists(json, 'token') ? undefined : json['token'],
    };
}

export function AccessTokenDtoToJSON(value?: AccessTokenDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'id': value.id,
        'name': value.name,
        'scopes': value.scopes === undefined ? undefined : Array.from(value.scopes as Set<any>),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'usedAt': value.usedAt === undefined ? undefined : (value.usedAt.toISOString()),
        'expiresAt': value.expiresAt === undefined ? undefined : (value.expiresAt.toISOString().substring(0,10)),
        'value': value.value,
        'token': value.token,
    };
}

