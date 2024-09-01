import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const almacenamiento = multer.diskStorage({//proceso de almacenacion y asignacion de nombre
  destination: (req, file, callback) => {//destino
    const rutaDestino = path.join(__dirname, '../uploads/products');
    console.log("destino: " , rutaDestino)
    callback(null, rutaDestino);
  },
  filename: (req, file, callback) => {//nombre unico
    const nombreArchivo = Date.now() + path.extname(file.originalname);
    console.log("Nombre del archivo generado:", nombreArchivo); 
    callback(null, nombreArchivo);
  },
});

export const uploads = multer({storage: almacenamiento });
