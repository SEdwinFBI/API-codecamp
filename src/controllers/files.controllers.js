import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);//directorio


export const getPhotoProduct = async(req, res) => {
    //busqueda de archivo
    const filePath = path.join(__dirname, '../uploads/products', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).send(" ");
  }};