import { environment } from '../environments/environment';

export class Properties {
    static get baseUrl() {
        return environment.production ?
          'https://q42e8woaag.execute-api.us-east-1.amazonaws.com/hacienda-rosal'
          : 'http://localhost:8080';
    }
}
