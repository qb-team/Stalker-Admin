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
import { Movement } from './movement';


/**
 * Movement to an organization made with the authenticated trackingMode.
 */
export interface OrganizationAuthenticatedMovement extends Movement { 
    /**
     * Unique identifier of the organization in which the user had access.
     */
    organizationId: number;
    /**
     * Organization LDAP server\'s user unique identifier.
     */
    ldapId: number;
}
export namespace OrganizationAuthenticatedMovement {
}


