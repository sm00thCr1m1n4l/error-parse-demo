<template>
  <div class="home">
    <div v-for="e in errors">
      <CodeEditor  v-for="i in e.errors"    :message="e.message" :error="i" :code="e.sourceCodeMap[i.source]"></CodeEditor>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import CodeEditor from '../components/CodeEditor.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    CodeEditor
  },
  data(){
    return {
      
    }
  },
  computed:{
    errors(){
      return this.$store.state.errors
    }
  },
  mounted(){
    console.log(this.$store)
      ''.asd()
    
    
  }
}
</script>
