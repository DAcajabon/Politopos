import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  lados: number = null;
  posiciones: number[] = [];
  centroX: number;
  centroY: number;
  ancho: number;
  alto: number;
  title = 'Politopes';
  radio: number = 230;

  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.setAttribute('width', '600px');
    canvasEl.setAttribute('height', '480px');
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.centroX = canvasEl.width / 2;
    this.centroY = canvasEl.height / 2;
    this.circulo();
  }

  dibujar(){
    let angulo = 360 / this.lados;
    let nuevaX: number;
    let nuevaY: number;

    let medida: number = 90 - angulo;

    nuevaX = this.radio * Math.cos(medida);
    nuevaY = this.radio * Math.sin(medida);

    this.cx.beginPath();
    this.cx.moveTo(this.centroX, this.centroY - 230);
    this.cx.lineTo(this.centroX + nuevaX, this.centroY - nuevaY);
    this.cx.stroke();
  }

  limpiar(){
    this.cx.clearRect(0, 0, 600, 480);
    this.circulo();
  }

  circulo(){
    this.cx.beginPath();
    this.cx.arc(this.centroX, this.centroY, this.radio, 0, 2 * Math.PI);
    this.cx.stroke();
    this.cx.closePath();
  }

}