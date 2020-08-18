import { Component, OnInit } from '@angular/core';
import { FormModel } from '@core/interface';
import { HttpService } from '@shared/services/http.service';
import { serialize } from '@shared';

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null,
    },
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular',
  ],
};

@Component({
  selector: 'admins-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})

export class DemoComponent implements OnInit {

  demoDownloadUrl = 'download';
  demoSelectUrl = 'https://api.github.com/search/repositories?q=user:nzbin';
  demoDelUrl = 'delete';

  formModels: FormModel[] = [
    {
      header: 'Name',
      field: 'name',
      formatter: (data: any) => `<a href="${data.html_url}" target="_blank">${data.name}</a>`,
    },
    { header: 'Owner', field: 'owner.login', fieldType: 'input', isSearch: true },
    { header: 'Owner Avatar', field: 'owner.avatar_url', type: 'image', fieldType: 'input', required: true },
    { header: 'Description', field: 'description', width: '300px', fieldType: 'input' },
    { header: 'Stars', field: 'stargazers_count', fieldType: 'input' },
    { header: 'Forks', field: 'forks_count', fieldType: 'input' },
    { header: 'Score', field: 'score', fieldType: 'input', required: true },
    { header: 'Issues', field: 'open_issues', fieldType: 'input', required: true, isSearch: true },
    { header: 'Language', field: 'language', fieldType: 'input', required: true },
    { header: 'License', field: 'license.name', fieldType: 'input', required: true, isSearch: true },
    { header: 'Home Page', field: 'homepage', type: 'link', fieldType: 'input', required: true },
    { header: 'Is forked', field: 'fork', type: 'boolean', fieldType: 'input', required: true },
    {
      header: 'Archived',
      field: 'archived',
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'red-100' },
        false: { text: 'No', color: 'green-100' },
      }, fieldType: 'input', required: true,
    },
    { header: 'Created Date', field: 'created_at', fieldType: 'date', required: true },
    { header: 'Updated Date', field: 'updated_at', fieldType: 'datetime', required: true, isSearch: true },
  ];

  /*grid表格查询条件*/
  searchFilter: any = {};
  /*grid表格数据*/
  datas = [];
  /*grid表格数据总数*/
  total = 0;

  constructor(public httpService: HttpService) {
  }

  ngOnInit() {
    this.selectEvent(this.searchFilter);
  }

  selectEvent($event: any) {
    if (!$event.pageIndex && !$event.pageSize) {
      $event.pageIndex = 0;
      $event.pageSize = 10;
      $event.page = $event.pageIndex;
      $event.per_page = $event.pageSize;
    }
    this.httpService.get(this.demoSelectUrl, $event, (res => {
      this.datas = res.items;
      this.total = res.total_count;
    }));
  }

  pageEvent($event) {
    this.searchFilter.pageIndex = $event.pageIndex;
    this.searchFilter.pageSize = $event.pageSize;
    this.searchFilter.page = $event.pageIndex;
    this.searchFilter.per_page = $event.pageSize;
    this.selectEvent(this.searchFilter);
  }

  downloadEvent($event: any) {
    this.httpService.download($event ? this.demoDownloadUrl + '?' + serialize($event) : this.demoDownloadUrl);
  }

  delEvent($event: any) {
    this.httpService.post(this.demoDelUrl, { id: $event.id });
  }

  editOrCopyAddEvent($event: any) {
    console.log($event);
  }
}
