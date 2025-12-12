import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  productos: any[] = [];
  loading = true;

  // Formulario reactivo
  nuevoProductoForm: FormGroup;
  editarProductoForm: FormGroup;

  // Mapa de categorías
  categorias = [
    { id: 1, nombre: 'Periféricos' },
    { id: 2, nombre: 'Hardware' },
    { id: 3, nombre: 'Software' },
  ];

  mostrarAgregarProducto = false;
  mostrarEditarProducto = false;

  constructor(private productoService: ProductosService) {
    this.nuevoProductoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      categoriaId: new FormControl('', Validators.required),
    });

    this.editarProductoForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      categoriaId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getData().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => console.error(err),
    });
  }

  getNombreCategoria(id: number): string {
    const cat = this.categorias.find(c => c.id === id);
    return cat ? cat.nombre : 'Sin categoría';
  }

  agregarProducto() {
    if (this.nuevoProductoForm.valid) {
      this.productoService.postData(this.nuevoProductoForm.value).subscribe({
        next: () => {
          this.getProductos();
          this.nuevoProductoForm.reset();
          this.mostrarAgregarProducto = false;
        },
        error: (err) => console.error(err),
      });
    }
  }

  editarProducto(producto: any) {
    this.editarProductoForm.setValue({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoriaId: producto.categoriaId,
    });
    this.mostrarEditarProducto = true;
  }

  guardarEdicion() {
    const prod = this.editarProductoForm.value;
    this.productoService.putData(prod.id, prod).subscribe({
      next: () => {
        this.getProductos();
        this.mostrarEditarProducto = false;
      },
      error: (err) => console.error(err),
    });
  }

  eliminarProducto(id: number) {
    this.productoService.deleteData(id).subscribe({
      next: () => this.getProductos(),
      error: (err) => console.error(err),
    });
  }
}
