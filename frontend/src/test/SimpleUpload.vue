<template>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div v-if="message"
             :class="`message ${err ? 'is-danger' : 'is-success'}`"
        >
            <div class="message-body">{{message}}</div>
        </div>
        <div class="field">
            <label for="file" class="label">Upload File</label>
            <input
                    type="file"
                    ref="file"
                    @change="selectFile"
            />
        </div>
        <div class="field">
            <button class="button is-info">Send</button>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'SimpleUpload',
        data() {
            return {
                file: "",
                message: "",
                err: false
            }
        },
        methods: {
            selectFile() {
                const file = this.$refs.file.files[0];
                const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
                const MAX_SIZE = 5000000;
                const tooLarget = file.size > MAX_SIZE;

                if(allowedTypes.includes(files.type)) {
                    this.file = file;
                    this.err = false;
                    this.message = "";
                } else {
                    this.err = true;
                    this.message = tooLarge
                        ? `Too large. Max size is ${MAX_SIZE/1000}KB`
                        : "Only images are allowed";

                }

            },

            async sendFile() {
                const formData = new FormData();
                formData.append('file', this.file);

                try {
                    await this.$http.post('/api/file/upload', formData);
                    this.message = "File has been uploaded";
                    this.file = "";
                    this.err = false;
                } catch(err) {
                    // console.log(err);
                    this.message = err.response.data.err;
                    this.err = true;
                }

            }
        }
    }
</script>