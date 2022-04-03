import axios from "axios";



export const getAllCities = async()=>{
  try{
    let data = await axios.get('http://localhost:4000/api/allcities')
  console.log(data)
    return data
  }
  catch(error){
    throw error
  }
}
export const cargarCities = async (dataInput)=>{
  try{
    let data = await axios.post('http://localhost:4000/api/allcities',{dataInput})
    return data
  }
  catch(error){
    throw error
  }
}
export const eliminarCities = async (id)=>{
  try{
    let data = await axios.delete(`http://localhost:4000/api/allcities/${id}`)
 return data
  }
  catch (error){
    throw error
  }
}
export const modificarCities = async (id,dataInput)=>{
  try{
    let data = await axios.get(`http://localhost:4000/api/allcities/${id}`)
return data
  }catch(error)
  {throw error}
}
export const getAllItineraries = async()=>{
  try{
    let data = await axios.get('http://localhost:4000/api/allitineraries')
  console.log(data)
    return data
  }
  catch(error){
    throw error
  }
}
export const cargarItineraries = async (dataInput)=>{
  try{
    let data = await axios.post('http://localhost:4000/api/allitineraries',{dataInput})
    return data
  }
  catch(error){
    throw error
  }
}
export const eliminarItineraries = async (id)=>{
  try{
    let data = await axios.delete(`http://localhost:4000/api/allitineraries/${id}`)
 return data
  }
  catch (error){
    throw error
  }
}
export const modificarItineraries = async (id,dataInput)=>{
  try{
    let data = await axios.get(`http://localhost:4000/api/allitineraries/${id}`)
return data
  }catch(error)
  {throw error}
}