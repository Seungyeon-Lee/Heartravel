<template>
    <div class="file">
        <form enctype="multipart/form-data">
            <div class="fields">
                <label>Upload File</label><br />
                <input type="file" />
            </div>
            <div class="fields">
                <button>submit</button>
            </div>
        </form>
        <div class="show_picture">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FileUpload',
        data: function (){
            return{
                UI: {IS_SHOW_MENU: false},

            };

        }
    }
</script>

<style scoped>
    .show_picture {
        position: relative;
        width: 100%;
    }
</style>