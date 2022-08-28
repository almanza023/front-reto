<template>
  <b-modal id="modal-2" title="Nueva Trabajador">
   <div>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Nombres:"
        label-for="input-1"       
      >
        <b-form-input
          id="input-1"
          v-model="trabajador.nombres"
          type="text"
          placeholder="Nombres"
          required
        ></b-form-input>
      </b-form-group>   

      <b-form-group
        id="input-group-1"
        label="Apellidos:"
        label-for="input-1"       
      >
        <b-form-input
          id="input-1"
          v-model="trabajador.apellidos"
          type="text"
          placeholder="Apellidos"
          required
        ></b-form-input>
      </b-form-group>  

      <b-form-group
        id="input-group-1"
        label="Documento:"
        label-for="input-1"       
      >
        <b-form-input
          id="input-1"
          v-model="trabajador.documento"
          type="number"
          placeholder="Correo"
          required
        ></b-form-input>
      </b-form-group> 

      <b-form-group
        id="input-group-1"
        label="Correo:"
        label-for="input-1"       
      >
        <b-form-input
          id="input-1"
          v-model="trabajador.correo"
          type="text"
          placeholder="Correo"
          required
        ></b-form-input>
      </b-form-group> 

      <b-form-group
        id="input-group-1"
        label="Dependencia:"
        label-for="input-1"       
      >
     <b-form-select v-model="trabajador.dependencia" class="mb-3" required>
      <b-form-select-option :value="null">Seleccionar una Opción</b-form-select-option>
      <b-form-select-option :value="item.id" :key="index" v-for="(item, index) in dependencias">{{ item.nombre }}</b-form-select-option>
     
     
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
        trabajador: {        
          nombres: '',    
          apellidos: '',    
          documento: '',    
          correo: '',  
          dependencia: '',  
          status:'',     
        },              
        dependencias: [],
      }
     
    },
    created() {
     this.cargarDependencias()
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
       
        await this.axios.post("http://localhost/ejemplarsas/public/api/trabajadores", this.trabajador, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2VqZW1wbGFyc2FzXC9wdWJsaWNcL2FwaVwvcmVnaXN0ZXIiLCJpYXQiOjE2NjE2NjAwODUsImV4cCI6MTY2MTY2MzY4NSwibmJmIjoxNjYxNjYwMDg1LCJqdGkiOiJGQ3h1YXVKRlNTVnVaQmlSIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.T9fMfaDgz0KJ6ezF3MT8aTx6bzaoI43MbhQap-HotQo'
        }})
        .then(response => {
            this.trabajador.status = response.data.status
           alert('Trabajador Creado!!')
            this.trabajador={        
              nombres: '',    
              apellidos: '',    
              documento: '',    
              correo: '',  
              dependencia: '',  
              status:'',     
            }
        })
        .catch(error => {
        this.errorMessage = error.message
        alert("No se puede conectar con el servidor!", error)
        })
        this.$emit('recargar')
      },
     
      async cargarDependencias(){       
        await this.axios.get("http://localhost/ejemplarsas/public/api/dependencias", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2VqZW1wbGFyc2FzXC9wdWJsaWNcL2FwaVwvcmVnaXN0ZXIiLCJpYXQiOjE2NjE2NjAwODUsImV4cCI6MTY2MTY2MzY4NSwibmJmIjoxNjYxNjYwMDg1LCJqdGkiOiJGQ3h1YXVKRlNTVnVaQmlSIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.T9fMfaDgz0KJ6ezF3MT8aTx6bzaoI43MbhQap-HotQo'
        }})
        .then(response => {
            this.dependencias = response.data.dependencias          
        })
        .catch(error => {
        this.errorMessage = error.message
        alert("There was an error!", error)
        })
      }
    }
  }
</script>

<style>

</style>