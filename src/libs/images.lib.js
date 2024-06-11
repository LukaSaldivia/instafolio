import sharp from "sharp";
import {fileURLToPath} from 'url';
import path from "path"
import { unlink } from "fs";



function uploadImage(options = {
  sizes : [500,500],
  filename : 'img',
  path : '',
  buffer

}) {
  let filename = options.filename || 'img'
  filename += '.jpeg'
  let sizes = options.sizes || [500,500]
    
    sharp(options.buffer).resize(...sizes).jpeg({
      quality: 80,
      chromaSubsampling : '4:4:4'
    }).toFile(path.join(options.path,filename))
    }

function deleteImage(path) {
  unlink(path, (err)=> {
    if (err) {
      throw err
    }
  })
}

module.exports = {uploadImage, deleteImage}
