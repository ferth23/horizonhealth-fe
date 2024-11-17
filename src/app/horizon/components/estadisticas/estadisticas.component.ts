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
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
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

  // Atributo que almacena los datos del chart
  public chart_m: Chart | null = null;
  public chart_t: Chart | null = null;
  private user_id !: string | null;
  private meditacion_service = inject ( MeditacionService );
  private test_service = inject ( TestService );
  private data_meditaciones : number[] = [];
  private fechas_meditaciones : string [] = [];
  private data_test: number[] = [];
  private fechas_tests : string [] = [];

  ngOnInit(): void {
    this.getMeditaciones ();
    this.getTestsResults ();
  }

  crearTabla ( fechas: string [], data_numbers : number [], label : string, chart : Chart | null, chart_id : string, type : keyof ChartTypeRegistry ) {
    // Datos
    const data = {
      labels: fechas,
      datasets: [ {
        label: label,
        data: data_numbers,
        borderColor: '#6BCADE',
        tension: 0.1
      } ]
    };

    // Crear la gráfica
    chart = new Chart ( chart_id, {
      type: type,
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: label,
            font: {
              size: 25,
              family: 'Roboto'
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

  getMeditaciones () {
    this.meditacion_service.getMeditaciones ( this.user_id ).subscribe ( {
      next: ( meditaciones ) => {
        meditaciones.forEach ( meditacion => {
          this.data_meditaciones.unshift ( meditacion.tiempo )
          this.fechas_meditaciones.unshift ( meditacion.fecha )
        } );
        this.crearTabla (
          this.fechas_meditaciones,
          this.data_meditaciones,
          'Duración de tus meditaciones (minutos)',
          this.chart_m,
          'chart_meditaciones',
          "bar"
        );
      },
      error: ( message => Swal.fire (
        'Error al obtener las meditaciones',
        message,
        'error'
      ) )
    } )
  }

  getTestsResults () {
    this.test_service.obtenerPuntajes ( this.user_id ).subscribe ( {
      next: ( results ) => {
        results.forEach ( result => {
          this.data_test.unshift ( result.puntaje );
          this.fechas_tests.unshift ( result.fecha );
        } );
        this.crearTabla (
          this.fechas_tests,
          this.data_test,
          'Resultados de tus tests semanales',
          this.chart_t,
          'chart_tests',
          "line"
        );
      },
      error: ( message => Swal.fire (
        'Error al obtener los resultados de los tests',
        message,
        'error'
      ) )
    } );
  }
}
