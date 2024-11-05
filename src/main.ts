import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Fournisseur pour HttpClient
  ],
};

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, // Utilisez l'opérateur de décomposition pour fusionner les fournisseurs
    provideAnimationsAsync() // Ajoutez provideAnimationsAsync ici
  ],
})
  .catch((err) => console.error(err));
