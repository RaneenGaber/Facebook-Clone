import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'api/user/';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(
        private _http: HttpClient
    ) { }

    updateUser(id: string, userData: any){
        return this._http.put(`${baseUrl}update-user/` + id, userData);
    }

    uploadImage(id: string, image: any) {
        return this._http.post(`${baseUrl}upload-image` + id, {
            image: image
        });
    }


    addFriend(userId: string, friendId: string): Observable<any>{
        return this._http.post(`${baseUrl}add-friend`, {}, {params: {
            userId: userId,
            friendId: friendId
        }});
    }

    deleteFriend(userId: string, friendId: string): Observable<any>{
        return this._http.delete(`${baseUrl}delete-friend?userId=${userId}&friendId=${friendId}`, {});
    }

    checkFriend(userId: string, friendId: string): Observable<any>{
        return this._http.put(`${baseUrl}check-friend`, {}, {params: {
            userId: userId,
            friendId: friendId
        }});
    }

    getFriends(id: string): Observable<any> {
        return this._http.get(`${baseUrl}get-friends/` + id);
    }
}
