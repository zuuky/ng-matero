import { Component, OnInit } from '@angular/core';
import { DatetimeFormModel, FormModel, InputFormModel } from '@core/interface';
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

  demoSelectUrl = 'https://api.github.com/search/repositories?q=user:nzbin';
  demoDownloadUrl = 'download';
  demoDeleteUrl = 'delete';
  demoAddUrl = 'add';
  demoEditUrl = 'edit';

  formModels: FormModel[] = [
    Object.assign(new InputFormModel('Name', 'name'), {
      formatter: (data: any) => `<a href="${data.html_url}" target="_blank">${data.name}</a>`,
    }),
    Object.assign(new InputFormModel('Owner', 'owner.login'), { isSearch: true }),
    Object.assign(new InputFormModel('Owner Avatar', 'owner.avatar_url'), {
      type: 'image', isSearch: true, required: true,
    }),
    Object.assign(new InputFormModel('Description', 'description')),
    Object.assign(new InputFormModel('Stars', 'stargazers_count')),
    Object.assign(new InputFormModel('Forks', 'forks_count')),
    Object.assign(new InputFormModel('Score', 'score'), { required: true }),
    Object.assign(new InputFormModel('Issues', 'open_issues'), { required: true, isSearch: true }),
    Object.assign(new InputFormModel('Language', 'language'), { required: true }),
    Object.assign(new InputFormModel('License', 'license.name'), { required: true, isSearch: true }),
    Object.assign(new InputFormModel('Home Page', 'homepage'), { required: true, isSearch: true, type: 'link' }),
    Object.assign(new InputFormModel('Forked', 'fork'), { required: true, isSearch: true, type: 'boolean' }),
    Object.assign(new InputFormModel('Archived', 'archived'), {
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'red-100' },
        false: { text: 'No', color: 'green-100' },
      }, fieldType: 'input', required: true,
    }),
    Object.assign(new DatetimeFormModel('Created Date', 'created_at'), { required: true, isSearch: true }),
    Object.assign(new DatetimeFormModel('Updated Date', 'updated_at'), { required: true, isSearch: true }),
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
    this.httpService.post(this.demoDeleteUrl, { id: $event.id });
  }

  addEvent($event: any) {
    this.httpService.post(this.demoAddUrl, $event);
  }

  editEvent($event: any) {
    this.httpService.post(this.demoEditUrl, $event);
  }
}
