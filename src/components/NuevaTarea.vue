<template>
  <b-modal id="modal-tarea" title="Nueva Tarea">
   <div>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Descripción:"
        label-for="input-1"       
      >
        <b-form-textarea
          id="input-1"
          v-model="tarea.descripcion"
          type="text"
          placeholder="Descripción"
          required
        ></b-form-textarea>
      </b-form-group>   

      <b-form-group
        id="input-group-1"
        label="Fecha Limite:"
        label-for="input-1"       
      >
     <input type="date" class="form-control" v-model="tarea.fecha_limite" required>
      </b-form-group>  

    <b-form-group
        id="input-group-1"
        label="Trabajador:"
        label-for="input-1"       
      >
     <b-form-select v-model="tarea.trabajador" class="mb-3" required>
      <b-form-select-option :value="null">Seleccionar una Opción</b-form-select-option>
      <b-form-select-option :value="item.id" :key="index" v-for="(item, index) in trabajadores">{{ item.full_name }}</b-form-select-option>
        
    </b-form-select>
   
  </b-form-group> 
      <b-button type="submit" variant="primary">Guardar</b-button>     
    </b-form>  
  </div>
  </b-modal>
</template>

<script>

export default {
    data() {
      return {
        tarea: {        
          descripcion: '',    
          fecha_limite: '',    
          trabajador: '',             
          status:'',     
        },   
        message:'',           
        trabajadores: [],
      }
     
    },
    created() {
     this.cargarTrabajadores()
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
       
        await this.axios.post("http://localhost/ejemplarsas/public/api/tareas", this.tarea)
        .then(response => {
            this.tarea.status = response.data.status
           alert('Tarea Registrada!!')
           this.message='ok'
            this.tarea={        
              descripcion: '',    
              fecha_limite: '',    
              trabajador: '',             
              status:'',      
            }
        })
        .catch(error => {
        this.errorMessage = error.message
        alert("No se puede cargar con el servidor!", error)
        })
      this.$emit('recargar')
      },
     
      async cargarTrabajadores(){       
        await this.axios.get("http://localhost/ejemplarsas/public/api/trabajadores")
        .then(response => {
            this.trabajadores = response.data.trabajadores          
        })
        .catch(error => {
        this.errorMessage = error.message
        alert("No se puede conectar al servidor!", error)
        })
      }
    },
    
  }
</script>

<style>

</style>