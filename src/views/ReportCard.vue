<template>
  <el-upload
      class="upload-demo"
      drag
      action="http://localhost:5000/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :file-list="fileList"
      multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <div class="el-upload__tip" slot="tip">PDF files with a size less than 500kb</div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      const isLt500K = file.size / 1024 < 500;

      if (!isPDF) {
        this.$message.error('Please upload PDF file only');
      }
      if (!isLt500K) {
        this.$message.error('File size should be less than 500KB');
      }
      return isPDF && isLt500K;
    }
  }
}
</script>
