
/// <reference lib="dom" />

import { relative , dirname , basename , join } from 'node:path'
import { findFeatures , modules , assets } from './Paths'
import { BuildConfig } from 'bun'
import { watch } from 'chokidar'
import { writeFile } from 'node:fs/promises'


const { error , clear , log } = console

clear()

log(`Starting Builder`)


const moduleWatcher = watch(modules,{
    ignoreInitial : true ,
    persistent : true
}).on('all',rebuild)


let timeout_rebuild : undefined | NodeJS.Timeout

function rebuild ( event : string , path : string ){

    clear()

    log(`${ event } : ${ relative(modules,path) }`)

    clearTimeout(timeout_rebuild)


    timeout_rebuild = setTimeout(build,500)
}


log(`Initial Build`)

async function build (){

    const entrypoints = await findFeatures()

    if( entrypoints.length === 0 ){
        console.warn(`No entrypoints found -> Aborting`)
        return
    }

    for ( const entrypoint of entrypoints ){

        const name = basename(dirname(entrypoint))

        const asset = join(assets,`Script--${ name }.js`)

        const config = {

            entrypoints : [ entrypoint ]

        } satisfies BuildConfig

        await Bun
        .build(config)
        .then(( built ) => {

            if( ! built.success )
                throw built.logs

            return built.outputs[0].text()
        })
        .then(( text ) => writeFile(asset,text))
        .then(() => console.log(`Build module ${ name }`))
        .catch(( exception ) => console.error(exception))
    }

}

build()



process.on('SIGINT',async () => {

    log(`Stopping Bundler`)

    await moduleWatcher.close()
        .then(() => log(`Closed modules watcher`))
        .catch(( exception ) => error(`Failed to close modules watcher`,exception))

    process.exit()
})
