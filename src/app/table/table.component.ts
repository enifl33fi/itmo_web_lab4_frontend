import {Component, Input} from '@angular/core';
import {Result} from "../dto/resultDto";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() results!: Result[];
  @Input() loading$?: BehaviorSubject<boolean>;

}
