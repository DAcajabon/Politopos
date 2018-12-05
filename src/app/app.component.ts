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

  lados: number = null;                 //Lados que ingresa el usuario
  espacios: number = null;              //espaciado para la estrella
  posiciones: posicion[] = [];          //guarda los puntos del circulo
  centroX: number;
  centroY: number;
  title = 'Regular polytopes';
  radio: number = 230;

  @ViewChild('canvas') public canvas: ElementRef; //referencia al canvas

  private cx: CanvasRenderingContext2D;           //nos ayuda a dibujar

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    canvasEl.setAttribute('width', '600px');      //Evita que se reviente la imagen
    canvasEl.setAttribute('height', '480px');     //Evita que se reviente la imagen
    this.cx = canvasEl.getContext('2d');
    this.cx.lineWidth = 3;                        //Ancho de la linea de dibujo
    this.cx.lineCap = 'round';                    //Tipo de Linea
    this.cx.strokeStyle = '#000';                 //Color de la linea
    this.centroX = canvasEl.width / 2;
    this.centroY = canvasEl.height / 2;
    this.circulo();
  }

  dibujarPol(){
    this.posiciones = [];
    this.calcular();

    this.cx.beginPath();
    this.cx.moveTo(this.centroX + this.posiciones[0].x, this.centroY + this.posiciones[0].y)
    for (let i = 1; i < this.lados; i++){
      //Dibuja la linea, no usa moveTo porque el poligono es seguido
      this.cx.lineTo(this.centroX + this.posiciones[i].x, this.centroY + this.posiciones[i].y);
      if (i == this.lados - 1){
        //Al terminar la ultima posicion dibuja la ultima linea al inicio del poligono
        this.cx.lineTo(this.centroX + this.posiciones[0].x, this.centroY + this.posiciones[0].y);
      }
    }
    this.cx.stroke();
  }

  dibujarEst(){
    this.posiciones = [];
    this.calcular();

    let cont: number = 0;
    this.cx.beginPath();
    this.cx.moveTo(this.centroX + this.posiciones[0].x, this.centroY + this.posiciones[0].y);

    for (let i = 1; i < this.lados; i++) {
      //lleva el conteo o posicion para el interlineado
      cont += this.espacios;

      //Dibuja la linea hasta la siguiente posicion segun el espaciado
      this.cx.lineTo(this.centroX + this.posiciones[cont].x, this.centroY + this.posiciones[cont].y);

      //Verifica si ya se termino el penultimo trazo
      if(i == this.lados - 1){
        //Dibuja la ultima linea hacia el principio de la figura para cerrarla
        this.cx.lineTo(this.centroX + this.posiciones[0].x, this.centroY + this.posiciones[0].y);
      }

      //Evita Verifica si el array puede seguir la otra linea, sino lo que hace es reiniciar la posicion para seguir la estrella
      if(cont + this.espacios > this.lados){
        cont = cont + this.espacios - this.lados;
        cont -= this.espacios;
      }
    }
    this.cx.stroke();  
  }

  calcular(){
    let angulo: number = 360 / this.lados;
    let x: number;
    let y: number;
    let anguloRad: number;
    for (let i = 0; i < this.lados; i++) {
      //Convierte el angulo a radianes, esto porque el angulo que se envia en
      //Math.cos lo pide en Radianes
      anguloRad = (angulo * i) * Math.PI / 180;
      x = this.radio * Math.cos(anguloRad);
      y = this.radio * Math.sin(anguloRad);
      this.posiciones.push({
        x: x,
        y: y,
      });
    }
  }

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