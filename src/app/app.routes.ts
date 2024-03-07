import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CatalogSurveyComponent } from './catalog-survey/catalog-survey.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'Home',
        component: HomeComponent,
    },
    {
        path: 'Admin',
        component: AdminComponent,
    },
    {
        path: 'CatalogSurvey',
        component: CatalogSurveyComponent,
    },
];
