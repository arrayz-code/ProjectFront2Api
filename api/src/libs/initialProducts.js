import Product from "../models/Product.js"; // Importa el modelo de productos

export const createInitialProducts = async () => {
  try {
    // Verificar si ya existen productos en la base de datos antes de crear los nuevos
    const existingProducts = await Product.find();
    if (existingProducts.length === 0) {
      // Crear algunos productos de ejemplo
      const products = [

        {
          "name": "Laptop Lenovo ThinkPad X1 Carbon",
          "category": "Computadoras portátiles",
          "price": 1499.99,
          "imgURL": "https://http2.mlstatic.com/D_NQ_NP_830639-MLV75231610620_032024-O.webp"
        },
        {
          "name": "Smartphone Samsung Galaxy S21 Ultra",
          "category": "Teléfonos inteligentes",
          "price": 1199.99,
          "imgURL": "https://i.blogs.es/c6cbf2/captura-de-pantalla-2021-01-14-a-las-13.33.21/1366_2000.jpg"
        },
        {
          "name": "Smartwatch Apple Watch Series 7",
          "category": "Dispositivos ponibles",
          "price": 399.99,
          "imgURL": "https://allstore.com.ve/wp-content/uploads/2022/02/768-Apple_Watch_Series_7_GPS_45mm_Blue_Aluminum_Abyss_Blue_Sport_Band-1-600x600.png"
        },
        {
          "name": "Monitor LG UltraWide 34WN750",
          "category": "Monitores",
          "price": 599.99,
          "imgURL": "https://www.lg.com/es/images/business/md07532281/gallery/D-01.jpg"
        },
        {
          "name": "Auriculares inalámbricos Sony WH-1000XM4",
          "category": "Auriculares y audífonos",
          "price": 349.99,
          "imgURL": "https://http2.mlstatic.com/D_NQ_NP_703833-MLV70090501012_062023-O.webp"
        },
        {
          "name": "Cámara DSLR Canon EOS 90D",
          "category": "Cámaras fotográficas",
          "price": 1199.99,
          "imgURL": "https://tecnologiahdv.com/wp-content/uploads/2021/02/Ca%CC%81mara-DSLR-Canon-EOS-90D.jpeg"
        },
        {
          "name": "Consola de videojuegos PlayStation 5",
          "category": "Consolas de videojuegos",
          "price": 499.99,
          "imgURL": "https://http2.mlstatic.com/D_NQ_NP_639019-MLV73587786231_122023-O.webp"
        },
        {
          "name": "Router inalámbrico TP-Link Archer AX11000",
          "category": "Redes y conexión",
          "price": 399.99,
          "imgURL": "https://www.pcshopvzla.com/cdn/shop/products/router110002_1024x.jpg?v=1668003242"
        },
        {
          "name": "Teclado mecánico Corsair K95 RGB Platinum XT",
          "category": "Accesorios de computadora",
          "price": 199.99,
          "imgURL": "https://sigmatiendas.com/cdn/shop/files/Teclado-Corsair-mecanico-para-videojuegos-K95-RGB-Platinum-XT-con-retroiluminacion-LED-front_grande.jpg?v=1689604359"
        },
        {
          "name": "Impresora láser HP Color LaserJet Pro MFP M479fdw",
          "category": "Impresoras y escáneres",
          "price": 449.99,
          "imgURL": "https://www.hp.com/es-es/shop/Html/Merch/Images/c06322144_1750x1285.jpg"
        }
     ];

      // Guardar los productos en la base de datos
      const createdProducts = await Product.create(products);

      console.log('Productos creados:', createdProducts);
    } else {
      console.log('Ya existen productos en la base de datos. No se crearon productos nuevos.');
    }
  } catch (error) {
    console.error('Error al crear productos:', error);
  }
};