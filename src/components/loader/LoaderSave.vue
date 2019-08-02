<template>
    <div>
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="600"
        >
            <v-card
                :color="cor"
                dark
            >
                <v-card-text class="text-xs-center tamanho_fonte">
                {{ texto }}
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                    v-if="barra"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        dialog: {
            default: false,
            type: Boolean
        },
        texto: String,
        cor: {
            default: 'primary',
            type: String
        },
        barra: {
            default: true,
            type: Boolean
        }
    }
}
</script>

<style>

.tamanho_fonte {
    font-size: 18px;
}

</style>
