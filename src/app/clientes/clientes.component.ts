import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  title = 'AngularMVVM';
  usuarios: any[] = [];
  clientes: any;
  error: string | null = null;
  data: any;
  loading: boolean = true;

  myFormNuevo: FormGroup;
  myFormEditar: FormGroup;

  // Variables para el formulario de nuevo cliente
  nuevoCliente: any = {};
  mostrarAgregarCliente: boolean = false;

  // Variables para edición de cliente
  editarCliente: any = null;
  mostrarEditarCliente: boolean = false;

  constructor(private clienteService: ClientesService) {
    this.myFormNuevo = new FormGroup({
      nombre: new FormControl('Eva'),
      email: new FormControl(''),
    });

    this.myFormEditar = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      email: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getClientes();
  }

  // Función para enviar formulario
  onSubmit() {
    if (this.mostrarAgregarCliente) {
      this.clienteService.postData(this.myFormNuevo.value).subscribe({
        next: (res) => {
          console.log('Cliente agregado:', res);
          this.getClientes();
          this.myFormNuevo.reset();
          this.mostrarAgregarCliente = false;
        },
        error: (err) => console.error('Error al agregar cliente', err),
      });
    }

    if (this.mostrarEditarCliente) {
      const cliente = this.myFormEditar.value;
      this.clienteService.putData(cliente.id, cliente).subscribe({
        next: (res) => {
          console.log('Cliente actualizado:', res);
          this.getClientes();
          this.myFormEditar.reset();
          this.mostrarEditarCliente = false;
        },
        error: (err) => console.error('Error al actualizar cliente', err),
      });
    }
  }

  getClientes(): void {
    this.clienteService.getData().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar clientes';
        console.error(err);
      },
    });
  }

  // Abrir formulario de edición
  editar(cliente: any) {
    this.editarCliente = { ...cliente };
    this.myFormEditar.patchValue(cliente);
    this.mostrarEditarCliente = true;
  }

  // Eliminar un cliente
  eliminarCliente(id: number) {
    this.clienteService.deleteData(id).subscribe({
      next: () => {
        console.log('Cliente eliminado');
        this.getClientes();
      },
      error: (err) => console.error('Error al eliminar cliente', err),
    });
  }
}
