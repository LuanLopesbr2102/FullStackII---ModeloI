//Essa funções tem como por objetivo gerar token de acesso / tem como objetivo verificar se o token é válido ou não 
import jwt from 'jsonwebtoken';

export function assinar(usuario){
    const token = jwt.sign({usuario}, "H4v3d0u5U4r10S3c3Cr3t4", {expiresIn:'300s'});
    return token;
}

export function verificarAssinatura(token){
    return jwt.verify(token, "H4v3d0u5U4r10S3c3Cr3t4");
}