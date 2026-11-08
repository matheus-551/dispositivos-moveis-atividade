import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
for(const key of ['CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET','CLOUDINARY_ASSET_FOLDER','GOOGLE_APPLICATION_CREDENTIALS']) if(!process.env[key]) throw new Error(`Configure ${key} no .env do servidor.`);
initializeApp({credential:applicationDefault()});
cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET,secure:true});
const app=express(), folder=process.env.CLOUDINARY_ASSET_FOLDER;
app.use(cors());app.use(express.json({limit:'10kb'}));
app.use(async(req,res,next)=>{
 const token=req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
 if(!token)return res.status(401).json({error:'Autenticação necessária.'});
 try{await getAuth().verifyIdToken(token,true);next();}catch{return res.status(401).json({error:'Sessão inválida. Entre novamente.'});}
});
app.get('/images',async(req,res)=>{
 try{
  if(req.query.cursor&&(typeof req.query.cursor!=='string'||req.query.cursor.length>2048))return res.status(400).json({error:'Cursor inválido.'});
  const result=await cloudinary.api.resources_by_asset_folder(folder,{max_results:50,next_cursor:req.query.cursor});
  res.json({images:result.resources.filter(r=>r.resource_type==='image'&&r.type==='upload').map(r=>({publicId:r.public_id,name:r.display_name||r.original_filename||r.public_id.split('/').pop(),url:r.secure_url})),nextCursor:result.next_cursor||null});
 }catch(e){console.error(e.message);res.status(502).json({error:'Não foi possível listar as imagens do Cloudinary.'});}
});
app.delete('/images',async(req,res)=>{
 const {publicId}=req.body||{};
 if(typeof publicId!=='string'||!publicId.trim()||publicId.length>1024)return res.status(400).json({error:'Identificador inválido.'});
 try{
  const image=await cloudinary.api.resource(publicId,{resource_type:'image',type:'upload'});
  if(image.asset_folder!==folder)return res.status(403).json({error:'Imagem fora da pasta permitida.'});
  const result=await cloudinary.uploader.destroy(publicId,{resource_type:'image',type:'upload',invalidate:true});
  if(!['ok','not found'].includes(result.result))throw new Error('Exclusão não confirmada.');
  res.status(204).end();
 }catch(e){console.error(e.message);res.status(e.http_code===404?404:502).json({error:'Não foi possível excluir a imagem.'});}
});
app.listen(Number(process.env.PORT)||3001,'0.0.0.0',()=>console.log('API da galeria iniciada.'));
