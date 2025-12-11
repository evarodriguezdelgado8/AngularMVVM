import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  title = 'AngularMVVM';
  usuarios: any[] = [];
  productos: any;
  error: string | null = null;
  data: any; // Variable para almacenar los datos
  loading: boolean = true; // Indicador de carga

  constructor(private productoService: ProductosService) {}

 ngOnInit() {
    this.getProductos(); // Cargar los datos cuando el componente se inicializa
  }

  getProductos(): void {
    this.productoService.getData('usuarios').subscribe({
      next: (data) => {
        this.usuarios = data; // Asignar los datos de productos
        this.productos = data; // Asignar la respuesta a la variable 'data'
        this.loading = false; // Detener el indicador de carga
      },
      error: (err) => {
        this.error = 'Error al cargar productos'; // Manejar errores
        console.error(err);
      },
    });
  }
   agregarProducto(nuevoProducto: any) {
    this.productoService.postData('productos', nuevoProducto).subscribe({
      next: (res) => {
        console.log('Producto agregado:', res);
        this.getProductos(); // Recargar productos después de agregar
      },
      error: (err) => {
        console.error('Error al agregar producto', err);
      }
    });
  }

  // Ejemplo de cómo usar putData
  actualizarProducto(producto: any) {
    this.productoService.putData('productos', producto).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.getProductos();
      },
      error: (err) => {
        console.error('Error al actualizar producto', err);
      }
    });
  }

  // Ejemplo de cómo usar deleteData
  eliminarProducto(id: number) {
    this.productoService.deleteData('productos', id).subscribe({
      next: (res) => {
        console.log('Producto eliminado:', res);
        this.getProductos();
      },
      error: (err) => {
        console.error('Error al eliminar producto', err);
      }
    });
  }
}
