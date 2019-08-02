<template>
    <v-app>
        
        <!--Menu-->
        <Menu/>

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <!--Footer-->
        <Footer/>
    </v-app>
</template>

<script>

import Menu from './layout/Menu'
import Footer from './layout/Footer'

export default {
    components: {
        Menu,
        Footer
    }
}
</script>

<style>

</style>
