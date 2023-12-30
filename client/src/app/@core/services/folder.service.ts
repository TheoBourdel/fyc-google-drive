import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Folder } from '../models/Folder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(
    private http: HttpClient
  ) { }

  getFolders(): Observable<Folder[]> {
    return this.http.get<Folder[]>('http://localhost:8000/folders');
  }

  createFolder(folder: Folder): Observable<Folder> {
    return this.http.post<Folder>('http://localhost:8000/folder', folder);
  }

  deleteFolder(id: number) {
    return this.http.delete(`http://localhost:8000/folder/${id}`);
  }

  updateFolder(id: number, folder: Folder): Observable<Folder> {
    return this.http.put<Folder>(`http://localhost:8000/folder/${id}`, folder);
  }
}
