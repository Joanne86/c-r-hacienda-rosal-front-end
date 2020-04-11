import { environment } from '../environments/environment';

export class Properties {
    static get baseUrl() {
        return environment.production ? 'http://localhost:9024' : 'http://localhost:9024';
    }
}
