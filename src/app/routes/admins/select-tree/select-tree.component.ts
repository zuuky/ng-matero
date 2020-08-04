import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { FormModel, TodoItemFlatNode, TodoItemNode } from '@core/interface';
import { BehaviorSubject } from 'rxjs';
import { isEmptyObject } from '@shared';


@Component({
  selector: 'app-select-tree',
  templateUrl: './select-tree.component.html',
  styleUrls: ['./select-tree.component.scss'],
})
export class SelectTreeComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  nestedLevelCont = 0;
  filterValue: string;
  srcDatas: TodoItemNode[];
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  @Input()
  overlayOrigin: CdkOverlayOrigin;
  @Input()
  model: FormModel;
  @Output()
  selections: EventEmitter<any> = new EventEmitter();

  getLevel = (node: TodoItemFlatNode) => node.level;
  isExpandable = (node: TodoItemFlatNode) => node.expandable;
  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    return this.treeControl.getDescendants(node).every(child =>
      this.checklistSelection.isSelected(child),
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    descendants.every(child =>
      this.checklistSelection.isSelected(child),
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child),
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /*根据源数据建立树结构*/
  private buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  /*根据现有的 TodoITemNode 重建树结构数据  避免因为对象不一致导致过滤数据异常*/
  private buildFileTreeByCurrentTodoItemNodes(obj: { [key: string]: any }): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      let node = [...this.nestedNodeMap.keys()].filter(item => item.item === key)[0];
      const value = obj[key];
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTreeByCurrentTodoItemNodes(value);
        } else if (!node) {
          node = [...this.nestedNodeMap.keys()].filter(item => item.item === value)[0];
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  /*过滤功能*/
  filterItem(filterValue: string) {
    const srcDatasNew = this.buildFileTreeByCurrentTodoItemNodes(this.model.treeOptions);
    if (filterValue) {
      // 获取嵌套层次总数
      this.getDataNestedLevelCont(this.model.treeOptions, 0);
      let values = this.loopFilter(srcDatasNew, filterValue);
      for (let i = 0; i < this.nestedLevelCont; i++) {
        values = this.loopFilter(values, filterValue);
      }
      this.dataChange.next(values);
      this.treeControl.expandAll();
    } else {
      this.dataChange.next(srcDatasNew);
    }
  }

  /*递归过滤*/
  private loopFilter(nodes: TodoItemNode[], filterValue: string): TodoItemNode[] {
    return nodes.filter(value => (value.children && value.children.length > 0)
      || (value.item && value.item.includes(filterValue))).map(item => {
      if (!item.children && !item.item.includes(filterValue)) {
        return new TodoItemNode();
      }
      if (item.children) {
        item.children = this.loopFilter(item.children, filterValue);
      }
      return item;
    });
  }

  /*获取 源数据 嵌套层数*/
  private getDataNestedLevelCont(node: any, k) {
    this.nestedLevelCont = Math.max(this.nestedLevelCont, k);
    if (!isEmptyObject(node) && typeof node === 'object') {
      Object.values(node).forEach(value => {
        this.getDataNestedLevelCont(value, k + 1);
      });
    }
  }

  /* backdropClick 关闭*/
  backdropClick() {
    if (this.model.multiple) {
      this.selections.emit(this.checklistSelection.selected
        .filter((value, index, array) => array.map(value1 => value1.item).indexOf(value.item, 0) === index)
        .map(value => value.item));
    }
    this.filterValue = '';
    this.model.overlayOpen = false;
    this.dataChange.next(this.buildFileTreeByCurrentTodoItemNodes(this.model.treeOptions));
  }

  /* 单选 selectTree checked*/
  unmultipleChecked(node) {
    this.selections.emit(node.item);
    this.filterValue = '';
    this.model.overlayOpen = false;
    this.dataChange.next(this.buildFileTreeByCurrentTodoItemNodes(this.model.treeOptions));
  }

  ngOnInit(): void {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.srcDatas = this.buildFileTree(this.model.treeOptions, 0);
    this.dataChange.next(this.srcDatas);
    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    /*回填已选的值*/
    if (this.model.multiple && this.model.treeSelectedOptions) {
      for (const node of this.treeControl.dataNodes) {
        if (this.model.treeSelectedOptions.includes(node.item)) {
          this.checklistSelection.toggle(node);
        }
      }
      this.treeControl.expandAll();
      this.selections.emit(this.checklistSelection.selected.map(it => it.item));
    }
  }
}
