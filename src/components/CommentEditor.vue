<template>
    <form class="comment-editor"
    @submit.prevent="applyChanges">
        <textarea placeholder="Enter edited comment text"
        v-model.trim="editedCommentText">
            
        </textarea>
        <button @click="$emit('close-editor')">Cancel</button>
        <button type="submit">Change</button>
    </form>
</template>

<script>
import axios from 'axios'
import {authHeaders} from '@/user.js'

export default {
    props: ['commentId', 'commentText'],
    data() {
        return {
            editedCommentText: this.commentText
        }
    },
    mounted() {
    },
    methods: {
        applyChanges() {
            if (!this.editedCommentText) {
                alert("Edited text is empty!");
                return;
            }
            if (this.commentId == null) {
                alert("commentId required!");
                return;
            }

            let params = {
                comment_id: this.commentId,
                new_text: this.editedCommentText
            }

            axios.put(this.$API_URL + 'updateCommentText/', params, {headers: authHeaders})
            .then(response => {
                console.log(response.data);
                this.$emit("close-editor");
                this.$emit("update-list");
            })
            .catch(e => {
                if (e.response.data.description) {
                    alert(e + '\n' + e.response.data.description);
                } else {
                    alert(e);
                }
            })
        }
    }
}
</script>

<style>
    

</style>