import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

type posicion = {
  x: number,
  y: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  lados: number = null;
  posiciones: posicion[] = [];
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

    let angulo: number = 360 / this.lados;
    let x: number;
    let y: number;
    let anguloRad: number;
    alert(angulo)
    for (let i = 0; i < this.lados; i++) {
      anguloRad = (angulo * i) * Math.PI / 180;
      x = this.radio * Math.cos(anguloRad);
      y = this.radio * Math.sin(anguloRad);
      this.posiciones.push({
        x: x,
        y: y,
      });
//      alert('x es: ' + x + ' y es: ' + y);
    }

    this.cx.beginPath();
    for (let i = 0; i < this.lados; i++){
      this.cx.moveTo(this.centroX, this.centroY);
      this.cx.lineTo(this.centroX + this.posiciones[i].x, this.centroY + this.posiciones[i].y);
      this.cx.stroke();
    }
    this.cx.stroke();
    this.posiciones = [];

  }

  calcular(){  }

  limpiar(){
    this.cx.clearRect(0, 0, 600, 480);
    this.circulo();
    this.lados = null;
    this.posiciones = [];
  }

  circulo(){
    this.cx.beginPath();
    this.cx.arc(this.centroX, this.centroY, this.radio, 0,2 * Math.PI);
    this.cx.stroke();
    this.cx.closePath();
  }

}