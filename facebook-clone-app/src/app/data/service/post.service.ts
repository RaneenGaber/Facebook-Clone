import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericApiService } from './generic-api.service';
import { IPost } from '../schema/ipost';
import { APIResponse } from '../schema/apiresponse';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private genericApiService: GenericApiService) {}

  getAllPosts(userId: number): Observable<IPost[]> {
    return this.genericApiService.getAll('all-posts', userId).pipe(
      map((apiReponse: APIResponse<IPost[]>) => {
        return apiReponse.data
      })
    )
  }
  getPostById(postId: number): Observable<IPost> {
    return this.genericApiService.getById('post-details', postId).pipe(
      map((apiReponse: APIResponse<IPost>) => {
        return apiReponse.data
      })
    )
  }

  getAllPostsByUserId(id: number, userId: number): Observable<IPost[]> {
    return this.genericApiService.getAllById('posts', id, userId).pipe(
      map((apiReponse: APIResponse<IPost[]>) => {
        return apiReponse.data
      })
    )
  }

  addPost(newPost: IPost, userId: number): Observable<IPost> {
    return this.genericApiService.add('add-post', newPost, userId).pipe(
      map((apiReponse: APIResponse<IPost>) => {
        return apiReponse.data
      })
    )
  }

  sharePost(newPost: IPost, userId: number, postId: number): Observable<IPost> {
    return this.genericApiService.share('share-post', newPost, userId, postId).pipe(
      map((apiReponse: APIResponse<IPost>) => {
        return apiReponse.data
      })
    )
  }

  updatePost(postId: number, newPost: IPost, userId: number) {
    return this.genericApiService.update('update-post', postId, newPost, userId).pipe(
      map((apiReponse: APIResponse<IPost>) => {
        return apiReponse.data
      })
    )
  }

  deletePost(postId: number, userId: number) {
    return this.genericApiService.delete('delete-post', postId, userId).pipe(
      map((apiReponse: APIResponse<IPost>) => {
        return apiReponse.data
      })
    )
  }
}
