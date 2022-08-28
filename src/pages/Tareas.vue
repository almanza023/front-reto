<template clas="container">
  <Navbar></Navbar>
  <NuevaDependencia @recargar="recargar"></NuevaDependencia>
  <NuevoTrabajador @recargar="recargar"></NuevoTrabajador>
  <NuevaTarea @recargar="recargar"></NuevaTarea>
  <br />
  <div v-if="loading">
    <b-spinner label="Cargando Datos..."></b-spinner>
  </div>
  <div id="itemList" v-for="(tarea, index) in tareas" :key="index">
    <br />
    <Tarea
      :tarea="tarea"
      :numero="(index+1)"
      @recargar="recargar"
    ></Tarea>
  </div>

  <b-pagination
    v-if="loading==false"
    v-model="currentPage"
    :total-rows="rows"
    :per-page="perPage"
    aria-controls="itemList"
    align="center"
    pills
  ></b-pagination>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import NuevaDependencia from '../components/NuevaDependencia'
import NuevaTarea from '../components/NuevaTarea'
import NuevoTrabajador from '../components/NuevoTrabajador'
import Tarea from '../components/Tarea'


export default {
  data(){
    return {
        perPage: 2,
        currentPage: 1,
        tareas:[],
        myMessage:'',
        loading: true

    }
  },
components: {
    Navbar,
    NuevaDependencia,
    NuevoTrabajador,
    Tarea,
    NuevaTarea
  },
  mounted() {
     this.cargarTareas()

  },

  methods:{

    async cargarTareas(){
        await this.axios.get("http://localhost/ejemplarsas/public/api/tareas", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2VqZW1wbGFyc2FzXC9wdWJsaWNcL2FwaVwvcmVnaXN0ZXIiLCJpYXQiOjE2NjE2NjAwODUsImV4cCI6MTY2MTY2MzY4NSwibmJmIjoxNjYxNjYwMDg1LCJqdGkiOiJGQ3h1YXVKRlNTVnVaQmlSIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.T9fMfaDgz0KJ6ezF3MT8aTx6bzaoI43MbhQap-HotQo'
        }})
        .then(response => {
            this.tareas = response.data.tareas
            this.loading=false
        })
        .catch(error => {
        alert("Error al obtener datos", error)
        })
    },
     handleMessage (value) {
      this.myMessage = value
    },
    recargar(){
      this.cargarTareas()
    }
  },
  computed: {
      rows() {
        return this.tareas.length
      }
    }

}
</script>

<style></style>
