import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
