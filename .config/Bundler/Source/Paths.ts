
export { findFeatures , features as modules , assets , root }

import { exists , readdir , lstat } from 'node:fs/promises'
import { join } from 'node:path'


const root = join(import.meta.dir,'..','..','..')

const assets = join(root,'assets')

const features = join(root,'Source','Features')


const findFeatures = () => 
    readdir(features).then(toEntries)


async function toEntries ( files : Array<string> ){
    
    const modules = new Array<string>

    for ( const file of files ){

        const path = join(features,file)

        const stat = await lstat(path)

        if( ! stat.isDirectory() )
            continue

        const module = join(path,'mod.ts')

        if( ! await exists(module) )
            continue 

        modules.push(module)
    }

    return modules
}
