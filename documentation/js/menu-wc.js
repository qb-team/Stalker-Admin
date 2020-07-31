'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link">ApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' : 'data-target="#xs-components-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' :
                                            'id="xs-components-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' }>
                                            <li class="link">
                                                <a href="components/AdministratorManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthenticatedUserAccessesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthenticatedUserAccessesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BindAdministratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BindAdministratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ControlPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ControlPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateAdministratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateAdministratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePageContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePageContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuFunctionalityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuFunctionalityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenubarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenubarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifyOrganizationTrackingAreaContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifyOrganizationTrackingAreaContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifyPlaceTrackingAreaContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifyPlaceTrackingAreaContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationInformationContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationInformationContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationManagementContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationManagementContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationPresenceNumberComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationPresenceNumberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OsmMapContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OsmMapContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlaceManagementContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlaceManagementContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlacePresenceNumberComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlacePresenceNumberComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimeReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewOrganizationTrackingAreaContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewOrganizationTrackingAreaContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' : 'data-target="#xs-injectables-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' :
                                        'id="xs-injectables-links-module-AppModule-696d9a73039a02843de3abe8d6d49981"' }>
                                        <li class="link">
                                            <a href="injectables/AccessDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AccessDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdministratorOrganizationDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdministratorOrganizationDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdministratorPermissionDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AdministratorPermissionDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrganizationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrganizationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrganizationTrackingDataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrganizationTrackingDataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/HomePageContentComponent.html" data-type="entity-link">HomePageContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link">LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenubarComponent.html" data-type="entity-link">MenubarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuFunctionalityComponent.html" data-type="entity-link">MenuFunctionalityComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModifyOrganizationTrackingAreaContentComponent.html" data-type="entity-link">ModifyOrganizationTrackingAreaContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ModifyPlaceTrackingAreaContentComponent.html" data-type="entity-link">ModifyPlaceTrackingAreaContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrganizationInformationContentComponent.html" data-type="entity-link">OrganizationInformationContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrganizationManagementContentComponent.html" data-type="entity-link">OrganizationManagementContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PlaceManagementContentComponent.html" data-type="entity-link">PlaceManagementContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewOrganizationTrackingAreaContentComponent.html" data-type="entity-link">ViewOrganizationTrackingAreaContentComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Configuration.html" data-type="entity-link">Configuration</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomHttpParameterCodec.html" data-type="entity-link">CustomHttpParameterCodec</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteReuseService.html" data-type="entity-link">RouteReuseService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessDataService.html" data-type="entity-link">AccessDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccessService.html" data-type="entity-link">AccessService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdministratorOrganizationDataService.html" data-type="entity-link">AdministratorOrganizationDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdministratorPermissionDataService.html" data-type="entity-link">AdministratorPermissionDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdministratorService.html" data-type="entity-link">AdministratorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationServerService.html" data-type="entity-link">AuthenticationServerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeneralService.html" data-type="entity-link">GeneralService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LdapService.html" data-type="entity-link">LdapService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationService.html" data-type="entity-link">OrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationTrackingDataService.html" data-type="entity-link">OrganizationTrackingDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaceService.html" data-type="entity-link">PlaceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaceTrackingDataService.html" data-type="entity-link">PlaceTrackingDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PresenceService.html" data-type="entity-link">PresenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReportService.html" data-type="entity-link">ReportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackingDataService.html" data-type="entity-link">TrackingDataService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticatedOrganizationGuardService.html" data-type="entity-link">AuthenticatedOrganizationGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/DeactivateGuard.html" data-type="entity-link">DeactivateGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuardService.html" data-type="entity-link">LoginGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/ManagerGuardService.html" data-type="entity-link">ManagerGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/OwnerGuardService.html" data-type="entity-link">OwnerGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdministratorBindingRequest.html" data-type="entity-link">AdministratorBindingRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigurationParameters.html" data-type="entity-link">ConfigurationParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAccess.html" data-type="entity-link">OrganizationAccess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAuthenticationServerCredentials.html" data-type="entity-link">OrganizationAuthenticationServerCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAuthenticationServerInformation.html" data-type="entity-link">OrganizationAuthenticationServerInformation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAuthenticationServerRequest.html" data-type="entity-link">OrganizationAuthenticationServerRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationDeletionRequest.html" data-type="entity-link">OrganizationDeletionRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationMovement.html" data-type="entity-link">OrganizationMovement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationPresenceCounter.html" data-type="entity-link">OrganizationPresenceCounter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link">Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Place.html" data-type="entity-link">Place</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceAccess.html" data-type="entity-link">PlaceAccess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlaceMovement.html" data-type="entity-link">PlaceMovement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlacePresenceCounter.html" data-type="entity-link">PlacePresenceCounter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimePerUserReport.html" data-type="entity-link">TimePerUserReport</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});