/**
 * Stalker API
 * API di Stalker di Imola Informatica sviluppato da qbteam
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: qbteamswe@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Generic movement in an organization or in a place of it.
 */
export interface Movement { 
    id: number;
    movementDiscriminator: string;
    /**
     * Date and time of the moment in which the user entered the place.
     */
    timestamp: Date;
    /**
     * Type of movement.
     */
    movementType: Movement.MovementTypeEnum;
}
export namespace Movement {
    export type MovementTypeEnum = 'entrance' | 'exit';
    export const MovementTypeEnum = {
        Entrance: 'entrance' as MovementTypeEnum,
        Exit: 'exit' as MovementTypeEnum
    };
}


