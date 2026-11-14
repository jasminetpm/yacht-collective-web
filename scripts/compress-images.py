"""Resumable: convert jpg/jpeg/png/avif under public/images (not logos) to <=1920px WebP q82.
Originals are kept (old sheet links still work); writes ../fleet-private/image-rename-map.json."""
import os, json
from multiprocessing import Pool
from PIL import Image, ImageOps
root='public/images'; MAXW=1920; Q=82
def job(p):
    f=os.path.basename(p); ext=f.rsplit('.',1)[-1].lower()
    out=p if ext=='webp' else p.rsplit('.',1)[0]+'.webp'
    if ext!='webp' and os.path.exists(out): return p,out
    if ext=='webp' and os.path.getsize(p)<400_000: return p,None
    im=ImageOps.exif_transpose(Image.open(p))
    if im.width>MAXW: im=im.resize((MAXW,round(im.height*MAXW/im.width)),Image.LANCZOS)
    a=im.mode in('RGBA','LA','PA') or 'transparency' in im.info
    im.convert('RGBA' if a else 'RGB').save(out+'.tmp','WEBP',quality=Q,method=6)
    os.replace(out+'.tmp',out)
    return p,(out if ext!='webp' else None)
if __name__=='__main__':
    files=[]
    for dp,_,fn in os.walk(root):
        if os.path.relpath(dp,root).split(os.sep)[0]=='logos': continue
        files+=[os.path.join(dp,f) for f in fn if f.rsplit('.',1)[-1].lower() in('jpg','jpeg','png','webp','avif')]
    with Pool(4) as pool: res=pool.map(job,files,chunksize=4)
    conv={'/'+p[len('public'):]:'/'+o[len('public'):] for p,o in res if o}
    json.dump(conv,open('../fleet-private/image-rename-map.json','w'),indent=0)
    print(len(conv),'mapped')
