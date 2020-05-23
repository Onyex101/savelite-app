import { NgModule, ModuleWithProviders } from '@angular/core';
import { MenuDataService } from './../../services/data/menu.data.service';

@NgModule({})
export class MenuShareModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MenuShareModule,
            providers: [MenuDataService]
        };
    }
}
