import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './components/menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MenubarModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    MenuComponent,
  ]
})
export class SharedModule { }
