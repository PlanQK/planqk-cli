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
 * @interface ReviewDto
 */
export interface ReviewDto {
    /**
     *
     * @type {string}
     * @memberof ReviewDto
     */
    userId?: string;
    /**
     *
     * @type {string}
     * @memberof ReviewDto
     */
    reviewerName?: string;
    /**
     *
     * @type {string}
     * @memberof ReviewDto
     */
    state?: ReviewDtoStateEnum;
}


/**
 * @export
 */
export const ReviewDtoStateEnum = {
    UnderReview: 'UNDER_REVIEW',
    Reviewed: 'REVIEWED'
} as const;
export type ReviewDtoStateEnum = typeof ReviewDtoStateEnum[keyof typeof ReviewDtoStateEnum];


/**
 * Check if a given object implements the ReviewDto interface.
 */
export function instanceOfReviewDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ReviewDtoFromJSON(json: any): ReviewDto {
    return ReviewDtoFromJSONTyped(json, false);
}

export function ReviewDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReviewDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'userId': !exists(json, 'userId') ? undefined : json['userId'],
        'reviewerName': !exists(json, 'reviewerName') ? undefined : json['reviewerName'],
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}

export function ReviewDtoToJSON(value?: ReviewDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'userId': value.userId,
        'reviewerName': value.reviewerName,
        'state': value.state,
    };
}

