<template>
  <b-modal id="modal-1" title="Nueva Dependencia">
   <div>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Nombre:"
        label-for="input-1"       
      >
        <b-form-input
          id="input-1"
          v-model="dependenica.nombre"
          type="text"
          placeholder="Nombre"
          required
        ></b-form-input>
      </b-form-group>   
      <b-button type="submit" variant="primary">Guardar</b-button>
      <b-button type="reset" variant="danger">Nuevo</b-button>
    </b-form>   
  </div>
  </b-modal>
</template>

<script>

export default {
    data() {
      return {
        dependenica: {        
          nombre: '',    
          status:'',     
        },   
        errorMessage: '',     
      }
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
       
        await this.axios.post("http://localhost/ejemplarsas/public/api/dependencias", this.dependenica)
        .then(response => {
            this.dependenica.status = response.data.status
           alert('Dependencia creada Exitosamente!!')
           this.dependenica={        
              nombre: '',    
              status:'',     
            }
        })
        .catch(error => {
        this.errorMessage = error.message
        alert("No se puede conectar con el servidor!", error)
        })
        this.$emit('recargar')
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.dependenica.nombre = ''        
      }
    }
  }
</script>

<style>

</style>