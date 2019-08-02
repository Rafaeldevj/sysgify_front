<template>
    <div>
        <v-responsive class="pt-4">
            <v-progress-circular
            :size="size"
            :width="width"
            :color="color"
            indeterminate
            ></v-progress-circular>
        </v-responsive>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            default: 70,
            type: Number
        },
        width: {
            default: 7,
            type: Number
        },
        color: {
            default: 'primary',
            type: String
        }
    }
}
</script>

<style>

</style>
