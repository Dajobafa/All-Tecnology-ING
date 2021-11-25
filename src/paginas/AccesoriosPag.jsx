import React from "react";
import imgexport from "../imagenes/imgexport";
import Celulares from "../componentes/Celulares";
import Accesorios from "../componentes/Accesorios";

function AccesoriosPag(){

return (
<html>
	
	<head>
		
		<link rel="stylesheet" type="text/css" href="css/estilo.css"/>
	</head>
	<body bgcolor="#B59C5A" >
	   
		<div id="principal"> </div>
			<header id="cabezera">
				
					<img src={imgexport.logo}  id="logo2"/>
					
						<a id="carrito"   href="http://localhost:3000/registrarse?">Ir a Registrarme</a> 
                    	<a id="carrito" href="http://localhost:3000/" >Iniciar Sesion </a>                        
						<a id="carrito"><img src={imgexport.carrito} width="20" height="20" />Carrito de compras</a>
					
			</header >
			
			<section >
					<div >
						<a  href="http://localhost:3000/Principal?" class="seccion" >OFERTAS</a>
						<a  href="http://localhost:3000/CelularesPag" class="seccion">CELULARES</a>				
						<a  href="http://localhost:3000/AccesoriosPag" class="seleccion">ACCESORIOS</a>
					</div>
			
					<Accesorios/>
					<Accesorios/>
			</section>
			

			<section id="info">
				<section id="center">
					
						
					<h3 class="parrafo" >
						SIGUENOS y contactanos EN NUESTRAS REDES SOCIALES :
						<img align ="middle" src={imgexport.redes} width="150" />
					</h3>
				</section>
			</section>
	</body>
</html>
  
);
}

export default AccesoriosPag;