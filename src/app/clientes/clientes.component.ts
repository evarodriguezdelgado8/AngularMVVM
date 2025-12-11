import { Component } from '@angular/core';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

  title = 'AngularMVVM';
  usuarios: any[] = [];
  clientes: any;
  error: string | null = null;
  data: any; // Variable para almacenar los datos
  loading: boolean = true; // Indicador de carga
  // Variables para el formulario de nuevo cliente
  nuevoCliente: any = {};
  mostrarAgregarCliente: boolean = false;

  // Variables para edición de cliente
  editarCliente: any = null;
  mostrarEditarCliente: boolean = false;

  constructor(private clienteService: ClientesService) {}

  ngOnInit() {   
    this.getClientes();
  }   

   getClientes(): void {
    this.clienteService.getData('clientes').subscribe({
      next: (data) => {
        this.usuarios = data; // Asignar los datos de productos
        this.clientes = data; // Asignar la respuesta a la variable 'data'
        this.loading = false; // Detener el indicador de carga
      },
      error: (err) => {
        this.error = 'Error al cargar clientes'; // Manejar errores
        console.error(err);
      },
    });
  }

  // Agregar un nuevo cliente
  agregarCliente(nuevoCliente: any) {
    this.clienteService.postData('clientes', nuevoCliente).subscribe({
      next: (res) => {
        console.log('Cliente agregado:', res);
        this.getClientes(); 
      },
      error: (err) => console.error('Error al agregar cliente', err)
    });
  }

  // Abrir formulario de edición
  editar(cliente: any) {
    this.editarCliente = { ...cliente }; // Hacer copia
    this.mostrarEditarCliente = true;
  }

  // Guardar cambios de edición
  guardarEdicion() {
    this.actualizarCliente(this.editarCliente); // Llama a tu método existente
    this.editarCliente = null;
    this.mostrarEditarCliente = false;
  }

  // Actualizar un cliente existente
  actualizarCliente(cliente: any) {
  this.clienteService.putData(cliente).subscribe({
    next: (res) => {
      console.log('Cliente actualizado:', res);
      this.getClientes(); // Recargar lista
    },
    error: (err) => {
      console.error('Error al actualizar cliente', err);
    }
  });
}


  // Eliminar un cliente
  eliminarCliente(id: number) {
  this.clienteService.deleteData(id).subscribe({
    next: (res) => {
      console.log('Cliente eliminado:', res);
      this.getClientes(); // Recargar lista
    },
    error: (err) => {
      console.error('Error al eliminar cliente', err);
    }
  });
}

}
