<template>
  <div style="height: 300px">
    {{ error.source }}
    <div ref="editor" style="height: 280px"></div>
  </div>
</template>
<script>
import * as monaco from "monaco-editor";
const extLangMap = {
  js: "javascript",
  vue: "html",
};
export default {
  name: "CodeEditor",
  props: {
    error: Object,
    code: String,
    message:String
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    ext() {
      return this.error.source ? this.error.source.split(".").slice(-1)[0] : "";
    },
  },
  methods: {
    focusError() {
      this.editor.setValue(this.code);
      this.editor.revealLineInCenter(this.error.line);
      monaco.editor.setModelMarkers(this.editor.getModel(), "test", [
        {
          startLineNumber: this.error.line,
          startColumn: this.error.column,
          endLineNumber:  this.error.line,
          endColumn: this.error.name?this.error.name.length+this.error.column:Infinity,
          message: this.message,
          severity: monaco.MarkerSeverity.Error,
        },
      ]);
    },
  },
  mounted() {
    console.log(this);
    this.$watch("ext", {
      immediate: true,
      handler: (val) => {
        console.log(val);
        if (val) {
          this.editor = monaco.editor.create(this.$refs.editor, {
            language: extLangMap[this.ext],
          });
          this.$emit("editor-created");
        }
      },
    });
    this.$watch("code", {
      immediate: true,
      handler: (val) => {
        if (val && this.editor) {
          this.focusError();
          return;
        }
        this.$once("editor-created", this.focusError);
      },
    });
  },
};
</script>