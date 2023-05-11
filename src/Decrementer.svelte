<script>
    import { counter } from './stores';
    function decrement() {
        // counter.update(n => n - 1);
        $counter = $counter - 1;
    }
</script>

<button on:click={decrement}>-</button>