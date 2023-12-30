import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolderService } from '../../../@core/services/folder.service';
import { Folder } from '../../../@core/models/Folder';
import { DocumentService } from '../../../@core/services/document.service';
import { Document } from '../../../@core/models/Document';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  visible: boolean = false;
  folderForm: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private folderService: FolderService,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  showDialog() {
    this.visible = true;
  }

  createForm(): void {
    this.folderForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    const formData = this.folderForm.value;
    this.createFolder(formData);
    console.log('Données du formulaire:', formData);
  }

  onUpload(event: any) {
    console.log(event.files);
    this.documentService.createDocument(event.files[0]).subscribe({
      next: (document: Document) => {
        console.log(document);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  createFolder(folder: Folder): void {
    this.folderService.createFolder(folder).subscribe({
      next: (folder: Folder) => {
        console.log(folder);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
