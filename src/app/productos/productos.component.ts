import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  title = 'AngularMVVM';
  productos: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Formularios reactivos
  myFormNuevo: FormGroup;
  myFormEditar: FormGroup;

  // Variables para edición
  mostrarAgregarProducto: boolean = false;
  mostrarEditarProducto: boolean = false;

  constructor(private productoService: ProductosService, private categoriasService: CategoriasService) {
    // Formulario para agregar producto
    this.myFormNuevo = new FormGroup({
      nombre: new FormControl('', Validators.required),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoriaId: new FormControl(1, Validators.required),
    });

    // Formulario para editar producto
    this.myFormEditar = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoriaId: new FormControl(1, Validators.required),
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
      error: (err) => {
        this.error = 'Error al cargar productos';
        console.error(err);
      },
    });
  }

  // ========================
  // Agregar Producto
  // ========================
  onSubmitNuevo() {
    if (this.myFormNuevo.invalid) return;

    this.productoService.postData(this.myFormNuevo.value).subscribe({
      next: (res) => {
        console.log('Producto agregado:', res);
        this.getProductos();
        this.myFormNuevo.reset({ nombre: '', precio: 0, categoriaId: 1 });
        this.mostrarAgregarProducto = false;
      },
      error: (err) => console.error('Error al agregar producto', err),
    });
  }

  // ========================
  // Editar Producto
  // ========================
  editarProducto(producto: any) {
    this.myFormEditar.setValue({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoriaId: producto.categoriaId,
    });
    this.mostrarEditarProducto = true;
  }

  onSubmitEditar() {
    if (this.myFormEditar.invalid) return;

    const productoEditado = this.myFormEditar.value;
    this.productoService.putData(productoEditado.id, productoEditado).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.getProductos();
        this.mostrarEditarProducto = false;
      },
      error: (err) => console.error('Error al actualizar producto', err),
    });
  }

  // ========================
  // Eliminar Producto
  // ========================
  eliminarProducto(id: number) {
    this.productoService.deleteData(id).subscribe({
      next: (res) => {
        console.log('Producto eliminado:', res);
        this.getProductos();
      },
      error: (err) => console.error('Error al eliminar producto', err),
    });
  }
}
