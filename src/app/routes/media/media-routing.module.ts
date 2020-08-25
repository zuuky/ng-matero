import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaGalleryComponent } from './gallery/gallery.component';

const routes: Routes = [{ path: 'gallery', component: MediaGalleryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaRoutingModule {
}
