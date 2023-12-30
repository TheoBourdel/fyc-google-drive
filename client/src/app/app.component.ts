import { Component } from '@angular/core';
import { FolderService } from './@core/services/folder.service';
import { DocumentService } from './@core/services/document.service';
import { Folder } from './@core/models/Folder';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Document } from './@core/models/Document';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  folders: Folder[] = [];
  documents: Document[] = [];

  folderForm: FormGroup = new FormGroup({});
  documentForm: FormGroup = new FormGroup({});

  visibleFolder: boolean = false;
  visibleDocument: boolean = false;
  selectedFolderId: number = 0;
  selectedDocumentId: number = 0;

  constructor(
    private folderService: FolderService,
    private fb: FormBuilder,
    private documentService: DocumentService
  ) { 
    this.folderForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.documentForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getFolders();
    this.getDocuments();
  }

  getFolders(): void {
    this.folderService.getFolders().subscribe({
      next: (folders: Folder[]) => {
        this.folders = folders;
      },
      error: (err) => {
        console.error(err);
      }
    })
  } 

  getDocuments(): void {
    this.documentService.getDocuments().subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        console.log('document supprimé');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteFolder(id: number): void {
    this.folderService.deleteFolder(id).subscribe({
      next: () => {
        console.log('folder supprimé');
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  showUpdateFolderDialog(folder: Folder): void {
    this.selectedFolderId = folder.id;
    this.folderForm.patchValue({
      name: folder.name,
      description: folder.description
    });

    this.visibleFolder = true;
  }

  showUpdateDocumentDialog(document: Document): void {
    this.selectedDocumentId = document.id;
    this.documentForm.patchValue({
      title: document.title,
    });

    this.visibleDocument = true;
  }  

  updateFolder(): void {
    const formData = this.folderForm.value;
    this.folderService.updateFolder(this.selectedFolderId, formData).subscribe({
      next: (folder: Folder) => {
        console.log(folder)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateDocument(): void {
    const formData = this.documentForm.value;
    this.documentService.updateDocument(this.selectedDocumentId, formData).subscribe({
      next: (document: Document) => {
        console.log(document)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
