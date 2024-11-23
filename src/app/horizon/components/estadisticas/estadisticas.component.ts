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
 * 16/11/2024    Layla González y   Se modificaron los métodos.
 *               Humberto Medina
 *
 * 21/11/2024    Layla González     Se modificaron las propiedades responsive y
 *                                  maintainAspectRatio en las gráficas.
 * ---------------------------------------------------------------------------- */

import { Component, inject, OnInit } from '@angular/core';
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

  // * Constructor para obtener el id del usuario
  constructor () {
    this.user_id = localStorage.getItem( 'user' );
  }

  // * Variables para las gráficas
  public chart_m: Chart | null = null;
  public chart_t: Chart | null = null;

  // * Variable que almacena el id del usuario
  private user_id !: string | null;

  // * Servicios
  private meditacion_service = inject ( MeditacionService );
  private test_service = inject ( TestService );

  // * Atributos para las meditaciones
  private data_meditaciones : number[] = [];
  private fechas_meditaciones : string [] = [];

  // * Atributos para los resultados del test
  private data_test: number[] = [];
  private fechas_tests : string [] = [];

  // * Manda llamar los métodos que contienen los datos para las gr¿aficas
  ngOnInit(): void {
    this.getMeditaciones ();
    this.getTestsResults ();
  }

  // * Método para crear y mostrar una gráfica
  grafica ( fechas: string [], data_numbers : number [], label : string, chart : Chart | null, chart_id : string, type : keyof ChartTypeRegistry ) {

    // * Colores
    const colors = [ 'rgba(255, 99, 132, 0.3)', 'rgba(255, 159, 64, 0.3)', 'rgba(255, 205, 86, 0.3)', 'rgba(75, 192, 192, 0.3)',
                     'rgba(54, 162, 235, 0.3)', 'rgba(153, 102, 255, 0.3)', 'rgba(201, 203, 207, 0.3)' ];

    // * Datos
    const data = {
      labels: fechas,
      datasets: [ {
        label: label,
        data: data_numbers,
        backgroundColor: colors,
        borderColor: '#6BCADE',
        tension: 0.1
      } ]
    };

    // * Estructura de la gráfica
    chart = new Chart ( chart_id, {
      type: type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: label,
            font: {
              size: 20,
              family: 'Roboto'
            },
            color: '#50216E',
            padding: {
              top: 10,
              bottom: 15
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

  // * Método para obtener los datos de las meditaciones y pasarlos de parámetros para la gráfica
  getMeditaciones () {
    this.meditacion_service.getMeditaciones ( this.user_id ).subscribe ( {
      next: ( meditaciones ) => {
        meditaciones.forEach ( meditacion => {
          this.data_meditaciones.unshift ( meditacion.tiempo )
          this.fechas_meditaciones.unshift ( meditacion.fecha )
        } );
        this.grafica (
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

  // * Método para obtener los resultados del test y pasarlos de parámetros para la gráfica
  getTestsResults () {
    this.test_service.obtenerPuntajes ( this.user_id ).subscribe ( {
      next: ( results ) => {
        results.forEach ( result => {
          this.data_test.unshift ( result.puntaje );
          this.fechas_tests.unshift ( result.fecha_s );
        } );
        this.grafica (
          this.fechas_tests,
          this.data_test,
          'Resultados de tus tests semanales',
          this.chart_t,
          'chart_tests',
          "line"
        );
      },
      error: ( message => Swal.fire (
        'Aún no tienes estadísticas del test semanal para mostrar',
        message,
        'warning'
      ) )
    } );
  }
}
