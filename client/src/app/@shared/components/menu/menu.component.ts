import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolderService } from '../../../@core/services/folder.service';
import { Folder } from '../../../@core/models/Folder';
import { DocumentService } from '../../../@core/services/document.service';
import { Document } from '../../../@core/models/Document';
import {of, catchError, tap, BehaviorSubject, Subject, ReplaySubject, AsyncSubject} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  visible: boolean = false;
  folderForm: FormGroup = new FormGroup({});
  modalTitle: string = 'Info';
  modalMessage: string = '';
  modalTitleError: string = 'Info'
  modalMessageError: string = '';
  uploadProgress$: BehaviorSubject<number> = new BehaviorSubject(0);
  modalVisibility$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalErrorVisibility$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  folderCreated$: ReplaySubject<Folder> = new ReplaySubject(3);
  folderErrorOccurred$: Subject<string> = new Subject();
  uploadErrorOccurred$: Subject<string> = new Subject();
  documentResultCreation$: AsyncSubject<Document | null> = new AsyncSubject();

  constructor(
    private fb: FormBuilder,
    private folderService: FolderService,
    private documentService: DocumentService,
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
    const file = event.files[0];
    this.documentService.createDocument(file).pipe(
      tap(() => this.openModal('Document creation in progress...')),
      catchError((error) => {
        this.openModalError('Document creation failed.');
        this.folderErrorOccurred$.next('Error creating document');
        console.error('Error during document creation: ', error);
        return of(null);
      })
    ).subscribe({
      next: (document: Document | null) => {
        if (document) {
          this.documentResultCreation$.next(document);
          this.documentResultCreation$.complete();
          console.log('Document created successfully: ', document);
        } else {
          this.uploadErrorOccurred$.next('Document creation failed.');
          console.log('Document creation failed.');
        }
      },
      error: (err) => {
        this.uploadErrorOccurred$.next('Error uploading document');
        console.error(err);
      }
    });
    this.updateUploadProgress();
  }

  barProgress() {
    console.log("progress");
    const progress = document.getElementById('progress') as HTMLDivElement;
    console.log(progress);
    const h2 = document.getElementById('h2_progress') as HTMLHeadingElement;
    console.log(h2);

    let i = 0;

    function animateProgress() {
      if (i < 100) {
        i++;
        h2.innerHTML = i + '%';
        progress.style.width = i + '%';
        requestAnimationFrame(animateProgress);
      }
    }

    animateProgress();
  }

  updateUploadProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 5;
        this.uploadProgress$.next(progress);
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  openModal(message: string) {
    this.modalMessage = message;
    this.modalVisibility$.next(true);
    setTimeout(() => this.barProgress(), 1000);
    setTimeout(() => location.reload(), 3000);
  }

  openModalError(message: string) {
    this.modalMessageError = message;
    this.modalErrorVisibility$.next(true);
  }
  closeModal() {
    this.modalVisibility$.next(false);
    this.modalErrorVisibility$.next(false);
  }

  createFolder(folder: Folder): void {
    this.folderService.createFolder(folder).subscribe({
      next: (folder: Folder) => {
        this.folderCreated$.next(folder);
        console.log(folder);
      },
      error: (err) => {
        this.folderErrorOccurred$.next('Error creating folder');
        console.error(err);
      }
    });
  }
}
