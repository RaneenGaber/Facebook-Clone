import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericApiService } from './generic-api.service';
import { IReact } from '../schema/ireact';
import { APIResponse } from '../schema/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class ReactService {

  constructor(private genericApiService: GenericApiService) {

   }

  getAllReactPerPost(postId: number): Observable<IReact[]> {
    return this.genericApiService.getAll('all-react', postId).pipe(
      map((apiReponse: APIResponse<IReact[]>) => {
        return apiReponse.data

      })
    )
  }

  addReact(newReact: IReact, userId: number): Observable<IReact> {
    return this.genericApiService.add('add-react', newReact, userId).pipe(
      map((apiReponse: APIResponse<IReact>) => {
        return apiReponse.data
      })
    )
  }

  updateReact(postId: number, newReact: IReact ,userId:number) {
    return this.genericApiService.update('update-react', newReact, postId,userId).pipe(
      map((apiReponse: APIResponse<IReact>) => {
        return apiReponse.data
      })
    )
  }

  deleteReact(postId: number,userId:number) {
    return this.genericApiService.delete('delete-react', postId , userId).pipe(
      map((apiReponse: APIResponse<IReact>) => {
        return apiReponse.data
      })
    )

  }
}
