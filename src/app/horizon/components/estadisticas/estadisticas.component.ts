/* -------------------------------------------------------------------------------
 * HorizonHealth
 *
 * Archivo       : estadisticas.component.ts
 * Autor         : Layla Vanessa González Martínez
 * Fecha         : 11/11/2024
 * Descripción   : Aquí se encuentran los métodos para guardar las estadísticas de
 *                 el tiempo de las meditaciones que ha tenido el usuario.
 *
 * Modificaciones:
 * Fecha         Modificado por     Descripción
 * 15/11/2024    Layla González     Se crearon los métodos para mostrar la 
 *                                  gráfica de las estadísticas.
 * 
 * ---------------------------------------------------------------------------- */

import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { TestService } from '../../services/test.service';
import { MeditacionService } from '../../services/meditacion.service';
import Swal from 'sweetalert2';

Chart.register(...registerables);

@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})

export class EstadisticasComponent implements OnInit {
  constructor () {
    this.user_id = localStorage.getItem( 'user' );
  }

  @ViewChild('chart') chartRef!: ElementRef;
  
  // Atributo que almacena los datos del chart
  public chart: Chart | null = null;
  private user_id !: string | null;
  private meditacion_service = inject ( MeditacionService );
  private test_service = inject ( TestService );
  private data_meditaciones: number[] = [];
  private data_test: number[] = [];

  ngOnInit(): void {
    this.crearTabla();
  }

  crearTabla() {
    console.log(this.data_meditaciones);
    
    // Datos
    const data = {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Estadísticas de tus meditaciones',
        data: this.data_meditaciones,
        borderColor: '#6BCADE',
        tension: 0.1
      }]
    };

    // Crear la gráfica
    this.chart = new Chart ( "chart", {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true, 
            text: 'Estadísticas de tus meditaciones', 
            font: {
              size: 25,
              family: 'Inter'
            },
            color: '#50216E', 
            padding: {
              top: 10, 
              bottom: 10 
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#50216E',
              font: {
                size: 15
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          y: {
            ticks: {
              color: '#50216E',
              font: {
                size: 15
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        layout: {
          padding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
          }
        }
      }
    });
  }
  
  saveMeditacion() {
    this.meditacion_service.getMeditaciones ( this.user_id )
      .subscribe ( {
        next: ( res ) => {
          this.data_meditaciones = res;
          this.crearTabla();
        },
        error: ( message => Swal.fire )
      } )
  }
}
