import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(private http: Http) {
  }

  users = [
    {name: 'WFM-1'},
    {name: 'WFM-2'},
    {name: 'WFM-3'},
    {name: 'WFM-4'},
    {name: 'WFM-5'},
  ];

  getUsers() {
    const stringResponse = this.http.get('https://randomuser.me/api/?inc=gender,name,picture,location&results=8&nat=gb');
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
}
