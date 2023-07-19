
CREATE DATABASE DBColegioVentas

CREATE TABLE [dbo].[Categoria] (
    [IdCategoria] INT          IDENTITY (1, 1) NOT NULL,
    [nombre]      VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Categoria] PRIMARY KEY CLUSTERED ([IdCategoria] ASC)
);

CREATE TABLE [dbo].[Cliente] (
    [IdCliente] INT          IDENTITY (1, 1) NOT NULL,
    [Dni]       VARCHAR (10) NOT NULL,
    [Nombres]   VARCHAR (50) NOT NULL,
    [Apellidos] VARCHAR (50) NOT NULL,
    [Telefono]  VARCHAR (10) NOT NULL,
    CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED ([IdCliente] ASC)
);


CREATE TABLE [dbo].[Productos] (
    [IdProducto]  INT           IDENTITY (1, 1) NOT NULL,
    [Nombre]      VARCHAR (50)  NOT NULL,
    [Descripcion] VARCHAR (200) NOT NULL,
    [Genero]      VARCHAR (20)  NULL,
    [IdCategoria] INT           NOT NULL,
    CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED ([IdProducto] ASC),
    CONSTRAINT [FK_Productos_Categoria] FOREIGN KEY ([IdCategoria]) REFERENCES [dbo].[Categoria] ([IdCategoria])
);


CREATE TABLE [dbo].[Tallas] (
    [IdTalla] INT          IDENTITY (1, 1) NOT NULL,
    [Talla]   VARCHAR (10) NULL,
    CONSTRAINT [PK_Tallas] PRIMARY KEY CLUSTERED ([IdTalla] ASC)
);


CREATE TABLE [dbo].[Usuario] (
    [IdUsuario]        INT           IDENTITY (1, 1) NOT NULL,
    [NombresApellidos] VARCHAR (100) NOT NULL,
    [Usuario]          VARCHAR (50)  NOT NULL,
    [Contrasena]       VARCHAR (200) NOT NULL,
    [Correo]           VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED ([IdUsuario] ASC)
);

CREATE TABLE [dbo].[TallaProducto] (
    [Id]         INT IDENTITY (1, 1) NOT NULL,
    [IdProducto] INT NOT NULL,
    [IdTalla]    INT NOT NULL,
    [Precio]     INT NOT NULL,
    [Stock]      INT NOT NULL,
    CONSTRAINT [PK_TallaProducto] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_TallaProducto_Productos] FOREIGN KEY ([IdProducto]) REFERENCES [dbo].[Productos] ([IdProducto]),
    CONSTRAINT [FK_TallaProducto_Tallas_1] FOREIGN KEY ([IdTalla]) REFERENCES [dbo].[Tallas] ([IdTalla])
);



CREATE TABLE [dbo].[Ventas] (
    [IdVenta]   INT             IDENTITY (1, 1) NOT NULL,
    [IdCliente] INT             NOT NULL,
    [Fecha]     DATE            CONSTRAINT [DEFAULT_Ventas_Fecha] DEFAULT (getdate()) NULL,
    [Total]     DECIMAL (18, 2) NOT NULL,
    [IdUsuario] INT             NOT NULL,
    CONSTRAINT [PK_Ventas] PRIMARY KEY CLUSTERED ([IdVenta] ASC),
    CONSTRAINT [FK_Ventas_Cliente] FOREIGN KEY ([IdCliente]) REFERENCES [dbo].[Cliente] ([IdCliente]),
    CONSTRAINT [FK_Ventas_Usuario] FOREIGN KEY ([IdUsuario]) REFERENCES [dbo].[Usuario] ([IdUsuario])
);


CREATE TABLE [dbo].[DetalleVenta] (
    [Id]         INT             IDENTITY (1, 1) NOT NULL,
    [IdVenta]    INT             NOT NULL,
    [IdProducto] INT             NOT NULL,
    [IdTalla]    INT             NOT NULL,
    [Cantidad]   INT             NOT NULL,
    [Importe]    DECIMAL (18, 2) NOT NULL,
    CONSTRAINT [PK_DetalleVenta] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_DetalleVenta_Productos] FOREIGN KEY ([IdProducto]) REFERENCES [dbo].[Productos] ([IdProducto]),
    CONSTRAINT [FK_DetalleVenta_Tallas] FOREIGN KEY ([IdTalla]) REFERENCES [dbo].[Tallas] ([IdTalla]),
    CONSTRAINT [FK_DetalleVenta_Ventas] FOREIGN KEY ([IdVenta]) REFERENCES [dbo].[Ventas] ([IdVenta])
);


GO
Create TRIGGER RestarStock
ON [dbo].[DetalleVenta]
FOR INSERT
AS
BEGIN
    DECLARE @stock INT, @cantidad INT
    SELECT @cantidad = Cantidad FROM inserted
    SELECT @stock = Stock FROM TallaProducto
            WHERE IdProducto IN (SELECT IdProducto FROM inserted) AND  IdTalla IN (SELECT IdTalla FROM inserted)

    IF @stock - @cantidad  >= 0
        BEGIN
            UPDATE TallaProducto SET Stock = Stock -  @cantidad 
            WHERE IdProducto IN (SELECT IdProducto
            FROM inserted) AND IdTalla IN (SELECT IdTalla FROM inserted)
            PRINT 'Se actualizo el stock';
        END
    ELSE
        BEGIN
            ROLLBACK TRANSACTION
            PRINT 'Stock insuficiente';
        END
END



INSERT INTO Tallas
VALUES ('6'),
('8'),
('10'),
('12'),
('14'),
('16'),
('S'),
('M'),
('L'),
('26'),
('28'),
('30'),
('32');



insert into Categoria VALUES ('Uniforme Formal'), ('Uniforme de Educación Física')
