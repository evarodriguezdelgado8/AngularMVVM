import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {

  usuarios: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  mostrarAgregar: boolean = false;
  mostrarEditar: boolean = false;

  myFormNuevo: FormGroup;
  myFormEditar: FormGroup;

  constructor(private usuariosService: UsuariosService) {

    this.myFormNuevo = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', Validators.required),
    });

    this.myFormEditar = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getData().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar usuarios';
      }
    });
  }

  // =====================
  // CREAR
  // =====================
  onSubmitNuevo() {
    if (this.myFormNuevo.invalid) return;

    this.usuariosService.postData(this.myFormNuevo.value).subscribe({
      next: () => {
        this.getUsuarios();
        this.myFormNuevo.reset();
        this.mostrarAgregar = false;
      }
    });
  }

  // =====================
  // EDITAR
  // =====================
  editarUsuario(usuario: any) {
    this.myFormEditar.setValue({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    });

    this.mostrarEditar = true;
  }

  onSubmitEditar() {
    if (this.myFormEditar.invalid) return;

    const usuario = this.myFormEditar.value;

    this.usuariosService.putData(usuario.id, usuario).subscribe({
      next: () => {
        this.getUsuarios();
        this.mostrarEditar = false;
      }
    });
  }

  // =====================
  // ELIMINAR
  // =====================
  eliminarUsuario(id: number) {
    this.usuariosService.deleteData(id).subscribe({
      next: () => this.getUsuarios()
    });
  }
}
