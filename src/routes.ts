import { AuthController } from "./controller/AuthController";
import { CategoriasController } from "./controller/CategoriasControllers";
import { DetallesCarritoController } from "./controller/DetallesCarritoController";
import { ProductosController } from "./controller/ProductosController";

export const Routes = [
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    protected: false,
  },
  {
    method: "get",
    route: "/categorias",
    controller: CategoriasController,
    action: "findAll",
    protected: true,
  },
  {
    method: "get",
    route: "/categorias/:id",
    controller: CategoriasController,
    action: "findOne",
    protected: true,
  },
  {
    method: "get",
    route: "/categorias/:id/productos",
    controller: CategoriasController,
    action: "findAllPaginateByCategoria",
    protected: true,
  },
  {
    method: "get",
    route: "/productos",
    controller: ProductosController,
    action: "findAll",
    protected: true,
  },
  {
    method: "get",
    route: "/detalles-carrito",
    controller: DetallesCarritoController,
    action: "findByUserId",
    protected: true,
  },
  {
    method: "post",
    route: "/detalles-carrito",
    controller: DetallesCarritoController,
    action: "addDetalleCarrito",
    protected: true,
  },
  {
    method: "put",
    route: "/detalles-carrito/:id",
    controller: DetallesCarritoController,
    action: "updateDetalleCarrito",
    protected: true,
  },
  {
    method: "delete",
    route: "/detalles-carrito/:id",
    controller: DetallesCarritoController,
    action: "deleteDetalleCarrito",
    protected: true,
  },
];
