
<template>


<div class="container">
 <b-card  :footer="tarea.fecha_limite_entrea">
  <div class="d-flex justify-content-between">
  <div class="p-2 bd-highlight">Tarea N° {{ numero }}</div>
  <div class="p-2 bd-highlight">{{ tarea.trabajador.full_name }}</div>
  <div class="p-2 bd-highlight">
     <b-button variant="primary" @click="modalShow = !modalShow">Cambiar Estado</b-button>
  </div>
</div>
<hr>
    <b-card-text>
        <p align="justify">
             {{ tarea.descripcion }}
        </p>
    </b-card-text>        
    <b-card-footer>
        
        <div class="d-flex justify-content-between">
  <div class="p-2 bd-highlight">{{ tarea.fecha_limite_entrega }}</div>
  <div class="p-2 bd-highlight">{{  tarea.estado }}</div>
  
</div>
    </b-card-footer>
   
  </b-card>
  
   <b-modal  v-model="modalShow" title="Cambiar Estado Tarea">
    <pre>{{ tareaId }}</pre>
   <div>
    <b-form @submit="onSubmit" @reset="onReset" >

    <b-form-group
        id="input-group-1"
        label="Estado:"
        label-for="input-1"       
      >
     <b-form-select v-model="estadoTarea.estado" class="mb-3" required>
      <b-form-select-option :value="null">Seleccionar una Opción</b-form-select-option>
      <b-form-select-option value="NO COMPLETADO">NO COMPLETADO</b-form-select-option>
      <b-form-select-option value="CUMPLIDA">CUMPLIDA</b-form-select-option>    
     
    </b-form-select>   
    </b-form-group> 

      <b-form-group
        id="input-group-1"
        label="Observaciones:"
        label-for="input-1"  
        v-if="estadoTarea.estado=='NO COMPLETADO'"     
      >
        <b-form-textarea
          id="input-1"
          v-model="estadoTarea.observacion"
          type="text"          
          :required="estadoTarea.obligatorio"
        ></b-form-textarea>
      </b-form-group>   

      <b-form-group
        id="input-group-1"
        label="Fecha:"
        label-for="input-1"       
      >
     <input type="datetime-local" class="form-control" v-model="estadoTarea.fecha_entrega" required>
      </b-form-group>  

    
      <b-button type="submit" variant="primary">Guardar</b-button>     
    </b-form>   
  </div>
  </b-modal>
    </div>
   
  

</template>

<script>

export default {
    name: 'Tarea',    
    data() {
        return {
           modalShow: false,
           estadoTarea: {       
            tarea_id: this.tarea.id,   
            observacion: '',    
            fecha_entrega: '',    
            estado: '',    
            obligatorio:false,         
            status:'',     
        },  
        }
    },
    props:[
        'tarea', 'numero'
    ],
    methods: {      
      async onSubmit(event) {
        event.preventDefault()       
        await this.axios.post("http://localhost/ejemplarsas/public/api/cambiarEstadoTarea", this.estadoTarea)
        .then(response => {
            this.estadoTarea.status = response.data.status
           alert('Estado Cambiado Exitosamente')        
            this.estadoTarea={                            
              observacion: '',    
              fecha_entrega: '',    
              estado: '',    
              obligatorio:false,         
              status:'',      
            },
            this.modalShow=false
        })
        .catch(error => {
        this.errorMessage = error.message
        alert("No se puede conectar al servidor!", error)
        })
        this.$emit('recargar')
       
      },     
      
    },
   
}
</script>

<style>

</style>