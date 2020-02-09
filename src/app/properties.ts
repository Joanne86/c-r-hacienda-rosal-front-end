import { environment } from '../environments/environment';

export class Properties {
    static get baseUrl() {
        return environment.production ? 'https://realUrl.com/' : 'http://localhost:8080/';
    }
}