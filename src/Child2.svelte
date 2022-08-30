<script>
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher();

    function sayHi () {
        dispatch('message', {
            text: 'Hello!'
        });
    }
</script>

<button on:click={sayHi}>
    Click
</button>