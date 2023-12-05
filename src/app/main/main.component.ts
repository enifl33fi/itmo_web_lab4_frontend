import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CheckForm} from "../dto/resultDto";
import {coords} from "../coords";
import { FormArray, FormControl, FormGroup} from "@angular/forms";
import {ValidationService} from "../validation.service";
import {MapperService} from "../mapper.service";
import {CalcApiService} from "../calc-api.service";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild(CanvasComponent)
  canvas!: CanvasComponent;

  tableLoading$ = new BehaviorSubject<boolean>(false);
  submitLoading$ = new BehaviorSubject<boolean>(false);
  xConstraints: String[] = coords.x;
  rConstraints: String[] = coords.r;
  checkForm: FormGroup = new FormGroup({
    x: new FormArray<FormControl<string>>([], this.validationService.arrLengthValidator()),
    y: new FormControl<string>('',
      [
        this.validationService.yFormatValidator(),
        this.validationService.yValueValidator()
      ]),
    r: new FormArray<FormControl<string>>([],
      [
        this.validationService.arrLengthValidator(),
        this.validationService.rPositiveValidator()
      ]
    )});

  get r(): FormArray {
    return this.checkForm.get('r') as FormArray;
  }
  get x(): FormArray  {
    return this.checkForm.get('x') as FormArray;
  }

  get y() {
    return this.checkForm.get('y');
  }

  get results() {
    return this.calcApiService.results;
  }


  constructor(private validationService: ValidationService,
              private mapperService: MapperService,
              private calcApiService: CalcApiService) {}

  onSubmit(): void {
    const givenData: CheckForm = this.checkForm.value as CheckForm;
    this.calcApiService.check(this.mapperService.mapCheckFromToCheckRequest(givenData),
        this.canvas.drawCircle,
        this.submitLoading$);
  }

  ngOnInit() {
    this.rConstraints.forEach(() => {
      const control: FormControl = new FormControl(false);
      this.r.push(control);
    });
    this.xConstraints.forEach(() => {
      const control: FormControl = new FormControl(false);
      this.x.push(control);
    });

    this.calcApiService.loadResults(this.tableLoading$);

  }
}
