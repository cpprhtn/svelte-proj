<script>
    import { counter } from './stores';

    function reset () {
        // counter.set(0);
        $counter = 0;
    }
</script>

<button on:click={reset}>reset</button>