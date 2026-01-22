import { Request, Response, Router } from "express"

export class ModuleRouter{
    public basePath: string
    public readonly router: Router

    constructor(basePath: string){
        this.router = Router()
        this.basePath = basePath   
    }

    //TODO: Replace with correct type definition avoid any
    public get(path: string, handler: any){
        this.router.get(path, handler)
    }
    public post(path: string, handler: any){
        this.router.post(path, handler)
    }
    public patch(path: string, handler: any){
        this.router.patch(path, handler)
    }
    public put(path: string, handler: any){
        this.router.put(path,handler)
    }
    public delete(path: string, handler:  any){
        this.router.delete(path, handler)
    }
    
    

}