import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogSurveyComponent } from './catalog-survey/catalog-survey.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './Identity/register/register.component';
import { LoginComponent } from './Identity/login/login.component';
import { authGuard } from './auth.guard';

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
        path: 'CatalogSurvey',
        component: CatalogSurveyComponent,
        canActivate: [authGuard]
    },
    {
        path: 'Test',
        component: TestComponent,
    },
    {
        path: 'Register',
        component: RegisterComponent,
        //canActivate: [authGuard] //If have no admin we can add new
    },
    {
        path: 'Login',
        component: LoginComponent,
    },
];
