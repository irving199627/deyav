import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  expAncla = /<a href="(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?">(.*)<\/a>/g;
  totalConteo = 0;
  articles = [];
  ultimo = {};
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    'X-Random-Shit': '123123123'
};
  constructor(
    public http: HttpClient
  ) {

  }

  getArticulos() {
    // tslint:disable-next-line:no-shadowed-variable
    const urlGet = URL_SERVICIOS + '/articulo/blog/';
    return this.http.get(urlGet)
    .forEach((articulo: any) => {
      this.limpiarHTML(articulo.articulos);
    });
  }

  crearArticulo(body) {
    let url2 = URL_SERVICIOS;
    url2 += '/articulo/blog/';
    return this.http.post(url2, body)
    .pipe(map((resp) => {
      console.log(resp);
    }));
  }










  limpiarHTML(texto) {
    const txt = texto;
    if (txt.length > 1) {
      for (let index = 0; index < txt.length; index++) {
        const element = txt[index];
        element.contenido = element.contenido.toString().replace(/&nbsp;/g, '');
        element.contenido = element.contenido.toString().replace(this.expAncla, '');
        element.contenido = element.contenido.toString().replace(/<br \/>/g, '');
        element.contenido = element.contenido.toString().replace(/<p>/g, ''); // <p>
        element.contenido = element.contenido.toString().replace(/<\/p>/g, ''); // </p>
        element.contenido = element.contenido.toString().replace(/<strong>/g, ''); // <strong>
        element.contenido = element.contenido.toString().replace(/<\/strong>/g, ''); // </strong>
        element.contenido = element.contenido.toString().replace(/<em>/g, ''); // <em>
        element.contenido = element.contenido.toString().replace(/<\/em>/g, ''); // </em>
        element.contenido = element.contenido.toString().replace(/<u>/g, ''); // <u>
        element.contenido = element.contenido.toString().replace(/<\/u>/g, ''); // </u>
        element.contenido = element.contenido.toString().replace(/<s>/g, ''); // <s>
        element.contenido = element.contenido.toString().replace(/<\/s>/g, ''); // </s>
        element.contenido = element.contenido.toString().replace(/<sub>/g, ''); // <sub>
        element.contenido = element.contenido.toString().replace(/<\/sub>/g, ''); // </sub>
        element.contenido = element.contenido.toString().replace(/<sup>/g, ''); // <sup>
        element.contenido = element.contenido.toString().replace(/<\/sup>/g, ''); // </sup>
        this.articles.push(element);
      }
      this.ultimo = this.articles[this.articles.length - 1];
      console.log(this.ultimo);
      return this.articles.pop();
    }
  }
}
