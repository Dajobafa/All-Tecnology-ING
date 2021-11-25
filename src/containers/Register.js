import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/All.css';
import axios from 'axios';
import imgexport from '../imagenes/imgexport';


const baseUrl = "http://localhost:3001/usuarios";

export default class Register extends Component {
    state = {
        form: {
            id: '',
            email: '',
            Apellido_materno: '',
            Apellido_paterno: '',
            Nombre: '',
            username: '',
            password: ''
        }
    }
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    peticionGet = () => {
        axios.get(baseUrl).then(response => {
            this.setState({ data: response.data });
        })
            .catch(error => {
                console.log(error.mensagge)
            })
    }
    peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(baseUrl, this.state.form).then(response => {
            alert('Registrado');
            this.volver();

        })
            .catch(error => {
                alert('error');
                console.log(error.mensagge)
            })
    }
    volver = async => {
        window.location.href = "./"
    }
    render() {

        return (
            <html className="fondo">
                <body id="tarjeta">
                    <section >
                        <img src={imgexport.logo} width="200" height="150" id="logo2" />
                        <h1 className="titulo"> Registrarse </h1>
                        <div >
                            <div>
                                <h4 className="centrartextos">Usuario </h4>
                                <input name="username" placeholder="Juanito123" class="entradas" required onChange={this.handleChange} />
                            </div>
                            <div>
                                <h4 className="centrartextos">Nombre </h4>
                                <input name="Nombre" placeholder="Juan" class="entradas" required onChange={this.handleChange} />
                            </div>
                            <div>
                                <h4 className="centrartextos">Apellido Paterno</h4>
                                <input name="Apellido_paterno" type="text" placeholder="Gonzalez" class="entradas" required onChange={this.handleChange} />
                            </div>
                            <div>
                                <h4 className="centrartextos">Apellido Materno</h4>
                                <input name="Apellido_materno" type="text" placeholder="Perez" class="entradas" required onChange={this.handleChange} />
                            </div>
                            <div>
                                <h4 className="centrartextos">Correo</h4>
                                <input name="email" type="email" placeholder="Su direcci&oacute;n de correo" class="entradas" required onChange={this.handleChange} />
                            </div>
                            <div>
                                <h4 className="centrartextos">Contrase&ntilde;a</h4>
                                <input name="password" id="password" placeholder="*********" type="password" class="entradas" required onChange={this.handleChange} />
                            </div>
                            <button id="ingresar" onClick={() => this.peticionPost()}>
                                Registrarse
                            </button>
                            <h3>Ya tengo una cuenta</h3>
                            <button onClick={this.volver} id="ingresar" > Iniciar Sesion </button>

                        </div>
                    </section>

                </body>
            </html>

        )
    }
}
