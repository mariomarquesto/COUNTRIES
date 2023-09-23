// Importar la función "reportWebVitals" que será utilizada en la aplicación
const reportWebVitals = onPerfEntry => {
  // Comprobar si "onPerfEntry" es una función y existe
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importar las funciones de "web-vitals" para medir métricas específicas
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Llamar a las funciones de "web-vitals" y pasar la función "onPerfEntry" como argumento
      // Esto permitirá que las métricas se registren y se pasen a "onPerfEntry" para su posterior procesamiento y reporte
      getCLS(onPerfEntry); // Cumulative Layout Shift (Desplazamiento de diseño acumulativo)
      getFID(onPerfEntry); // First Input Delay (Retraso del primer input)
      getFCP(onPerfEntry); // First Contentful Paint (Primer pintado de contenido)
      getLCP(onPerfEntry); // Largest Contentful Paint (Mayor pintado de contenido)
      getTTFB(onPerfEntry); // Time to First Byte (Tiempo hasta el primer byte)
    });
  }
};

// Exportar la función "reportWebVitals" para su uso en la aplicación
export default reportWebVitals;
