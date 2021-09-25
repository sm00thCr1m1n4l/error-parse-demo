import { Controller,Post,Body } from '@nestjs/common';
import axios from 'axios'
import {SourceMapConsumer} from 'source-map'
const parseUrl=(files:string[])=>{
  const _files=files.map(file=>{
    const raw=/(.*):(\d*):(\d*)/.exec(file)
    return {
      url:`${raw[1]}.map`,
      line:Number(raw[2]),
      column:Number(raw[3])
    }
  })
  return _files
}
const codeToSource=async (map:{[key:string]:SourceMapConsumer},files:ReturnType<typeof parseUrl>)=>{
  const sourceCodeMap:{[key:string]:string}={}
  const positions=files.map(file=>{
    const consumer=map[file.url]
    const position=consumer.originalPositionFor({
      column:file.column,
      line:file.line
    })
    if(!sourceCodeMap[position.source]&&position.source){
      sourceCodeMap[position.source]=consumer.sourceContentFor(position.source)
    }
    return position
  })
  Object.values(map).forEach(e=>e.destroy())
  return {
    positions,
    sourceCodeMap
  }
}
const errorParse=async (files:string[])=>{  
  const _files=parseUrl(files)
  const map={}
  const queue=[]
  _files.forEach(file=>{
      if(!map[file.url]){
        queue.push(
          axios.get(file.url).then(async res=>{
            map[file.url]=await new SourceMapConsumer(res.data)
          })
        )
      }
  })
  await Promise.all(queue)
  return codeToSource(map,_files)
}
@Controller('gen-source-code')
export class GenSourceCodeController {
  @Post()
  public async create(@Body() errData:any){
    const files=(errData.stack).match(/https?:\/\/.*\.js:\d*:\d*/gi)
    const map={}
    const errors=await errorParse(files)
    return {
      errors,
      message:errData.message
    }
  }
}
