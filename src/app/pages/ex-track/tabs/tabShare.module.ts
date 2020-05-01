import { NgModule, ModuleWithProviders } from '@angular/core';
import { DataService } from './../../../services/data/data.service';

@NgModule({})
export class TabShareModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TabShareModule,
            providers: [DataService]
        };
    }
}
