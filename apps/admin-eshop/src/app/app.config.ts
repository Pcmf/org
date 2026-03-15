import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '@org/users';

export const appConfig: ApplicationConfig = {
    providers: [provideBrowserGlobalErrorListeners(), provideRouter(appRoutes), providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        provideHttpClient(withInterceptors([jwtInterceptor]))
    ]
};
