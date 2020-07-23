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
                    <a href="index.html" data-type="index-link">savelite documentation</a>
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
                                <a href="modules/AboutPageModule.html" data-type="entity-link">AboutPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AboutPageModule-d58d444f75e465a0f89f63da2ac5dfcf"' : 'data-target="#xs-components-links-module-AboutPageModule-d58d444f75e465a0f89f63da2ac5dfcf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AboutPageModule-d58d444f75e465a0f89f63da2ac5dfcf"' :
                                            'id="xs-components-links-module-AboutPageModule-d58d444f75e465a0f89f63da2ac5dfcf"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AboutPageRoutingModule.html" data-type="entity-link">AboutPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AccountPageModule.html" data-type="entity-link">AccountPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountPageModule-5d6261ffb9fc1b404c8498e1b3d63e04"' : 'data-target="#xs-components-links-module-AccountPageModule-5d6261ffb9fc1b404c8498e1b3d63e04"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountPageModule-5d6261ffb9fc1b404c8498e1b3d63e04"' :
                                            'id="xs-components-links-module-AccountPageModule-5d6261ffb9fc1b404c8498e1b3d63e04"' }>
                                            <li class="link">
                                                <a href="components/AccountPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountPageRoutingModule.html" data-type="entity-link">AccountPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppearancePageModule.html" data-type="entity-link">AppearancePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppearancePageModule-4c01b8e05c8d883ce2c37045450c6c09"' : 'data-target="#xs-components-links-module-AppearancePageModule-4c01b8e05c8d883ce2c37045450c6c09"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppearancePageModule-4c01b8e05c8d883ce2c37045450c6c09"' :
                                            'id="xs-components-links-module-AppearancePageModule-4c01b8e05c8d883ce2c37045450c6c09"' }>
                                            <li class="link">
                                                <a href="components/AppearancePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppearancePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppearancePageRoutingModule.html" data-type="entity-link">AppearancePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' : 'data-target="#xs-components-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' :
                                            'id="xs-components-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' : 'data-target="#xs-injectables-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' :
                                        'id="xs-injectables-links-module-AppModule-6c592d1d5d2327dc2a9624dbb66ebba4"' }>
                                        <li class="link">
                                            <a href="injectables/ApiService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' : 'data-target="#xs-components-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' :
                                            'id="xs-components-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' }>
                                            <li class="link">
                                                <a href="components/AddExpenseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddExpenseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BudgetModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BudgetModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DoughnutChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DoughnutChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAccComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditAccComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForgotPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewPlanComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewPlanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieChartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlanDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlanDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' : 'data-target="#xs-injectables-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' :
                                        'id="xs-injectables-links-module-ComponentsModule-4eaac9e45c27ddf8228d134720eb6f9f"' }>
                                        <li class="link">
                                            <a href="injectables/DataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GalleryPageModule.html" data-type="entity-link">GalleryPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GalleryPageModule-127a701d3254defb41dfd41d1f3ffa01"' : 'data-target="#xs-components-links-module-GalleryPageModule-127a701d3254defb41dfd41d1f3ffa01"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GalleryPageModule-127a701d3254defb41dfd41d1f3ffa01"' :
                                            'id="xs-components-links-module-GalleryPageModule-127a701d3254defb41dfd41d1f3ffa01"' }>
                                            <li class="link">
                                                <a href="components/GalleryPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GalleryPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GalleryPageRoutingModule.html" data-type="entity-link">GalleryPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link">HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-2197d8c6f34061145ac90e6d2fcf53ea"' : 'data-target="#xs-components-links-module-HomePageModule-2197d8c6f34061145ac90e6d2fcf53ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-2197d8c6f34061145ac90e6d2fcf53ea"' :
                                            'id="xs-components-links-module-HomePageModule-2197d8c6f34061145ac90e6d2fcf53ea"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link">HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-273aa367342b6e66548ea2bf963586f6"' : 'data-target="#xs-components-links-module-LoginPageModule-273aa367342b6e66548ea2bf963586f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-273aa367342b6e66548ea2bf963586f6"' :
                                            'id="xs-components-links-module-LoginPageModule-273aa367342b6e66548ea2bf963586f6"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link">LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MenuShareModule.html" data-type="entity-link">MenuShareModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsPageModule.html" data-type="entity-link">NotificationsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotificationsPageModule-7d561dda1ca2a106542ff55ddff198d0"' : 'data-target="#xs-components-links-module-NotificationsPageModule-7d561dda1ca2a106542ff55ddff198d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationsPageModule-7d561dda1ca2a106542ff55ddff198d0"' :
                                            'id="xs-components-links-module-NotificationsPageModule-7d561dda1ca2a106542ff55ddff198d0"' }>
                                            <li class="link">
                                                <a href="components/NotificationsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsPageRoutingModule.html" data-type="entity-link">NotificationsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OcrPageModule.html" data-type="entity-link">OcrPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OcrPageModule-ea4d446a1dc743273402803dd4be9af3"' : 'data-target="#xs-components-links-module-OcrPageModule-ea4d446a1dc743273402803dd4be9af3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OcrPageModule-ea4d446a1dc743273402803dd4be9af3"' :
                                            'id="xs-components-links-module-OcrPageModule-ea4d446a1dc743273402803dd4be9af3"' }>
                                            <li class="link">
                                                <a href="components/OcrPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OcrPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OcrPageRoutingModule.html" data-type="entity-link">OcrPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageModule.html" data-type="entity-link">RegisterPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RegisterPageModule-072f16b49dc39eac6344145f71ca1157"' : 'data-target="#xs-components-links-module-RegisterPageModule-072f16b49dc39eac6344145f71ca1157"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RegisterPageModule-072f16b49dc39eac6344145f71ca1157"' :
                                            'id="xs-components-links-module-RegisterPageModule-072f16b49dc39eac6344145f71ca1157"' }>
                                            <li class="link">
                                                <a href="components/RegisterPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RegisterPageRoutingModule.html" data-type="entity-link">RegisterPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SavingsPageModule.html" data-type="entity-link">SavingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SavingsPageModule-f2dbdf1728f24dd47c0e9e4b4959d0d7"' : 'data-target="#xs-components-links-module-SavingsPageModule-f2dbdf1728f24dd47c0e9e4b4959d0d7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SavingsPageModule-f2dbdf1728f24dd47c0e9e4b4959d0d7"' :
                                            'id="xs-components-links-module-SavingsPageModule-f2dbdf1728f24dd47c0e9e4b4959d0d7"' }>
                                            <li class="link">
                                                <a href="components/SavingsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SavingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SavingsPageRoutingModule.html" data-type="entity-link">SavingsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link">SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsPageModule-256594e15c2d912c24af9bf957f49e7a"' : 'data-target="#xs-components-links-module-SettingsPageModule-256594e15c2d912c24af9bf957f49e7a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-256594e15c2d912c24af9bf957f49e7a"' :
                                            'id="xs-components-links-module-SettingsPageModule-256594e15c2d912c24af9bf957f49e7a"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageRoutingModule.html" data-type="entity-link">SettingsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SMenuPageModule.html" data-type="entity-link">SMenuPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SMenuPageModule-1ccf88b57d6b7d548a460195753a5055"' : 'data-target="#xs-components-links-module-SMenuPageModule-1ccf88b57d6b7d548a460195753a5055"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SMenuPageModule-1ccf88b57d6b7d548a460195753a5055"' :
                                            'id="xs-components-links-module-SMenuPageModule-1ccf88b57d6b7d548a460195753a5055"' }>
                                            <li class="link">
                                                <a href="components/SMenuPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SMenuPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SMenuPageRoutingModule.html" data-type="entity-link">SMenuPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabShareModule.html" data-type="entity-link">TabShareModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-fc4426eeb1968ff26805b693fce96afe"' : 'data-target="#xs-components-links-module-TabsPageModule-fc4426eeb1968ff26805b693fce96afe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-fc4426eeb1968ff26805b693fce96afe"' :
                                            'id="xs-components-links-module-TabsPageModule-fc4426eeb1968ff26805b693fce96afe"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
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
                                <a href="classes/CountryPhone.html" data-type="entity-link">CountryPhone</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidator.html" data-type="entity-link">PasswordValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneValidator.html" data-type="entity-link">PhoneValidator</a>
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
                                    <a href="injectables/ApiService.html" data-type="entity-link">ApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link">DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuDataService.html" data-type="entity-link">MenuDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
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
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
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
                                <a href="interfaces/IBudget.html" data-type="entity-link">IBudget</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IExpense.html" data-type="entity-link">IExpense</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Iimage.html" data-type="entity-link">Iimage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link">ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMail.html" data-type="entity-link">IMail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPlan.html" data-type="entity-link">IPlan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IReg.html" data-type="entity-link">IReg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITabs.html" data-type="entity-link">ITabs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IToken.html" data-type="entity-link">IToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateUser.html" data-type="entity-link">IUpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
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