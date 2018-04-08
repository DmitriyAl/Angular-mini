import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  size = 8;

  constructor(private http: Http) {
  }

  getUsers() {
    const stringResponse = this.http.get('https://randomuser.me/api/?inc=gender,name,picture,location&results=' + this.size + '&nat=gb');
    const json = stringResponse.map(resp => resp.json());
    const response = json.map(resp => resp.results);
    return response.map(users => users.map(u => {
      return {
        name: u.name.first + ' ' + u.name.last,
        image: u.picture.large,
        geo: u.location.city + ' ' + u.location.state + ' ' + u.location.street
      };
    }));
  }

  setSize(size) {
    this.size = size;
  }
}
