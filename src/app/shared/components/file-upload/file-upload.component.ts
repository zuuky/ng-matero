import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ParallelHasher } from 'ts-md5/dist/parallel_hasher';
import { HttpService } from '@shared/services/http.service';
import { delArrayByIndex } from '@shared';
import { MtxGridColumn } from '@ng-matero/extensions';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {


  constructor(private http: HttpService) {
  }

  @Input() uploadUrl = 'api/fileUploadTest';

  public files: File[] = [];

  public filesDatas: FileUploadElement[] = [];

  columns: MtxGridColumn[] = [
    {
      header: 'MD5',
      field: 'md5',
    },
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Size',
      field: 'size',
    },
    {
      header: 'LastModifiedDate',
      field: 'lastModifiedDate',
    },
    {
      header: 'UploadStatus',
      field: 'uploadStatus',
    },
    {
      header: 'Option',
      field: 'option',
      width: '80px',
      pinned: 'left',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'delete',
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          pop: true,
          popTitle: ' Confirm delete ?',
          click: (data: any) => {
            if (this.filesDatas.length <= 1) {
              this.filesDatas = [];
            } else {
              this.filesDatas = delArrayByIndex(this.filesDatas, this.filesDatas.indexOf(data));
            }
          },
        },
      ],
    },
  ];

  public dropped(files: NgxFileDropEntry[]) {
    files.forEach(droppedFile => {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const hasher = new ParallelHasher('assets/js/md5_worker.js');
          hasher.hash(file).then((md5str: string) => {
            const exstFile = this.filesDatas.filter(item => item.md5 === md5str);
            if (!exstFile || exstFile.length <= 0) {
              this.files = [...this.files, file];
              this.filesDatas = [
                ...this.filesDatas,
                {
                  md5: md5str,
                  name: file.name,
                  size: file.size,
                  lastModifiedDate: file.lastModified,
                  uploadStatus: 'waiting',
                },
              ];
            }
          });
        });
      }
    });
  }

  public upload() {
    // 每次上传需要根据 表格数据 重新获取files对象
    this.files = this.files.filter(item => {
      const filterData = this.filesDatas.filter(item2 => item2.name === item.name);
      return filterData && filterData.length === 1;
    });
    const data: FormData = new FormData();
    this.files.forEach(file => {
      data.append('files', file);
      const beUploadData = this.filesDatas.filter(item => item.name === file.name)[0];
      if (beUploadData && beUploadData.uploadStatus === 'waiting') {
        this.http
          .upload(this.uploadUrl, data, () => {
            this.filesDatas = delArrayByIndex(
              this.filesDatas,
              this.filesDatas.indexOf(this.filesDatas.filter(item => item.name === file.name)[0]),
            );
          }).subscribe(
          (event: string) => {
            this.changeFileArrayValue(file, event);
          },
          error => {
            this.changeFileArrayValue(file, error.error.error.message || 'failed by unknow reason');
          },
        );
      }
    });
  }

  private changeFileArrayValue(file: File, event: string) {
    this.filesDatas = this.filesDatas.map((item: FileUploadElement) => {
      if (item.name === file.name && item.uploadStatus !== event) {
        return {
          ...item, uploadStatus: event,
        };
      }
      return item;
    });
  }
}

export interface FileUploadElement {
  md5: string;
  name: string;
  size: number;
  lastModifiedDate: number;
  uploadStatus: string;
}
