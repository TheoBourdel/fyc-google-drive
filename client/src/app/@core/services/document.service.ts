import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Document } from '../models/Document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private http: HttpClient
  ) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>('http://localhost:8000/documents');
  }

  deleteDocument(id: number) {
    return this.http.delete(`http://localhost:8000/document/${id}`);
  }

  updateDocument(id: number, title: Document): Observable<Document> {
    return this.http.put<Document>(`http://localhost:8000/document/${id}`, {title: title});
  }

  createDocument(document: File): Observable<Document> {
    const formData = new FormData();
    formData.append('file', document);

    return this.http.post<Document>('http://localhost:8000/document', formData);
  }

  getDocument(title: string): Observable<Document> {
    return this.http.get<Document>(`http://localhost:8000/document/${title}`);
  }
}
