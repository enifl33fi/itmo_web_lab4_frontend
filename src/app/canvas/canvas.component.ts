import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormArray} from "@angular/forms";
import {Result} from "../dto/resultDto";
import {DOCUMENT} from "@angular/common";
import {MapperService} from "../mapper.service";
import {CalcApiService} from "../calc-api.service";
import {ValidationService} from "../validation.service";
import {AlertApiService} from "../alert-api.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit{
  @Input() results!: Result[];
  @Input() rArray!: FormArray;
  rVal: number|null = null;

  constructor(@Inject(DOCUMENT) private _document: Document,
              private mapperService: MapperService,
              private calcApiService: CalcApiService,
              private validationService: ValidationService,
              private alertApiService: AlertApiService) {
    this.drawCircle = this.drawCircle.bind(this);
  }

  ngOnInit(): void {
    this.fillCanvas()
  }

  fillCanvas() {
    this.rVal = this.mapperService.mapRArrayToValue(this.rArray);
    const cv = this._document.querySelector('canvas')!;
    const width = cv.width
    const height = cv.height
    const radius = width * 0.42
    const fontSize = 12
    const ctx = cv.getContext("2d")!;

    ctx.strokeStyle = "#D0D0D0"
    ctx.fillStyle = "#66B2FF88"

    ctx.clearRect(0, 0, width, height)

    if (this.rArray.valid) {
      ctx.fillRect(width / 2 - radius, height / 2, radius, radius / 2)
      ctx.beginPath()
      ctx.moveTo(width / 2 + radius, height/ 2)
      ctx.lineTo(width/ 2, height / 2 - radius)
      ctx.arc(width / 2, height / 2, radius, -Math.PI / 2, Math.PI, true)
      ctx.closePath()
      ctx.fill()
    }

    ctx.beginPath()
    ctx.moveTo(width / 2, height)
    ctx.lineTo(width / 2, 0)
    ctx.lineTo(width / 2 + 5, 10)
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2 - 5, 10)

    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.lineTo(width - 10, height / 2 + 5)
    ctx.moveTo(width, height / 2)
    ctx.lineTo(width - 10, height / 2 - 5)

    ctx.moveTo(width / 2 + radius / 2, height / 2 + 5)
    ctx.lineTo(width / 2 + radius / 2, height / 2 - 5)

    ctx.moveTo(width / 2 + radius, height / 2 + 5)
    ctx.lineTo(width / 2 + radius, height / 2 - 5)

    ctx.moveTo(width / 2 - radius / 2, height / 2 + 5)
    ctx.lineTo(width / 2 - radius / 2, height / 2 - 5)

    ctx.moveTo(width / 2 - radius, height / 2 + 5)
    ctx.lineTo(width / 2 - radius, height / 2 - 5)

    ctx.moveTo(width / 2 + 5, height / 2  + radius / 2)
    ctx.lineTo(width / 2 - 5, height / 2  + radius / 2)

    ctx.moveTo(width / 2 + 5, height / 2 + radius)
    ctx.lineTo(width / 2 - 5, height / 2 + radius)

    ctx.moveTo(width / 2 + 5, height / 2  - radius / 2)
    ctx.lineTo(width / 2 - 5, height / 2  - radius / 2)

    ctx.moveTo(width / 2 + 5, height / 2 - radius)
    ctx.lineTo(width / 2 - 5, height / 2 - radius)

    ctx.font = `bold ${fontSize} px serif`
    ctx.fillStyle = "#D0D0D0"

    ctx.fillText("x", width - fontSize / 2, height / 2 + 15)

    ctx.fillText("y", width / 2 + 10, fontSize / 2)

    if (this.rArray.valid && this.rVal !== null)  {
      ctx.fillText(String(this.rVal), width / 2 + 10, height / 2 - radius + fontSize / 2)
      ctx.fillText(String(this.rVal / 2), width / 2 + 10, height / 2 - radius / 2 + fontSize / 2)
      ctx.fillText(String(-this.rVal), width / 2 + 10, height / 2 + radius + fontSize / 2)
      ctx.fillText(String(-this.rVal / 2), width / 2 + 10, height / 2 + radius / 2 + fontSize / 2)

      ctx.fillText(String(-this.rVal), width / 2 - radius - fontSize / 2, height / 2 - 10)
      ctx.fillText(String(-this.rVal / 2), width / 2 - radius / 2 - fontSize / 2, height / 2 - 10)
      ctx.fillText(String(this.rVal), width / 2 + radius - fontSize / 2, height / 2 - 10)
      ctx.fillText(String(this.rVal / 2), width / 2 + radius / 2 - fontSize / 2, height / 2 - 10)

    }

    ctx.stroke()

    if (this.rArray.valid && this.rVal !== null)  {
      this.drawAllCircles();
    }
  }
  drawAllCircles() {
    this.results.forEach(result => this.drawCircle(result))
  }

  drawCircle(result: Result) {
    const cv = this._document.querySelector('canvas')!;
    const width = cv.width
    const height = cv.height
    const radius = width * 0.42
    const ctx = cv.getContext("2d")!;
    const x: number = result.x;
    const y: number = result.y;
    const hit: boolean = result.hit;
    ctx.fillStyle = "#FF9999"
    if (hit) {
      ctx.fillStyle = "#99FF99"
    }
    let xCoord = width / 2 + (x * radius / this.rVal!)
    let yCoord = height / 2 - (y * radius / this.rVal!)

    ctx.beginPath()
    ctx.arc(xCoord, yCoord, 3, 0, 2 * Math.PI)
    ctx.fill()
  }

  sendPressedPoint(ev: any)  {
    const cv = this._document.querySelector('canvas')!;
    const width = cv.width
    const height = cv.height
    this.rVal = this.mapperService.mapRArrayToValue(this.rArray);
    const radius = width * 0.42
    if (this.rArray.valid && this.rVal !== null) {
      let rect = cv.getBoundingClientRect();
      let x = ev.clientX - rect.left;
      let y = ev.clientY - rect.top;
      let xCoord = Number((x - width / 2) * this.rVal / radius).toFixed(3);
      let yCoord = Number((height / 2 - y) * this.rVal / radius).toFixed(3);
      let r = String(this.rVal);
      if (this.validationService.isValidX(xCoord) && this.validationService.isValidY(yCoord)) {
        this.calcApiService.check({
          x: xCoord,
          y: yCoord,
          r: r
        }, this.drawCircle)
      } else {
        this.alertApiService.showError("Not Valid", "x or y value are not valid");
      }
    }
  }


}
