import { Component, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  lados: number;
  posiciones: number[];
  centroX: number;
  centroY: number;
  title = 'Politopes';

  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;


  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.setAttribute('width', '750px');
    canvasEl.setAttribute('height', '480px');
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.centroX = canvasEl.width / 2;
    this.centroY = canvasEl.height / 2;
  }

  dibujar(){
    this.cx.beginPath();
    this.cx.arc(this.centroX, this.centroY, 230, 0, 2 * Math.PI);
    this.cx.moveTo(this.centroX, this.centroY);
    this.cx.lineTo(this.centroX, this.centroY + 50);
    this.cx.stroke();
  }

}