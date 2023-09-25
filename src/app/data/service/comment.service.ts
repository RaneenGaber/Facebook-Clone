import { Injectable } from '@angular/core';
import { GenericApiService } from './generic-api.service';
import { Observable, map } from 'rxjs';
import { IComment } from '../schema/icomment';
import { APIResponse } from '../schema/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private genericApiService: GenericApiService) {
   }

  getAllCommentPerPost(postId: number): Observable<IComment[]> {
    return this.genericApiService.getAll('all-comment', postId).pipe(
      map((apiReponse: APIResponse<IComment[]>) => {
        return apiReponse.data
      })
    )
  }

  addComment(newComment: IComment, postId:number): Observable<IComment> {
    return this.genericApiService.add('add-comment', newComment, postId).pipe(
      map((apiReponse: APIResponse<IComment>) => {
        return apiReponse.data
      })
    )
  }

  deleteComment(commentId: number , userId: number) {
    return this.genericApiService.delete('delete-post', commentId, userId).pipe(
      map((apiReponse: APIResponse<IComment>) => {
        return apiReponse.data
      })
    )

  }
}
