import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../services/articulos/articulos.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs = [];
  ultimo = {};
  constructor( public artService: ArticulosService ) {
  }

  ngOnInit() {
    this.artService.getArticulos().then(() => {
      this.blogs = this.artService.articles;
      this.ultimo = this.artService.ultimo;
    });
  }

}
